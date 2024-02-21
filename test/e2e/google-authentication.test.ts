import request from 'supertest'
import app from '@/app'
import { statusCodeConstants } from '@/domain'

describe('Authentication e2e suites', () => {
  describe('Success', () => {
    it('should return a valid token', async () => {
      const response = await request(app)
        .post('/v1/authenticate/google')
      expect(response.status).toBe(statusCodeConstants.OK)
    })
  })

  describe('Errors', () => {

  })
})
