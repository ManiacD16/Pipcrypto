import React, { useState, useEffect } from "react";
import { ArrowRightCircle } from "../ui/CryptoIcons";
import { TypeAnimation } from "react-type-animation";
import DeFi from "../../assets/Images/DeFi_Launch.png";
import Ad from "../../assets/Images/Ad_Network.png";
import Pro from "../../assets/Images/Pro_Launchpad.png";
import GridBackground from "../ui/GridBackground";

interface FeatureCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string | React.ReactNode;
  comingSoon?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  subtitle,
  description,
  comingSoon = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative border border-gray-800 bg-gray-900/20 rounded-xl p-6 sm:p-8 h-full flex flex-col overflow-hidden transition-all duration-300 ${
        isHovered
          ? "transform scale-[1.02] shadow-xl shadow-purple-500/10 border-purple-500/30"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-blue-500/20 -m-[1px] z-0 opacity-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.8 : 0 }}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <GridBackground />
      </div>

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 z-0 ${
          isHovered ? "opacity-100" : ""
        }`}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full">
        <div
          className="mb-6 transform transition-transform duration-300"
          style={{ transform: isHovered ? "translateY(-4px)" : "none" }}
        >
          <img
            src={icon || "/placeholder.svg"}
            alt={title}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
          />
        </div>

        <div className="flex items-center mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white mr-2 transition-colors duration-300">
            {title}
          </h3>
          {comingSoon ? (
            <span className="text-red-500 text-xs sm:text-sm px-2 py-1 bg-red-500/10 rounded-full">
              Coming soon
            </span>
          ) : (
            <ArrowRightCircle
              className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-500 transition-all duration-300 ${
                isHovered ? "text-pink-500 transform translate-x-1" : ""
              }`}
            />
          )}
        </div>

        <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-3 sm:mb-4 transition-colors duration-300">
          {subtitle}
        </h4>

        <div className="text-gray-400 text-sm sm:text-base mb-4 flex-grow transition-colors duration-300">
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>

        {/* Call to action button that appears on hover */}
        {/* <div
          className={`mt-4 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg hover:shadow-lg transform transition-all duration-300">
            Learn More
          </button>
        </div> */}
      </div>
    </div>
  );
};

// Custom component for list items with animated check icons
interface FeatureListItemProps {
  children: React.ReactNode;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ children }) => {
  return (
    <li className="flex items-start space-x-2 mb-2">
      <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
      <span className="text-gray-300">{children}</span>
    </li>
  );
};

const HybridFeaturesSection: React.FC = () => {
  // Animation for section entrance
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black opacity-80"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-purple-900/10 to-transparent"></div>

      {/* Animated glowing orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div
        className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              IINGO's Hybrid Advantage
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
          </h2>

          <div className="h-12 sm:h-16 flex items-center justify-center">
            <TypeAnimation
              sequence={[
                "The Power of Combined Strengths",
                2000,
                "Unlocking DeFi Potential",
                2000,
                "Revolutionizing Blockchain Launches",
                2000,
                "Where Vision Meets Innovation",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            icon={DeFi}
            title="DeFi Launch Hub"
            subtitle="Multi-Chain Decentralized Launchpad"
            description="Launch your vision on the premier HYBRID DeFi platform with industry-leading low fees. Discover curated investment opportunities through a single gateway and power next-gen innovation. Build the future with IINGO today!"
          />

          <FeatureCard
            icon={Ad}
            title="IINGO Ad Network 📢"
            subtitle="Next-Gen Project Promotion Platform"
            description={
              <>
                <p>
                  At IINGO.network, we specialize in targeted promotion for
                  IDOs, token launches, and blockchain projects. Our mission is
                  to Amplify, Connect, and Convert through:
                </p>
                <ul className="list-none mt-3 space-y-2">
                  <FeatureListItem>
                    Multi-channel crypto advertising
                  </FeatureListItem>
                  <FeatureListItem>
                    Launchpad partner spotlights
                  </FeatureListItem>
                  <FeatureListItem>
                    Data-driven campaign analytics
                  </FeatureListItem>
                </ul>
                <p className="mt-3 italic text-purple-300">
                  Where projects meet their audience
                </p>
              </>
            }
          />

          <FeatureCard
            icon={Pro}
            title="IINGO Pro Launchpad"
            subtitle="Premium-Grade Launch Solutions for Elite Projects"
            description={
              <>
                <p>
                  IINGO's PRO HYBRID Launchpad bridges institutional and
                  decentralized finance, delivering end-to-end fundraising
                  infrastructure. Powered by the $IINGO token, the platform
                  unlocks exclusive IDO access while accelerating vetted
                  projects through:
                </p>
                <ul className="list-none mt-3 space-y-2">
                  <FeatureListItem>
                    Multi-chain capital deployment
                  </FeatureListItem>
                  <FeatureListItem>
                    Investor verification protocols
                  </FeatureListItem>
                  <FeatureListItem>
                    Liquidity engineering services
                  </FeatureListItem>
                </ul>
                <p className="mt-3 italic text-purple-300">
                  Where vision meets institutional-grade execution
                </p>
              </>
            }
            comingSoon
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#login"
            className="inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-1"
          >
            Join IINGO Ecosystem
          </a>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Empowering projects across the blockchain landscape with
            next-generation launch capabilities
          </p>
        </div>
      </div>
    </section>
  );
};

export default HybridFeaturesSection;
