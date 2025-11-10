import React from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { startOfDay } from 'date-fns';
import { type Reservation } from '../pages/PropertyDetailsPage/index.tsx';

type BookingCalendarProps = {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  onReserveClick: () => void;
  disabledDates: DateRange[];
  userReservation: Reservation | null;
};

export function BookingCalendar({
  dateRange,
  setDateRange,
  onReserveClick,
  disabledDates,
  userReservation,
}: BookingCalendarProps) {
  const today = startOfDay(new Date());

  return (
    <div className='sticky top-24 rounded-lg border p-6 shadow-xl'>
      <h2 className='mb-4 text-center text-2xl font-bold text-[#1D3557]'>
        {userReservation ? 'Sua Reserva' : 'Reserve'}
      </h2>

      <div className='flex justify-center'>
        <DayPicker
          mode='range'
          selected={dateRange}
          onSelect={setDateRange}
          disabled={[{ before: today }, ...disabledDates]}
          numberOfMonths={1}
        />
      </div>

      {userReservation ? (
        <div className='mt-4 space-y-3'>
          <button
            onClick={onReserveClick}
            className='w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90'
          >
            Reservar noutra data?
          </button>
          <button className='w-full rounded-full py-2 font-medium text-blue-600 hover:bg-blue-50'>
            Atualizar reserva
          </button>
          <button className='w-full rounded-full py-2 font-medium text-red-600 hover:bg-red-50'>
            Cancelar reserva
          </button>
        </div>
      ) : (
        <button
          onClick={onReserveClick}
          className='mt-4 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90'
        >
          Reservar
        </button>
      )}
    </div>
  );
}
