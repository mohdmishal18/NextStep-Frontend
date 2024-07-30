import React from 'react';

type InputFieldProps = {
  label: string;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, placeholder }) => (
  <div className="flex flex-col flex-1 rounded-[35px] max-md:max-w-full">
    <label className="text-sm leading-5 text-zinc-200 max-md:max-w-full">{label}</label>
    <input
      className="px-6 py-4 mt-2.5 text-base leading-7 border border-solid border-slate-700 rounded-[35px] text-slate-400 max-md:px-5 max-md:max-w-full"
      placeholder={placeholder}
    />
  </div>
);

const MentorApply: React.FC = () => {
  return (
    <main className="flex justify-center items-center px-16 py-20 w-full bg-zinc-900 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center mb-4 w-full max-w-[1033px] max-md:max-w-full">
        <h1 className="text-5xl font-semibold tracking-tighter text-white leading-[61.88px] max-md:max-w-full max-md:text-4xl">
          Apply for Mentor role
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-400 max-md:max-w-full">
          Clarity gives you the blocks and components you need to create a truly professional website.
        </p>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/53a596cfd78f6e371accc0814874167415ed551d0b6d607f3599f966b836052e?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
          alt="Mentor Profile"
          className="mt-12 max-w-full rounded-full border-solid aspect-square border-[5px] border-zinc-900 w-[180px] max-md:mt-10"
        />
        <form className="w-full">
          <div className="flex gap-5 items-start self-stretch mt-4 max-md:flex-wrap max-md:max-w-full">
            <InputField label="Full Name" placeholder="i.e. Davon Lean" />
            <InputField label="email address" placeholder="i.e. davon@example.com" />
          </div>
          <div className="flex gap-5 items-start self-stretch mt-1 max-md:flex-wrap max-md:max-w-full">
            <InputField label="Linkedin URL" placeholder="i.e. linkedin.com/in/davonlean" />
            <InputField label="Qualification" placeholder="i.e. Master's in Computer Science" />
          </div>
          <div className="self-stretch mt-1 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow text-sm leading-5 text-zinc-200 max-md:mt-10 max-md:max-w-full">
                  <InputField label="job role" placeholder="Enter your job role" />
                  <InputField label="password" placeholder="Enter your password" />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow text-sm leading-5 text-zinc-200 max-md:mt-10 max-md:max-w-full">
                  <InputField label="company" placeholder="Enter your company" />
                  <InputField label="confirm password" placeholder="Confirm your password" />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-10 text-sm leading-6 text-blue-600">
            Already a mentor? <a href="#" className="font-semibold text-blue-600">Log in to your account.</a>
          </p>
          <button type="submit" className="px-4 py-2.5 mt-6 max-w-full text-base font-semibold tracking-normal leading-7 text-center text-white whitespace-nowrap bg-blue-600 rounded-[50px] w-[207px] max-md:px-5">
            Apply
          </button>
        </form>
      </div>
    </main>
  );
};

export default MentorApply;