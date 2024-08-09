import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../constants";

// Import the SVG as a React component
import BlackWhiteLogo from "../SvgLogos/BlackWhiteLogo";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveButton("login");
    } else if (location.pathname === "/signup" || location.pathname === "/mentorApply") {
      setActiveButton("signup");
    } else {
      setActiveButton("");
    }
  }, [location]);

  return (
    <header className="flex z-10 gap-5 justify-between items-center px-20 py-3.5 w-full text-base font-medium bg-zinc-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full h-24">
      {/* Use the imported SVG component */}
      <BlackWhiteLogo/>
      <nav className="flex-grow flex justify-center">
        <ul className="list-none flex gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-blue" : "text-white"
              } hover:text-blue text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <Link to={`/${link.id}`}>{`${link.title}`}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-5 justify-between self-stretch my-auto whitespace-nowrap">
        <button
          className={`px-5 py-1.5 leading-6 rounded-xl ${
            activeButton === "login" ? "bg-blue text-white" : "text-zinc-400"
          }`}
          onClick={() => setActiveButton("login")}
        >
          <Link to="/login">Login</Link>
        </button>
        <button
          className={`px-5 py-1.5 leading-6 rounded-xl ${
            activeButton === "signup" ? "bg-blue text-white" : "text-zinc-400"
          }`}
          onClick={() => setActiveButton("signup")}
        >
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
