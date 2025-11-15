import { Star } from 'lucide-react';
import { type Review } from '../pages/PropertyDetailsPage/index.tsx';

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className='rounded-lg bg-[#fff] p-6 shadow-md'>
      <div className='mb-3 flex items-center gap-3'>
        <img
          src={
            review.user?.avatarUrl ||
            `https://placehold.co/48x48/F5F5DC/1D3557?text=${review.user?.name[0] || 'U'}`
          }
          alt={review.user?.name}
          className='h-12 w-12 rounded-full'
        />
        <div>
          <h4 className='font-bold text-[#1D3557]'>
            {review.user?.name || 'Usuário'}
          </h4>
        </div>
      </div>
      <p className='mb-3 text-gray-800'>"{review.comment}"</p>
      <div className='flex'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
