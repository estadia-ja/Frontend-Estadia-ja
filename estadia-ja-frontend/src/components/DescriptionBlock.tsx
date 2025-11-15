import { User, Bed, Bath } from 'lucide-react';
import { type FullProperty } from '../pages/PropertyDetailsPage/index.tsx';

type DescriptionBlockProps = {
  property: FullProperty;
};

export function DescriptionBlock({ property }: DescriptionBlockProps) {
  return (
    <div className='border-b pb-8'>
      <h2 className='mb-4 text-2xl font-bold text-[#1D3557]'>Descrição</h2>
      <p
        className='mb-6 text-lg text-gray-700'
        data-testid='property-description'
      >
        {property.description}
      </p>

      <h3 className='mb-4 text-xl font-semibold text-[#1D3557]'>
        Informações importantes sobre o Imóvel
      </h3>
      <div className='flex items-center gap-6 text-lg text-gray-800'>
        <div
          className='flex items-center gap-2'
          data-testid='property-guests-count'
        >
          <User className='h-5 w-5' />
          <span>{property.maxGuests} Hóspedes</span>
        </div>
        <div
          className='flex items-center gap-2'
          data-testid='property-bedroom-count'
        >
          <Bed className='h-5 w-5' />
          <span>{property.numberOfBedroom} Camas</span>
        </div>
        <div
          className='flex items-center gap-2'
          data-testid='property-bathroom-count'
        >
          <Bath className='h-5 w-5' />
          <span>{property.numberOfBathroom} Banheiros</span>
        </div>
      </div>

      <div className='mt-8 flex items-center gap-4'>
        <img
          src={
            property.user?.avatarUrl ||
            `https://placehold.co/64x64/A8DADC/1D3557?text=${property.user?.name[0] || 'U'}`
          }
          alt='Anfitrião'
          className='h-16 w-16 rounded-full'
          data-testid='property-host-avatar'
        />
        <div>
          <h3
            className='text-xl font-semibold text-[#1D3557]'
            data-testid='property-host-name'
          >
            Anfitrião: {property.user?.name || 'Usuário'}
          </h3>
          {/* <span className='text-gray-600'>X anos de experiência</span> */}
        </div>
      </div>
    </div>
  );
}
