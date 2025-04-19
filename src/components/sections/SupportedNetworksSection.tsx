import React from "react";
import { TypeAnimation } from "react-type-animation";
// Network data
const networks = [
  {
    name: "Kava",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#FF433E",
  },
  {
    name: "Blast",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#FBEC5D",
  },
  {
    name: "Base",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#0052FF",
  },
  {
    name: "Celo",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#FCFF52",
  },
  {
    name: "Ton",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#0098EA",
  },
  {
    name: "Harmony",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#00AEE9",
  },
  {
    name: "Arbitrum",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#28A0F0",
  },
  {
    name: "Binance",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#F3BA2F",
  },
  {
    name: "Ethereum",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#627EEA",
  },
  {
    name: "Polygon",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#8247E5",
  },
  {
    name: "Solana",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#14F195",
  },
  {
    name: "Tron",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#FF0013",
  },
  {
    name: "Fantom",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#1969FF",
  },
  {
    name: "Linea",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#000000",
  },
  {
    name: "Mantle",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#000000",
  },
  {
    name: "Aurora",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#70D44B",
  },
  {
    name: "BTTC",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#000000",
  },
  {
    name: "Avalanche",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#E84142",
  },
  {
    name: "Gnosis",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#3E6957",
  },
  {
    name: "Scroll",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#FFEDE5",
  },
  {
    name: "Kaia",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#000000",
  },
  {
    name: "Filecoin",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#0090FF",
  },
  {
    name: "Taiko",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#E81899",
  },
  {
    name: "Chillz",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#CD0124",
  },
  {
    name: "Cronos",
    logo: "/placeholder.svg?height=40&width=40",
    color: "#002D74",
  },
];

const NetworkCard: React.FC<{
  name: string;
  logo: string;
  color: string;
}> = ({ name, color }) => {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 flex items-center gap-3 transition-all duration-300 hover:border-pink-500 hover:bg-gray-900/50">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }} // Using color with 20% opacity
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <span className="text-white font-bold text-sm">{name.charAt(0)}</span>
        </div>
      </div>
      <span className="text-white font-medium">{name}</span>
    </div>
  );
};

const SupportedNetworksSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Supported{" "}
          <TypeAnimation
            sequence={["Networks", 2000, ""]}
            wrapper="span"
            speed={{ type: "keyStrokeDelayInMs", value: 100 }}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-500"
          />
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {networks.map((network) => (
            <NetworkCard
              key={network.name}
              name={network.name}
              logo={network.logo}
              color={network.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedNetworksSection;
