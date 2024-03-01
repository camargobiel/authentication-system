import { AccountsRepository } from '@/infra'
import { AuthenticationService } from './authentication.service'
import prisma from '@/infra/prisma'
import { AccountNotFoundError, WrongPasswordError } from '@/presentation'

describe('Authentication service suites', () => {
  describe('authenticate', () => {
    describe('Success', () => {
      it('should authenticate send a valid user', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = await sut.authenticate({
          email: 'geosumel@zugudsew.fk',
          password: '123456'
        })
        expect(result).toEqual({
          account: {
            id: '04ee5343-0dac-405f-95f1-ff9f60055805',
            createdAt: expect.any(Date),
            email: 'geosumel@zugudsew.fk',
            githubId: null,
            googleId: null,
            name: 'Chester Williams',
            updatedAt: expect.any(Date)
          },
          refreshToken: expect.any(String),
          token: expect.any(String)
        })
      })
    })

    describe('Errors', () => {
      it('should throw error if send an invalid email', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = sut.authenticate({
          email: 'IDonNotExist@gmail.com',
          password: '123456'
        })
        await expect(result).rejects.toThrow(AccountNotFoundError)
      })

      it('should throw error if account do not have password', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = sut.authenticate({
          email: 'utfoida@gob.mv',
          password: '123456'
        })
        await expect(result).rejects.toThrow(AccountNotFoundError)
      })

      it('should throw error if password is invalid', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = sut.authenticate({
          email: 'geosumel@zugudsew.fk',
          password: 'invalid password'
        })
        await expect(result).rejects.toThrow(WrongPasswordError)
      })
    })
  })

  describe('useOAuth', () => {
    describe('Success', () => {
      it('should create an google account if email does not exist', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = await sut.useOAuth({
          oauthAccount: {
            email: 'pez@za.ky',
            name: 'Duane Fowler',
            googleId: 'y3OUj'
          }
        })
        expect(result).toEqual({
          account: {
            id: expect.any(String),
            createdAt: expect.any(Date),
            email: 'pez@za.ky',
            githubId: null,
            name: 'Duane Fowler',
            updatedAt: expect.any(Date),
            googleId: 'y3OUj'
          },
          refreshToken: expect.any(String),
          token: expect.any(String)
        })
      })

      it('should update an account to google if email already exists', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = await sut.useOAuth({
          oauthAccount: {
            email: 'zezucu@wajim.sb',
            name: 'Duane Fowler',
            googleId: 'kQ4v2iAFn3tiCOR9bn'
          }
        })
        expect(result).toEqual({
          account: {
            id: expect.any(String),
            createdAt: expect.any(Date),
            email: 'zezucu@wajim.sb',
            githubId: null,
            name: 'Loretta Rivera',
            updatedAt: expect.any(Date),
            googleId: 'kQ4v2iAFn3tiCOR9bn'
          },
          refreshToken: expect.any(String),
          token: expect.any(String)
        })
      })

      it('should create an github account if email does not exist', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = await sut.useOAuth({
          oauthAccount: {
            email: 'hipda@ahhugi.ci',
            name: 'Patrick Parker',
            githubId: 'PI8Qj16BX'
          }
        })
        expect(result).toEqual({
          account: {
            id: expect.any(String),
            createdAt: expect.any(Date),
            email: 'hipda@ahhugi.ci',
            githubId: 'PI8Qj16BX',
            name: 'Patrick Parker',
            updatedAt: expect.any(Date),
            googleId: null
          },
          refreshToken: expect.any(String),
          token: expect.any(String)
        })
      })

      it('should update an account to google if email already exists', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = await sut.useOAuth({
          oauthAccount: {
            email: 'geosumel@zugudsew.fk',
            name: 'Chester Williams',
            googleId: 'bCvzF5Pv98Kv'
          }
        })
        expect(result).toEqual({
          account: {
            id: expect.any(String),
            createdAt: expect.any(Date),
            email: 'geosumel@zugudsew.fk',
            githubId: null,
            name: 'Chester Williams',
            updatedAt: expect.any(Date),
            googleId: 'bCvzF5Pv98Kv'
          },
          refreshToken: expect.any(String),
          token: expect.any(String)
        })
      })
    })

    describe('Errors', () => {
      it('should throw error if send an invalid email', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = sut.authenticate({
          email: 'IDonNotExist@gmail.com',
          password: '123456'
        })
        await expect(result).rejects.toThrow(AccountNotFoundError)
      })

      it('should throw error if account do not have password', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = sut.authenticate({
          email: 'utfoida@gob.mv',
          password: '123456'
        })
        await expect(result).rejects.toThrow(AccountNotFoundError)
      })

      it('should throw error if password is invalid', async () => {
        const sut = AuthenticationService.getInstance(new AccountsRepository(
          prisma
        ))
        const result = sut.authenticate({
          email: 'geosumel@zugudsew.fk',
          password: 'invalid password'
        })
        await expect(result).rejects.toThrow(WrongPasswordError)
      })
    })
  })
})
