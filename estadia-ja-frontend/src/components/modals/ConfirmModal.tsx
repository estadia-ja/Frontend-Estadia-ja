import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

type ConfirmModalProps = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

export function ConfirmModal({
  title,
  message,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='flex items-center gap-2 text-xl font-bold text-[#1D3557]'>
            <AlertTriangle className='h-6 w-6 text-yellow-500' />
            {title}
          </h2>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            disabled={isLoading}
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <p className='mb-6 text-lg text-gray-700'>{message}</p>

        <div className='flex justify-end gap-3'>
          <button
            onClick={onClose}
            disabled={isLoading}
            className='rounded-full px-6 py-2 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50'
          >
            Não
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className='rounded-full bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50'
          >
            {isLoading ? 'Aguarde...' : 'Sim, confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
