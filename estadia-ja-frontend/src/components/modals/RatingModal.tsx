import { useState } from 'react';
import { X, Star } from 'lucide-react';

type RatingModalProps = {
  onClose: () => void;
  onConfirm: (rating: number, comment: string) => void;
  isLoading: boolean;
};

export function RatingModal({
  onClose,
  onConfirm,
  isLoading,
}: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleConfirm = () => {
    if (rating === 0) return;
    onConfirm(rating, comment);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='flex w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-[#1D3557]'>
            Avalie sua Estadia
          </h2>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            disabled={isLoading}
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <p className='mb-4 text-lg text-gray-700'>
          Como foi sua experiência? Deixe uma nota e um comentário.
        </p>

        <div className='mb-6 flex items-center justify-center gap-2'>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    starValue <= (hoverRating || rating)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Escreva seu comentário (opcional)...'
          className='h-32 w-full rounded-lg bg-gray-100 p-4 text-gray-800 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]'
        />

        <button
          onClick={handleConfirm}
          disabled={isLoading || rating === 0}
          className='mt-6 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90 disabled:opacity-50'
        >
          {isLoading ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </div>
    </div>
  );
}
