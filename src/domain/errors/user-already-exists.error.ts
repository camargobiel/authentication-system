import { AppError } from '@/utils'
import { CONFLICT } from '../constants'

export class UserAlreadyExists extends AppError {
  constructor () {
    super({
      code: 'USER_ALREADY_EXISTS',
      statusCode: CONFLICT
    })
  }
}
