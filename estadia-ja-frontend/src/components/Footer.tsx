import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className='mt-auto w-full bg-[#1D3557] p-4 text-white shadow-md'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
        <div className='text-center md:text-left'>
          <span className='text-lg font-semibold'>© 2025 Estadia Já</span>
        </div>

        <div className='flex items-center gap-6'>
          <a
            href='mailto:cabeceira2003@gmail.com.com'
            title='Email'
            className='transition-colors hover:text-[#F1FAEE]'
          >
            <Mail className='h-6 w-6' />
          </a>
          <a
            href='#'
            title='Localização'
            className='transition-colors hover:text-[#F1FAEE]'
          >
            <MapPin className='h-6 w-6' />
          </a>
          <a
            href='tel:+5561983749069'
            title='Telefone'
            className='transition-colors hover:text-[#F1FAEE]'
          >
            <Phone className='h-6 w-6' />
          </a>
        </div>
      </div>
    </footer>
  );
}
