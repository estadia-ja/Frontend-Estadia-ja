
import { Link } from 'react-router-dom';
import {
  Calendar,
  Edit,
  Trash2,
  DollarSign,
  Star,
  UserCheck,
  CheckCircle,
} from 'lucide-react';
import { format, parseISO, isPast, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { type Property } from './ListingCard';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type ReservationWithProperty = {
  id: string;
  dateStart: string;
  dateEnd: string;
  property: Property;
  status: string;
  propertyValuation: { id: string } | null;
  clientValuation: { id: string } | null;
};

type ReservationCardProps = {
  reservation: ReservationWithProperty;
  onUpdate?: (id: string) => void;
  onCancel?: (id: string) => void;
  onPay?: (reservation: ReservationWithProperty) => void;
  onRate?: (reservation: ReservationWithProperty) => void;
  onRateClient?: (reservation: ReservationWithProperty) => void;
  isLoading?: boolean;
};

const formatDate = (date: string) => {
  return format(parseISO(date), 'd MMM yyyy', { locale: ptBR });
};

export function ReservationCard({
  reservation,
  onUpdate,
  onCancel,
  onPay,
  onRate,
  onRateClient,
  isLoading = false,
}: ReservationCardProps) {
  if (!reservation.property) {
    return (
      <div className='text-red-500'>Erro: Dados da propriedade ausentes.</div>
    );
  }

  const title = `${reservation.property.type} em ${reservation.property.city}`;
  const firstImageId = reservation.property.images?.[0]?.id;
  const imageUrl = firstImageId
    ? `${API_URL}/property/image/${firstImageId}`
    : `https://placehold.co/600x400/457B9D/FFFFFF?text=${reservation.property.type}`;

  const checkInDate = parseISO(reservation.dateStart);
  const checkOutDate = parseISO(reservation.dateEnd);
  const isCheckInPastOrToday = isPast(checkInDate) || isToday(checkInDate);
  const isCheckOutPast = isPast(checkOutDate);
  const isPaid = reservation.status === 'PAGA';
  const isConfirmed = reservation.status === 'CONFIRMADA';
  const showPaymentButton = onPay && isConfirmed;
  const showManageButtons =
    onUpdate && onCancel && isPaid && !isCheckInPastOrToday;
  const showPropertyRateButton =
    onRate && isPaid && isCheckInPastOrToday && !reservation.propertyValuation;
  const showPropertyRatedButton =
    onRate && isPaid && isCheckInPastOrToday && reservation.propertyValuation;
  const showClientRateButton =
    onRateClient && isCheckOutPast && !reservation.clientValuation;
  const showClientRatedButton =
    onRateClient && isCheckOutPast && reservation.clientValuation;

  return (
    <div className='flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg'>
      <Link
        to={`/property/${reservation.property.id}`}
        className='block transition-opacity hover:opacity-90'
      >
        <img src={imageUrl} alt={title} className='h-48 w-full object-cover' />
        <div className='p-4'>
          <h3
            className='truncate text-lg font-bold text-[#1D3557]'
            title={title}
          >
            {title}
          </h3>
          <div className='mt-2 flex items-center gap-2 text-gray-700'>
            <Calendar className='h-4 w-4' />
            <span className='text-sm font-medium'>
              {formatDate(reservation.dateStart)} -{' '}
              {formatDate(reservation.dateEnd)}
            </span>
          </div>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              isPaid
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {reservation.status}
          </span>
        </div>
      </Link>

      <div className='mt-auto flex border-t'>
        {showManageButtons && (
          <>
            <button
              onClick={() => onUpdate!(reservation.id)}
              disabled={isLoading}
              className='flex flex-1 items-center justify-center gap-2 p-3 text-blue-600 hover:bg-blue-50 disabled:opacity-50'
            >
              <Edit className='h-4 w-4' />
              Atualizar
            </button>
            <button
              onClick={() => onCancel!(reservation.id)}
              disabled={isLoading}
              className='flex flex-1 items-center justify-center gap-2 border-l p-3 text-red-600 hover:bg-red-50 disabled:opacity-50'
            >
              <Trash2 className='h-4 w-4' />
              {isLoading ? '...' : 'Cancelar'}
            </button>
          </>
        )}

        {showPaymentButton && (
          <button
            onClick={() => onPay!(reservation)}
            disabled={isLoading}
            className='flex flex-1 items-center justify-center gap-2 p-3 text-green-600 hover:bg-green-50 disabled:opacity-50'
          >
            <DollarSign className='h-4 w-4' />
            Pagar Reserva
          </button>
        )}

        {showPropertyRateButton && (
          <button
            onClick={() => onRate!(reservation)}
            disabled={isLoading}
            className='flex flex-1 items-center justify-center gap-2 p-3 text-yellow-600 hover:bg-yellow-50 disabled:opacity-50'
          >
            <Star className='h-4 w-4' />
            Avaliar Estadia
          </button>
        )}

        {showPropertyRatedButton && (
          <div className='flex flex-1 items-center justify-center gap-2 p-3 text-gray-500'>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>Avaliado</span>
          </div>
        )}

        {showClientRateButton && (
          <button
            onClick={() => onRateClient!(reservation)}
            disabled={isLoading}
            className='flex flex-1 items-center justify-center gap-2 p-3 text-blue-600 hover:bg-blue-50 disabled:opacity-50'
          >
            <UserCheck className='h-4 w-4' />
            Avaliar Hóspede
          </button>
        )}

        {showClientRatedButton && (
          <div className='flex flex-1 items-center justify-center gap-2 p-3 text-gray-500'>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>Hóspede Avaliado</span>
          </div>
        )}
      </div>
    </div>
  );
}
