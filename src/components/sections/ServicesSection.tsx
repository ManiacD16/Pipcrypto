import React from "react";
import LearnMoreLink from "../ui/LearnMoreLink";
import One from "../../assets/Images/1.svg";
import Grid from "../../assets/Images/grid.svg";
import Exchange from "../../assets/Images/exchange.svg";
// import CountdownTimer from "../ui/CountdownTimer";
// import Button from "../ui/Button";

const ServicesSection: React.FC = () => {
  // Set the target date for the countdown (3 days, 23 hours, 19 minutes, 56 seconds from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 23);
  targetDate.setMinutes(targetDate.getMinutes() + 19);
  targetDate.setSeconds(targetDate.getSeconds() + 56);

  return (
    <section className="w-full min-h-[80vh]  flex flex-col items-center justify-center text-center px-4 py-12 z-10">
      <h1 className="text-4xl md:text-6xl font-semibold text-white mb-8">
        Crypto Market Making
      </h1>

      {/* <div className="flex lg:w-3/5 lg:ml-8 mb-4">
        <div className="w-4 h-8 bg-red-500 mr-3 rounded-sm"></div>
        <span className="text-red-500 font-medium mt-1">Today's</span>
      </div>
      <div className="lg:flex lg:items-center lg:space-x-20 mt-2">
        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8">
          Flash Sales
        </h2>

        <div className="mb-12">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div> */}
      <p className="max-w-xl text-gray-300 mb-12 leading-relaxed">
        We are a global crypto liquidity provider and algorithmic market maker.
        We trade digital assets listed on Centralized Exchanges in over 15
        countries worldwide.
      </p>
      <div className="flex flex-col lg:flex-row w-3/4 md:space-y-10 lg:space-y-0">
        {/* Left Section */}
        <div className="lg:w-1/2 w-full p-4 lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:w-3/4 w-full font-thin text-white mb-8">
            Market Making for Crypto Projects
          </h1>
          <h1 className="text-md md:text-lg lg:w-3/4 w-full font-semibold text-white mb-8">
            Accelerate your token’s journey by boosting its liquidity
          </h1>
          <p className="lg:w-3/4 w-full text-gray-300 mb-8 leading-relaxed">
            We invest in building long-term, sustainable relationships and
            support our projects in their growth journey with our services,
            industry expertise and network.
          </p>
          <LearnMoreLink />
        </div>

        {/* Right Section */}
        <img
          src={One}
          alt="Crypto visual"
          className="w-full max-w-md object-contain"
        />
      </div>
      <div className="flex flex-col lg:flex-row w-3/4 md:space-y-10 lg:space-y-0 lg:space-x-40 mt-20">
        {/* Left Section - Moved to bottom on small screens */}
        <div className="order-2 lg:order-1 lg:w-1/2 w-full lg:p-4 p-0 mt-40 lg:mt-0">
          {/* Container with relative positioning to contain all elements */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:ml-0 md:ml-[25%]">
            {/* Gradient background */}
            <div
              className="
    absolute 
    w-[300px] sm:w-[40rem] md:w-[40rem] lg:w-[40rem] 
    h-[300px] sm:h-[500px] md:h-[500px] lg:h-[500px] 
    overlay z-0 
    left-0 sm:-left-28 md:-left-32 lg:-left-32
    bottom-0 sm:-bottom-10 md:bottom-20 lg:bottom-20
    bg-[radial-gradient(circle,#665DCD,transparent_60%)] 
    opacity-80 
    pointer-events-none
    rounded-full
  "
            >
              {" "}
              {/* <div className="relative inset-0 bg-black opacity-45" /> */}
            </div>

            {/* Exchange image */}
            <div className="absolute top-4 left-0 w-full z-50">
              <img
                src={Exchange}
                alt="Exchange Screens"
                className="w-full max-w-sm object-contain"
              />
            </div>

            {/* Grid image */}
            <div className="absolute top-[152px] left-0 w-full z-10">
              <img
                src={Grid}
                alt="Grid"
                className="w-full max-w-sm object-contain"
              />
            </div>
          </div>
        </div>
        {/* Right Section - Moved to top on small screens */}
        <div className="order-1 lg:order-2 lg:w-1/2 w-full p-4 lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:w-3/4 w-full font-thin text-white mb-8">
            Market Making for Crypto Exchanges
          </h1>
          <h1 className="text-md md:text-lg w-full font-semibold text-white mb-8">
            Attract more traders and projects with deep order books & liquidity
          </h1>
          <p className="w-full text-gray-300 mb-8 leading-relaxed">
            Our world-class market making services are proven to help local and
            emerging exchanges win traders and gain market-leading positions of
            up to 90% market dominance.
          </p>
          <LearnMoreLink />
        </div>

        {/* Left Section - Moved to bottom on small screens */}
        {/* <div className="order-2 lg:order-1 lg:w-1/2 w-full p-4 mt-8 lg:mt-0 ">
          <div className="">
            <div className="absolute w-[40rem] h-[40rem] overlay z-0 left-0 bottom-0 -mb-40 ml-20 bg-[radial-gradient(circle,#665DCD,transparent_60%)] opacity-80 pointer-events-none">
              <div className="relative inset-0 bg-black opacity-45" />
            </div>
          </div>
          <img
            src={Exchange}
            alt="Exchange Screens"
            className="absolute w-full max-w-md object-contain z-50 -mt-5"
          />
          <img
            src={Grid}
            alt="Grid"
            className="absolute w-full max-w-md object-contain z-10 mt-[152px]"
          />
        </div> */}
      </div>

      {/* <Button variant="primary">GET IN TOUCH</Button> */}
    </section>
  );
};

export default ServicesSection;
