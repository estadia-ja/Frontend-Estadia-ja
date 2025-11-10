import React from 'react';
import { X, CalendarCheck } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type ConfirmReservationModalProps = {
  dateRange: DateRange | undefined;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const formatDate = (date: Date) => {
  return format(date, "d 'de' MMM. 'de' yyyy", { locale: ptBR });
};

export function ConfirmReservationModal({
  dateRange,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmReservationModalProps) {
  const fromDate = dateRange?.from ? formatDate(dateRange.from) : '...';
  const toDate = dateRange?.to ? formatDate(dateRange.to) : '...';

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='flex w-full max-w-md flex-col rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-[#1D3557]'>
            Confirmar Reserva
          </h2>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            disabled={isLoading}
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <p className='mb-2 text-lg text-gray-700'>
          Você deseja reservar este imóvel nas seguintes datas?
        </p>

        <div className='mb-6 rounded-lg bg-[#A8DADC] p-4 text-center'>
          <p className='text-sm font-medium text-[#1D3557]'>
            Check-in: <strong>{fromDate}</strong>
          </p>
          <p className='text-sm font-medium text-[#1D3557]'>
            Checkout: <strong>{toDate}</strong>
          </p>
        </div>

        {/* TODO: Adicionar o cálculo do preço total aqui */}

        <button
          onClick={onConfirm}
          disabled={isLoading}
          className='mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90 disabled:opacity-50'
        >
          {isLoading ? 'Reservando...' : 'Confirmar'}
          <CalendarCheck className='h-5 w-5' />
        </button>
        <button
          onClick={onClose}
          disabled={isLoading}
          className='mt-2 w-full rounded-full py-2 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50'
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
