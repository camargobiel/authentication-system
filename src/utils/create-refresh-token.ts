import { env } from '@/env'
import { sign } from 'jsonwebtoken'

export const createRefreshToken = (data: object): string => {
  return sign({ ...data, type: 'refresh' }, env.JWT_SECRET, { expiresIn: '7d' })
}
