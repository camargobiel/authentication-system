import request from 'supertest'
import app from '@/app'
import { statusCodeConstants } from '@/domain'

describe('Authentication e2e suites', () => {
  describe('Success', () => {
    it('should return a valid token', async () => {
      const response = await request(app)
        .post('/v1/authenticate')
        .send({
          email: 'geosumel@zugudsew.fk',
          password: '123456'
        })
      expect(response.status).toBe(statusCodeConstants.OK)
      expect(response.body).toEqual({
        token: expect.any(String),
        refreshToken: expect.any(String),
        account: {
          id: expect.any(String),
          name: expect.any(String),
          email: 'geosumel@zugudsew.fk',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          googleId: null,
          githubId: null
        }
      })
    })
  })

  describe('Errors', () => {
    it('should return not found if send an invalid email', async () => {
      const response = await request(app)
        .post('/v1/authenticate')
        .send({
          email: 'dontexist@zugudsew.fk',
          password: '1234567'
        })
      expect(response.status).toBe(statusCodeConstants.NOT_FOUND)
    })

    it('should return bad request if send an invalid password', async () => {
      const response = await request(app)
        .post('/v1/authenticate')
        .send({
          email: 'geosumel@zugudsew.fk',
          password: '1234567'
        })
      expect(response.status).toBe(statusCodeConstants.BAD_REQUEST)
    })
  })
})
