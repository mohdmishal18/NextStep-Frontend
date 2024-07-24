import React from 'react'

//components
import Navbar from '../../components/common/Navbar'
import LoginForm from '../../components/mentee/LoginForm'
import Footer from '../../components/common/Footer'

const Login: React.FC = () => {
    return (
        <div className="flex flex-col bg-white">
          <Navbar />
          <main className="flex justify-center items-center px-16 py-20 w-full bg-zinc-900 max-md:px-5 max-md:max-w-full">
            <div className="mt-20 mb-28 w-full max-w-[1078px] max-md:my-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <LoginForm />
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4ce03bfddcd52be1e295622ca93eefb017fd6eff116db2e896362bdb15aa66f?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="Login illustration" className="grow w-full aspect-[0.75] max-md:mt-9 max-md:max-w-full" />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
}

export default Login