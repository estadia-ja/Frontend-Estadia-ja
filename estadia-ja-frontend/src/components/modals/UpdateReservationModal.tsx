import React, { useState } from 'react';
import { X, CalendarCheck } from 'lucide-react';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { startOfDay } from 'date-fns';

type UpdateReservationModalProps = {
  onClose: () => void;
  onConfirm: (newDateRange: DateRange) => void;
  isLoading: boolean;
  disabledDates: DateRange[];
};

export function UpdateReservationModal({
  onClose,
  onConfirm,
  isLoading,
  disabledDates,
}: UpdateReservationModalProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const today = startOfDay(new Date());

  const handleConfirm = () => {
    if (dateRange?.from && dateRange?.to) {
      onConfirm(dateRange);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='flex w-full max-w-xl flex-col rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-[#1D3557]'>
            Atualizar Datas da Reserva
          </h2>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            disabled={isLoading}
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <div className='flex justify-center'>
          <DayPicker
            mode='range'
            selected={dateRange}
            onSelect={setDateRange}
            disabled={[{ before: today }, ...disabledDates]}
            min={1}
            numberOfMonths={1}
            styles={{ root: { margin: '0 auto' } }}
          />
        </div>

        <button
          onClick={handleConfirm}
          disabled={isLoading || !dateRange?.from || !dateRange?.to}
          className='mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90 disabled:opacity-50'
        >
          {isLoading ? 'Atualizando...' : 'Confirmar Novas Datas'}
          <CalendarCheck className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
