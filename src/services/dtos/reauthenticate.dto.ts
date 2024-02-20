import { type AccountEntity } from '@/domain'

export interface ReauthenticateParamsDTO {
  refreshToken: string
}

export interface ReauthenticateResponseDTO {
  token: string
  newRefreshToken: string
  account: Omit<AccountEntity, 'password'>
}
