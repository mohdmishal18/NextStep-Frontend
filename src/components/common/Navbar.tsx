

const Navbar = () => {
  return (
    <header className="flex z-10 gap-5 justify-between items-center px-20 py-3.5 w-full text-base font-medium bg-zinc-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/125182179e8d064f6517b40f28c375d809b18b9771bcaa9908fd2e81513c1e0a?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" alt="Company logo" className="shrink-0 self-stretch max-w-full aspect-[1.85] w-[118px]" />
      <nav className="flex gap-5 justify-between self-stretch my-auto leading-[150%] text-zinc-400">
        <a href="#" className="text-white">Home</a>
        <a href="#">About Us</a>
        <a href="#">Help</a>
      </nav>
      <div className="flex gap-5 justify-between self-stretch my-auto whitespace-nowrap">
        <button className="px-5 py-1.5 leading-6 text-sky-50 bg-blue-600 rounded-xl">
          Login
        </button>
        <a href="#" className="my-auto leading-[150%] text-zinc-400">SignUp</a>
      </div>
    </header>
  );
};

export default Navbar;