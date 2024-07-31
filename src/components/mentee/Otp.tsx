import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { menteeLogin } from "../../store/slices/menteeAuthSlice";
import axios from "axios";
import { verifyOtp } from "../../api/mentee";

const Otp: React.FC = () => {
  
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
    otp6: ""
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

      let response = await verifyOtp(Number(value));

      if (response.data.message === "OTP verified successfully") {
        dispatch(menteeLogin(response.data.user));
        navigate("/profile");
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
            Enter the 6-digit code that we have sent via the
            email <span className="text-blue font-semibold">mohdmishal18@gmail.com</span>
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
            <div className="mb-4 text-xl font-bold text-red-500">
              Time left: {formatTime(timer)}s
            </div>
            <button onClick={handleSubmit} className="px-16 py-6 text-base leading-4 text-white whitespace-nowrap bg-blue rounded-[48px] max-md:px-5">
              Submit
            </button>
            <button className="self-center mt-9 text-2xl leading-4 text-indigo-500">
              Resend code
            </button>
          </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Otp;
