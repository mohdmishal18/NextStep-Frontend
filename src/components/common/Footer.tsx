import React from "react";

interface FooterLinkProps {
  title: string;
  links: string[];
}

const FooterLinkSection: React.FC<FooterLinkProps> = ({ title, links }) => (
  <div className="flex flex-col flex-1 text-base text-gray-200">
    <h3 className="text-sm font-semibold leading-5 text-gray-400">{title}</h3>
    {links.map((link, index) => (
      <a key={index} href="#" className={index === 0 ? "mt-4" : "mt-3"}>
        {link}
      </a>
    ))}
  </div>
);

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        "Overview",
        "Features",
        "Solutions",
        "Tutorials",
        "Pricing",
        "Releases",
      ],
    },
    {
      title: "Company",
      links: ["About us", "Careers", "Press", "News", "Media kit", "Contact"],
    },
    {
      title: "Resources",
      links: [
        "Blog",
        "Newsletter",
        "Events",
        "Help centre",
        "Tutorials",
        "Support",
      ],
    },
    {
      title: "Social",
      links: [
        "Twitter",
        "LinkedIn",
        "Facebook",
        "GitHub",
        "AngelList",
        "Dribbble",
      ],
    },
    {
      title: "Legal",
      links: ["Terms", "Privacy", "Cookies", "Licenses", "Settings", "Contact"],
    },
  ];

  const socialIcons = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/60f5477e92aac4665a301da34b79545ca3ddda92e00867901715370a68383242?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5b55a47ea67ea37cb28b5f3f778657cb08593d4f125dcaa00225fe0ce07032be?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/0f5375fa1a3a5e688560c56e885c2a04d2ecb28df852dd0526ab76b3aa4f9df2?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/a15f180730a91e9632bc662149d1d72d32771df96b402c197ccfc3ff1b3032ed?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/2dd79af412c445a44a03c6e86c463f9cd873537a5047c633149fcf88f7a21927?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/1c4709177ab220b493558d0b9d21e24cae3cbbb1d9e6efc39c8719d6a26f5326?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be",
  ];

  return (
    <footer className="bg-zinc-800">
      <div className="px-20 py-11 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-sm leading-6 text-sky-50 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/067477096c082b667285f43e38b6c74ed6a36e7ad606be2f3ac29de3819e578a?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                alt="Footer logo"
                className="max-w-full aspect-[1.49] w-[268px]"
              />
              <p className="mt-6">
                "The journey of a thousand miles begins with a single step. "
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[72%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-5 mt-7 font-medium leading-[150%] max-md:flex-wrap max-md:mt-10">
              {footerSections.map((section, index) => (
                <FooterLinkSection
                  key={index}
                  title={section.title}
                  links={section.links}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-16 py-12 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-wrap">
          <p className="flex-1 text-base leading-6 text-gray-400 max-md:max-w-full">
            © 2077 Untitled UI. All rights reserved.
          </p>
          <div className="flex gap-5 justify-between">
            {socialIcons.map((icon, index) => (
              <a
                key={index}
                href="#"
                aria-label={`Social media link ${index + 1}`}
              >
                <img
                  loading="lazy"
                  src={icon}
                  alt=""
                  className="shrink-0 w-6 aspect-square"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
