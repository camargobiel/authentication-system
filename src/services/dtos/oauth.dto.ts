import { type AccountEntity, type OAuthAccountEntity } from '@/domain'

export interface OAuthParams {
  oauthAccount: OAuthAccountEntity
}

export interface OAuthResult {
  token: string
  refreshToken: string
  account: AccountEntity
}
