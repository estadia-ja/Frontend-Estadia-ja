import React from 'react';
import { ListingCard, type Property } from './ListingCard';

type ListingGridProps = {
  listings: Property[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ListingGrid({ listings, onEdit, onDelete }: ListingGridProps) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {listings.map((property) => (
        <ListingCard
          key={property.id}
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
