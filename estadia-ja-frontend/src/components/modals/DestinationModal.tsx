// src/components/modals/DestinationModal.tsx (Atualizado)
import React, { useState } from 'react';
import { X, MapPin, Search } from 'lucide-react';

type DestinationModalProps = {
  onClose: () => void;
  onSelect: (destination: string) => void;
};

export function DestinationModal(props: DestinationModalProps) {
  const [local, setLocal] = useState('');

  const handleSelect = () => {
    props.onSelect(local);
    props.onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-[#1D3557]'>Para onde?</h2>
          <button
            onClick={props.onClose}
            className='rounded-full p-2 hover:bg-gray-200'
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <div className='relative mb-4'>
          <MapPin
            className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1D3557]'
            opacity={0.7}
          />
          <input
            id='destination-modal-input'
            type='text'
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder='Buscar por estado (ex: SP, RJ, BA)'
            className='w-full rounded-full border-2 border-gray-300 py-3 pl-12 pr-6 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]'
            autoFocus
          />
        </div>

        <button
          onClick={handleSelect}
          className='flex w-full items-center justify-center gap-2 rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white transition-colors hover:bg-opacity-90'
        >
          <Search className='h-5 w-5' />
          Buscar
        </button>
      </div>
    </div>
  );
}
