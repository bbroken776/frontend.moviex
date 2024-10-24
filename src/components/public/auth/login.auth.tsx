'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import useAuth from '@hooks/useAuth'
import { ILogInFormData } from '@interfaces/iLogInFormData'


const LoginForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { logIn } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<ILogInFormData>()
  async function handleRequest({ email, password }: ILogInFormData) {}

  return (
    <div className="min-w-[300px] flex flex-col py-4 px-6 bg-mineshaft-900 rounded-xl">
      <div className="flex flex-col">
        <h1 className='font-extrabold text-4xl'>Login</h1>
        <div className="w-[50%] h-[1px] bg-red-500 mt-[10px]"></div>
      </div>
      <form onSubmit={handleSubmit(handleRequest)} className='flex flex-col gap-[20px] mt-[40px]'>
        <input type="email" name="email" id="email"  placeholder='Email'/>
        <input type="password" name='password' id='password' placeholder='Password' />
      </form>
    </div>
  )
}

export default LoginForm
