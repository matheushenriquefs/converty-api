import vine from '@vinejs/vine'
import { type Infer } from '@vinejs/vine/types'

/**
 * Validates the conversion's creation action
 */
export const storeConversionValidator = vine.compile(
  vine.object({
    sourceUrl: vine.string().trim().endsWith('.txt').normalizeUrl({
      normalizeProtocol: true,
      forceHttps: true,
    }),
  })
)

export type StoreConversionPayload = Infer<typeof storeConversionValidator>
