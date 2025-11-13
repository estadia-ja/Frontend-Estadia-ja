
import { AlertTriangle } from 'lucide-react';

type ErrorModalProps = {
  message: string | null;
  onClose: () => void;
};

export function ErrorModal({ message, onClose }: ErrorModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-6 shadow-xl'>
        <AlertTriangle className='mb-4 h-16 w-16 text-red-500' />

        <h2 className='mb-2 text-xl font-bold text-[#1D3557]'>
          Ocorreu um Erro
        </h2>

        <p className='mb-6 text-center text-gray-700'>
          {message || 'Não foi possível completar a sua ação.'}
        </p>

        <button
          onClick={onClose}
          className='mt-2 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90'
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
