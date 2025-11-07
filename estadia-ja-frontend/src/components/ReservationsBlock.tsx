import { type Reservation } from '../pages/ProfilePage/index';

type ReservationsBlockProps = {
  reservations: Reservation[];
};

export function ReservationsBlock({ reservations }: ReservationsBlockProps) {
  return (
    <div className='w-full rounded-lg p-6'>
      <h3 className='mb-4 text-center text-2xl font-bold text-[#1D3557]'>
        Reservas
      </h3>
      {reservations.length > 0 ? (
        <p>(Grid de Reservas)</p>
      ) : (
        <p className='text-center text-gray-600'>
          Você ainda não fez nenhuma reserva.
        </p>
      )}
    </div>
  );
}
