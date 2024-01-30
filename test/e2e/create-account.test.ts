import app from '@/app'
import { CONFLICT, CREATED } from '@/domain'
import { resetDatabase } from '@/infra/prisma/utils'
import request from 'supertest'

describe('Create account e2e suites', () => {
  beforeAll(async () => {
    await resetDatabase()
  })

  it('should create account', async () => {
    const response = await request(app)
      .post('/v1/accounts')
      .send({
        name: 'Miguel Rivera',
        email: 'noetihu@carespin.mq',
        password: '123456'
      })
    expect(response.status).toBe(CREATED)
  })

  it('should throw error if send a already created user with email', async () => {
    const response = await request(app)
      .post('/v1/accounts')
      .send({
        name: 'Miguel Rivera',
        email: 'noetihu@carespin.mq',
        password: '123456'
      })
    expect(response.status).toBe(CONFLICT)
    expect(response.body.code).toBe('USER_ALREADY_EXISTS')
  })
})
