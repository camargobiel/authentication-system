import app from '@/app'
import { statusCodeConstants } from '@/domain'
import { prepareDatabase } from '@/infra/prisma/utils'
import request from 'supertest'

describe('Create account e2e suites', () => {
  beforeEach(async () => {
    await prepareDatabase()
  })

  describe('Success', () => {
    it('should create account', async () => {
      const response = await request(app)
        .post('/v1/accounts')
        .send({
          name: 'Miguel Rivera',
          email: 'noetihu@carespin.mq',
          password: '123456'
        })
      expect(response.status).toBe(statusCodeConstants.CREATED)
    })
  })

  describe('Error', () => {
    it('should throw error if send a already created user with email', async () => {
      const response = await request(app)
        .post('/v1/accounts')
        .send({
          name: 'Miguel Rivera',
          email: 'geosumel@zugudsew.fk',
          password: '123456'
        })
      expect(response.status).toBe(statusCodeConstants.CONFLICT)
      expect(response.body.code).toBe('ACCOUNT_ALREADY_EXISTS')
    })
  })
})
