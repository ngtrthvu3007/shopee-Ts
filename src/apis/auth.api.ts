import { AuthResponse } from 'src/@types/author.type'
import http from '../utils/http'
export const registerApi = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
export const loginApi = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
export const logoutApi = () => http.post('/logout')
