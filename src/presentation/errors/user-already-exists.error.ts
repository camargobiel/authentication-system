import { statusCodeConstants } from '@/domain'
import { AppError } from '@/utils'

export class AccountAlreadyExistsError extends AppError {
  constructor () {
    super({
      code: 'ACCOUNT_ALREADY_EXISTS',
      statusCode: statusCodeConstants.CONFLICT
    })
  }
}
