import { type ProductsRepository } from '@/infra'
import { type ReadProductsResponseDTO, type ReadProductsParamsDTO } from './dtos'

export class ProductsService {
  constructor (
    private readonly productsRepository: ProductsRepository
  ) {}

  async readProducts ({
    page = 1,
    search
  }: ReadProductsParamsDTO): Promise<ReadProductsResponseDTO> {
    const PRODUCTS_PER_PAGE = 10
    const productsLength = await this.productsRepository.countProducts({
      search
    })
    const take = PRODUCTS_PER_PAGE
    const skip = (page - 1) * PRODUCTS_PER_PAGE
    const totalPages = Math.ceil(productsLength / PRODUCTS_PER_PAGE)
    const products = await this.productsRepository.findProducts({
      search,
      skip,
      take
    })
    return { products, page, totalPages }
  }
}
