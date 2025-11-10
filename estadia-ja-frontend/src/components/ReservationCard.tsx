import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { type Property } from './ListingCard';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type ReservationWithProperty = {
  id: string;
  dateStart: string;
  dateEnd: string;
  property: Property;
};

type ReservationCardProps = {
  reservation: ReservationWithProperty;
  onUpdate?: (id: string) => void;
  onCancel?: (id: string) => void;
};

const formatDate = (date: string) => {
  return format(parseISO(date), 'd MMM yyyy', { locale: ptBR });
};

export function ReservationCard({
  reservation,
  onUpdate,
  onCancel,
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
        </div>
      </Link>

      {onUpdate && onCancel && (
        <div className='mt-auto flex border-t'>
          <button
            onClick={() => onUpdate(reservation.id)}
            className='flex flex-1 items-center justify-center gap-2 p-3 text-blue-600 hover:bg-blue-50'
          >
            <Edit className='h-4 w-4' />
            Atualizar
          </button>
          <button
            onClick={() => onCancel(reservation.id)}
            className='flex flex-1 items-center justify-center gap-2 border-l p-3 text-red-600 hover:bg-red-50'
          >
            <Trash2 className='h-4 w-4' />
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
