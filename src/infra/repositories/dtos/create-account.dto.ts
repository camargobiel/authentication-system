import { type AccountEntity } from '@/domain'

export type CreateAccountParamsDTO = Omit<
AccountEntity,
'id' | 'createdAt' | 'updatedAt'
>
