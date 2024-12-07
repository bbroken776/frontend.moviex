'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';

import Notification from '@components/(shared)/custom/notification/notification';
import useAuth from '@hooks/useAuth';
import ILogInFormData from '@interfaces/iRegisterFormData';
import FormGroup from './components/formGroup';

const LoginForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogInFormData>();

  async function handleRequest({ email, password }: ILogInFormData) {
    setLoading(true);

    if (!email || !password) {
      Notification({
        message: 'Please fill all your credentials',
        type: 'ERROR',
      });

      return setLoading(false);
    }

    if (password.length < 6) {
      Notification({
        message: 'Password must be at least 6 characters',
        type: 'ERROR',
      });

      return setLoading(false);
    }

    await login({ email, password });
    setLoading(false);
  }

  return (
    <div className="flex w-full max-w-4xl mx-auto bg-mineshaft-900/50 backdrop-blur-lg rounded overflow-hidden shadow-lg shadow-mineshaft-950">
      <div className="hidden sm:block w-1/2">
        <img src="/images/popcorn.png" alt="Login Illustration" className="w-full h-full object-cover" />
      </div>

      <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-amber-400">Login</h1>
          <div className="w-[35%] h-[1px] bg-amber-300 mx-auto mt-2 rounded" />
        </div>

        <form onSubmit={handleSubmit(handleRequest)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormGroup>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-2 bg-mineshaft rounded placeholder-gray-400 text-gray-100 outline-none focus:bg-amber-400/5"
              />
              {errors.email && <span className="text-amber-300 text-xs ml-1">{errors.email.message}</span>}
            </FormGroup>

            <FormGroup>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-2 bg-mineshaft rounded placeholder-gray-400 text-gray-100 outline-none focus:bg-amber-400/5"
              />
              {errors.password && <span className="text-amber-300 text-xs ml-1">{errors.password.message}</span>}
            </FormGroup>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-medium text-white rounded bg-amber-500/80 hover:bg-amber-500/90 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin text-xl" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Link to Register */}
        <div className="mt-4 text-center">
          <p className="text-gray-300">
            Don’t have an account yet?{' '}
            <a href="/auth/register" className="text-amber-400 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
