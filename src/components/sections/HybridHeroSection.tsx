import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { DropIcon } from "../ui/CryptoIcons";
import Hashlock from "../../assets/hashlock.svg";
import FloatingCryptoIcons from "../ui/FloatingCryptoIcons";

const HybridHeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add entrance animation when component mounts
    setIsVisible(true);

    // Optional: Add parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const gridBg = document.querySelector(".bg-grid-pattern") as HTMLElement;
      if (gridBg) {
        gridBg.style.transform = `translateY(${scrollY * 0.05}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"></div>

      {/* Grid background with improved pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none transition-transform duration-500"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl animate-pulse"></div>

      {/* Content container with improved spacing */}
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pb-32 z-10 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
          {/* Left content section */}
          <div className="lg:w-1/2 mb-16 lg:mb-0">
            {/* Animated badge */}
            <div className="inline-block bg-gradient-to-br from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full mb-8 shadow-lg shadow-purple-500/20 transform hover:scale-105 transition-all">
              <span className="flex items-center whitespace-nowrap">
                <svg
                  className="w-5 h-5 mr-2 animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 5L21 12L13 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="hidden sm:inline">Multichain</span> hYBRID
                Launchpad Ecosystem
              </span>
            </div>

            {/* Improved typography and animation for main heading */}
            <div className="space-y-2 mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Act like a{" "}
                <span className="relative">
                  <TypeAnimation
                    sequence={["Smart", 2000, ""]}
                    wrapper="span"
                    speed={{ type: "keyStrokeDelayInMs", value: 100 }}
                    repeat={Infinity}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
                </span>
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                <TypeAnimation
                  sequence={["Investor", 2000, ""]}
                  wrapper="span"
                  speed={{ type: "keyStrokeDelayInMs", value: 100 }}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                />
              </h1>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-4 tracking-wide">
              Stay secure with{" "}
              <span className="relative inline-block">
                <TypeAnimation
                  sequence={["IINGO", 2000, ""]}
                  wrapper="span"
                  speed={{ type: "keyStrokeDelayInMs", value: 100 }}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                />
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
              </span>
            </h2>

            <p className="text-gray-300 max-w-xl mb-12 text-base sm:text-lg leading-relaxed">
              Unlocking New Opportunities
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                <TypeAnimation
                  sequence={[
                    "Pioneering the Future of Hybrid Launch Solutions",
                    2000,
                    "",
                  ]}
                  wrapper="span"
                  speed={{ type: "keyStrokeDelayInMs", value: 100 }}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                />
              </span>
            </p>

            {/* Enhanced CTA section */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                onClick={() => navigate("/login")}
                variant="primary"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center px-8 py-3 rounded-xl text-lg"
              >
                <DropIcon className="w-6 h-6 mr-2" />
                Get Airdrop
              </Button>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl px-6 py-3 flex items-center hover:border-pink-400 transition-all duration-300">
                <div className="text-gray-300 mr-3 font-medium">
                  AUDITING BY
                </div>
                <img src={Hashlock} alt="Hashlock" className="h-6 w-auto" />
              </div>
            </div>

            {/* Social links with enhanced hover effects */}
            <div className="mt-16 flex flex-wrap gap-4">
              {[
                { icon: "G", tooltip: "Google" },
                { icon: "@", tooltip: "Email" },
                { icon: "M", tooltip: "Medium" },
                { icon: "S", tooltip: "Slack" },
                { icon: "T", tooltip: "Twitter" },
                { icon: "X", tooltip: "X" },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white group-hover:border-pink-500 group-hover:text-pink-400 transition-all duration-300 group-hover:scale-110"
                  >
                    {item.icon}
                  </a>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm bg-gray-800 px-2 py-1 rounded whitespace-nowrap">
                    {item.tooltip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right section for floating crypto icons - Only for large screens */}
          <div className="lg:w-1/2 relative h-96 lg:h-full lg:mt-48 mt-0">
            <FloatingCryptoIcons />
          </div>
        </div>
      </div>

      {/* Floating crypto icons - For smaller screens */}
      {/* <div className="block lg:hidden w-full h-80 mt-8 relative">
        <FloatingCryptoIcons />
      </div> */}

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
        >
          <path
            fill="rgba(168, 85, 247, 0.15)"
            d="M0,160L40,149.3C80,139,160,117,240,128C320,139,400,181,480,176C560,171,640,117,720,101.3C800,85,880,107,960,122.7C1040,139,1120,149,1200,138.7C1280,128,1360,96,1400,80L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HybridHeroSection;
