import React from "react";
import Join from "../../assets/Images/Join.svg";

// import { ArrowRight } from "../ui/Icons";

const JoinTeamSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 px-10">
      {/* Blue glow effect */}
      {/* <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20 transform -translate-y-1/2"></div> */}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
          <div className="relative w-full max-w-fit lg:py-28 md:py-28 sm:py-0 py-28 md:px-20  px-0">
            {/* Background Image */}
            <div
              className=" absolute inset-0 bg-no-repeat bg-center bg-contain opacity-80 pointer-events-none z-0"
              style={{ backgroundImage: `url(${Join})` }}
            />

            {/* Heading */}
            <h2 className="relative z-10 text-2xl md:text-5xl font-semibold text-white mb-6">
              Join
              <br />
              IINGO Team
            </h2>
          </div>

          <div className="md:mt-0 -mt-20">
            <p className="text-gray-300 mb-6">
              Join our community of innovators, problem solvers and owners who
              apply scientific discovery techniques to make crypto markets a
              better place for everyone.
            </p>

            <p className="text-gray-300 mb-8">
              As we emphasize it in our name – IINGO Team, we are a team. A team
              of bright, talented people, each masters of their specialty,
              curious about the world and eager to solve the new exciting
              cryptocurrency market problems, build cool stuff and have fun
              whilst doing so!
            </p>

            <a
              href="#"
              className="group inline-flex items-center space-x-1 text-white font-thin relative inline-flex items-center text-white hover:text-blue-300 transition-colors  pb-1"
            >
              <span>
                Learn more about working with us{" "}
                <span className="absolute left-0 -bottom-1 w-[90%] h-0.5 bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] transform scale-x-100 transition-transform origin-left group-hover:scale-x-105" />
              </span>
              <svg
                className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="arrowGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#665DCD" />
                    <stop offset="50%" stopColor="#5FA4E6" />
                    <stop offset="100%" stopColor="#D2AB67" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 12H19M19 12L15 8M19 12L15 16"
                  stroke="url(#arrowGradient)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* <ArrowRight className="ml-2 w-4 h-4" /> */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
