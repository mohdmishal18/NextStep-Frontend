import MentorConnect from "../../components/common/HomePage/MentorConnect";
import Footer from "../../components/common/Footer";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col bg-white">
        <main className="flex justify-center items-center px-16 py-20 w-full bg-zinc-900 max-md:px-5 max-md:max-w-full">
          <div className="mt-20 mb-28 w-full max-w-[1078px] max-md:my-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <MentorConnect />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
