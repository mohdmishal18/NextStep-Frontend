import React from "react"

import { inputProps } from "../../Types/utils"

const SignupInputField: React.FC<inputProps> = ({
    label,
    placeholder,
    type = "text",
  }) => (
    <>
      <label className="mt-3.5 text-xs text-zinc-200 max-md:max-w-full">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="px-6 py-3 mt-2.5 border border-solid border-slate-700 leading-[162.5%] rounded-[35px]  text-white bg-primary max-md:px-5 max-md:max-w-full w-full"
      />
    </>
  );

export default SignupInputField