import request from 'supertest'
import app from '@/app'
import { statusCodeConstants } from '@/domain'

describe('Google authentication e2e suites', () => {
  describe('Success', () => {
    it('should redirect to google auth screen', async () => {
      const response = await request(app)
        .get('/v1/authenticate/google/callback')

      console.log('response', response)
      expect(response.status).toBe(statusCodeConstants.FOUND)
    })
  })

  describe('Errors', () => {

  })
})
