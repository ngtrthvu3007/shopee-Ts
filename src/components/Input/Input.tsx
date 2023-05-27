import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  placeholder: string
  errorMessage: string | undefined
  register: UseFormRegister<any>
  name: string
  validateRule: RegisterOptions
}

export default function Input({ type, placeholder, errorMessage, register, name, validateRule }: InputProps) {
  return (
    <>
      <input
        type={type}
        {...register(name, validateRule)}
        className='w-full rounded-sm border-2 border-gray-300 p-3 outline-none hover:border-gray-400'
        placeholder={placeholder}
      />
      <div className=' mt-1 min-h-[1.5rem] text-sm text-red-600'>{errorMessage}</div>
    </>
  )
}
