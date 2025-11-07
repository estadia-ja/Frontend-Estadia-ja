import { ListingGrid } from './ListingGrid';
import { type Property } from './ListingCard';

type MyPropertiesBlockProps = {
  myProperties: Property[];
};

export function MyPropertiesBlock({ myProperties }: MyPropertiesBlockProps) {
  return (
    <div className='w-full rounded-lg bg-[#ffffff] p-6'>
      <div className='mb-4 flex flex-col items-center justify-between md:flex-row'>
        <h3 className='text-2xl font-bold text-[#1D3557]'>
          Minhas Propriedades
        </h3>
        <button className='rounded-full bg-[#1D3557] px-6 py-3 font-bold text-white transition-colors hover:bg-opacity-90'>
          Cadastrar nova propriedade
        </button>
      </div>
      <ListingGrid listings={myProperties} />
    </div>
  );
}
