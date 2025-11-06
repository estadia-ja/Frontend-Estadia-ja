import React from 'react';

export function Banner() {
  return (
    <div className='relative flex min-h-[400px] w-full items-center justify-center md:min-h-[600px]'>
      <img
        src='https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1974&auto=format&fit=crop'
        alt='Varanda de resort de frente para o mar'
        className='absolute inset-0 -z-10 h-full w-full object-cover'
      />

      <div className='absolute inset-0 bg-black/50' />

      <div className='relative z-10 p-4 text-center'>
        <h1 className='shadow-text text-4xl font-bold leading-tight text-white md:text-6xl'>
          Mais do que uma estadia,
          <br />
          uma experiência inesquecível.
        </h1>
      </div>
    </div>
  );
}
