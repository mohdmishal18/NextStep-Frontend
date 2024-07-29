import React, { useState } from 'react';

const PersonalInfo: React.FC = () => {
  const [fullName, setFullName] = useState("mohd mishal");
  const [email, setEmail] = useState("mohdmishal18@gmail.com");
  const [phone, setPhone] = useState("9947865508");
  const [education, setEducation] = useState("+2 graduate");
  const [bio, setBio] = useState("As a mentee, I am proactive, open to feedback, and committed to continuous learning. I believe that with the right guidance and support, I can achieve my goal of becoming a proficient full stack developer.");

  return (
    <section className="flex flex-col items-start pt-3 pr-3 pb-14 pl-6 mt-24 rounded-xl bg-zinc-800 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <h2 className="text-2xl text-white mb-6">Personal Information</h2>
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pr-3">
            <h3 className="text-lg text-zinc-500">Full Name</h3>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pl-3">
            <h3 className="text-lg text-zinc-500">Email Address</h3>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pr-3">
            <h3 className="text-lg text-zinc-500">Phone No</h3>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="mt-2 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pl-3">
            <h3 className="text-lg text-zinc-500">Education</h3>
            <input 
              type="text" 
              value={education} 
              onChange={(e) => setEducation(e.target.value)} 
              className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mb-6">
          <h3 className="text-lg text-zinc-500">Bio</h3>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            className="mt-4 text-2xl font-light leading-7 text-white bg-transparent border border-zinc-600 rounded-lg p-2"
            rows={4}
          />
        </div>
        <div className="flex self-end">
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c935fd99bdb8d472b8867428843687d0c6fcd431fb47b993b0ab5cbe24280b6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" 
            alt="Edit information" 
            className="rounded-xl aspect-[2.04] w-[86px]" 
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
