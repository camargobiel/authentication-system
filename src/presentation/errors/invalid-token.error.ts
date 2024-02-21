import { statusCodeConstants } from '@/domain'
import { AppError } from '@/utils'

export class InvalidTokenError extends AppError {
  constructor () {
    super({
      code: 'INVALID_TOKEN',
      statusCode: statusCodeConstants.UNAUTHORIZED
    })
  }
}
