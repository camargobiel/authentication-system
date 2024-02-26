import { type AccountEntity, type GoogleUserEntity } from '@/domain'

export interface GoogleAuthenticationParams {
  googleUser: GoogleUserEntity
}

export interface GoogleAuthenticationResult {
  token: string
  refreshToken: string
  account: AccountEntity
}
