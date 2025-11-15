type ImageGalleryProps = {
  images: string[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, ...otherImages] = images;

  return (
    <div
      className='grid h-[400px] grid-cols-1 gap-2 overflow-hidden rounded-lg md:grid-cols-4'
      data-testid='image-gallery-container'
    >
      <div className='h-full md:col-span-2'>
        <img
          src={mainImage}
          alt='Foto principal'
          className='h-full w-full object-cover'
          data-testid='image-gallery-main'
        />
      </div>
      <div
        className='hidden h-full grid-cols-2 gap-2 md:col-span-2 md:grid'
        data-testid='image-gallery-grid'
      >
        {otherImages.slice(0, 4).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Foto ${index + 2}`}
            className='h-full w-full object-cover'
            data-testid={`image-gallery-thumbnail-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
