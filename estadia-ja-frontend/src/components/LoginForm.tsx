import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const GoogleIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 48 48'
    width='24px'
    height='24px'
    className='mr-3'
  >
    <path
      fill='#FFC107'
      d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
    />
    <path
      fill='#FF3D00'
      d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
    />
    <path
      fill='#4CAF50'
      d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
    />
    <path
      fill='#1976D2'
      d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C39.718,36.318,44,30.63,44,24C44,22.659,43.862,21.35,43.611,20.083z'
    />
  </svg>
);

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

  const { login } = useAuth();

  const validatedForm = () => {
    setEmailError('');
    setPasswordError('');
    setApiMessage({ type: '', text: '' });
    let isValid = true;

    if (!email) {
      setEmailError('Email é obrigatorio!');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Senha é Obrigatório!');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validatedForm()) return;

    setIsLoading(true);
    const payload = { email, password };

    const apiUrl = import.meta.env.VITE_AUTH_API_BASE_URL + '/auth';

    try {
      const response = await axios.post(apiUrl, payload);

      const token = response.data.token;
      const userId = response.data.userId;

      if (!token || !userId) {
        throw new Error('Resposta de login inválida do servidor.');
      }

      setApiMessage({
        type: 'success',
        text: 'Login Bem-sucedido! Redirecionando...',
      });

      login(token, userId, '/');
    } catch (error) {
      console.error('Erro nologin:', error);

      let errorMessage = 'Email ou senha inválidos!';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setApiMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorClasses = (hasError: boolean) => {
    return hasError
      ? 'ring-2 ring-red-500 border-red-500'
      : 'focus:ring-2 focus:ring-[#1D3557]';
  };

  return (
    <div className='flex h-screen overflow-hidden bg-[#F1FAEE] font-sans'>
      <div className='hidden items-center justify-center bg-[#457B9D] p-12 md:flex md:w-1/3'>
        <Home className='h-32 w-32 text-[#1D3557]' />
      </div>
      <div className='flex w-full items-center justify-center overflow-y-auto p-6 md:w-2/3 md:p-12'>
        <div className='w-full max-w-lg'>
          <Link
            to='/'
            className='mb-8 flex items-center text-sm text-[#1D3557] hover:underline'
            data-testid='login-back-link'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='ml-1'>Voltar para o site</span>
          </Link>

          <h1
            className='mb-8 text-4xl font-bold text-[#1D3557]'
            data-testid='login-title'
          >
            Bem-vindo!
          </h1>

          <form onSubmit={handleSubmit} className='w-full space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='mb-1 ml-4 block text-sm font-medium text-[#1D3557]'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder='Email'
                className={`w-full rounded-full bg-[#A8DADC] px-6 py-3 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                  !!emailError
                )}`}
                data-testid='login-email-input'
              />
              {emailError && (
                <p
                  className='ml-4 mt-1 text-xs text-red-600'
                  data-testid='login-email-error'
                >
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='password'
                className='mb-1 ml-4 block text-sm font-medium text-[#1D3557]'
              >
                Senha
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder='Senha'
                className={`w-full rounded-full bg-[#A8DADC] px-6 py-3 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                  !!passwordError
                )}`}
                data-testid='login-password-input'
              />
              {passwordError && (
                <p
                  className='ml-4 mt-1 text-xs text-red-600'
                  data-testid='login-password-error'
                >
                  {passwordError}
                </p>
              )}
            </div>

            {apiMessage.text && (
              <p
                className={`pt-2 text-center text-sm ${
                  apiMessage.type === 'success'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
                data-testid='login-api-message'
              >
                {apiMessage.text}
              </p>
            )}

            <button
              type='submit'
              className='mt-6 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white transition-colors hover:bg-opacity-90 disabled:opacity-50'
              disabled={isLoading}
              data-testid='login-submit-button'
            >
              {isLoading ? 'Entrando...' : 'Login'}
            </button>
          </form>

          <div className='mt-4 flex justify-between text-sm font-medium text-[#1D3557]'>
            <a href='#' className='hover:underline'>
              {/* Esqueci minha senha */}
            </a>
            <Link
              to='/cadastro'
              className='hover:underline'
              data-testid='login-create-account-link'
            >
              Criar conta
            </Link>
          </div>

          <button
            type='button'
            className='mt-6 flex w-full cursor-not-allowed items-center justify-center rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white opacity-50 transition-colors'
            disabled
            data-testid='login-google-button'
          >
            <GoogleIcon />
            Login com o google
          </button>
        </div>
      </div>
    </div>
  );
}
