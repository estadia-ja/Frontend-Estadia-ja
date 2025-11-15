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
  onUpdate: () => void;
  onCancel: (reservationId: string) => void;
  isLoading: boolean;
};

export function BookingCalendar({
  dateRange,
  setDateRange,
  onReserveClick,
  disabledDates,
  userReservation,
  onUpdate,
  onCancel,
  isLoading,
}: BookingCalendarProps) {
  const today = startOfDay(new Date());

  return (
    <div
      className='sticky top-24 rounded-lg border p-6 shadow-xl'
      data-testid='booking-calendar-container'
    >
      <h2
        className='mb-4 text-center text-2xl font-bold text-[#1D3557]'
        data-testid='booking-calendar-title'
      >
        {userReservation ? 'Sua Reserva' : 'Reserve'}
      </h2>

      <div className='flex justify-center'>
        <DayPicker
          mode='range'
          selected={dateRange}
          onSelect={setDateRange}
          disabled={[{ before: today }, ...disabledDates]}
          min={1}
          numberOfMonths={1}
          data-testid='booking-calendar-daypicker'
        />
      </div>

      {userReservation ? (
        <div className='mt-4 space-y-3'>
          <button
            onClick={onReserveClick}
            disabled={isLoading}
            className='w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90 disabled:opacity-50'
            data-testid='booking-calendar-rebook-button'
          >
            Reservar em outra data?
          </button>
          <button
            onClick={onUpdate}
            disabled={isLoading}
            className='w-full rounded-full py-2 font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50'
            data-testid='booking-calendar-update-button'
          >
            Atualizar reserva
          </button>
          <button
            onClick={() => onCancel(userReservation.id)}
            disabled={isLoading}
            className='w-full rounded-full py-2 font-medium text-red-600 hover:bg-red-50 disabled:opacity-50'
            data-testid='booking-calendar-cancel-button'
          >
            {isLoading ? 'Cancelando...' : 'Cancelar reserva'}
          </button>
        </div>
      ) : (
        <button
          onClick={onReserveClick}
          disabled={isLoading}
          className='mt-4 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90 disabled:opacity-50'
          data-testid='booking-calendar-reserve-button'
        >
          {isLoading ? 'Processando...' : 'Reservar'}
        </button>
      )}
    </div>
  );
}
