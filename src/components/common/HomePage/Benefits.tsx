import React from "react";

interface BenefitItemProps {
  icon: string;
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text }) => (
  <div className="flex gap-5 mt-8 leading-loose">
    <img loading="lazy" src={icon} alt="" className="object-contain shrink-0 w-8 aspect-square fill-blue" />
    <div className="flex-auto my-auto text-white">{text}</div>
  </div>
);


const benefits = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/79913f5d1e1b36e321927f2953a746917cbb56972436bbb10c870c3ac8540da6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", text: "Find Your Mendor With ease." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/79913f5d1e1b36e321927f2953a746917cbb56972436bbb10c870c3ac8540da6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", text: "Purchase personalized plans." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/79913f5d1e1b36e321927f2953a746917cbb56972436bbb10c870c3ac8540da6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", text: "Experienced mentors from various fields." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/79913f5d1e1b36e321927f2953a746917cbb56972436bbb10c870c3ac8540da6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", text: "Chat and vedio sessions with mentors" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/79913f5d1e1b36e321927f2953a746917cbb56972436bbb10c870c3ac8540da6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", text: "Free trial with mentors." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/79913f5d1e1b36e321927f2953a746917cbb56972436bbb10c870c3ac8540da6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be", text: "Plus with lot of feautures +" }
];

const BenefitList: React.FC = () => (
  <div className="flex flex-col items-start mt-3 w-full text-lg font-medium text-stone-900 max-md:mt-10 max-md:max-w-full">
    <h2 className="self-stretch text-white text-5xl font-bold max-md:max-w-full max-md:text-4xl">
      What <span className="text-blue">Benefit</span> Will You Get
    </h2>
    {benefits.map((benefit, index) => (
      <BenefitItem key={index} icon={benefit.icon} text={benefit.text} />
    ))}
  </div>
);

const Benefits: React.FC = () => {
  return (
    <section className="rounded-none">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
          <BenefitList />
        </div>
        <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a0ae28be772389b82eb845be85f4ea64315f65b183303d1315248ce0863d0af?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" 
            alt="Illustration of benefits" 
            className="object-contain grow w-full rounded-none aspect-[1.18] max-md:mt-10 max-md:max-w-full" 
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;