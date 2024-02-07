import { AppError } from '@/utils'
import { statusCodeConstants } from '../constants'

export class NoAuthTokenProvidedError extends AppError {
  constructor () {
    super({
      code: 'NO_AUTH_TOKEN_PROVIDED',
      statusCode: statusCodeConstants.UNAUTHORIZED
    })
  }
}
