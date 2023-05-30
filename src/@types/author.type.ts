import { ResponseSuccess } from './utils.type'
import { User } from './user.type'
export type AuthResponse = ResponseSuccess<{
  access_token: string
  expires: string
  user: User
}>
