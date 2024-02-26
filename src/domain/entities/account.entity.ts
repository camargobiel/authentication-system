export interface AccountEntity {
  id: string
  name: string
  email: string
  password: string | null
  createdAt: Date
  updatedAt: Date
  googleId: string | null
}
