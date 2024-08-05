import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { menteeLogin } from "../../store/slices/menteeAuthSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import axios from "axios";

import { signIn } from "../../api/mentee";

// Assuming SignupInputField is located in `../common/SignupInputField`
import SignupInputField from "../common/SignupInputField";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"mentee" | "mentor">("mentee");

  const [error, setError] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Handling OnSubmit
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await signIn(data.email, data.password);
      if (
        response.data.message == "Login Succesfully" &&
        response.data.status
      ) {
        dispatch(menteeLogin(response.data.user));
        navigate("/mentee/account");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response?.data.otpVerified == "false") {
          localStorage.setItem("otpTimer", "60");
          navigate("/verifyOtp");
        } else if (error.response?.data.message == "incorrect password") {
          setError({
            emailErr: "",
            passwordErr: "Incorrect password",
          });
        } else if (error.response?.data.message == "this user is blocked ") {
          toast.error("This user is blocked");
        } else {
          setError({
            emailErr: "invalid email user not found",
            passwordErr: "",
          });
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-2 text-base text-white max-md:mt-10 max-md:max-w-full">
        {/* Toggle Bar */}
        <div className="flex justify-between mb-6 text-lg font-semibold text-gray-300">
          <button
            className={`flex-1 py-2 ${
              role === "mentee"
                ? "bg-blue text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setRole("mentee")}
          >
            I'm a Mentee
          </button>
          <button
            className={`flex-1 py-2 ${
              role === "mentor"
                ? "bg-blue text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setRole("mentor")}
          >
            I'm a Mentor
          </button>
        </div>
        <h1 className="text-5xl font-semibold tracking-tighter leading-[61.88px] max-md:max-w-full max-md:text-4xl">
          Log in to your account.
        </h1>
        <button className="flex justify-center items-center p-4 mt-11 font-semibold tracking-normal leading-7 text-right bg-slate-800 rounded-[35px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-3.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fde9b1bb924442aad0475359f42cf301a57185969732205b7dafd0b05a712070?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
              alt="Google logo"
              className="shrink-0 my-auto aspect-square w-[23px]"
            />
            <span>Sign in with Google</span>
          </div>
        </button>
        <form className="flex flex-col mt-10" onSubmit={handleSubmit(onSubmit)}>
          <SignupInputField
            label="Email Address"
            placeholder="i.e. davon@mail.com"
            type="email"
            {...register("email", {
              required: "Email field is required",
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            onChange={(e) => setValue("email", e.target.value.trim())}
          />
          {errors.email?.type == "required" && (
            <h1 className="text-red-600">{errors.email.message}</h1>
          )}
          {!errors.email && error.emailErr && (
            <h1 className="text-red-600">{error.emailErr}</h1>
          )}

          <SignupInputField
            label="Password"
            placeholder="**********"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "password is required",
            })}
            icon={
              showPassword ? (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <RiEyeCloseFill
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
            onChange={(e) => setValue("password", e.target.value.trim())}
          />
           {errors.password?.type === "required" && (
              <h1 className="text-red-600 mt-2">{errors.password.message}</h1>
            )}
            {error.passwordErr && errors.password?.type != "required" && (
              <h1 className="text-red-600 mt-2">{error.passwordErr}</h1>
            )}
          <button
            type="submit"
            className="px-4 py-3.5 mt-8 max-w-full font-semibold tracking-normal leading-7 text-center bg-blue rounded-[50px] w-[175px] max-md:px-5"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-sm leading-6 text-blue max-md:max-w-full">
          Don't have an account?{" "}
          <a href="#" className="font-semibold text-blue">
            Create free account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
