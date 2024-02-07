import { makeProductsController } from '@/infra/factories'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares'

const productsRoutes = Router()

const productsController = makeProductsController()

productsRoutes.get(
  '/products',
  ensureAuthenticated,
  productsController.readProducts.bind(productsController)
)

export default productsRoutes
