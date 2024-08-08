import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  icon: string;
  label: string;
  alt: string;
  path: string; // Add path to the interface
}

const menuItems: MenuItem[] = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bef5b6954ffb0106dd73f64178243252736f50f7e6082ef79a47cfd6d485a4db?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Dashboard", alt: "Dashboard icon", path: "/mentor" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ae598cf5df2358dbd8251c7e75753a351e21f018976bb3b2d49c69812409e533?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "My Feed", alt: "Feed icon", path: "/mentor/myfeed" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/12799a3c4d37826241ef7182cafa50ac39526480e2d83a6be2e1263285c675f2?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Messages", alt: "Messages icon", path: "/messages" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d236d2a6b5308e20e1b913017a7f8a389b11a02d0e72aa0c3aeae2672508da27?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "My Mentors", alt: "Mentors icon", path: "/mentors" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/55f50947baf0dff894ec0dcd4890543b1f65316e41c5a96e5182b410c55bf446?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Saved Mentors", alt: "Saved mentors icon", path: "/saved-mentors" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5f5b9874de3bc4aa8936d3f86527a3b220310f0574ac7d305bb3649cbd839b1?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Requested Mentors", alt: "Requested mentors icon", path: "/requested-mentors" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa6e11fd17506f676133fb531cee08108dca017c97f98c2e66a21b54457eebe3?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Session History", alt: "Session history icon", path: "/session-history" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e594c285702c4194500780d18ea5a75765ad45bcaf593acc1b0b26e39c9b5dbb?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Search", alt: "Search icon", path: "/search" },
];

const MainMenu: React.FC = () => {
  return (
    <nav>
      <h2 className="mt-24 text-2xl text-white max-md:mt-10">MAIN MENU</h2>
      <ul className="flex flex-col items-start pr-10 pl-3 mt-12 max-md:pr-5 max-md:mt-10">
        {menuItems.map((item, index) => (
          <li key={index} className="flex gap-2.5 mt-7 ml-3 text-xl text-white max-md:ml-2.5">
            <Link to={item.path} className="flex items-center">
              <img loading="lazy" src={item.icon} alt={item.alt} className="shrink-0 aspect-square w-[30px]" />
              <span className="flex-auto my-auto">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
