import { useState } from 'react';
import { X, Star, UserCheck } from 'lucide-react';

type ClientRatingModalProps = {
  onClose: () => void;
  onConfirm: (rating: number, comment: string) => void;
  isLoading: boolean;
};

export function ClientRatingModal({
  onClose,
  onConfirm,
  isLoading,
}: ClientRatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleConfirm = () => {
    if (rating === 0) return;
    onConfirm(rating, comment);
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      data-testid='client-rating-modal-backdrop'
    >
      <div className='flex w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2
            className='text-xl font-bold text-[#1D3557]'
            data-testid='client-rating-modal-title'
          >
            Avalie o Hóspede
          </h2>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            disabled={isLoading}
            data-testid='client-rating-modal-close-button'
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <p className='mb-4 text-lg text-gray-700'>
          Como foi a experiência com este hóspede?
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
                data-testid={`client-rating-star-${starValue}`}
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
          placeholder='Escreva seu comentário sobre o hóspede...'
          className='h-32 w-full rounded-lg bg-gray-100 p-4 text-gray-800 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]'
          data-testid='client-rating-comment-textarea'
        />

        <button
          onClick={handleConfirm}
          disabled={isLoading || rating === 0}
          className='mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white hover:bg-opacity-90 disabled:opacity-50'
          data-testid='client-rating-submit-button'
        >
          {isLoading ? 'Enviando...' : 'Enviar Avaliação'}
          <UserCheck className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
