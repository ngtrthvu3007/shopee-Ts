import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input/Input'
import { useContext } from 'react'
import { AppContext } from '../../context'
import { useMutation } from '@tanstack/react-query'
import { registerApi, loginApi } from '../../apis/auth.api'
import { isAxios422 } from '../../utils/http'
import { ResponseError } from '../../@types/utils.type'

interface FormData {
  email: string
  password: string
  confirm_password?: string
}
const AuthorPage = () => {
  const { path_name, setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const isLoginPage = path_name === '/login'
  const validateRule = {
    email: {
      required: {
        value: true,
        message: 'Email không được bỏ trống'
      },
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: 'Email không hợp lệ'
      },
      minLength: {
        value: 5,
        message: 'Tối thiểu 5 kí tự'
      },
      maxLength: {
        value: 160,
        message: 'Không vượt quá 160 kí tự'
      }
    },
    password: {
      required: {
        value: true,
        message: 'Vui lòng nhập mật khẩu'
      },
      minLength: {
        value: 5,
        message: 'Tối thiểu 6 kí tự'
      },
      maxLength: {
        value: 160,
        message: 'Không vượt quá 160 kí tự'
      }
    },
    confirm_password: {
      required: {
        value: true,
        message: 'Vui lòng nhập mật khẩu'
      },
      minLength: {
        value: 5,
        message: 'Tối thiểu 6 kí tự'
      },
      maxLength: {
        value: 160,
        message: 'Không vượt quá 160 kí tự'
      },
      validate: (value: string) => value === getValues('password') || 'Mật khẩu không khớp'
    }
  }
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>()

  const registerMutation = useMutation({
    mutationFn: (body: FormData) => registerApi(body)
  })
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => loginApi(body)
  })

  const onSubmit = handleSubmit((data) => {
    const { confirm_password, ...newData } = data
    const mutationFetchAPI = isLoginPage ? loginMutation : registerMutation

    mutationFetchAPI.mutate(newData, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxios422<ResponseError<Omit<FormData, 'confirm_password'>>>(error)) {
          const responseError = error.response?.data.data
          if (responseError) {
            Object.keys(responseError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: responseError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  //Omit là kiểu của typescript cho phép loại bỏ 1 field trong kiểu object
  // Omit<FormData, 'confirm_password'>: Kiểu dữ liệu này sử dụng để tạo ra một phiên bản mới của kiểu FormData (Omit<T, K>)
  // (có thể là một kiểu dữ liệu đại diện cho các dữ liệu được gửi đến API) mà loại bỏ thuộc tính 'confirm_password'.
  // Điều này có nghĩa là các thuộc tính của kiểu FormData sẽ được giữ nguyên, trừ thuộc tính 'confirm_password'.
  // keyof Omit<FormData, 'confirm_password'>: Đây là một kiểu dữ liệu đại diện cho tên của một thuộc tính trong kiểu FormData đã loại bỏ 'confirm_password'.
  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className=' rounded bg-white p-10  shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-xl'>{isLoginPage ? 'Đăng nhập' : 'Đăng ký'}</div>
              <div className='mt-8'>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  placeholder='Email'
                  validateRule={validateRule.email}
                  errorMessage={errors.email?.message}
                />
              </div>
              <div className='mt-3'>
                <Input
                  name='password'
                  register={register}
                  type='password'
                  placeholder='Mật khẩu'
                  validateRule={validateRule.password}
                  errorMessage={errors.password?.message}
                />
              </div>
              {!isLoginPage && (
                <div className='mt-3'>
                  <Input
                    name='confirm_password'
                    register={register}
                    type='password'
                    placeholder='Xác nhận mật khẩu'
                    validateRule={validateRule.confirm_password}
                    errorMessage={errors.confirm_password?.message}
                  />
                </div>
              )}
              <div className='mt-3'>
                <button type='submit' className='w-full bg-orange px-2 py-3 text-center text-sm uppercase text-white'>
                  {isLoginPage ? 'Đăng nhập' : 'Đăng ký'}
                </button>
              </div>
              <div className=' mt-4 flex items-center justify-center text-center'>
                <span className='text-slate-400'>
                  {isLoginPage ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                </span>
                <Link to={isLoginPage ? '/register' : '/login'} className='ml-1 text-orange'>
                  {!isLoginPage ? 'Đăng nhập' : 'Đăng ký'}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorPage
