import { type Reservation } from '../pages/ProfilePage/index.tsx';
import { ReservationCard } from './ReservationCard';

type ReservationsBlockProps = {
  reservations: Reservation[];
  onUpdate: (id: string) => void;
  onCancel: (id: string) => void;
  onPay: (reservation: Reservation) => void;
  onRate: (reservation: Reservation) => void;
  isLoading: boolean;
};

export function ReservationsBlock({
  reservations,
  onUpdate,
  onCancel,
  onPay,
  onRate,
  isLoading,
}: ReservationsBlockProps) {
  return (
    <div
      className='w-full rounded-lg bg-[#fff] p-6'
      data-testid='reservations-block-container'
    >
      <h3
        className='mb-4 text-center text-2xl font-bold text-[#1D3557]'
        data-testid='reservations-block-title'
      >
        Reservas
      </h3>
      {reservations.length > 0 ? (
        <div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          data-testid='reservations-block-grid'
        >
          {reservations.map((res) => (
            <ReservationCard
              key={res.id}
              reservation={res}
              onUpdate={onUpdate}
              onCancel={onCancel}
              onPay={onPay}
              onRate={onRate}
              isLoading={isLoading}
            />
          ))}
        </div>
      ) : (
        <p
          className='text-center text-gray-600'
          data-testid='reservations-block-empty-message'
        >
          Você ainda não fez nenhuma reserva.
        </p>
      )}
    </div>
  );
}
