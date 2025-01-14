import React from "react";
import { rootState } from "../../store/store";
import { useSelector } from "react-redux";
import { MenteeProfile } from "../../Types/menteeTypes";

const Dashboard: React.FC = () => {
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  return (
    <main className="flex overflow-hidden flex-col items-center self-center px-6 pt-10 mt-6 w-full max-w-[993px] max-md:px-5 max-md:max-w-full">
      <h1 className="text-5xl font-light leading-none text-blue-700 max-md:max-w-full max-md:text-4xl">
        Welcome, {mentee?.name}!
      </h1>
      <p className="self-stretch mt-9 mr-16 ml-12 text-3xl leading-none text-gray-800 max-md:mr-2.5 max-md:max-w-full">
        Start connecting with mentors and get ready to take your{" "}
      </p>
      <p className="mt-2.5 text-3xl leading-none text-gray-800">
        career to the next level!
      </p>
      <button className="px-9 py-6 mt-7 text-2xl font-light leading-none text-white bg-blue rounded-2xl max-md:px-5">
        Browse Mentors
      </button>
    </main>
  );
};

export default Dashboard;
