import React from "react";
import { inputProps } from "../../Types/utils";

interface SignupInputFieldProps extends inputProps {
  register: any;
  error?: any;
  icon?: React.ReactNode; // Optional prop for adding an icon
}

const SignupInputField: React.FC<SignupInputFieldProps> = ({
  label,
  placeholder,
  onChange,
  type = "text",
  register,
  error,
  icon,
}) => (
  <div className="relative">
    <label className="mt-3.5 text-xs text-zinc-200 max-md:max-w-full">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={`px-6 py-3 mt-2.5 border border-solid border-slate-700 leading-[162.5%] rounded-[35px] text-white bg-primary max-md:px-5 max-md:max-w-full w-full ${
          error ? "pr-12" : "pr-10"
        }`} // Adjust padding-right if error is present
        {...register}
      />
      {icon && (
        <div className="absolute inset-y-0 right-3 flex mt-2 items-center cursor-pointer text-white text-2xl">
          {icon}
        </div>
      )}
    </div>
    {error && <p className="text-red-600 mt-1">{error.message}</p>}
  </div>
);

export default SignupInputField;
