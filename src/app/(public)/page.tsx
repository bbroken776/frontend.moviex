'use client'

import Notification from '@components/(shared)/custom/notification/notification'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@hooks/useAuth';
import { useForm } from 'react-hook-form';

interface IFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);

  const {  logIn } = useAuth();
  const {register, handleSubmit, formState: { errors }} = useForm<IFormData>();

  const router = useRouter();

  async function onSubmit({ username, password }: {username: string, password: string}) {
    setLoading(true);

   /* if (!username || !password) {
      toast.error('Você precisa preencher os campos.');

      return setLoading(false);
    }

    if (username.length < 4) {
      toast.error('O nome de usuário precisa ter no mínimo 4 caracteres.');

      return setLoading(false);
    }

    if (password.length < 6) {
      toast.error('A sua senha precisa ter no mínimo 4 caracteres.');

      return setLoading(false);
    }*/

    await logIn({ username, password, setLoading });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        required
        {...register('username', { required: true })}
      />
      <input
        type="password"
        {...register('password', { required: true })}
        placeholder="Password"
        required
      />
      <button className='text-white' type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
