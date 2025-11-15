import { type Review } from '../pages/PropertyDetailsPage/index.tsx';
import { ReviewCard } from './ReviewCard.tsx';

type ReviewsBlockProps = {
  reviews: Review[];
};

export function ReviewsBlock({ reviews }: ReviewsBlockProps) {
  return (
    <div className='pb-8' data-testid='reviews-block-container'>
      <h2
        className='mb-6 text-2xl font-bold text-[#1D3557]'
        data-testid='reviews-block-title'
      >
        Avaliações
      </h2>
      {reviews.length === 0 ? (
        <p className='text-gray-600' data-testid='reviews-block-empty-message'>
          Este imóvel ainda não tem avaliações.
        </p>
      ) : (
        <div
          className='grid grid-cols-1 gap-6 md:grid-cols-2'
          data-testid='reviews-block-grid'
        >
          {reviews.slice(0, 4).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
