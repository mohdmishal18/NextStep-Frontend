
// import { inputProps } from "../../Types/utils";

import SignupInputField from "../common/SignupInputField";
// const InputField: React.FC<inputProps> = ({
//   label,
//   placeholder,
//   type = "text",
// }) => (
//   <>
//     <label className="mt-3.5 text-xs text-zinc-200 max-md:max-w-full">
//       {label}
//     </label>
//     <input
//       type={type}
//       placeholder={placeholder}
//       className="px-6 py-3 mt-2.5 border border-solid border-slate-700 leading-[162.5%] rounded-[35px]  text-white bg-primary max-md:px-5 max-md:max-w-full w-full"
//     />
//   </>
// );

const SignUpForm = () => {

  return (
    <form className="flex flex-col grow px-5 text-base leading-6 max-md:mt-10 max-md:max-w-full mt-10">
      <h1 className="flex gap-5 text-5xl font-medium tracking-tighter leading-[62px] max-md:flex-wrap max-md:text-4xl">
        <span className="grow text-white max-md:text-4xl">Login to your</span>
        <span className="flex-auto text-blue max-md:text-4xl">Next Step!</span>
      </h1>
      <button className="flex justify-center items-center p-4 mt-11 font-semibold tracking-normal leading-7 text-right bg-slate-800 rounded-[35px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fde9b1bb924442aad0475359f42cf301a57185969732205b7dafd0b05a712070?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
            alt="Google logo"
            className="shrink-0 my-auto aspect-square w-[23px]"
          />
          <span className="text-white">Sign in with Google</span>
        </div>
      </button>
      <SignupInputField label="First & Last Name" placeholder="i.e. Davon Lean" />
      <SignupInputField
        label="Email Address"
        placeholder="i.e. davon@mail.com"
        type="email"
      />
      <SignupInputField label="Mobile" placeholder="9947865508" type="tel" />
      <SignupInputField label="Password" placeholder="**********" type="password" />
      <SignupInputField
        label="Confirm Password"
        placeholder="**********"
        type="password"
      />
      <button className="flex justify-center items-center px-4 py-2.5 mt-5 max-w-full font-semibold tracking-normal leading-7 text-center text-white whitespace-nowrap bg-blue rounded-[50px] w-[207px] max-md:px-5">
        <div className="flex gap-2.5 justify-center">
          <span>Next</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5124122de3351c22701703bff9f8f999e60c7f0169cd7cc189ab119457c0bf4c?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
            alt=""
            className="shrink-0 my-auto aspect-square w-[18px]"
          />
        </div>
      </button>
      <p className="mt-5 text-sm text-blue max-md:max-w-full">
        Already have an account?{" "}
        <a href="#" className="font-semibold text-blue-600">
          Log in to your account.
        </a>
      </p>
    </form>
  );
};

export default SignUpForm;
