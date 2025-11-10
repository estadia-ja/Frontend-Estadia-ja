import { type Reservation } from '../pages/ProfilePage/index';
import { ReservationCard } from './ReservationCard';

type OwnerReservationsBlockProps = {
  reservations: Reservation[];
  isLoading: boolean;
};

export function OwnerReservationsBlock({
  reservations,
  isLoading,
}: OwnerReservationsBlockProps) {
  return (
    <div className='w-full rounded-lg bg-white p-6'>
      <h3 className='mb-4 text-center text-2xl font-bold text-[#1D3557]'>
        Reservas nos seus Imóveis
      </h3>
      {reservations.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {reservations.map((res) => (
            <ReservationCard
              key={res.id}
              reservation={res}
              isLoading={isLoading}
            />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>
          Seus imóveis ainda não receberam nenhuma reserva.
        </p>
      )}
    </div>
  );
}
