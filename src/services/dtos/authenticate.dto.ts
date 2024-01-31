import { type AccountEntity } from '@/domain'

export interface AuthenticateParamsDTO {
  email: string
  password: string
}

export interface AuthenticateResponseDTO {
  token: string
  account: Omit<AccountEntity, 'password'>
}
