import { type ProductsService } from '@/services'
import { type Request, type Response } from 'express'
import { type ReadProductsQueryParamsDTO } from './dtos'
import { AppError } from '@/utils'
import { statusCodeConstants } from '@/domain'

export class ProductsController {
  constructor (
    private readonly productsService: ProductsService
  ) {}

  async readProducts (request: Request, response: Response): Promise<void> {
    const { page = '1', search }: ReadProductsQueryParamsDTO = request.query
    try {
      const result = await this.productsService.readProducts({
        page: Number(page),
        search
      })
      response.status(statusCodeConstants.OK).json(result)
    } catch (err) {
      if (!(err instanceof AppError)) throw err
      const { statusCode, code } = err
      response.status(statusCode).json({ code })
    }
  }
}
