import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type PropertyImage = {
  id: string;
  url?: string;
};

export type Property = {
  id: string;
  type: string;
  description: string;
  city: string;
  state: string;
  dailyRate: number;
  avgRating: number | null;
  images: PropertyImage[];
  user?: {
    id: string;
    name: string;
  };
};

type ListingCardProps = {
  property: Property;
};

export function ListingCard({ property }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const title = `${property.type} em ${property.city}`;
  const formattedPrice = `R$ ${property.dailyRate.toFixed(2).replace('.', ',')}`;

  const firstImageId = property.images?.[0]?.id;

  const imageUrl = firstImageId
    ? `${API_URL}/property/image/${firstImageId}`
    : `https://placehold.co/600x400/457B9D/FFFFFF?text=${property.type}`;

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className='block w-full overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl'
    >
      <div className='relative'>
        <img src={imageUrl} alt={title} className='h-48 w-full object-cover' />
        <button
          onClick={handleFavoriteClick}
          className='absolute right-3 top-3 rounded-full bg-white/80 p-2 hover:bg-white'
          aria-label='Adicionar aos favoritos'
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#1D3557]'}`}
          />
        </button>
      </div>

      <div className='p-4'>
        <h3 className='truncate text-lg font-bold text-[#1D3557]' title={title}>
          {title}
        </h3>

        <p className='mt-1 text-sm text-gray-700'>{formattedPrice} / noite</p>

        <div className='mt-2 flex items-center'>
          {property.avgRating ? (
            <>
              <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
              <span className='ml-1 text-sm font-medium text-gray-700'>
                {property.avgRating.toFixed(1)}
              </span>
            </>
          ) : (
            <span className='text-sm text-gray-500'>Novo</span>
          )}
        </div>
      </div>
    </Link>
  );
}
