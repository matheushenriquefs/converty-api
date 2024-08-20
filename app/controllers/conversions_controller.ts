import type { HttpContext } from '@adonisjs/core/http'

import { StoreConversionService } from '#services/store_conversion_service'
import { storeConversionValidator } from '#validators/conversion'

export default class ConversionsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(storeConversionValidator)
    const storeConversionService = new StoreConversionService()

    await storeConversionService.handle(payload)

    return {}
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
