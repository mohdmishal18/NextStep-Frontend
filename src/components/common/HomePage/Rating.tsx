import React from 'react';

interface RatingProps {
  rating: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviews }) => {
  return (
    <div className="flex gap-1.5 self-start mt-3.5 text-base leading-6">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/651376066fa4ae3b7cb3bc0b109159bb73becb4435ef9d03f5796e4172c9cbf1?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="" className="shrink-0 max-w-full aspect-[5.26] w-[111px]" />
      <div className="text-white">{rating.toFixed(1)}/5</div>
      <div className="text-zinc-500">({(reviews / 1000).toFixed(0)}k Reviews)</div>
    </div>
  );
};

export default Rating;