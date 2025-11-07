import React from 'react';
import { MapPin, Star } from 'lucide-react';

type FilterBarProps = {
  filterLocation: string;
  setFilterLocation: React.Dispatch<React.SetStateAction<string>>;
  filterRating: string;
  setFilterRating: React.Dispatch<React.SetStateAction<string>>;
  onApplyLocationFilter: () => void;
};

export function FilterBar(props: FilterBarProps) {
  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.onApplyLocationFilter();
    }
  };

  return (
    <div className='mb-6 flex flex-col items-center justify-end gap-4 md:flex-row'>
      <div className='w-full md:w-auto'>
        <label htmlFor='filter-location' className='sr-only'>
          Filtre por cidade
        </label>
        <div className='relative'>
          <MapPin className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500' />
          <input
            id='filter-location'
            type='text'
            value={props.filterLocation}
            onChange={(e) => props.setFilterLocation(e.target.value)}
            onKeyDown={handleLocationKeyDown}
            placeholder='Filtrar por cidade...'
            className='w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 md:w-auto'
          />
        </div>
      </div>

      <div className='w-full md:w-auto'>
        <label htmlFor='filter-rating' className='sr-only'>
          Filtre por avaliação
        </label>
        <div className='relative'>
          <Star className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500' />
          <select
            id='filter-rating'
            value={props.filterRating}
            onChange={(e) => props.setFilterRating(e.target.value)}
            className='w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 md:w-auto'
          >
            <option value='all'>Melhores Avaliações</option>
            <option value='4.5'>4.5+ estrelas</option>
            <option value='4'>4.0+ estrelas</option>
            <option value='3'>3.0+ estrelas</option>
          </select>
        </div>
      </div>
    </div>
  );
}
