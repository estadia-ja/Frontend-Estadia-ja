import { ListingGrid } from './ListingGrid';
import { type Property } from './ListingCard';
import { Link } from 'react-router-dom';

type MyPropertiesBlockProps = {
  myProperties: Property[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function MyPropertiesBlock({
  myProperties,
  onEdit,
  onDelete,
}: MyPropertiesBlockProps) {
  return (
    <div className='w-full rounded-lg bg-white p-6'>
      <div className='mb-4 flex flex-col items-center justify-between md:flex-row'>
        <h3 className='text-2xl font-bold text-[#1D3557]'>
          Minhas Propriedades
        </h3>

        <Link
          to='/property/new'
          className='rounded-full bg-[#1D3557] px-6 py-3 font-bold text-white transition-colors hover:bg-opacity-90'
        >
          Cadastrar nova propriedade
        </Link>
      </div>
      <ListingGrid
        listings={myProperties}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
