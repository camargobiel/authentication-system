import { AppError } from '@/utils'
import { statusCodeConstants } from '../constants'

export class AccountNotFoundError extends AppError {
  constructor () {
    super({
      code: 'ACCOUNT_NOT_FOUND',
      statusCode: statusCodeConstants.NOT_FOUND
    })
  }
}
