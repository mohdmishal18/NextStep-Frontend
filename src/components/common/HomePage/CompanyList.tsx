import React from 'react';

interface LogoWithTextProps {
  imageSrc: string;
  altText: string;
  text: string;
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ imageSrc, altText, text }) => (
  <div className="flex gap-2.5">
    <img loading="lazy" src={imageSrc} alt={altText} className="object-contain shrink-0 self-start aspect-[1.06] w-[34px]" />
    <div className="flex-auto">{text}</div>
  </div>
);

interface TeamData {
  imageSrc: string;
  altText: string;
  text: string;
}

const teamData: TeamData[] = [
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2e2beb3425a012f2ab2dc990a72765327cb981a682a488707950ee5562d7256?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", altText: "Unsplash logo", text: "Unsplash" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d446c5b8ace2624cb34aaf93d16aa60c613b5ec8f10045424908fd194d0cb668?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", altText: "Notion logo", text: "Notion" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4ea7756e145d3cda7c744aefb952257bfe13a627f41ce9ac652adc63a767c41?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", altText: "Intercom logo", text: "INTERCOM" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ded2cb57165bacdeaa8717afbaf7c6154b3583ae7d24fc8bdae8f4336df1f11?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", altText: "Descript logo", text: "descript" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c889401e8a57a292e52e08648ae61e1d1f4f7a8cdc8d24025d303d58ff83538c?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", altText: "Grammarly logo", text: "grammarly" }
];

const CompanyList: React.FC = () => {
  return (
    <section className="flex flex-col rounded-none">
      <h1 className="self-center ml-14 text-4xl font-bold text-center text-white max-md:max-w-full">
        More than 25,000 Mentors in Next<span className="text-blue">Step</span> are from 
      </h1>
      <div className="flex flex-wrap gap-5 justify-between items-start mt-16 w-full text-3xl font-semibold whitespace-nowrap text-neutral-400 max-md:mt-10 max-md:max-w-full">
        {teamData.map((team, index) => (
          <LogoWithText key={index} imageSrc={team.imageSrc} altText={team.altText} text={team.text} />
        ))}
      </div>
    </section>
  );
};

export default CompanyList;