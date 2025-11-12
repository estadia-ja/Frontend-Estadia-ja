import React, { useState } from 'react';
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
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    if (rating === 0) return;
    onConfirm(rating, comment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#1D3557]">
            Avalie sua Estadia
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
            disabled={isLoading}
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <p className="text-gray-700 text-lg mb-4">
          Como foi sua experiência? Deixe uma nota e um comentário.
        </p>

        <div className="flex justify-center items-center gap-2 mb-6">
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
                  className={`w-10 h-10 transition-colors ${
                    starValue <= (hoverRating || rating)
                      ? 'text-yellow-500 fill-yellow-500' 
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
          placeholder="Escreva seu comentário (opcional)..."
          className="w-full h-32 rounded-lg bg-gray-100 p-4 text-gray-800 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]"
        />

        <button
          onClick={handleConfirm}
          disabled={isLoading || rating === 0}
          className="w-full mt-6 py-3 rounded-full bg-[#1D3557] text-white font-semibold text-lg hover:bg-opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Enviando..." : "Enviar Avaliação"}
        </button>
      </div>
    </div>
  );
}