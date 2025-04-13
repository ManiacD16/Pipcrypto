import React, { useState } from "react";
import Button from "../ui/Button";
import Logo from "../../assets/Logo.svg";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0">
        <img src={Logo} alt="Near" className="h-10 w-auto" />
        <span className=" text-xl font-medium text-white">PipCrypto</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 items-center justify-center space-x-8">
        <a
          href="#"
          className="text-white hover:text-blue-400 transition-colors"
        >
          ABOUT US
        </a>
        <div className="relative group">
          <a
            href="#"
            className="text-white hover:text-blue-400 transition-colors flex items-center"
          >
            OUR SERVICES
            <svg
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
            </svg>
          </a>
        </div>
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
      </div>

      {/* CTA Button */}
      <div className="hidden lg:flex flex-shrink-0">
        <Button variant="secondary" className="ml-4 flex items-center">
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
            <Button variant="primary">GET IN TOUCH</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
