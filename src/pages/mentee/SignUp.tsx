import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SignUpForm from "../../components/mentee/SignupForm";

const SignUp = () => {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col pb-20 w-full bg-zinc-900 max-md:max-w-full">
        <Navbar />
        <main className="self-center mt-16 mb-8 w-full max-w-[1153px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c04728e65d65cab345439079bc469e065efc396947fb1819c554de7afb49c1eb?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                alt="Illustration"
                className="mt-9 w-full aspect-[0.75] max-md:hidden max-md:max-w-full"
              />
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <SignUpForm />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
