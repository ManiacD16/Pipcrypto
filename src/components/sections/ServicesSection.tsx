// import React, { useEffect, useState } from "react";
// import LearnMoreLink from "../ui/LearnMoreLink";
import One from "../../assets/Images/1.svg";
import Grid from "../../assets/Images/grid.svg";
import Exchange from "../../assets/Images/exchange.svg";

const ServicesSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-center px-4 py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
        <div className="absolute bottom-10 left-10 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>

        {/* Grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjMzAzMDQ1IiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Crypto Market Making
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8 leading-relaxed">
            We are a global crypto liquidity provider and algorithmic market
            maker. We trade digital assets listed on Centralized Exchanges in
            over 15 countries worldwide.
          </p>
        </div>

        {/* First Section */}
        <div className="flex flex-col lg:flex-row w-full gap-12 mb-24">
          {/* Left Content */}
          <div className="lg:w-1/2 w-full p-4 lg:text-left flex flex-col justify-center">
            <div className="relative mb-6">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                Market Making for Crypto Projects
              </h2>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
              Accelerate your token's journey by boosting its liquidity
            </h3>

            <p className="text-gray-300 mb-8 leading-relaxed">
              We invest in building long-term, sustainable relationships and
              support our projects in their growth journey with our services,
              industry expertise and network.
            </p>

            {/* <div className="group w-fit">
              <LearnMoreLink />
              <div className="w-0 group-hover:w-full h-px bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"></div>
            </div> */}
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 w-full flex justify-center items-center relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl transform rotate-3 scale-95"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>

            <img
              src={One}
              alt="Crypto visual"
              className="w-full max-w-md object-contain relative z-10 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col-reverse lg:flex-row w-full gap-12">
          {/* Left Exchange Visualization */}
          <div className="lg:w-1/2 w-full flex justify-center items-center relative">
            <div className="relative w-full h-[400px] md:h-[500px]">
              {/* Gradient backdrop */}
              <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm transform -rotate-3"></div>

              {/* Pulsing gradient */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>

              {/* Exchange image */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full z-30 drop-shadow-[0_20px_50px_rgba(120,80,220,0.3)]">
                <img
                  src={Exchange}
                  alt="Exchange Screens"
                  className="w-full max-w-sm mx-auto object-contain hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Grid image */}
              <div className="absolute top-[152px] left-1/2 -translate-x-1/2 w-full z-20">
                <img
                  src={Grid}
                  alt="Grid"
                  className="w-full max-w-sm mx-auto object-contain opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 w-full p-4 lg:text-left flex flex-col justify-center">
            <div className="relative mb-6">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                Market Making for Crypto Exchanges
              </h2>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Attract more traders and projects with deep order books &
              liquidity
            </h3>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Our world-class market making services are proven to help local
              and emerging exchanges win traders and gain market-leading
              positions of up to 90% market dominance.
            </p>

            {/* <div className="group w-fit">
              <LearnMoreLink />
              <div className="w-0 group-hover:w-full h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"></div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
