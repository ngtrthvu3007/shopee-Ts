import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/author.type'
import { clearAccessToken, getAccessToken, saveAccessToken, setProfileUser } from './auths'

class Http {
  instance: AxiosInstance
  private access_token: string
  constructor() {
    this.access_token = getAccessToken()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.authorization = this.access_token
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        // response.status === 2xx sẽ xử lý trong block này
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          saveAccessToken(this.access_token)
          setProfileUser(data.data.user)
        } else if (url === '/logout') {
          this.access_token = ''
          clearAccessToken()
        }
        return response
      },
      function (error) {
        // response.status !== 2xx sẽ xử lý trong block này
        if (error.response?.status !== 422) {
          const message = error.message

          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
// hàm  isAxiosError nhận 1 error và kiểm tra xem respone từ api trả về có bị lỗi không
export function isAxios422<error>(error: unknown): error is AxiosError<error> {
  return isAxiosError(error) && error.response?.status === 422
}
// sử dụng hàm isAxiosError để check xem status error có phải 422 không
//error: unknown: Tham số error là một giá trị không xác định kiểu dữ liệu (unknown). Điều này có nghĩa là chúng ta không biết chính xác kiểu dữ liệu của error và cần kiểm tra nó.
//error is AxiosError<FormError>: Câu lệnh error is AxiosError<FormError> sử dụng TypeScript type guards để xác định xem error có phải là một AxiosError với kiểu dữ liệu là FormError hay không. Nếu điều kiện trả về true, TypeScript sẽ xem error như là một AxiosError với kiểu dữ liệu là FormError, cho phép chúng ta truy cập các thuộc tính và phương thức của AxiosError.
