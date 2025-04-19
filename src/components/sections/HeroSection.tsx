import React from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../ui/CountdownTimer";
import Button from "../ui/Button";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  // Set the target date for the countdown (3 days, 23 hours, 19 minutes, 56 seconds from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 23);
  targetDate.setMinutes(targetDate.getMinutes() + 19);
  targetDate.setSeconds(targetDate.getSeconds() + 56);

  return (
    <section className="w-full min-h-[80vh] pt-32 flex flex-col items-center justify-center text-center px-4 py-12 z-10">
      <h1 className="text-5xl md:text-7xl font-semibold text-white mb-8">
        Coming Soon
      </h1>

      <div className="flex lg:w-3/5 lg:ml-8 mb-4">
        <div className="w-4 h-8 text-transparent bg-gradient-to-br from-pink-500 to-purple-500 mr-3 rounded-sm"></div>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-medium mt-1">
          Today's
        </span>
      </div>
      <div className="lg:flex lg:items-center lg:space-x-20 mt-2">
        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8">
          Flash Sales
        </h2>

        <div className="mb-12">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
      <p className="max-w-2xl text-gray-300 mb-12 leading-relaxed">
        Our fully automated proprietary quantitative trading software provides
        24/7 liquidity to 170+ crypto assets across 25+ centralized spot and
        derivative crypto exchanges.
      </p>

      <Button variant="primary" onClick={() => navigate("/login")}>
        GET IN TOUCH
      </Button>
    </section>
  );
};

export default HeroSection;
