import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import Interests from "./Interests";
const ProfileContent: React.FC = () => {
  return (
    <main className="mt-20 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <nav className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-3.5">
            <h1 className="text-4xl text-white">Profile</h1>
            <div className="flex flex-col pt-px pb-2 mt-11 w-full bg-zinc-900 max-md:mt-10">
              <button className="flex gap-1 px-4 py-2 bg-blue-600 rounded-xl">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/064562b678857e97aa1891a2da4b4379e06ed063d99ab2648e83ce1c3940753d?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                  alt=""
                  className="aspect-square w-[30px]"
                />
                <Link to="/mentee/account" className="flex-auto text-white text-xl">
                    My Profile
                  </Link>
              </button>
              <div className="flex flex-col px-7 mt-3.5 max-md:px-5">
                <button className="flex gap-2.5 text-xl text-white">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bfc6d69efaa4377e131e4e38408633a3a9bf1a54237203f2f4afeed86cd446f?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                    alt=""
                    className="shrink-0 aspect-square w-[30px]"
                  />
                  {/* <span className="flex-auto">My Posts</span> */}
                  <Link to="/mentee/account/myposts" className="flex-auto text-white">
                    My Posts
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex flex-col mr-3 w-[78%] max-md:ml-0 max-md:w-full overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;
