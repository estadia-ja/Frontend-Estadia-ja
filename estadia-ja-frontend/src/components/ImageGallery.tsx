import React from 'react';

type ImageGalleryProps = {
  images: string[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, ...otherImages] = images;

  return (
    <div className='grid h-[400px] grid-cols-1 gap-2 overflow-hidden rounded-lg md:grid-cols-4'>
      <div className='h-full md:col-span-2'>
        <img
          src={mainImage}
          alt='Foto principal'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='hidden h-full grid-cols-2 gap-2 md:col-span-2 md:grid'>
        {otherImages.slice(0, 4).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Foto ${index + 2}`}
            className='h-full w-full object-cover'
          />
        ))}
      </div>
    </div>
  );
}
