import request from 'supertest'
import app from '@/app'
import { statusCodeConstants } from '@/domain'
import { EXPIRED_TOKEN } from '../authenticated-account'

describe('ReAuthentication e2e suites', () => {
  describe('Success', () => {
    it('should reauthenticate user if send a valid refresh token', async () => {
      const response = await request(app)
        .post('/v1/reauthenticate')
        .set('refresh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIwNGVlNTM0My0wZGFjLTQwNWYtOTVmMS1mZjlmNjAwNTU4MDUiLCJpYXQiOjE3MDg0NjgzMTR9.CO-CEd5juP6LC3TXjNddyE1VZNIZj7fKZ0GBrISaYuY')
        .auth(EXPIRED_TOKEN, { type: 'bearer' })
      expect(response.status).toBe(statusCodeConstants.OK)
      expect(response.body).toEqual({
        token: expect.any(String),
        newRefreshToken: expect.any(String),
        account: {
          id: expect.any(String),
          name: expect.any(String),
          email: 'geosumel@zugudsew.fk',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          googleId: null
        }
      })
    })
  })

  describe('Errors', () => {
    it('should not reauthenticate if refresh token is expired', async () => {
      const response = await request(app)
        .post('/v1/reauthenticate')
        .set('refresh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIwNGVlNTM0My0wZGFjLTQwNWYtOTVmMS1mZjlmNjAwNTU4MDUiLCJpYXQiOjE3MDg0Njg1ODksImV4cCI6MTcwODQ2ODU5MH0.kZuwKAAm5YyjeCZjLCnMfQMP5HDAoVgYhN8ULpDSJXY')
        .auth(EXPIRED_TOKEN, { type: 'bearer' })

      expect(response.status).toBe(statusCodeConstants.UNAUTHORIZED)
      expect(response.body).toEqual({
        code: 'TOKEN_EXPIRED_ERROR'
      })
    })
  })
})
