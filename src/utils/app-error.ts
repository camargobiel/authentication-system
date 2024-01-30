interface AppErrorParamsDTO {
  statusCode: number
  code: string
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string

  constructor ({ statusCode, code }: AppErrorParamsDTO) {
    super(code)
    this.statusCode = statusCode
    this.code = code
  }
}
