import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

// Custom hook for managing window resize
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Animated grid background with improved performance
const GridBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full grid grid-cols-12 gap-4">
          {Array(48)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="col-span-1 border-t border-r border-gray-500/20"
              ></div>
            ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 gap-4">
          {Array(48)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="row-span-1 border-l border-b border-gray-500/20"
              ></div>
            ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-70"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-70"></div>
    </div>
  );
};

// Card component
interface CardProps {
  data: {
    icon: string;
    title: string;
    description: string;
  };
  isActive: boolean;
}

const Card = ({ data, isActive }: CardProps) => {
  return (
    <div
      className={`relative h-[300px] md:h-[320px] p-6 m-2 rounded-xl border border-spacing-1 transition-all duration-500 ${
        isActive
          ? "border-pink-500 shadow-lg shadow-pink-500/20"
          : "border-blue-500/70 hover:border-blue-400"
      } flex flex-col justify-start items-center text-center`}
    >
      <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
        <GridBackground />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center">
        <div className="text-5xl mb-4 transform transition-transform duration-300 hover:scale-110">
          {data.icon}
        </div>
        <h3 className="font-bold text-lg mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
          {data.title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          {data.description}
        </p>
        {/* <div className="mt-auto pt-4">
          <button className="px-4 py-2 text-xs font-medium rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
            Learn More
          </button>
        </div> */}
      </div>
    </div>
  );
};

// Define type for card data
type CardData = {
  icon: string;
  title: string;
  description: string;
};

// Card data
const cardItems: CardData[] = [
  {
    icon: "🛠️",
    title: "Initiate Presale",
    description:
      "Leverage our hYBRID framework to effortlessly configure your ideal launch - whether Presale or Fair Launch - tailored to your project's needs.",
  },
  {
    icon: "🛡️",
    title: "Start Your Project",
    description:
      "Complete a brief form and let IINGO's experts handle the full hybrid launch process, supporting you at every stage.",
  },
  {
    icon: "📋",
    title: "Verify with KYC",
    description:
      "Earn your KYC BADGE by completing our streamlined verification, boosting your project's trust and compliance standing.",
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
    icon: "📈",
    title: "Staking & PoolX",
    description:
      "Lock your $IINGO tokens to earn fixed APY% rewards, then amplify yields through PoolX mining - optimizing your ecosystem earnings.",
  },
  {
    icon: "🌐",
    title: "CeX Listing Support",
    description:
      "For projects showing strong traction and community growth, we facilitate top-tier exchange listings to boost visibility and liquidity.",
  },
];

const SolutionSection = () => {
  const { width } = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Calculate visible cards based on screen width
  const getVisibleCards = useCallback(() => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }, [width]);

  const visibleCards = getVisibleCards();
  const maxIndex = cardItems.length - visibleCards;

  // Calculate card width based on container width and visible cards
  const getCardWidth = useCallback(() => {
    if (width < 640) return width - 40; // Small screens: full width with padding
    if (width < 1024) return Math.min(320, (width - 80) / 2); // Medium screens: 2 cards
    return Math.min(360, (width - 120) / 3); // Large screens: 3 cards
  }, [width]);

  const cardWidth = getCardWidth();

  // Navigation functions
  const goToIndex = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const goNext = useCallback(() => {
    goToIndex(activeIndex === maxIndex ? 0 : activeIndex + 1);
  }, [activeIndex, goToIndex, maxIndex]);

  const goPrev = useCallback(() => {
    goToIndex(activeIndex === 0 ? maxIndex : activeIndex - 1);
  }, [activeIndex, goToIndex, maxIndex]);

  // Auto play with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [goNext, isPaused]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;

    // Require a minimum swipe distance
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  return (
    <section className="text-white py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title with animated typing */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            HYBRID Power for Your
          </h2>
          <div className="h-12 md:h-16">
            <TypeAnimation
              sequence={[
                "Visionary Project",
                2000,
                "Blockchain Launch",
                2000,
                "Token Ecosystem",
                2000,
                "DeFi Revolution",
                2000,
              ]}
              wrapper="h3"
              speed={50}
              repeat={Infinity}
              className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 inline-block"
            />
          </div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Our comprehensive suite of tools and services empowers your project
            with everything needed to succeed in the decentralized economy.
          </p>
        </div>

        {/* Cards carousel */}
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            width: `${cardWidth * Math.min(visibleCards, cardItems.length)}px`,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${activeIndex * cardWidth}px)`,
              width: `${cardItems.length * cardWidth}px`,
            }}
          >
            {cardItems.map((card, idx) => (
              <div
                key={idx}
                style={{ width: `${cardWidth}px` }}
                className="flex-shrink-0"
              >
                <Card data={card} isActive={idx === activeIndex} />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/50 hover:to-purple-500/50 p-3 rounded-full transform transition-all duration-300 hover:scale-110 z-20 text-white/90 hover:text-white shadow-lg shadow-purple-500/20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/50 hover:to-purple-500/50 p-3 rounded-full transform transition-all duration-300 hover:scale-110 z-20 text-white/90 hover:text-white shadow-lg shadow-purple-500/20"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 w-6"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Call to action */}
        {/* <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40">
            Explore Our Solutions
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default SolutionSection;
