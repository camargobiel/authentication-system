import app from '@/app'
import { statusCodeConstants } from '@/domain'
import { prepareDatabase } from '@/infra/prisma/utils'
import request from 'supertest'

describe('Read products e2e suites', () => {
  beforeAll(async () => {
    await prepareDatabase()
  })

  describe('Success', () => {
    it('should read all products', async () => {
      const response = await request(app)
        .get('/v1/products')
        .send()
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
  })
})
