import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Logo from "../../assets/Logo1.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full py-4 px-6 md:px-12 flex items-center justify-between z-[999] transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-white/10 shadow" : "bg-transparent"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0">
        <img src={Logo} alt="Near" className="h-10 w-auto" />
        {/* <span className=" text-xl font-medium text-white">IINGO</span> */}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 items-center justify-center space-x-20">
        <a
          href="#"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Home
        </a>
        <div className="w-1 h-8 text-transparent bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] mr-3 rounded-sm"></div>
        <div className="relative group">
          <a
            href="#"
            className="text-white hover:text-blue-400 transition-colors flex items-center"
          >
            Pre Sale
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg> */}
          </a>
        </div>
        <div className="w-1 h-8 text-transparent bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] mr-3 rounded-sm"></div>
        {/* <a
          href="#"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Pro Pad
        </a> */}
        {/* <a
          href="#"
          className="text-white hover:text-blue-400 transition-colors"
        >
          News Portal
        </a>
        <a
          href="#"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Advertise
        </a> */}
        <a
          href="#"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Whitepaper
        </a>
        {/* <a
          href="#"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Blog
        </a> */}
      </div>

      {/* CTA Button */}
      <div className="hidden lg:flex flex-shrink-0">
        <Button
          onClick={() => navigate("/login")}
          variant="secondary"
          className="ml-4 flex items-center"
        >
          <div className="w-5 h-5 rounded-full mr-4 bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67]" />
          GET IN TOUCH
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden text-white" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-900 p-4 lg:hidden rounded-b-md z-50">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="text-white hover:text-blue-400 transition-colors"
            >
              ABOUT US
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-400 transition-colors"
            >
              OUR SERVICES
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-400 transition-colors"
            >
              WORK WITH US
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-400 transition-colors"
            >
              BLOG
            </a>
            <Button variant="primary" onClick={() => navigate("/login")}>
              GET IN TOUCH
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
