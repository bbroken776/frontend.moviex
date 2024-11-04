'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaSpinner } from 'react-icons/fa'

import Notification from '@components/(shared)/custom/notification/notification'
import useAuth from '@hooks/useAuth'
import IRegisterFormData from '@interfaces/iRegisterFormData' // Adjust import as necessary
import FormGroup from './components/formGroup'

const RegisterForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>()

  async function handleRequest({ firstName, lastName, email, password }: IRegisterFormData) {
    setLoading(true)

    if (!firstName || !lastName || !email || !password) {
      Notification({
        message: 'Please fill all your credentials',
        type: 'ERROR',
      })

      return setLoading(false)
    }

    if (password.length < 6) {
      Notification({
        message: 'Password must be at least 6 characters',
        type: 'ERROR',
      })

      return setLoading(false)
    }

    await registerUser({ firstName, lastName, email, password })
    setLoading(false)
  }

  return (
    <div className="flex w-full max-w-4xl mx-auto bg-mineshaft-900/50 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg shadow-mineshaft-950">
      <div className="hidden sm:block w-1/2">
        <img
          src="/images/popcorn.png"
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-amber-400">Register</h1>
          <div className="w-[35%] h-[1px] bg-amber-300 mx-auto mt-2 rounded-full" />
        </div>

        <form onSubmit={handleSubmit(handleRequest)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormGroup>
              <input
                type="text"
                placeholder="First Name"
                {...register('firstName', { required: 'First Name is required' })}
                className="w-full px-4 py-2 bg-mineshaft rounded-md placeholder-gray-400 text-gray-100 outline-none focus:bg-amber-400/5"
              />
              {errors.firstName && (
                <span className="text-amber-300 text-xs ml-1">
                  {errors.firstName.message}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <input
                type="text"
                placeholder="Last Name"
                {...register('lastName', { required: 'Last Name is required' })}
                className="w-full px-4 py-2 bg-mineshaft rounded-md placeholder-gray-400 text-gray-100 outline-none focus:bg-amber-400/5"
              />
              {errors.lastName && (
                <span className="text-amber-300 text-xs ml-1">
                  {errors.lastName.message}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-2 bg-mineshaft rounded-md placeholder-gray-400 text-gray-100 outline-none focus:bg-amber-400/5"
              />
              {errors.email && (
                <span className="text-amber-300 text-xs ml-1">
                  {errors.email.message}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-2 bg-mineshaft rounded-lg placeholder-gray-400 text-gray-100 outline-none focus:bg-amber-400/5"
              />
              {errors.password && (
                <span className="text-amber-300 text-xs ml-1">
                  {errors.password.message}
                </span>
              )}
            </FormGroup>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-medium text-white rounded-lg bg-amber-500/80 hover:bg-amber-500/90 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin text-xl" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-300">
            Already have an account?{' '}
            <a href="/auth/login" className="text-amber-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm