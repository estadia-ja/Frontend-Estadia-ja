import { type Reservation } from '../pages/ProfilePage/index.tsx';
import { ReservationCard } from './ReservationCard';

type ReservationsBlockProps = {
  reservations: Reservation[];
  onUpdate: (id: string) => void;
  onCancel: (id: string) => void;
};

export function ReservationsBlock({
  reservations,
  onUpdate,
  onCancel,
}: ReservationsBlockProps) {
  return (
    <div className='w-full rounded-lg bg-[#fff] p-6'>
      <h3 className='mb-4 text-center text-2xl font-bold text-[#1D3557]'>
        Reservas
      </h3>
      {reservations.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {reservations.map((res) => (
            <ReservationCard
              key={res.id}
              reservation={res}
              onUpdate={onUpdate}
              onCancel={onCancel}
            />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>
          Você ainda não fez nenhuma reserva.
        </p>
      )}
    </div>
  );
}
