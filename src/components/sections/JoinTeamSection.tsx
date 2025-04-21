import { useState, useEffect } from "react";

const JoinTeamSection = () => {
  // Animation state for elements
  const [isVisible, setIsVisible] = useState(false);

  // Set visibility after component mounts for animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full py-16 md:py-10 lg:py-20 px-4 sm:px-6 md:px-10 overflow-hidden bg-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column with image and text */}
          <div
            className={`relative min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Heading with enhanced typography and gradient */}
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-amber-300 mb-2">
                  Join
                </span>
                <span className="block text-white">IINGO Team</span>
              </h2>

              {/* Decorative line */}
              <div className="w-24 h-1 mt-6 bg-gradient-to-r from-purple-500 via-blue-500 to-amber-400"></div>
            </div>
          </div>

          {/* Right column with content */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Join our community of innovators, problem solvers and owners who
              apply scientific discovery techniques to make crypto markets a
              better place for everyone.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              As we emphasize it in our name –{" "}
              <span className="text-white font-semibold">IINGO Team</span>, we
              are a team. A team of bright, talented people, each masters of
              their specialty, curious about the world and eager to solve new
              exciting cryptocurrency market problems, build cool stuff and have
              fun whilst doing so!
            </p>

            {/* Enhanced CTA with hover effects */}
            {/* <a
              href="#"
              className="group inline-flex items-center space-x-2 text-white font-medium text-lg relative overflow-hidden"
            >
              <span className="relative z-10">
                Learn more about working with us
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-amber-400 transform origin-left transition-all duration-300 group-hover:h-1"></span>
              </span>

              <svg
                className="ml-2 w-6 h-6 transform transition-all duration-300 group-hover:translate-x-1"
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
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 12H19M19 12L15 8M19 12L15 16"
                  stroke="url(#arrowGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 group-hover:stroke-[3]"
                />
              </svg>
            </a> */}

            {/* Added call-to-action button */}
            {/* <button className="mt-10 px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 text-white font-bold rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              Join Our Team
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
