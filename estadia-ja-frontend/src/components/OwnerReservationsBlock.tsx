import { type Reservation } from "../pages/ProfilePage/index";

type OwnerReservationsBlockProps = {
  reservations: Reservation[]; 
};

export function OwnerReservationsBlock({ reservations }: OwnerReservationsBlockProps) {
  return (
    <div className="w-full bg-[#fff] p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-[#1D3557] mb-4 text-center">
        Reservas nos seus Imóveis
      </h3>
      {reservations.length > 0 ? (
        <p>(Grid das Reservas recebidas)</p>
      ) : (
        <p className="text-gray-600 text-center">Seus imóveis ainda não receberam nenhuma reserva.</p>
      )}
    </div>
  );
}