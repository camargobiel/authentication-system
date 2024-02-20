import { env } from '@/env'
import { sign } from 'jsonwebtoken'

export const createToken = (data: object): string => {
  return sign({ ...data, type: 'token' }, env.JWT_SECRET, { expiresIn: '1d' })
}
