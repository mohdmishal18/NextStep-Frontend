import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { menteeLogin } from "../../store/slices/menteeAuthSlice";
import { verifyOtp,resendOtp } from "../../api/mentee";
const Otp: React.FC = () => {
  const email = localStorage.getItem('otpEmail')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  const otpInputRef = useRef<HTMLInputElement[]>([]);
  // const [otpFieldErr, setOtpFieldErr] = useState(false);
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const [timer, setTimer] = useState(() => {
    let timer = localStorage.getItem("otpTimer");
    return timer ? parseInt(timer) : 60;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) {
          const updateTime = prevTime - 1;
          localStorage.setItem("otpTimer", JSON.stringify(updateTime));
          return updateTime;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Format OTP timer
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handling OTP input value
  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setOtp((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value && index < 5) {
      otpInputRef.current[index + 1].focus();
    }
  };

  // Handling OTP input value when enter backspace
  const handleInputKeyUp = (  
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0) {
      otpInputRef.current[index - 1].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp(email as string);
      if (response?.status) {
        setTimer(60);
        localStorage.setItem("otpTimer", "60");
      }
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (
        otp.otp1 === "" ||
        otp.otp2 === "" ||
        otp.otp3 === "" ||
        otp.otp4 === "" ||
        otp.otp5 === "" ||
        otp.otp6 === ""
      ) {
        // setOtpFieldErr(true);
        return null;
      }

      // otp converting object to string
      let array = Object.values(otp);
      let value: string = "";
      array.forEach((val) => {
        value += val;
      });

      let response = await verifyOtp(Number(value), email as string);
      console.log("res from otp varificaiton ,", response);

      if (response?.data.OtpVerfication === "OTP verified successfully") {
        dispatch(menteeLogin(response.data.user));
        navigate("/profile");
        localStorage.removeItem('otpEmail')
        localStorage.removeItem('otpTimer')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.status) {
          // setError(error.response?.data.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col bg-white">
      <main className="flex justify-center items-center px-16 py-20 w-full text-center bg-zinc-900 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-10 mb-24 max-w-full w-[396px] max-md:my-10">
          <h1 className="text-3xl font-light text-sky-50">
            Enter authentication code
          </h1>
          <p className="mt-6 text-xl leading-6 text-sky-50">
            Enter the 6-digit code that we have sent via the email{" "}
            <span className="text-blue font-semibold">{email}</span>
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex gap-4 pr-7 mt-8 text-base leading-4 whitespace-nowrap text-neutral-950 max-md:pr-5">
              {Object.keys(otp).map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center rounded-md w-14 h-14"
                >
                  <input
                    name={value}
                    type="text"
                    pattern="/d*"
                    maxLength={1}
                    className="w-full h-full bg-[#333333] text-white border-none rounded-md text-center text-2xl focus:outline-none focus:shadow-lg focus:shadow-blue-500"
                    aria-label={`Digit ${index + 1} of authentication code`}
                    onChange={(e) => handleInputValue(e, index)}
                    ref={(element) => {
                      if (element) otpInputRef.current[index] = element;
                    }}
                    onKeyUp={(e) => handleInputKeyUp(e, index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col pr-12 pl-5 mt-8 font-medium max-md:pr-5 max-md:mt-10">
              <button
                onClick={handleSubmit}
                className="px-16 py-6 text-base leading-4 text-white whitespace-nowrap bg-blue rounded-[48px] max-md:px-5"
              >
                Submit
              </button>
              <div className="flex items-center space-x-4 mt-9 ml-8">
                <button
                  className={`rounded-[48px] text-xl p-4 leading-4 text-white ${
                    timer === 0
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                  onClick={
                    timer === 0 ? handleResendOtp : (e) => e.preventDefault()
                  }
                  style={{ pointerEvents: timer === 0 ? "auto" : "none" }}
                >
                  Resend code
                </button>
                <div className="text-xl font-bold text-red-500">
                  in  {formatTime(timer)}s
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Otp;
