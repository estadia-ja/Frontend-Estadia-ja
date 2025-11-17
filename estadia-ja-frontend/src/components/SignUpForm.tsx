import React, { useState } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [phones, setPhones] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setCpfError('');
    setPhoneError('');
    setApiMessage({ type: '', text: '' });
    let isValid = true;

    if (!name) {
      setNameError('Nome é obrigatório.');
      isValid = false;
    }
    if (!email) {
      setEmailError('Email é obrigatório.');
      isValid = false;
    }

    const unmaskedCpf = cpf.replace(/\D/g, '');
    if (unmaskedCpf.length !== 11) {
      setCpfError('CPF deve ter 11 dígitos.');
      isValid = false;
    }

    const unmaskedPhone = phones.replace(/\D/g, '');
    if (unmaskedPhone.length !== 11) {
      setPhoneError('Telefone deve ter DDD + 9 dígitos.');
      isValid = false;
    }

    const passRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>[\]/?]).{8,}$/;
    if (!passRegex.test(password)) {
      setPasswordError('Senha: 8+ dígitos, 1 maiúscula, 1 número, 1 especial.');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const payload = {
      name,
      email,
      cpf,
      password,
      phones: [phones],
    };
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/user';
    try {
      await axios.post(apiUrl, payload);

      const loginPayload = { email, password };
      const loginApiUrl = import.meta.env.VITE_AUTH_API_BASE_URL + '/auth';

      try {
        const loginResponse = await axios.post(loginApiUrl, loginPayload);
        
        // ALTERAÇÃO: Usar a função 'login' do AuthContext
        const token = loginResponse.data.token;
        const userId = loginResponse.data.userId;

        if (!token || !userId) {
          throw new Error("Resposta de login inválida do servidor.");
        }

        setApiMessage({
          type: 'success',
          text: 'Usuário criado e logado! Redirecionando...',
        });

        login(token, userId, "/"); 

      } catch (error) {
        console.error('Cadastro OK, mas login automático falhou:', error);
        setApiMessage({
          type: 'success',
          text: 'Cadastro criado! Por favor, faça o login.',
        });
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      let errorMessage = 'Erro ao criar usuário. Tente novamente.';
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
  
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
    setCpfError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\s\d{5})(\d)/, '$1-$2');
    setPhones(value);
    setPhoneError('');
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
            data-testid='signup-back-link'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='ml-1'>Voltar para o site</span>
          </Link>

          <h1
            className='mb-8 text-4xl font-bold text-[#1D3557]'
            data-testid='signup-title'
          >
            Bem-vindo!
          </h1>

          <form onSubmit={handleSubmit} className='w-full space-y-2'>
            <div>
              <label
                htmlFor='name'
                className='mb-1 ml-4 block text-sm font-medium text-[#1D3557]'
              >
                Nome
              </label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                placeholder='Nome'
                className={`w-full rounded-full bg-[#A8DADC] px-6 py-3 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                  !!nameError
                )}`}
                data-testid='signup-name-input'
              />
              {nameError && (
                <p
                  className='ml-4 mt-1 text-xs text-red-600'
                  data-testid='signup-name-error'
                >
                  {nameError}
                </p>
              )}
            </div>

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
                data-testid='signup-email-input'
              />
              {emailError && (
                <p
                  className='ml-4 mt-1 text-xs text-red-600'
                  data-testid='signup-email-error'
                >
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='cpf'
                className='mb-1 ml-4 block text-sm font-medium text-[#1D3557]'
              >
                CPF
              </label>
              <input
                id='cpf'
                type='text'
                value={cpf}
                onChange={handleCpfChange}
                placeholder='CPF'
                className={`w-full rounded-full bg-[#A8DADC] px-6 py-3 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                  !!cpfError
                )}`}
                data-testid='signup-cpf-input'
              />
              {cpfError && (
                <p
                  className='ml-4 mt-1 text-xs text-red-600'
                  data-testid='signup-cpf-error'
                >
                  {cpfError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='phones'
                className='mb-1 ml-4 block text-sm font-medium text-[#1D3557]'
              >
                Telefone
              </label>
              <input
                id='phones'
                type='tel'
                value={phones}
                onChange={handlePhoneChange}
                placeholder='Telefone'
                className={`w-full rounded-full bg-[#A8DADC] px-6 py-3 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                  !!phoneError
                )}`}
                data-testid='signup-phone-input'
              />
              {phoneError && (
                <p
                  className='ml-4 mt-1 text-xs text-red-600'
                  data-testid='signup-phone-error'
                >
                  {phoneError}
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
                data-testid='signup-password-input'
              />
              {passwordError && (
                <p
                  className='ml-4 mt-1 text-xs text-red-600'
                  data-testid='signup-password-error'
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
                data-testid='signup-api-message'
              >
                {apiMessage.text}
              </p>
            )}

            <button
              type='submit'
              className='mt-6 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white transition-colors hover:bg-opacity-90 disabled:opacity-50'
              disabled={isLoading}
              data-testid='signup-submit-button'
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}