import React from "react";
import { ArrowRightCircle } from "../ui/CryptoIcons";
import { TypeAnimation } from "react-type-animation";
import DeFi from "../../assets/Images/DeFi_Launch.png";
import Ad from "../../assets/Images/Ad_Network.png";
import Pro from "../../assets/Images/Pro_Launchpad.png";
import GridBackground from "../ui/GridBackground";

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  description: string | React.ReactNode;
  comingSoon?: boolean;
}> = ({ icon, title, subtitle, description, comingSoon = false }) => {
  return (
    <div className="relative border border-gray-800 bg-gray-900/20 rounded-lg p-8 h-full flex flex-col overflow-hidden">
      {/* Background Grid only for this card */}
      <div className="absolute inset-0 z-0">
        <GridBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="mb-6">
          <img
            src={icon || "/placeholder.svg"}
            alt={title}
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="flex items-center mb-4">
          <h3 className="text-2xl font-bold text-white mr-2">{title}</h3>
          {comingSoon ? (
            <span className="text-red-500 text-sm">(Coming soon)</span>
          ) : (
            <ArrowRightCircle className="w-6 h-6 text-blue-500" />
          )}
        </div>

        <h4 className="text-lg font-semibold text-white mb-4">{subtitle}</h4>

        <div className="text-gray-300 mb-4 flex-grow">
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      </div>
    </div>
  );
};

const HybridFeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Grid background */}

      <div className="container mx-auto px-4 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          IINGO's Hybrid Advantage{" "}
          <TypeAnimation
            sequence={["The Power of Combined Strengths", 2000, ""]}
            wrapper="span"
            speed={{ type: "keyStrokeDelayInMs", value: 100 }}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
          />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* <GridBackground /> */}
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
                <ul className="list-none pl-5 mt-2 space-y-1">
                  <li>✓ Multi-channel crypto advertising</li>
                  <li>✓ Launchpad partner spotlights</li>
                  <li>✓ Data-driven campaign analytics</li>
                </ul>
                <p className="mt-2">Where projects meet their audience</p>
              </>
            }
          />

          <FeatureCard
            icon={Pro}
            title="IINGO Pro Launchpad "
            subtitle="Premium-Grade Launch Solutions for Elite Projects"
            description={
              <>
                <p>
                  IINGO’s PRO HYBRID Launchpad bridges institutional and
                  decentralized finance, delivering end-to-end fundraising
                  infrastructure. Powered by the $IINGO token, the platform
                  unlocks exclusive IDO access while accelerating vetted
                  projects through:
                </p>
                <ul className="list-none pl-5 mt-2 space-y-1">
                  <li>✓ Multi-chain capital deployment</li>
                  <li>✓ Investor verification protocols</li>
                  <li>✓ Liquidity engineering services</li>
                </ul>
                <p className="mt-2">
                  Where vision meets institutional-grade execution
                </p>
              </>
            }
            comingSoon
          />
        </div>
      </div>
    </section>
  );
};

export default HybridFeaturesSection;
