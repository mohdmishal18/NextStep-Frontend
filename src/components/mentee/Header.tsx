import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store/store';
import { MenteeProfile } from '../../Types/menteeTypes';

const Header: React.FC = () => {
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  )

  return (
    <header className="flex gap-5 justify-end self-center w-full max-w-[1016px] max-md:flex-wrap max-md:max-w-full">
      <div className="flex gap-3 items-center px-4 py-4 my-auto text-lg font-light text-sky-50 rounded-3xl bg-zinc-800 w-full max-w-[400px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f66787eff6ba848544e4cc595e050d82742c8d82db9d21ecd5a84c38164a18?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
          alt=""
          className="shrink-0 aspect-[1.04] w-[26px]"
        />
        <input
          type="text"
          placeholder="Search here ..."
          className="flex-grow bg-transparent border-none outline-none text-white"
        />
      </div>
      <div className="flex gap-5 justify-between items-center">
        <button className="flex justify-center items-center self-stretch px-3 py-2 my-auto rounded-xl bg-zinc-800">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c32ac65b452d162f04d5d8c16eced9e63ba5d92fdc142c60b63b980b202a0a5d?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
            alt="Notification"
            className="aspect-[1.04] w-[25px]"
          />
        </button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/88f153ecdb718c61d0ee05962db712793e3838452dd132d92b7445251d57e31d?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
          alt="User avatar"
          className="shrink-0 self-stretch my-auto w-11 rounded-xl aspect-square"
        />
        <div className="flex flex-col justify-center self-stretch px-4 py-3 max-md:pr-5">
          <div className="flex gap-3">
            <div className="flex overflow-hidden relative flex-col justify-end items-start px-7 pt-7 w-10 aspect-square rounded-[200px]">
              <img
                loading="lazy"
                src={mentee?.profilePicture || "/placeeHolderProfile.jpg"}
                alt=""
                className="object-cover absolute inset-0 size-full"
              />
              <div className="relative shrink-0 bg-emerald-500 rounded-md border-2 border-white border-solid h-[11px]" />
            </div>
            <div className="flex flex-col flex-1 text-sm text-sky-50">
              <div className="font-light">{mentee?.name}</div>
              <div className="font-extralight">{mentee?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
