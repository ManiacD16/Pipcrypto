import { useEffect, useState } from "react";
import meta from "../../assets/Partners/meta.png";
import near from "../../assets/Partners/near.png";
import solana from "../../assets/Partners/solana.png";
import bithumb from "../../assets/Partners/bithumb.png";
import bitbank from "../../assets/Partners/bitbank.png";
import binance from "../../assets/Partners/binance.png";
import bitstamp from "../../assets/Partners/bitstamp.png";
import coinbase from "../../assets/Partners/coinbase.png"; // Fixed typo in import name
import bitfinex from "../../assets/Partners/bitfinex.png";

const partners = [
  { name: "BITHUMB", logo: bithumb },
  { name: "BITBANK", logo: bitbank },
  { name: "BINANCE", logo: binance },
  { name: "BITSTAMP", logo: bitstamp },
  { name: "COINBASE", logo: coinbase }, // Fixed variable name
  { name: "BITFINEX", logo: bitfinex },
];

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // For animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("partners-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  // Create two different partner lists for the columns with duplications
  const partnersCol1 = [
    ...partners.slice(0, 3),
    ...partners.slice(0, 3),
    ...partners.slice(0, 3),
  ];
  const partnersCol2 = [
    ...partners.slice(3, 6),
    ...partners.slice(3, 6),
    ...partners.slice(3, 6),
  ];

  return (
    <section
      id="partners-section"
      className="w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-[#0D0D0F] to-[#121215] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
          {/* Left side - Logo constellation and heading */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Logo constellation with animated hover effects */}
            <div className="relative w-full max-w-xs mx-auto lg:mx-0 h-40 mb-10">
              <div className="absolute top-2 left-1/4 w-16 h-16 rounded-full bg-blue-500/5 animate-pulse-slow">
                <img
                  src={near}
                  alt="Near"
                  className="absolute w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute top-12 left-1/2 w-16 h-16 rounded-full bg-purple-500/5 animate-pulse-slower">
                <img
                  src={meta}
                  alt="Meta"
                  className="absolute w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute bottom-0 left-1/3 w-16 h-16 rounded-full bg-green-500/5 animate-pulse-slow">
                <img
                  src={solana}
                  alt="Solana"
                  className="absolute w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Connection lines */}
              <div className="absolute top-10 left-1/3 w-20 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 transform rotate-45"></div>
              <div className="absolute top-20 left-1/3 w-16 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-green-500/0 transform -rotate-45"></div>
              <div className="absolute bottom-10 left-1/4 w-20 h-1 bg-gradient-to-r from-green-500/0 via-green-500/20 to-blue-500/0 transform -rotate-45"></div>
            </div>

            {/* Heading with gradient text */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Our Partners
                </span>
                <span className="block">&amp; Friends</span>
              </h2>
              <p className="mt-6 text-gray-400 max-w-lg mx-auto lg:mx-0 text-lg">
                Working together with industry leaders to build the future of
                blockchain technology
              </p>
            </div>
          </div>

          {/* Right side - Marquee partners display */}
          <div
            className={`lg:w-1/2 w-full h-[350px] sm:h-[400px] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Top & Bottom fade overlays */}
            <div className="pointer-events-none absolute w-full h-12 bg-gradient-to-b from-[#0D0D0F] to-transparent z-10" />
            <div className="pointer-events-none absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#0D0D0F] to-transparent z-10" />

            {/* Side fade overlays */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-[#0D0D0F] to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-[#0D0D0F] to-transparent z-10" />

            <div className="relative h-full overflow-hidden rounded-xl p-1 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <div className="absolute inset-0 bg-[#0D0D0F] rounded-xl z-0" />
              <div className="grid grid-cols-2 h-full gap-1 relative z-1">
                {/* Column 1 - faster scroll */}
                <div className="overflow-hidden h-full">
                  <div className="animate-marquee-fast py-2 space-y-3">
                    {partnersCol1.map((partner, index) => (
                      <div
                        key={`fast-${partner.name}-${index}`}
                        className="relative group mx-auto w-24 sm:w-28 md:w-32 lg:w-36 aspect-square bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-300"></div>

                        {/* Logo container with gradient background */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 flex items-center justify-center rounded-md bg-gradient-to-b from-slate-800 to-slate-900 p-2 border border-gray-700/30">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                          />
                        </div>
                        <span className="text-gray-400 group-hover:text-white text-xs font-medium tracking-wider transition-colors duration-300">
                          {partner.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 - slower scroll */}
                <div className="overflow-hidden h-full">
                  <div className="animate-marquee-slow py-2 space-y-3">
                    {partnersCol2.map((partner, index) => (
                      <div
                        key={`slow-${partner.name}-${index}`}
                        className="relative group mx-auto w-24 sm:w-28 md:w-32 lg:w-36 aspect-square bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-lg bg-purple-500/0 group-hover:bg-purple-500/5 transition-all duration-300"></div>

                        {/* Logo container with gradient background */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 flex items-center justify-center rounded-md bg-gradient-to-b from-slate-800 to-slate-900 p-2 border border-gray-700/30">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                          />
                        </div>
                        <span className="text-gray-400 group-hover:text-white text-xs font-medium tracking-wider transition-colors duration-300">
                          {partner.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
