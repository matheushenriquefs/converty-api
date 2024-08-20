import { extname, join } from 'node:path'
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { createInterface } from 'node:readline'

import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { errors } from '@adonisjs/core'

import { StoreConversionPayload } from '#validators/conversion'
import { MinhaCDNLogFactory } from '#factories/minha_cdn_log_factory'
import { type LogFactory, type Provider } from '#types/log'

type Options = {
  provider: Provider
}

export class StoreConversionService {
  private basePath: string = 'tmp/uploads/conversions'

  private createLogFactory(provider: Provider): LogFactory {
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
  ) {
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
    const tmpStreamPath = join(tmpPath, cuid() + extName)
    const stream = createWriteStream(tmpStreamPath, { flags: 'a', encoding: 'utf8' })
    stream.write(logExtractor.getHeader() + '\n')

    for await (const line of readline) {
      const extractedLog = logExtractor.extract(line)

      if (!extractedLog) {
        continue
      }

      stream.write(extractedLog.toString() + '\n')
    }
  }
}
