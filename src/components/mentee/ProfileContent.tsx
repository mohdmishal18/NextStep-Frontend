import React from "react";
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
                <span className="flex-auto my-auto text-xl text-white">
                  My Profile
                </span>
              </button>
              {/* <div className="flex flex-col px-7 mt-3.5 max-md:px-5">
                <button className="flex gap-2.5 text-xl text-white">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bfc6d69efaa4377e131e4e38408633a3a9bf1a54237203f2f4afeed86cd446f?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                    alt=""
                    className="shrink-0 aspect-square w-[30px]"
                  />
                  <span className="flex-auto">My Posts</span>
                </button>
                <button className="flex gap-3.5 self-start mt-7 ml-3.5 max-md:ml-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dafe8f53e6b139e71a055b0f763327ab5f0859266295636abe1a742321d155dd?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                    alt=""
                    className="w-[27px] aspect-[0.93]"
                  />
                  <span className="flex-auto self-start text-xl text-white">
                    Notifications
                  </span>
                </button>
                <button className="flex gap-3 mt-6 text-xl text-white whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec2fb9aafeceddb31e755fca508551d32fc76447dec7655fe3e125a0c2e78a39?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                    alt=""
                    className="shrink-0 aspect-square w-[30px]"
                  />
                  <span className="flex-auto my-auto">Billing</span>
                </button>
              </div> */}
            </div>
            <button className="flex gap-3.5 mx-5 mt-4 max-md:mx-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/47fb58eff1844c667e917434fcbeef6de1f3e3a17dfc7265b162f8201c89fd4d?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                alt=""
                className="w-[27px] aspect-square"
              />
              <span className="flex-auto my-auto text-xl text-white">
                Delete Account
              </span>
            </button>
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
