import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';

export type Listing = {
  id: string;
  imageUrl: string;
  title: string;
  pricePerNight: number;
  rating: number;
};

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = `R$ ${listing.pricePerNight.toFixed(2).replace('.', ',')}`;

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsFavorite(isFavorite);
    //Salvar como favorito
  };

  return (
    <Link
      to={`/property/${listing.id}`}
      className='block w-full overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl'
    >
      <div className='relative'>
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className='h-48 w-full object-cover'
        />
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
        <h3
          className='truncate text-lg font-bold text-[#1D3557]'
          title={listing.title}
        >
          {listing.title}
        </h3>

        <p className='mt-1 text-sm text-gray-700'>{formattedPrice} / noite</p>

        <div className='mt-2 flex items-center'>
          <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
          <span className='ml-1 text-sm font-medium text-gray-700'>
            {listing.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
