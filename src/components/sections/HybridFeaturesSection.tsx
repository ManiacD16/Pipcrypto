import React from "react";
import { ArrowRightCircle } from "../ui/CryptoIcons";

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  comingSoon?: boolean;
}> = ({ icon, title, subtitle, description, comingSoon = false }) => {
  return (
    <div className="border border-gray-800 bg-gray-900/20 rounded-lg p-8 h-full flex flex-col">
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

      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
    </div>
  );
};

const HybridFeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            hYBRID
          </span>{" "}
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="/placeholder.svg?height=100&width=100"
            title="DeFi Hub"
            subtitle="Multichain Decentralized Launchpad"
            description="Launch your dream project on the first hYBRID DeFi Launchpad with the Lowest Fees in the industry. Access diverse investment opportunities under ONE ROOF and unlock the potential of innovative projects. Bring your vision to life with Qerra today!"
          />

          <FeatureCard
            icon="/placeholder.svg?height=100&width=100"
            title="Media Fusion Hub"
            subtitle="Next-Gen News and Advertising Platform Unleashed"
            description="At qerra.news, we provide comprehensive coverage of Blockchain News, Ecosystems, Projects, Companies, and beyond. Our mission is to Inform, Educate and Engage our global community through our website, social media, and newsletters featuring insights from top industry analysts"
          />

          <FeatureCard
            icon="/placeholder.svg?height=100&width=100"
            title="PRO Launchpad"
            subtitle="Empowering Projects with Seamless Launchpad Solutions"
            description="Qerra's PRO hYBRID Launchpad merges CeFi and DeFi to empower premium startups with seamless funding solutions. The $QRA token boosts accessibility, enabling investors to discover secure IDO opportunities while driving growth and innovation in the crypto space."
            comingSoon
          />
        </div>
      </div>
    </section>
  );
};

export default HybridFeaturesSection;
