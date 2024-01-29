import app from '@/app'
import request from 'supertest'

describe('Create account e2e suites', () => {
  it('should create account', async () => {
    const response = await request(app)
      .post('/v1/accounts')
      .send({
        name: 'Miguel Rivera',
        email: 'noetihu@carespin.mq',
        password: '123456'
      })
    expect(response.status).toBe(201)
  })
})
