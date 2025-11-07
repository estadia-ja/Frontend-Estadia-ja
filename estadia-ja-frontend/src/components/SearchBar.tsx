// src/components/SearchBar/index.tsx (Atualizado)
import React from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  onSearchSubmit: (event: React.FormEvent) => void;
  onOpenDestinationModal: () => void;
  onOpenCalendarModal: () => void;
  onOpenGuestsModal: () => void;
};

export function SearchBar(props: SearchBarProps) {
  return (
    <form
      onSubmit={props.onSearchSubmit}
      className='container mx-auto w-full max-w-4xl p-4'
    >
      <div className='flex h-[72px] w-full items-center overflow-hidden rounded-full shadow-lg'>
        <button
          type='button'
          onClick={props.onOpenDestinationModal}
          className='flex h-full flex-1 flex-col justify-center bg-[#457B9D] pl-6 text-left text-white transition-colors hover:bg-opacity-90'
        >
          <span className='text-xs font-bold uppercase'>Onde</span>
          <span className='truncate text-sm'>
            {props.destination || 'Estado (ex: SP, RJ)'}
          </span>
        </button>

        <button
          type='button'
          onClick={props.onOpenCalendarModal}
          className='flex h-full flex-1 flex-col justify-center bg-[#1D3557] pl-6 text-left text-white transition-colors hover:bg-opacity-80'
        >
          <span className='text-xs font-bold uppercase'>Check-in</span>
          <span className='text-sm'>
            {props.checkIn || 'Insira data de chegada'}
          </span>
        </button>

        <button
          type='button'
          onClick={props.onOpenCalendarModal}
          className='flex h-full flex-1 flex-col justify-center bg-[#457B9D] pl-6 text-left text-white transition-colors hover:bg-opacity-90'
        >
          <span className='text-xs font-bold uppercase'>Checkout</span>
          <span className='text-sm'>
            {props.checkOut || 'Insira data de saída'}
          </span>
        </button>

        <div className='flex h-full flex-1 items-center justify-between bg-[#1D3557] pl-6 text-white'>
          <button
            type='button'
            onClick={props.onOpenGuestsModal}
            className='flex h-full flex-1 flex-col justify-center text-left'
          >
            <span className='text-xs font-bold uppercase'>Quem</span>
            <span className='text-sm'>
              {props.guests}{' '}
              {parseInt(props.guests) > 1 ? 'hóspedes' : 'hóspede'}
            </span>
          </button>

          <div className='mx-2 h-10 w-px bg-white opacity-30' />

          <button
            type='submit'
            className='mr-2 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#457B9D] transition-colors hover:bg-opacity-90'
            aria-label='Buscar'
          >
            <Search className='h-6 w-6 text-white' />
          </button>
        </div>
      </div>
    </form>
  );
}
