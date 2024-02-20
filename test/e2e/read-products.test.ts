import app from '@/app'
import { statusCodeConstants } from '@/domain'
import { prepareDatabase } from '@/infra/prisma/utils'
import request from 'supertest'
import { AUTHENTICATED_ACCOUNT_REFRESH_TOKEN, AUTHENTICATED_ACCOUNT_TOKEN } from '../authenticated-account'

describe('Read products e2e suites', () => {
  beforeEach(async () => {
    await prepareDatabase()
  })

  describe('Success', () => {
    it('should read all products', async () => {
      const response = await request(app)
        .get('/v1/products')
        .set('refresh', AUTHENTICATED_ACCOUNT_REFRESH_TOKEN)
        .auth(AUTHENTICATED_ACCOUNT_TOKEN, {
          type: 'bearer'
        })

      expect(response.status).toBe(statusCodeConstants.OK)
      expect(response.body).toEqual({
        products: [
          {
            id: '19b1261e-267a-42ed-a802-72b87c830354',
            createdAt: expect.any(String),
            name: 'Martin Davidson',
            updatedAt: expect.any(String),
            value: 50
          },
          {
            id: '272ac411-c61f-455b-b644-d600a21a799a',
            createdAt: expect.any(String),
            name: 'Ryan Paul',
            updatedAt: expect.any(String),
            value: 10
          },
          {
            id: '4e9be197-40ac-45c3-9cb3-78eed6657446',
            createdAt: expect.any(String),
            name: 'Mattie Hudson',
            updatedAt: expect.any(String),
            value: 100
          },
          {
            id: '515be17a-6b6c-414a-807f-dc216414d24c',
            createdAt: expect.any(String),
            name: 'Chad Miles',
            updatedAt: expect.any(String),
            value: 200
          }
        ],
        page: 1,
        totalPages: 1
      })
    })

    it('should read all products with filter', async () => {
      const search = 'Martin'
      const response = await request(app)
        .get(`/v1/products?search=${search}`)
        .set('refresh', AUTHENTICATED_ACCOUNT_REFRESH_TOKEN)
        .auth(AUTHENTICATED_ACCOUNT_TOKEN, {
          type: 'bearer'
        })

      expect(response.status).toBe(statusCodeConstants.OK)
      expect(response.body).toEqual({
        products: [
          {
            id: '19b1261e-267a-42ed-a802-72b87c830354',
            createdAt: expect.any(String),
            name: 'Martin Davidson',
            updatedAt: expect.any(String),
            value: 50
          }
        ],
        page: 1,
        totalPages: 1
      })
    })

    it('should read next page', async () => {
      const page = 2
      const response = await request(app)
        .get(`/v1/products?page=${page}`)
        .set('refresh', AUTHENTICATED_ACCOUNT_REFRESH_TOKEN)
        .auth(AUTHENTICATED_ACCOUNT_TOKEN, {
          type: 'bearer'
        })

      expect(response.status).toBe(statusCodeConstants.OK)
      expect(response.body).toEqual({
        products: [],
        page: 2,
        totalPages: 1
      })
    })
  })

  describe('Errors', () => {
    it('should receive unauthorized if not send auth token', async () => {
      const response = await request(app)
        .get('/v1/products')

      expect(response.status).toBe(statusCodeConstants.UNAUTHORIZED)
    })

    it('should receive unauthorized if send an refresh token in bearer authentication', async () => {
      const response = await request(app)
        .get('/v1/products')
        .set('refresh', AUTHENTICATED_ACCOUNT_REFRESH_TOKEN)
        .auth(AUTHENTICATED_ACCOUNT_REFRESH_TOKEN, {
          type: 'bearer'
        })
      expect(response.status).toBe(statusCodeConstants.UNAUTHORIZED)
    })

    it('should receive unauthorized if send an token in place of a refresh token', async () => {
      const response = await request(app)
        .get('/v1/products')
        .set('refresh', AUTHENTICATED_ACCOUNT_TOKEN)
        .auth(AUTHENTICATED_ACCOUNT_TOKEN, {
          type: 'bearer'
        })
      expect(response.status).toBe(statusCodeConstants.UNAUTHORIZED)
    })
  })
})
