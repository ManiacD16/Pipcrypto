import React from "react";
// import Button from "../ui/Button";
import Rocket from "../../assets/Images/Rocket.png";
import { ArrowRightCircle } from "../ui/CryptoIcons";

const LaunchProjectSection: React.FC = () => {
  return (
    <div className=" mx-4">
      <section className="w-full bg-[#9236b4] rounded-3xl px-6 md:px-16 py-8 md:py-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-0">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Launch Your
              <br />
              Vision in Clicks
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Seize this limited-time opportunity to ride the next wave
            </p>
            <button
              //   variant="primary"
              className="bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67]  hover:bg-orange-600 text-white text-lg px-8 py-2 rounded-full flex items-center mx-auto md:mx-0"
            >
              Start Your Project Now
              <ArrowRightCircle className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Right Rocket Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={Rocket} // 🔁 Replace with your rocket image path
              alt="Rocket Launch"
              className="w-[250px] md:w-[300px] object-contain"
            />
            {/* <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute bottom-0 right-0 w-40 h-60 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-full">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-black rounded-full flex items-center justify-center">
                    <span className="text-pink-500 font-bold text-xl">hY</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[40px] border-b-orange-500 border-r-[20px] border-r-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[40px] border-b-orange-500 border-r-[20px] border-r-transparent"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-30 h-10 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaunchProjectSection;
