import type { HttpContext } from '@adonisjs/core/http'

import { MakeConversionService } from '#services/make_conversion_service'
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
    const makeConversionService = new MakeConversionService()

    const response = await makeConversionService.handle(payload)

    return response
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
