import { useState } from 'react';
import { X } from 'lucide-react';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

type CalendarModalProps = {
  onClose: () => void;
  onApply: (checkIn: string, checkOut: string) => void;
};

const formatDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export function CalendarModal(props: CalendarModalProps) {
  const today = new Date();

  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const handleApply = () => {
    if (range?.from && range?.to) {
      props.onApply(formatDate(range.from), formatDate(range.to));
      props.onClose();
    } else if (range?.from) {
      props.onApply(formatDate(range.from), formatDate(range.from));
      props.onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      data-testid='calendar-modal-backdrop'
    >
      <div className='flex w-full max-w-xl flex-col rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2
            className='text-xl font-bold text-[#1D3557]'
            data-testid='calendar-modal-title'
          >
            Selecione as datas
          </h2>
          <button
            onClick={props.onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            data-testid='calendar-modal-close-button'
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <div>
          <DayPicker
            mode='range'
            selected={range}
            onSelect={setRange}
            disabled={{ before: today }}
            numberOfMonths={2}
            data-testid='calendar-modal-daypicker'
          />
        </div>

        <button
          onClick={handleApply}
          disabled={!range?.from}
          className='mt-4 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white transition-colors hover:bg-opacity-90 disabled:opacity-50'
          data-testid='calendar-modal-apply-button'
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
