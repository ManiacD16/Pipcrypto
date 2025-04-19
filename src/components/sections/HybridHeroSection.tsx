import React from "react";
import { TypeAnimation } from "react-type-animation";
import Button from "../ui/Button";
import { DropIcon } from "../ui/CryptoIcons";
import FloatingCryptoIcons from "../ui/FloatingCryptoIcons";

const HybridHeroSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-start justify-center px-4 py-12 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      {/* Floating crypto icons */}
      <div className="absolute cover mx-auto z-10 right-0 lg:w-1/2 w-full">
        <FloatingCryptoIcons />
      </div>

      <div className="container mx-auto z-10">
        <div className="inline-block bg-gradient-to-br from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full mb-6">
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
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
            Multichain hYBRID Launchpad Ecosystem
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Act like a{" "}
          <TypeAnimation
            sequence={["Smart", 2000, ""]}
            wrapper="span"
            speed={{ type: "keyStrokeDelayInMs", value: 100 }}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
          />
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
          {/* Investor */}
          <TypeAnimation
            sequence={["Investor", 2000, ""]}
            wrapper="span"
            speed={{ type: "keyStrokeDelayInMs", value: 100 }}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
          />
        </h1>

        <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
          Stay secure with{" "}
          <TypeAnimation
            sequence={["IINGO", 2000, ""]}
            wrapper="span"
            speed={{ type: "keyStrokeDelayInMs", value: 100 }}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
          />
          {/* <span className="text-pink-500">IINGO</span> */}
        </h2>

        <p className="text-gray-300 max-w-2xl mb-12 text-lg">
          Unlocking New Opportunities
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {/* Pioneering the Future of Hybrid Launch Solutions */}
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

        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 flex items-center"
          >
            <DropIcon className="w-5 h-5 mr-2" />
            Get Airdrop
          </Button>

          <div className="flex items-center bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2">
            <span className="text-gray-300 mr-2">AUDITING BY</span>
            <span className="font-bold text-white">hashlock.</span>
          </div>
        </div>

        <div className="mt-16 flex gap-4">
          {["G", "@", "M", "S", "T", "X"].map((icon, index) => (
            <a
              key={index}
              href="#"
              className="w-10 h-10 rounded-md bg-gray-800/50 border border-gray-700 flex items-center justify-center text-white hover:border-pink-500 transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HybridHeroSection;
