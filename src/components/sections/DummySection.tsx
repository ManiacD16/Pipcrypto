import React from "react";
import { ArrowRight } from "../ui/Icons";

const MarketMakingSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
          Crypto Market Making
        </h2>

        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-20 text-lg">
          We are a global crypto liquidity provider and algorithmic market
          maker. We trade digital assets listed on Centralized Exchanges in over
          15 countries worldwide.
        </p>

        {/* Market Making for Crypto Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Market Making for
              <br />
              Crypto Projects
            </h3>

            <p className="font-semibold text-white mb-3">
              Accelerate your token's journey by boosting its liquidity
            </p>

            <p className="text-gray-300 mb-6">
              We invest in building long-term, sustainable relationships and
              support our projects in their growth journey with our services,
              industry expertise and network.
            </p>

            <a
              href="#"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64">
              {/* 3D Crypto Cubes Illustration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transform rotate-12"></div>
              <div className="absolute top-16 left-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transform -rotate-6"></div>
              <div className="absolute bottom-0 right-8 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transform rotate-45"></div>

              {/* Crypto Logos */}
              <div className="absolute top-4 left-16 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-8 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Making for Crypto Exchanges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative w-80 h-64">
              {/* Trading Dashboard Illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
                <div className="absolute top-2 left-2 flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>

                {/* Chart Lines */}
                <div className="absolute bottom-4 left-4 right-4 h-24">
                  <svg viewBox="0 0 100 40" className="w-full h-full">
                    <path
                      d="M0,20 L10,15 L20,25 L30,10 L40,15 L50,5 L60,20 L70,15 L80,30 L90,20 L100,25"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Mobile Device */}
                <div className="absolute -bottom-8 -right-8 w-24 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-xl">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-700 rounded-full"></div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-full"></div>
                </div>
              </div>

              {/* 3D Elements */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500/30 rounded"></div>
              <div className="absolute -bottom-8 left-8 w-6 h-6 bg-purple-500/30 rounded"></div>
              <div className="absolute -bottom-6 right-16 w-10 h-10 bg-blue-500/30 rounded"></div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Market Making for
              <br />
              Crypto Exchanges
            </h3>

            <p className="font-semibold text-white mb-3">
              Attract more traders and projects with deep order books &
              liquidity
            </p>

            <p className="text-gray-300 mb-6">
              Our world-class market making services are proven to help local
              and emerging exchanges win traders and gain market-leading
              positions of up to 90% market dominance.
            </p>

            <a
              href="#"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketMakingSection;
