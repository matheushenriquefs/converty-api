import { join } from 'node:path'

import drive from '@adonisjs/drive/services/main'
import { Timestamp } from 'firebase-admin/firestore'

import { Conversion } from '#entities/conversion'
import { ConversionRepository } from '#repositories/conversion_repository'
import { StoreConversionPayload } from '#validators/conversion'

type Options = {
  filename: string
  localPath: string
}

export class StoreConversionService {
  async handle(payload: StoreConversionPayload, options: Options): Promise<Conversion> {
    const driver = 'gcs'
    const disk = drive.use(driver)
    const collection = 'conversions'
    const cloudPath = join(collection, options.filename)
    await disk.moveFromFs(options.localPath, cloudPath)
    const data = {
      source_urls: [payload.sourceUrl],
      url: await disk.getUrl(options.filename),
      created_at: Timestamp.now(),
    }
    const conversionRepository = new ConversionRepository()
    const conversion = await conversionRepository.add(data)

    return conversion
  }
}
