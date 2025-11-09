import React from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type BookingCalendarProps = {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  onReserve: () => void;
};

export function BookingCalendar({
  dateRange,
  setDateRange,
  onReserve,
}: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className='sticky top-24 rounded-lg border p-6 shadow-xl'>
      <h2 className='mb-4 text-center text-2xl font-bold text-[#1D3557]'>
        Reserve
      </h2>
      <div className='flex justify-center'>
        <DayPicker
          mode='range'
          selected={dateRange}
          onSelect={setDateRange}
          disabled={{ before: today }}
          numberOfMonths={1}
        />
      </div>
      <button
        onClick={onReserve}
        className='mt-4 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90'
      >
        Reservar
      </button>
    </div>
  );
}
