import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axios from "axios";

// Redux
import { menteeSignup, googleAuthRegister } from "../../api/mentee";
import SignupInputField from "../common/SignupInputField";
import { signUpData } from "../../Types/menteeTypes";
import { menteeLogin } from "../../store/slices/menteeAuthSlice";

interface CredentialPayload extends JwtPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<signUpData>();

  const password = watch("password");

  const validateConfirmPassword = (
    value: string | undefined
  ): true | string => {
    if (!value) return "Password confirmation is required";
    if (value !== password) return "Passwords do not match";
    return true;
  };

  const validateMobileNumber = (value: string | undefined): true | string => {
    if (!value) return "Mobile number is required";
    const phoneNumber = parseInt(value, 10);
    if (isNaN(phoneNumber)) return "Mobile number must be numeric";
    if (value.length !== 10) return "Mobile number must be exactly 10 digits";
    return true;
  };

  // goggleregister
  const googleRegister = async (response: CredentialResponse) => {
    try {
      const credentails: CredentialPayload = jwtDecode(
        response.credential as string
      );
      const googleRegisterResponse = await googleAuthRegister(
        credentails.name,
        credentails.email,
        credentails.picture
      );
      if (
        googleRegisterResponse.data.message == "google register succesfull" &&
        googleRegisterResponse.data.status
      ) {
        console.log(googleRegisterResponse);

        dispatch(menteeLogin(googleRegisterResponse.data.newUser));
        navigate("/mentee");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.status) {
          toast.error(error.response?.data.message);
        }
      }
    }
  };

  const onSubmit: SubmitHandler<signUpData> = async (data: signUpData) => {
    try {
      const response = await menteeSignup(data);
      if (
        response.data.message === "User created and OTP sent successfully" &&
        response.data.status
      ) {
        localStorage.setItem("otpTimer", "60");
        localStorage.setItem("otpEmail", response.data.email);
        navigate("/verifyOtp");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "An unexpected error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      className="flex flex-col grow px-5 text-base leading-6 max-md:mt-10 max-md:max-w-full mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="flex gap-5 text-5xl font-medium tracking-tighter leading-[62px] max-md:flex-wrap max-md:text-4xl">
        <span className="grow text-white max-md:text-4xl">Sign to your</span>
        <span className="flex-auto text-blue max-md:text-4xl">Next Step!</span>
      </h1>
      {/* <button className="flex justify-center items-center p-4 mt-11 font-semibold tracking-normal leading-7 text-right bg-slate-800 rounded-[35px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fde9b1bb924442aad0475359f42cf301a57185969732205b7dafd0b05a712070?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
            alt="Google logo"
            className="shrink-0 my-auto aspect-square w-[23px]"
          />
          <span className="text-white">Sign in with Google</span>
        </div>
      </button> */}
      <SignupInputField
        label="First & Last Name"
        placeholder="i.e. Davon Lean"
        register={register("name", { required: "Name is required" })}
        error={errors.name}
        onChange={(e) => setValue("name", e.target.value.trim())}
      />
      <SignupInputField
        label="Email Address"
        placeholder="i.e. davon@mail.com"
        type="email"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter a valid email address",
          },
        })}
        error={errors.email}
        onChange={(e) => setValue("email", e.target.value.trim())}
      />
      <SignupInputField
        label="Mobile"
        placeholder="9947865508"
        type="tel"
        register={register("phone", {
          required: "Mobile number is required",
          validate: validateMobileNumber,
        })}
        error={errors.phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue("phone", e.target.value.trim())
        }
      />
      <SignupInputField
        label="Password"
        placeholder="**********"
        type={showPassword ? "text" : "password"}
        register={register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
            message:
              "Password must contain at least one uppercase letter and one special character",
          },
        })}
        error={errors.password}
        icon={
          showPassword ? (
            <FaEye onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} />
          )
        }
      />
      <SignupInputField
        label="Confirm Password"
        placeholder="**********"
        type={showConfirmPassword ? "text" : "password"}
        register={register("confirmPassword", {
          required: "Confirm password is required",
          validate: validateConfirmPassword,
        })}
        error={errors.confirmPassword}
        icon={
          showConfirmPassword ? (
            <FaEye
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          ) : (
            <RiEyeCloseFill
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )
        }
      />
      <div className="flex justify-center items-center gap-4">
        {" "}
        {/* Wrapper div with flex layout */}
        <button className="flex justify-center items-center px-4 py-2.5 mt-5 max-w-full font-semibold tracking-normal leading-7 text-center text-white whitespace-nowrap bg-blue rounded-[50px] w-[207px] max-md:px-5">
          <div className="flex gap-2.5 justify-center">Next</div>
        </button>
        {/* <div className="relative flex justify-center items-center">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1px",
              height: "1px",
              overflow: "hidden",
              opacity: 0,
              pointerEvents: "auto",
            }}
          >
            <GoogleLogin
              onSuccess={googleRegister}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <button className="flex mt-6 justify-center items-center p-3 font-semibold tracking-normal leading-7 text-right bg-slate-800 rounded-[35px] max-md:px-5">
            <div className="flex gap-3.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fde9b1bb924442aad0475359f42cf301a57185969732205b7dafd0b05a712070?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                alt="Google logo"
                className="shrink-0 my-auto aspect-square w-[23px]"
              />
              <span className="text-white">Continue with Google</span>
            </div>
          </button>
        </div> */}
        <div className="mt-4">
          <GoogleLogin
            onSuccess={googleRegister}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
      <p className="mt-5 text-sm text-blue max-md:max-w-full">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          Log in to your account.
        </Link>
      </p>
      <p className="mt-5 text-sm text-blue max-md:max-w-full">
        Want to be a Mentor ?{" "}
        <Link to="/mentorApply" className="font-semibold text-blue-600">
          SignUp as mentor
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
