import React from 'react';

const interests = ['MERN', 'DataScience', 'Web Development'];

const Interests: React.FC = () => {
  return (
    <section className="flex flex-col pt-3 pr-3 pb-20 pl-6 mt-3 rounded-xl bg-zinc-800 max-md:pl-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between text-2xl text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <h2 className="self-start">Interests</h2>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c935fd99bdb8d472b8867428843687d0c6fcd431fb47b993b0ab5cbe24280b6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="Edit interests" className="shrink-0 rounded-xl aspect-[2.04] w-[86px]" />
      </div>
      <div className="flex gap-3.5 self-start px-0.5 mt-5 mb-11 text-base font-light text-zinc-900 max-md:mb-10">
        {interests.map((interest, index) => (
          <span key={index} className="px-2 py-1.5 whitespace-nowrap bg-gray-50 rounded">
            {interest}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Interests;