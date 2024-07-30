import React, { useEffect, useState } from "react";

const Otp: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          <div className="flex gap-4 pr-7 mt-8 text-base leading-4 whitespace-nowrap text-neutral-950 max-md:pr-5">
          {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col justify-center rounded-md w-14 h-14"
              >
                <input
                  type="text"
                  maxLength={1}
                  className="w-full h-full bg-[#333333] text-white border-none rounded-md text-center text-2xl focus:outline-none focus:shadow-lg focus:shadow-blue-500"
                  aria-label={`Digit ${index + 1} of authentication code`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col pr-12 pl-5 mt-8 font-medium max-md:pr-5 max-md:mt-10">
            <div className="mb-4 text-xl font-bold text-red-500">
              Time left: {timeLeft}s
            </div>
            <button className="px-16 py-6 text-base leading-4 text-white whitespace-nowrap bg-blue rounded-[48px] max-md:px-5">
              Submit
            </button>
            <button className="self-center mt-9 text-2xl leading-4 text-indigo-500">
              Resend code
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Otp;
