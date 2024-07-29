import React from 'react';

interface MenuItem {
  icon: string;
  label: string;
  alt: string;
  className?: string;
}

const menuItems: MenuItem[] = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/94d9dd513795cf4a3d185685c35392c597409f882ed363acd1901c28514928de?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Help & Support", alt: "Help icon" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1e14347df213b6f8cda42ba472667e1150d0dfe8dd0902af0ad7e0d0740bb4b?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Account", alt: "Account icon", className: "bg-blue-600 rounded-[31px]" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/25c5393a147bdb5b7598a57b023a8962a49455b07246c626797da104ecb916cb?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", label: "Logout", alt: "Logout icon" },
];

const SettingsMenu: React.FC = () => {
  return (
    <nav>
      <h2 className="mt-40 text-2xl text-white max-md:mt-10">SETTINGS</h2>
      <ul className="flex flex-col items-start mt-14 max-md:mt-10">
        {menuItems.map((item, index) => (
          <li key={index} className={`flex gap-2.5 mt-7 ml-6 text-xl text-white max-md:ml-2.5 ${item.className || ''}`}>
            <img loading="lazy" src={item.icon} alt={item.alt} className="shrink-0 aspect-square w-[30px]" />
            <span className="flex-auto my-auto">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsMenu;