import { type Reservation } from '../pages/ProfilePage/index';

type OwnerReservationsBlockProps = {
  reservations: Reservation[];
};

export function OwnerReservationsBlock({
  reservations,
}: OwnerReservationsBlockProps) {
  return (
    <div className='w-full rounded-lg bg-[#fff] p-6'>
      <h3 className='mb-4 text-center text-2xl font-bold text-[#1D3557]'>
        Reservas nos seus Imóveis
      </h3>
      {reservations.length > 0 ? (
        <p>(Grid das Reservas recebidas)</p>
      ) : (
        <p className='text-center text-gray-600'>
          Seus imóveis ainda não receberam nenhuma reserva.
        </p>
      )}
    </div>
  );
}
