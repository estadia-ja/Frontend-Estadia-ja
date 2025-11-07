import { Edit, Star } from 'lucide-react';
import { type User } from '../pages/ProfilePage/index';

type ProfileHeaderProps = {
  user: User;
};

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className='flex flex-col justify-between gap-8 md:flex-row'>
      <div className='flex-1'>
        <div className='flex flex-col items-center gap-6 md:flex-row'>
          <img
            src={user.avatarUrl}
            alt='Avatar'
            className='h-32 w-32 rounded-full border-4 border-white shadow-md'
          />
          <div className='flex-1 space-y-2 text-center md:text-left'>
            <h2 className='text-3xl font-bold text-[#1D3557]'>{user.name}</h2>
            <div className='flex items-center justify-center gap-2 md:justify-start'>
              <span className='text-lg text-gray-700'>{user.email}</span>
              <button
                title='Editar Email'
                className='text-[#1D3557] hover:text-[#457B9D]'
              >
                <Edit className='h-4 w-4' />
              </button>
            </div>
            <div className='flex items-center justify-center gap-2 md:justify-start'>
              <span className='text-lg text-gray-700'>{user.cpf}</span>
              <button
                title='Editar CPF'
                className='text-[#1D3557] hover:text-[#457B9D]'
              >
                <Edit className='h-4 w-4' />
              </button>
            </div>
            <div className='flex items-center justify-center gap-2 md:justify-start'>
              <span className='text-lg text-gray-700'>{user.phone}</span>
              <button
                title='Editar Telefone'
                className='text-[#1D3557] hover:text-[#457B9D]'
              >
                <Edit className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-shrink-0 text-center md:text-left'>
        <h3 className='mb-2 text-2xl font-bold text-[#1D3557]'>Avaliações</h3>
        <p className='text-lg text-gray-700'>➔ 56 estadias</p>
        <div className='mt-2 flex items-center justify-center gap-2 md:justify-start'>
          <Star className='h-8 w-8 fill-yellow-500 text-yellow-500' />
          <span className='text-3xl font-bold text-gray-800'>4.78</span>
        </div>
      </div>
    </div>
  );
}
