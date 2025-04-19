import React, { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { CoinsIcon, TokenIcon, FireIcon } from "../ui/CryptoIcons";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  isHighlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ icon, title, isHighlighted = false, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex items-center gap-3 px-4 py-3 rounded-full border transition-all duration-300 min-w-full sm:min-w-[50%] md:min-w-[25%] ${
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

const features = [
  {
    icon: <CoinsIcon className="w-5 h-5 text-white" />,
    title: "Industry's Lowest Fees",
  },
  {
    icon: <TokenIcon className="w-5 h-5 text-white" />,
    title: "One-Click Token Factory",
  },
  {
    icon: <FireIcon className="w-5 h-5 text-pink-500" />,
    title: "Adaptive Launch Pricing",
  },
  {
    icon: <CoinsIcon className="w-5 h-5 text-white" />,
    title: "Capital-Optimized Raises",
  },
  {
    icon: <FireIcon className="w-5 h-5 text-white" />,
    title: "Deflationary Burn Engine",
  },
];

const HybridWelcomeSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef<number>(0);

  useEffect(() => {
    const updateCardWidth = () => {
      const container = containerRef.current;
      if (!container) return;
      const card = container.querySelector("div");
      if (card) {
        cardWidthRef.current = (card as HTMLElement).offsetWidth + 12; // include gap-3
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    const interval = setInterval(() => {
      setOffset((prev) => {
        const totalWidth = features.length * cardWidthRef.current;
        const nextOffset = prev - cardWidthRef.current;
        return Math.abs(nextOffset) >= totalWidth ? 0 : nextOffset;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          IINGO.network
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            <TypeAnimation
              sequence={["Redefining Launchpad Innovation", 2000, ""]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 100 }}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
            />
          </span>
        </h2>

        <div className="bg-gray-900/20 border border-gray-800 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Beyond the hype cycle –{" "}
            <TypeAnimation
              sequence={["real utility launches here", 2000, ""]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 100 }}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
            />
          </h3>

          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-3 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {[...features, ...features].map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  isHighlighted={hoveredIndex === index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
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
