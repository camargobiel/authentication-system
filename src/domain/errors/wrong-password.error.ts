import { AppError } from '@/utils'
import { statusCodeConstants } from '../constants'

export class WrongPasswordError extends AppError {
  constructor () {
    super({
      code: 'WRONG_PASSWORD',
      statusCode: statusCodeConstants.BAD_REQUEST
    })
  }
}
