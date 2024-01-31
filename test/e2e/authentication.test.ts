import request from 'supertest'
import app from '@/app'
import { statusCodeConstants } from '@/domain'

describe('Authentication suites', () => {
  describe('Success', () => {
    it('should return a valid token', async () => {
      const response = await request(app)
        .post('/v1/authentication')
        .send({
          email: 'geosumel@zugudsew.fk',
          password: '123456'
        })
      expect(response.status).toBe(statusCodeConstants.OK)
      expect(response.body).toEqual({
        token: expect.any(String),
        account: {
          id: expect.any(String),
          name: expect.any(String),
          email: 'geosumel@zugudsew.fk',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        }
      })
    })
  })
})
