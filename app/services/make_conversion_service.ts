import { extname, join } from 'node:path'
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { createInterface } from 'node:readline'

import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import { errors } from '@adonisjs/core'

import { Conversion } from '#entities/conversion'
import { StoreConversionService } from '#services/store_conversion_service'
import { MinhaCDNLogFactory } from '#factories/minha_cdn_log_factory'
import { StoreConversionPayload } from '#validators/conversion'
import { type LogFactoryContract, type Provider } from '#types/log'

type Options = {
  provider: Provider
}

export class MakeConversionService {
  private basePath: string = 'tmp/uploads/conversions'

  private createLogFactory(provider: Provider): LogFactoryContract {
    switch (provider) {
      case 'minha-cdn':
        return new MinhaCDNLogFactory()
      default:
        return new MinhaCDNLogFactory()
    }
  }

  async handle(
    payload: StoreConversionPayload,
    options: Options = {
      provider: 'minha-cdn',
    }
  ): Promise<Conversion> {
    const driver = 'fs'
    const disk = drive.use(driver)
    const tmpPath = app.makePath(this.basePath)
    const doesDirExists = await disk.exists(tmpPath)

    if (!doesDirExists) {
      await mkdir(tmpPath, { recursive: true })
    }

    const logFactory = this.createLogFactory(options.provider)
    const logReader = logFactory.createReader()
    const log = await logReader.read(payload.sourceUrl)

    if (!log) {
      throw errors.E_HTTP_EXCEPTION.invoke(
        {
          errors: [
            'The server is currently unable to handle the request due to temporary overloading or maintenance.',
          ],
        },
        503
      )
    }

    const readline = createInterface({
      input: log,
      crlfDelay: Number.POSITIVE_INFINITY,
    })

    const logExtractor = logFactory.createExtractor()
    const extName = extname(payload.sourceUrl)
    const filename = cuid() + extName
    const localPath = join(tmpPath, filename)
    const stream = createWriteStream(localPath, { flags: 'a', encoding: 'utf8' })
    stream.write(logExtractor.getHeader() + '\n')

    for await (const line of readline) {
      const extractedLog = logExtractor.extract(line)

      if (!extractedLog) {
        continue
      }

      stream.write(extractedLog.toString() + '\n')
    }

    const storeConversionService = new StoreConversionService()
    const conversion = await storeConversionService.handle(payload, {
      filename,
      localPath,
    })

    return conversion
  }
}
