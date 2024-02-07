import { makeProductsController } from '@/infra/factories'
import { Router } from 'express'

const productsRoutes = Router()

const productsController = makeProductsController()

productsRoutes.get(
  '/products',
  productsController.readProducts.bind(productsController)
)

export default productsRoutes
