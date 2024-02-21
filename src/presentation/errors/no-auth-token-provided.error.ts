import { statusCodeConstants } from '@/domain'
import { AppError } from '@/utils'

export class NoAuthTokenProvidedError extends AppError {
  constructor () {
    super({
      code: 'NO_AUTH_TOKEN_PROVIDED',
      statusCode: statusCodeConstants.UNAUTHORIZED
    })
  }
}
