'use client';

import { Star } from 'lucide-react';

export default function StarRating({ rating, interactive = false, onRate = () => {}, size = 'w-5 h-5' }) {
  return (
    <div className="flex space-x-1">
      {[1,2,3,4,5].map(star => (
        <Star 
          key={star} 
          className={`${size} cursor-pointer transition-colors ${
            star <= rating 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300 hover:text-yellow-300'
          }`}
          onClick={() => interactive && onRate(star)}
        />
      ))}
    </div>
  );
}
