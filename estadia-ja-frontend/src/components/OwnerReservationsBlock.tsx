import { type Reservation } from '../pages/ProfilePage/index';
import { ReservationCard } from './ReservationCard';

type OwnerReservationsBlockProps = {
  reservations: Reservation[];
  isLoading: boolean;
  onRateClient: (reservation: Reservation) => void;
};

export function OwnerReservationsBlock({
  reservations,
  isLoading,
  onRateClient,
}: OwnerReservationsBlockProps) {
  return (
    <div
      className='w-full rounded-lg bg-white p-6'
      data-testid='owner-reservations-block-container'
    >
      <h3
        className='mb-4 text-center text-2xl font-bold text-[#1D3557]'
        data-testid='owner-reservations-title'
      >
        Reservas nos seus Imóveis
      </h3>
      {reservations.length > 0 ? (
        <div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          data-testid='owner-reservations-grid'
        >
          {reservations.map((res) => (
            <ReservationCard
              key={res.id}
              reservation={res}
              isLoading={isLoading}
              onRateClient={onRateClient}
            />
          ))}
        </div>
      ) : (
        <p
          className='text-center text-gray-600'
          data-testid='owner-reservations-empty-message'
        >
          Seus imóveis ainda não receberam nenhuma reserva.
        </p>
      )}
    </div>
  );
}
