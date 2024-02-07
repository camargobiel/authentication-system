import { type ProductEntity } from '@/domain'

export interface ReadProductsParamsDTO {
  page: number
  search?: string
}

export interface ReadProductsResponseDTO {
  products: ProductEntity[]
  page: number
  totalPages: number
}
