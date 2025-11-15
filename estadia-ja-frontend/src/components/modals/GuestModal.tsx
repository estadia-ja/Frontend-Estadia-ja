import { useState } from 'react';
import { X, UsersRound, Plus, Minus } from 'lucide-react';

type GuestsModalProps = {
  currentGuests: string;
  onClose: () => void;
  onApply: (guests: string) => void;
};

export function GuestsModal(props: GuestsModalProps) {
  const [count, setCount] = useState(parseInt(props.currentGuests) || 1);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleApply = () => {
    props.onApply(count.toString());
    props.onClose();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      data-testid='guests-modal-backdrop'
    >
      <div className='flex w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-6 flex items-center justify-between'>
          <h2
            className='text-xl font-bold text-[#1D3557]'
            data-testid='guests-modal-title'
          >
            Quantos hóspedes?
          </h2>
          <button
            onClick={props.onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            data-testid='guests-modal-close-button'
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <div className='mb-8 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <UsersRound className='h-6 w-6 text-[#1D3557]' />
            <span className='text-lg text-gray-700'>Hóspedes</span>
          </div>

          <div className='flex items-center gap-4'>
            <button
              onClick={decrement}
              disabled={count <= 1}
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1D3557] text-[#1D3557] hover:bg-gray-100 disabled:opacity-50'
              data-testid='guests-modal-decrement-button'
            >
              <Minus className='h-5 w-5' />
            </button>

            <span
              className='w-10 text-center text-xl font-bold'
              data-testid='guests-modal-count-value'
            >
              {count}
            </span>

            <button
              onClick={increment}
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1D3557] text-[#1D3557] hover:bg-gray-100'
              data-testid='guests-modal-increment-button'
            >
              <Plus className='h-5 w-5' />
            </button>
          </div>
        </div>

        <button
          onClick={handleApply}
          className='w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white transition-colors hover:bg-opacity-90'
          data-testid='guests-modal-apply-button'
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
