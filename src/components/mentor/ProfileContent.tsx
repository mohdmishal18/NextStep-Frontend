import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
// import Interests from "./Interests";
const ProfileContent: React.FC = () => {
  return (
    <main className="mt-20 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <nav className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-3.5">
            <h1 className="text-4xl text-white">Profile</h1>
            <div className="flex flex-col pt-px pb-2 mt-11 w-full bg-zinc-900 max-md:mt-10">
              <Link to={'/mentor/account'} className="flex gap-1 px-4 py-2 bg-blue-600 rounded-xl">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/064562b678857e97aa1891a2da4b4379e06ed063d99ab2648e83ce1c3940753d?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                  alt=""
                  className="aspect-square w-[30px]"
                />
                <span className="flex-auto my-auto text-xl text-white">
                  My Profile
                </span>
              </Link>
                <Link to={'/mentor/account/Session&Subscription'} className="flex gap-1 text-xl px-4 py-2 text-white">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bfc6d69efaa4377e131e4e38408633a3a9bf1a54237203f2f4afeed86cd446f?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                    alt=""
                    className="shrink-0 aspect-square w-[30px]"
                  />
                  <span className="flex-auto">My Sybscriptions</span>
                </Link>
                <Link to={'/mentor/account/MyBlogs'} className="flex gap-1 text-xl px-4 py-2 text-white">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec2fb9aafeceddb31e755fca508551d32fc76447dec7655fe3e125a0c2e78a39?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                    alt=""
                    className="shrink-0 aspect-square w-[30px]"
                  />
                  <span className="flex-auto">My Blogs</span>
                </Link>
            </div>
          </div>
        </nav>
        <div className="flex flex-col mr-3 w-[78%] max-md:ml-0 max-md:w-full">
          <Outlet/>
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;
