import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../layout/Header";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import ServicesSection from "../sections/ServicesSection";
import PartnersSection from "../sections/PartnersSection";
import TestimonialsSection from "../sections/TestimonialSection";
import JoinTeamSection from "../sections/JoinTeamSection";
import ContactSection from "../sections/ContactSection";
import HybridHeroSection from "../sections/HybridHeroSection";
import HybridWelcomeSection from "../sections/HybridWelcomeSection";
import HybridFeaturesSection from "../sections/HybridFeaturesSection";
import LaunchProjectSection from "../sections/LaunchProjectSection";
import SupportedNetworksSection from "../sections/SupportedNetworksSection";
import SolutionSection from "../sections/SolutionSection";
import UseCaseSection from "../sections/UseCaseSection";
import TokenomicsSection from "../sections/TokenomicsSection";
import SupplyBurnChart from "../sections/SupplyBurnChart";
// import DashboardSection from "../sections/DashboardSection";

import Footer from "../layout/Footer";
const GradientLine = () => (
  <div className="h-[1px] w-full bg-gradient-to-r from-[#665DCD] via-[#5FA4E6] to-[#D2AB67]" />
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br h-full w-full from-gray-900 to-gray-900 overflow-hidden relative">
      {/* Background effect */}
      {/* Main content should be on top of background */}
      <div>
        <div className="relative ">
          <div className="absolute inset-0 bg-black opacity-45 z-0" />
          <div className="relative">
            <Header />
          </div>
        </div>
        <main>
          <div className="relative ">
            <div className="absolute w-[45rem] h-[45rem] overlay z-0 right-0 bottom-0 -mb-40 -mr-40 bg-[radial-gradient(circle,#665DCD,transparent_60%)] opacity-80  pointer-events-none" />
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <HeroSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <HybridHeroSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <AboutSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <ServicesSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <HybridWelcomeSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <HybridFeaturesSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <PartnersSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <SupportedNetworksSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative py-4">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <LaunchProjectSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <SolutionSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <UseCaseSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <TokenomicsSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <SupplyBurnChart />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          {/* <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <DashboardSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div> */}
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <TestimonialsSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <JoinTeamSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <ContactSection />
            </div>
          </div>
          <div className="  w-full ">
            <GradientLine />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
