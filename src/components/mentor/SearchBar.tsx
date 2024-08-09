import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex gap-4 px-5 py-4 mt-4 text-lg font-light text-sky-50 rounded-3xl bg-zinc-900">
      {/* search bar icon */}
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/83e704ab7e2edcffcf9ece6e1f2f76b506ede0f26c5a9c2f32b38d4a986a6528?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="" className="shrink-0 border border-sky-50 border-solid aspect-[0.86] w-[19px]" />
      <input type="text" placeholder="Search here ..." className="flex-auto my-auto bg-transparent border-none outline-none" />
    </div>
  );
};

export default SearchBar;