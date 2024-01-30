import { type AccountEntity } from '@/entities'

export type CreateAccountParamsDTO = Omit<
AccountEntity,
'id' | 'createdAt' | 'updatedAt'
>
