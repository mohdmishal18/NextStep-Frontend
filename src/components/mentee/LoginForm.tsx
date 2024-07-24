import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-2 text-base text-white max-md:mt-10 max-md:max-w-full">
        <h1 className="text-5xl font-semibold tracking-tighter leading-[61.88px] max-md:max-w-full max-md:text-4xl">
          Log in to your account.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400 max-md:max-w-full">
          Clarity gives you the blocks and components you need to create a truly professional website.
        </p>
        <button className="flex justify-center items-center p-4 mt-11 font-semibold tracking-normal leading-7 text-right bg-slate-800 rounded-[35px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-3.5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fde9b1bb924442aad0475359f42cf301a57185969732205b7dafd0b05a712070?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="Google logo" className="shrink-0 my-auto aspect-square w-[23px]" />
            <span>Sign in with Google</span>
          </div>
        </button>
        <form>
          <label htmlFor="email" className="mt-11 text-sm leading-5 text-zinc-200 max-md:mt-10 max-md:max-w-full">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="i.e. davon@mail.com"
            className="px-6 py-4 mt-2.5 w-full border border-solid border-slate-700 leading-[162.5%] rounded-[35px] text-slate-400 max-md:px-5 max-md:max-w-full"
          />
          <label htmlFor="password" className="mt-6 text-sm leading-5 text-zinc-200 max-md:max-w-full">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="**********"
            className="px-6 pt-6 pb-3 mt-2.5 w-full whitespace-nowrap border border-solid border-slate-700 leading-[162.5%] rounded-[35px] text-slate-400 max-md:px-5 max-md:max-w-full"
          />
          <div className="flex gap-2.5 self-start mt-7 text-sm leading-5">
            <input type="checkbox" id="remember" className="shrink-0 rounded-md border border-solid border-slate-700 h-[19px] w-[19px]" />
            <label htmlFor="remember" className="flex-auto my-auto">Remember me</label>
          </div>
          <button type="submit" className="px-4 py-3.5 mt-8 max-w-full font-semibold tracking-normal leading-7 text-center bg-blue-600 rounded-[50px] w-[175px] max-md:px-5">
            Log In
          </button>
        </form>
        <p className="mt-6 text-sm leading-6 text-blue-600 max-md:max-w-full">
          Don't have an account?{" "}
          <a href="#" className="font-semibold text-blue-600">Create free account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;