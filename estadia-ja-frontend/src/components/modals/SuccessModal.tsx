
import { CheckCircle } from 'lucide-react';

type SuccessModalProps = {
  message: string | null;
  onClose: () => void;
};

export function SuccessModal({ message, onClose }: SuccessModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-6 shadow-xl'>
        <CheckCircle className='mb-4 h-16 w-16 text-green-500' />

        <h2 className='mb-2 text-xl font-bold text-[#1D3557]'>Sucesso!</h2>

        <p className='mb-6 text-center text-gray-700'>
          {message || 'Ação completada com sucesso.'}
        </p>

        <button
          onClick={onClose}
          className='mt-2 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90'
        >
          OK
        </button>
      </div>
    </div>
  );
}
