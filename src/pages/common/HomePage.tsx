import MentorConnect from "../../components/common/HomePage/MentorConnect";
import CompanyList from "../../components/common/HomePage/CompanyList";
import Footer from "../../components/common/Footer";
import Benefits from "../../components/common/HomePage/Benefits";
import FaqSection from "../../components/common/HomePage/FaqSection";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col bg-white">
        <main className="flex justify-center items-center px-16 py-20 w-full bg-zinc-900 max-md:px-5 max-md:max-w-full">
          <div className="mt-20 mb-28 w-full max-w-[1078px] max-md:my-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <MentorConnect />
            </div>
            <div className="mt-40">
              <CompanyList />
            </div>
            <div className="mt-40">
              <Benefits />
            </div>
            <div className="mt-40 flex justify-center">
              <FaqSection />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
