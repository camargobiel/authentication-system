import { AppError } from '@/utils'
import { statusCodeConstants } from '../constants'

export class TokenExpiredError extends AppError {
  constructor () {
    super({
      statusCode: statusCodeConstants.UNAUTHORIZED,
      code: 'TOKEN_EXPIRED_ERROR'
    })
  }
}
