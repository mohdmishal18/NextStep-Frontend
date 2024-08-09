import React from 'react';
import SearchBar from './SearchBar';
import MainMenu from './MainMenu';
import SettingsMenu from './SettingsMenu';

// them toggle button
import ThemeToggle from '../common/ThemeToggle';

const Sidebar: React.FC = () => {
  return (
    <aside className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-14 max-md:mt-10">
        <div className="flex gap-5 justify-between mx-5 max-md:mx-2.5">
          {/* Link for next step logo */}
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7bbd6fa596547270f0fc20956297a52d970e56766165ef558cb9fa7c285350a?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="Logo" className="shrink-0 max-w-full aspect-[1.59] w-[129px]" />
          {/* link for toggle theme image */}
          <ThemeToggle/>
          {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2db6d3a7e67c26a83dddbfbd310a1f31f980aafe7332c4cf25926fd7d5a7d4e?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="User avatar" className="shrink-0 my-auto rounded-none aspect-square w-[60px]" /> */}
        </div>
        <SearchBar />
        <MainMenu />
        <SettingsMenu />
      </div>
    </aside>
  );
};

export default Sidebar;