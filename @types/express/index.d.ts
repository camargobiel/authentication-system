declare namespace Express {
  export interface Request {
    account: {
      accountId: string
    }
    user: {
      name: string
      email: string
    }
  }
}
