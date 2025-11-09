import { Link } from 'react-router-dom';

export function BecomeOwnerBlock() {
  return (
    <div className='flex w-full flex-col items-center justify-between rounded-lg bg-white p-6 md:flex-row'>
      <h3 className='mb-4 text-2xl font-bold text-[#1D3557] md:mb-0'>
        Quer alugar seu imóvel?
      </h3>

      <Link
        to='/property/new'
        className='rounded-full bg-[#1D3557] px-6 py-3 font-bold text-white transition-colors hover:bg-opacity-90'
      >
        Cadastrar propriedade
      </Link>
    </div>
  );
}
