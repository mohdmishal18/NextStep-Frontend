import React from "react";
import { inputProps } from "../../Types/utils";

interface SignupInputFieldProps extends inputProps {
  register: any;
  error?: any;
}

const SignupInputField: React.FC<SignupInputFieldProps> = ({
  label,
  placeholder,
  onChange,
  type = "text",
  register,
  error,
}) => (
  <>
    <label className="mt-3.5 text-xs text-zinc-200 max-md:max-w-full">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="px-6 py-3 mt-2.5 border border-solid border-slate-700 leading-[162.5%] rounded-[35px] text-white bg-primary max-md:px-5 max-md:max-w-full w-full"
      {...register}
    />
    {error && <p className="text-red-600 mt-1">{error.message}</p>}
  </>
);

export default SignupInputField;
