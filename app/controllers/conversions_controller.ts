import type { HttpContext } from '@adonisjs/core/http'

import { MakeConversionService } from '#services/make_conversion_service'
import { storeConversionValidator } from '#validators/conversion'

export default class ConversionsController {
  /**
   * Handle form submission for the create action
   */
  async handle({ request }: HttpContext) {
    const payload = await request.validateUsing(storeConversionValidator)
    const makeConversionService = new MakeConversionService()

    const response = await makeConversionService.handle(payload)

    return response
  }
}
