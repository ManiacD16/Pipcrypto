import React from "react";
import Logo from "../../assets/IINGO.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-16 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0">
            <div className="uppercase text-sm font-semibold text-gray-400 mb-4">
              IINGO TEAM
            </div>

            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Work with Us
              </a>
            </nav>
          </div>

          <div className="flex items-center">
            <div className="flex items-center ">
              <img src={Logo} alt="Near" className="h-32 w-auto" />

              {/* <span className=" text-xl font-medium text-white">IINGO</span> */}
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center flex-col md:flex-row space-y-4 lg:space-y-0 justify-between">
          <div>
            <a
              href="#"
              className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
            >
              Terms of Use & Privacy Policy
            </a>
          </div>
          <div className=" text-right text-gray-500 text-sm">
            ©2022 IINGO Team. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
