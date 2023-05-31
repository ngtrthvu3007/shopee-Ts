import { User } from 'src/types/user.type'

export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}
export const getAccessToken = () => localStorage.getItem('access_token') || ''

export const getProfileUser = () => {
  const result = localStorage.getItem('user')
  return result ? JSON.parse(result) : null
}
export const setProfileUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}
