import React from 'react';
import { Link } from 'react-router-dom';

import Rating from './Rating';
import Button from './Button';

interface MentorConnectProps {}

const MentorConnect: React.FC<MentorConnectProps> = () => {

  return (
    <main className="w-full max-w-[1190px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <section className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch px-5 my-auto max-md:mt-10 max-md:max-w-full">
            <h1 className="text-7xl text-white leading-[90px] max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
              Connect with your Mentors
            </h1>
            <p className="mt-14 text-lg leading-7 text-zinc-400 max-md:mt-10 max-md:max-w-full">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.
            </p>
            <div className="flex gap-5 justify-between self-start mt-10 ml-8 text-sm font-semibold leading-5 text-right uppercase text-zinc-900 max-md:mt-10 max-md:ml-2.5">
              <Button variant="light"><Link to="/signup">Find Your Mentor</Link></Button>
              <Button variant="primary"><Link to="/mentorApply">Become a Mentor</Link></Button>
            </div>
            <p className="mt-20 text-lg leading-8 text-white max-md:mt-10 max-md:max-w-full">
              Trusted by 50k+ users
            </p>
            <Rating rating={4.1} reviews={14000} />
          </div>
        </section>
        <section className="flex w-[41%] max-md:ml-0 max-md:w-full justify-end">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4ce03bfddcd52be1e295622ca93eefb017fd6eff116db2e896362bdb15aa66f?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
            alt="Login illustration"
            className="grow w-full aspect-[0.75] max-md:mt-9 max-md:max-w-full"
          />
        </section>
      </div>
    </main>
  );
};

export default MentorConnect;
