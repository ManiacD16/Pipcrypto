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
    title: "Initiate Presale",
    description:
      "Leverage our hYBRID framework to effortlessly configure your ideal launch - whether Presale or Fair Launch - tailored to your project’s needs.",
  },
  {
    icon: "🛡️",
    title: "Start Your Project",
    description:
      "Complete a brief form and let IINGO’s experts handle the full hybrid launch process, supporting you at every stage.",
  },
  {
    icon: "📋",
    title: "Verify with KYC",
    description:
      "Earn your KYC BADGE by completing our streamlined verification, boosting your project’s trust and compliance standing.",
  },

  {
    icon: "🚀",
    title: "Earn Audit Verification",
    description:
      "Submit your project for professional assessment to receive our trusted Audit Badge, validating credibility and building ecosystem confidence.",
  },
  {
    icon: "📣",
    title: "Boost Visibility",
    description:
      "Leverage our promotion tools to stand out from competitors and attract serious investors with enhanced exposure.",
  },
  {
    icon: "🔒",
    title: "Secure Liquidity",
    description:
      "After launch, lock tokens or liquidity with IINGO Lock to prove long-term commitment and increase investor trust.",
  },
  {
    icon: "📣",
    title: "Staking & PoolX ",
    description:
      "Lock your $IINGO tokens to earn fixed APY% rewards, then amplify yields through PoolX mining - optimizing your ecosystem earnings.",
  },
  {
    icon: "🔒",
    title: "CeX Listing Support",
    description:
      "For projects showing strong traction and community growth, we facilitate top-tier exchange listings to boost visibility and liquidity.",
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
        HYBRID Power for Your <br />
        <TypeAnimation
          sequence={["Visionary Project", 2000, ""]}
          wrapper="span"
          speed={{ type: "keyStrokeDelayInMs", value: 100 }}
          repeat={Infinity}
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
        />
      </h2>

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
              <div className="relative bg-transparent h-[260px] p-6 m-2 rounded-xl border border-spacing-1 border-blue-500 flex flex-col justify-start items-center text-center  md:overflow-y-hidden overflow-y-scroll">
                <div className="absolute inset-0 z-0">
                  <GridBackground />
                </div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{card.icon}</div>
                  <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-300">{card.description}</p>
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
