import React from "react";
import Header from "./components/layout/Header";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import PartnersSection from "./components/sections/PartnersSection";
import TestimonialsSection from "./components/sections/TestimonialSection";
import JoinTeamSection from "./components/sections/JoinTeamSection";
import ContactSection from "./components/sections/ContactSection";
import HybridHeroSection from "./components/sections/HybridHeroSection";
import HybridWelcomeSection from "./components/sections/HybridWelcomeSection";
import HybridFeaturesSection from "./components/sections/HybridFeaturesSection";
import Footer from "./components/layout/Footer";

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
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <HybridHeroSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <AboutSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <ServicesSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <PartnersSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <TestimonialsSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <JoinTeamSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <ContactSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <HybridWelcomeSection />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-45" />
            <div className="relative">
              <HybridFeaturesSection />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
