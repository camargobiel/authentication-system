import { AppError } from '@/utils'
import { statusCodeConstants } from '../constants'

export class AccountAlreadyExistsError extends AppError {
  constructor () {
    super({
      code: 'ACCOUNT_ALREADY_EXISTS',
      statusCode: statusCodeConstants.CONFLICT
    })
  }
}
