import request from 'supertest'
import app from '@/app'
import { statusCodeConstants } from '@/domain'

describe('OAuth authentication e2e suites', () => {
  describe('Success', () => {
    it('should redirect to google auth screen', async () => {
      const response = await request(app)
        .get('/v1/authenticate/google/callback')
      expect(response.status).toBe(statusCodeConstants.FOUND)
    })

    it('should redirect to github auth screen', async () => {
      const response = await request(app)
        .get('/v1/authenticate/github/callback')
      expect(response.status).toBe(statusCodeConstants.FOUND)
    })
  })

  describe('Errors', () => {

  })
})
