import { statusCodeConstants } from '@/domain'
import { AppError } from '@/utils'

export class WrongPasswordError extends AppError {
  constructor () {
    super({
      code: 'WRONG_PASSWORD',
      statusCode: statusCodeConstants.BAD_REQUEST
    })
  }
}
