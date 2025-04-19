import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import GridBackground from "../ui/GridBackground";

type CardData = {
  icon: string;
  title: string;
  description: string;
};

const cardItems: CardData[] = [
  {
    icon: "🛠️",
    title: "Launch Your Project",
    description:
      "To have our team develop your vision, all fees must be paid exclusively in $IINGO tokens.",
  },
  {
    icon: "🛡️",
    title: "Acquire Verification Badges",
    description:
      "Project creators use $IINGO tokens to secure mandatory Badges, proving compliance and building community trust.",
  },
  {
    icon: "📋",
    title: "Verify with KYC",
    description:
      "Earn your KYC BADGE by completing our streamlined verification, boosting your project’s trust and compliance standing.",
  },

  {
    icon: "🚀",
    title: "Boost Your Marketing",
    description:
      "All promotional campaigns require $IINGO tokens, maximizing your project’s exposure and investor engagement.",
  },
  {
    icon: "📣",
    title: "Investment Opportunities",
    description:
      "Investors, Traders, and Premium Holders can participate in all Launches using $IINGO tokens, unlocking exclusive access to high-potential projects within our ecosystem.",
  },
  {
    icon: "🔒",
    title: "Expanded Utility",
    description:
      "Beyond core functions, $IINGO tokens power diverse ecosystem applications, driving sustained demand and long-term value growth.",
  },
];

const SolutionSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [visibleCards, setVisibleCards] = useState(3);

  // Dynamically update visibleCards based on screen width
  const updateDimensions = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCards(1);
      setCardWidth(width - 40); // 20px padding on both sides
    } else if (width < 1024) {
      setVisibleCards(2);
      setCardWidth(300);
    } else {
      setVisibleCards(3);
      setCardWidth(320);
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const maxIndex = cardItems.length - visibleCards;

  const goNext = () => {
    setIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [visibleCards, cardWidth]);

  return (
    <section className=" text-white py-16 px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-12">
        Core Utility of Native Token in <br />
        <TypeAnimation
          sequence={["Our HYBRID Ecosystem", 2000, ""]}
          wrapper="span"
          speed={{ type: "keyStrokeDelayInMs", value: 100 }}
          repeat={Infinity}
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
        />
      </h2>
      <p className="text-white/80 text-base md:text-md max-w-2xl mx-auto mt-4 mb-12">
        More than a launchpad - a complete ecosystem where $IINGO powers every
        function. This deep integration creates mutual value for Investors,
        Traders, and Stakeholders through enhanced engagement and rewards.
      </p>

      <div
        className="relative mx-auto overflow-hidden"
        style={{ width: `${cardWidth * visibleCards}px` }}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * cardWidth}px)`,
            width: `${cardItems.length * cardWidth}px`,
          }}
        >
          {cardItems.map((card, idx) => (
            <div
              key={idx}
              style={{ width: `${cardWidth}px` }}
              className="flex-shrink-0"
            >
              {/* <div className="relative bg-transparent h-[260px] p-6 m-2 rounded-xl border border-spacing-1 border-blue-500 flex flex-col justify-start items-center text-center  md:overflow-y-hidden overflow-y-scroll">
                <div className="absolute inset-0 z-0">
                  <GridBackground />
                </div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{card.icon}</div>
                  <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-300">{card.description}</p>
                </div>
              </div> */}
              <div className="relative bg-transparent h-[280px] py-6 px-4 m-2 rounded-xl border border-spacing-1 border-blue-500 flex flex-col justify-start items-center text-center  md:overflow-y-hidden overflow-y-scrollp-6  transition hover:scale-[1.02] hover:shadow-lg">
                <div className="absolute inset-0 z-0">
                  <GridBackground />
                </div>
                <div className="relative z-10">
                  {/* <img
                    src={card.icon}
                    alt={card.title}
                    className="w-20 h-20 object-contain mb-5"
                  /> */}
                  <div className="text-5xl text-center mb-8 object-contain">
                    {card.icon}
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={goPrev}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goNext}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(cardItems.length - visibleCards + 1)].map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === index ? "bg-pink-500" : "bg-white/30"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
