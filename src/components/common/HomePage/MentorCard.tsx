import React from 'react';

interface MentorCardProps {
  name: string;
  role: string;
  imageSrc: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ name, role, imageSrc }) => {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col items-start pt-2.5 pr-20 pb-20 pl-4 rounded-none aspect-[0.71] max-md:pr-5 max-md:mt-2.5">
        <img loading="lazy" src={imageSrc} alt={`Portrait of ${name}`} className="object-cover absolute inset-0 size-full" />
        <div className="relative text-lg leading-8 text-white">{name}</div>
        <div className="relative mt-3 text-sm leading-5 text-zinc-400">{role}</div>
      </div>
    </div>
  );
};

export default MentorCard;