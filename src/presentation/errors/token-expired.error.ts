import { AppError } from '@/utils'
import { statusCodeConstants } from '@/domain'

export class TokenExpiredError extends AppError {
  constructor () {
    super({
      statusCode: statusCodeConstants.UNAUTHORIZED,
      code: 'TOKEN_EXPIRED_ERROR'
    })
  }
}
