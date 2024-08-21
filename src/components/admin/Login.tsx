// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../store/slices/adminAuthSlice";
// import { googleAuthLogin } from "../../api/admin";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { signIn } from "../../api/admin";
import SignupInputField from "../common/SignupInputField";

// interface CredentialPayload extends JwtPayload {
//   iss: string;
//   azp: string;
//   aud: string;
//   sub: string;
//   email: string;
//   email_verified: boolean;
//   exp: number;
//   family_name: string;
//   given_name: string;
//   iat: number;
//   jti: string;
//   name: string;
//   nbf: number;
//   picture: string;
// }

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        response.data.message == "Login Successfull" &&
        response.data.status
      ) {
        dispatch(adminLogin());
        navigate("/admin")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response?.data.message == "incorrect password") {
        } else if (error.response?.data.message == "invalid email") {
        }
      }
    }
  };

  // const googleLogin = async (response: CredentialResponse) => {
  //   try {
  //     const credentails: CredentialPayload = jwtDecode(
  //       response.credential as string
  //     );
  //     const googleLoginResponse = await googleAuthLogin(
  //       credentails.name,
  //       credentails.email,
  //       credentails.picture
  //     );
  //     if (
  //       googleLoginResponse.data.message == "google Login succesfull" &&
  //       googleLoginResponse.data.status
  //     ) {
  //       console.log(googleLoginResponse);

  //       dispatch(adminLogin(googleLoginResponse.data.loginUser));
  //       navigate("/mentee");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       if (!error.response?.data.status) {
  //         toast.error(error.response?.data.message);
  //       }
  //     }
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-2 text-base text-white max-md:mt-10 max-md:max-w-full">
        <h1 className="text-5xl font-semibold tracking-tighter leading-[61.88px] max-md:max-w-full max-md:text-4xl">
          Log in as <span className="text-blue">ADMIN</span>.
        </h1>
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
          <div className="flex space-x-6 mt-8 items-center">
            <button
              type="submit"
              className="px-4 py-3.5 max-w-full font-semibold tracking-normal leading-7 text-center bg-blue rounded-[50px] w-[175px] max-md:px-5"
            >
              Log In
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
                onSuccess={googleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              </div>
              <button className="flex justify-center items-center p-4 font-semibold tracking-normal leading-7 text-right bg-slate-800 rounded-[35px] max-md:px-5">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
