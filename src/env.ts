import dotenv from 'dotenv'
dotenv.config()

export const env = {
  PORT: process.env.PORT ?? 5000,
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? 'batata frita',
  GOOGLE_SECRET_KEY: process.env.GOOGLE_CLIENT_ID ?? 'chave secreta'
}
