import { AuthResponse } from 'src/types/author.type'
import http from '../utils/http'
import path from '../constants/path'
export const registerApi = (body: { email: string; password: string }) => http.post<AuthResponse>(path.register, body)
export const loginApi = (body: { email: string; password: string }) => http.post<AuthResponse>(path.login, body)
export const logoutApi = () => http.post(path.logout)
