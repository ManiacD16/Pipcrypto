import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

// Network data
const networks = [
  { name: "Kava", color: "#FF433E" },
  { name: "Blast", color: "#FBEC5D" },
  { name: "Base", color: "#0052FF" },
  { name: "Celo", color: "#FCFF52" },
  { name: "Ton", color: "#0098EA" },
  { name: "Harmony", color: "#00AEE9" },
  { name: "Arbitrum", color: "#28A0F0" },
  { name: "Binance", color: "#F3BA2F" },
  { name: "Ethereum", color: "#627EEA" },
  { name: "Polygon", color: "#8247E5" },
  { name: "Solana", color: "#14F195" },
  { name: "Tron", color: "#FF0013" },
  { name: "Fantom", color: "#1969FF" },
  { name: "Linea", color: "#000000" },
  { name: "Mantle", color: "#000000" },
  { name: "Aurora", color: "#70D44B" },
  { name: "BTTC", color: "#000000" },
  { name: "Avalanche", color: "#E84142" },
  { name: "Gnosis", color: "#3E6957" },
  { name: "Scroll", color: "#FFEDE5" },
  { name: "Kaia", color: "#000000" },
  { name: "Filecoin", color: "#0090FF" },
  { name: "Taiko", color: "#E81899" },
  { name: "Chillz", color: "#CD0124" },
  { name: "Cronos", color: "#002D74" },
];

interface NetworkCardProps {
  name: string;
  color: string;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ name, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-gray-900/30 border border-gray-800 rounded-xl p-4 flex items-center justify-between transition-all duration-300 ${
        isHovered ? "shadow-lg shadow-" + color + "/20 scale-105" : ""
      }`}
      style={{
        borderColor: isHovered ? color : "rgb(31, 41, 55)",
        background: isHovered
          ? `linear-gradient(145deg, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.95))`
          : "",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            backgroundColor: `${color}20`,
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
            style={{
              backgroundColor: color,
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            <span className="text-white font-bold text-sm">
              {name.charAt(0)}
            </span>
          </div>
        </div>
        <span className="text-white font-medium">{name}</span>
      </div>

      {isHovered && (
        <div className="text-gray-400 opacity-60">
          <ArrowUpRight size={16} />
        </div>
      )}
    </div>
  );
};

interface TypeAnimationProps {
  text: string;
}

const TypeAnimation: React.FC<TypeAnimationProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    let direction = "typing";

    const interval = setInterval(() => {
      if (direction === "typing") {
        if (index < text.length) {
          setDisplayText(text.substring(0, index + 1));
          index++;
        } else {
          direction = "waiting";
          setTimeout(() => {
            direction = "deleting";
          }, 2000);
        }
      } else if (direction === "deleting") {
        if (index > 0) {
          setDisplayText(text.substring(0, index - 1));
          index--;
        } else {
          direction = "waiting";
          setTimeout(() => {
            direction = "typing";
          }, 500);
        }
      }
    }, 100);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <span className="relative">
      <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-500">
        {displayText}
      </span>
      {showCursor && (
        <span className="absolute -right-2 text-pink-500 animate-pulse">|</span>
      )}
    </span>
  );
};

const SupportedNetworksSection = () => {
  const [visibleNetworks, setVisibleNetworks] = useState(12);
  const [isExpanded, setIsExpanded] = useState(false);

  const showMore = () => {
    setIsExpanded(true);
    setVisibleNetworks(networks.length);
  };

  const showLess = () => {
    setIsExpanded(false);
    setVisibleNetworks(12);
    // Scroll back to the section
    const section = document.getElementById("networks-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="networks-section"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-gray-950 to-black"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      {/* Glow effects */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-4">
            <span className="text-gray-400 text-sm font-medium">
              Multichain Support
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Supported <TypeAnimation text="Networks" />
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Our platform integrates seamlessly with the most popular blockchain
            networks, providing you with unparalleled flexibility and
            connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {networks.slice(0, visibleNetworks).map((network) => (
            <NetworkCard
              key={network.name}
              name={network.name}
              color={network.color}
            />
          ))}
        </div>

        {networks.length > 12 && (
          <div className="mt-12 text-center">
            {!isExpanded ? (
              <button
                onClick={showMore}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105"
              >
                Show All Networks
              </button>
            ) : (
              <button
                onClick={showLess}
                className="px-6 py-3 rounded-lg bg-gray-800 text-white font-medium transition-all hover:bg-gray-700"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SupportedNetworksSection;
