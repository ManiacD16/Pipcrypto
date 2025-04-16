import React from "react";
import { CoinsIcon, TokenIcon, FireIcon } from "../ui/CryptoIcons";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  isHighlighted?: boolean;
}> = ({ icon, title, isHighlighted = false }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-full border ${
        isHighlighted
          ? "border-pink-500 bg-gradient-to-r from-pink-500/20 to-purple-500/20"
          : "border-gray-700 bg-gray-900/50"
      }`}
    >
      {icon}
      <span className="text-white font-medium">{title}</span>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
}> = ({ title, value }) => {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 text-center">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-white text-3xl md:text-4xl font-bold">{value}</p>
    </div>
  );
};

const HybridWelcomeSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Welcome to the world's first
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            hYB
          </span>
        </h2>

        <div className="bg-gray-900/20 border border-gray-800 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">
            It's more than <span className="text-pink-500">f</span>
          </h3>

          <div className="flex flex-wrap gap-4 justify-center">
            <FeatureCard
              icon={<CoinsIcon className="w-5 h-5 text-white" />}
              title="Industry's Lowest Fees"
            />
            <FeatureCard
              icon={<TokenIcon className="w-5 h-5 text-white" />}
              title="Auto Token Creation"
            />
            <FeatureCard
              icon={<FireIcon className="w-5 h-5 text-pink-500" />}
              title="Dynamic Launch Fee"
              isHighlighted
            />
            <FeatureCard
              icon={<CoinsIcon className="w-5 h-5 text-white" />}
              title="Dynamic Fund Raised Fee"
            />
            <FeatureCard
              icon={<FireIcon className="w-5 h-5 text-white" />}
              title="Auto Burning Mechanism"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard title="Current Batch" value="3" />
          <StatCard title="Current Batch Price" value="$0.04" />
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 flex flex-col justify-center">
            <h3 className="text-gray-400 text-sm mb-2">Current Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
            <p className="text-white text-center mt-1 font-bold">50%</p>
          </div>
          <StatCard title="Total Holders" value="504" />
          <StatCard title="Total Raised" value="$409637" />
        </div>
      </div>
    </section>
  );
};

export default HybridWelcomeSection;
