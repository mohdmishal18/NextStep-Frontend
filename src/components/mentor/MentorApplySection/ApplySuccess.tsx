
import ConfettiExplosion from 'react-confetti-explosion';

const ApplySuccess = () => {
  return (
    <main className="relative flex flex-col justify-center items-center px-16 py-20 w-full h-screen bg-primary max-md:px-5 max-md:max-w-full">
      {/* Confetti Explosion */}
      <ConfettiExplosion
        force={0.8}
        duration={3000}
        particleCount={200}
        width={1600}
      />

      <div className="bg-white text-primary max-w-md w-full p-8 rounded-lg shadow-lg mb-40 flex flex-col items-center z-10">
        <h2 className="text-2xl font-bold mb-4">Application Successful!</h2>
        <p className="text-center mb-6">
          We are going through your application. It will take 3-5 business days to review. 
          We will notify you via email about the status of your application.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-lg">
          Back to Home
        </button>
      </div>
    </main>
  );
}

export default ApplySuccess;






{/* <div className="flex flex-col items-center mb-8 w-full max-w-[1033px] max-md:max-w-full">
        <h1 className="text-5xl font-semibold tracking-tighter text-white leading-[61.88px] max-md:max-w-full max-md:text-4xl text-center">
          Apply for Mentor Role
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-400 max-md:max-w-full text-center">
          Clarity gives you the blocks and components you need to create a truly professional website.
        </p>
      </div> */}