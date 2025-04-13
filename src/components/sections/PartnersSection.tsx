import React from "react";
import meta from "../../assets/Partners/meta.png";
import near from "../../assets/Partners/near.png";
import solana from "../../assets/Partners/solana.png";
import bithumb from "../../assets/Partners/bithumb.png";
import bitbank from "../../assets/Partners/bitbank.png";
import binance from "../../assets/Partners/binance.png";
import bitstamp from "../../assets/Partners/bitstamp.png";
import coibase from "../../assets/Partners/coinbase.png";
import bitfinex from "../../assets/Partners/bitfinex.png";

const partners = [
  { name: "BITHUMB", logo: bithumb },
  { name: "BITBANK", logo: bitbank },
  { name: "BINANCE", logo: binance },
  { name: "BITSTAMP", logo: bitstamp },
  { name: "COINBASE", logo: coibase },
  { name: "BITFINEX", logo: bitfinex },
];

const PartnersSection: React.FC = () => {
  const partnersCol1 = [...partners.slice(0, 3), ...partners.slice(0, 3)];
  const partnersCol2 = [...partners.slice(3, 6), ...partners.slice(3, 6)];
  // duplicate for loop effect

  return (
    <section className="w-full lg:px-20 px-0 py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
        {/* Left side */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          {/* Top logos */}
          <div className="relative md:w-40 w-full h-20 mb-10 lg:ml-0 ml-10">
            {/* Top center - Near */}
            <img
              src={near}
              alt="Near"
              className="absolute -top-10 left-4 transform -translate-x-1/2 w-10"
            />

            {/* Top right - Matic */}
            <img
              src={meta}
              alt="Matic"
              className="absolute top-2 left-6 w-10"
            />

            {/* Bottom left - Solana */}
            <img
              src={solana}
              alt="Solana"
              className="absolute bottom-0 -left-7 w-10"
            />

            {/* Bottom right - Decentraland */}
            {/* <img
              src={DecentralandLogo}
              alt="Decentraland"
              className="absolute bottom-2 right-2 w-10"
            /> */}
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-medium leading-tight">
            Our Partners
            <br /> & Friends
          </h2>
        </div>

        {/* Right side */}
        <div className="lg:w-1/3 md:w-3/5 w-full h-[300px] overflow-hidden relative">
          {/* 👇 Top & Bottom fade overlays */}
          <div className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[#0D0D0F] to-transparent z-10" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#0D0D0F] to-transparent z-10" />

          <div className="grid grid-cols-2 h-full gap-x-2">
            {/* Column 1 - faster scroll */}
            <div className="overflow-hidden h-full">
              <div className="animate-marqueeFast space-y-3">
                {partnersCol1.map((partner, index) => (
                  <div
                    key={`fast-${partner.name}-${index}`}
                    className="aspect-square w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 bg-gradient-to-b from-slate-900 to-grey-900 border border-gray-800 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500"
                  >
                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-md">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-400 text-xs font-medium">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 - slower scroll */}
            <div className="overflow-hidden h-full">
              <div className="animate-marqueeSlow space-y-3">
                {partnersCol2.map((partner, index) => (
                  <div
                    key={`slow-${partner.name}-${index}`}
                    className="aspect-square w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 bg-gradient-to-b from-slate-900 to-grey-900 border border-gray-800 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500"
                  >
                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-md">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-400 text-xs font-medium">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
