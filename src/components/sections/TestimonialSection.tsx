import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// Define the type for the interval ref
type IntervalRefType = ReturnType<typeof setInterval> | null;

// Define testimonial data
const testimonials = [
  {
    id: 1,
    text: "Since 2019, IINGO team has been an astounding market maker for Bitkub. They have proven themselves to be one of the most consistent, committed and driven market makers on our exchange. IINGO Team has contributed high-quality volume and has proven to be very reliable and trustworthy partner. We strongly advocate IINGO Team as they have been an indispensable part of our market-making team.",
    author: "Atthakrit Chimplapibul",
    position: "CEO, Bitkub",
    // avatar: "/api/placeholder/100/100",
  },
  {
    id: 2,
    text: "IINGO has been instrumental in providing liquidity for our exchange since we partnered with them. Their team's expertise in market making has significantly improved our trading volumes and market stability.",
    author: "Sarah Johnson",
    position: "COO, CryptoExchange",
    // avatar: "/api/placeholder/100/100",
  },
  {
    id: 3,
    text: "Working with IINGO has been a game-changer for our token. Their market making services have helped us maintain consistent liquidity and price stability during both bull and bear markets.",
    author: "Michael Chen",
    position: "Founder, TokenProject",
    // avatar: "/api/placeholder/100/100",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<IntervalRefType>(null);

  const goToNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only set a new interval if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 8000);
    }

    // Cleanup function to clear interval on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeIndex, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-[#0D0D0F] to-[#131315]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] inline-block mb-6">
            We are in good company
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#665DCD] to-[#D2AB67] mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
            Our partnerships have delivered great value to our projects and
            we're happy to share some of their feedback below
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Testimonial card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-2">
            <div className="absolute top-6 left-6 opacity-20">
              <Quote size={60} className="text-[#5FA4E6]" />
            </div>

            <div className="relative bg-[#0D0D0F]/70 backdrop-blur-sm rounded-xl p-8 md:p-12">
              <div
                className={`transition-opacity duration-500 ${
                  isAnimating ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="text-center mb-8">
                  <p className="text-gray-200 text-lg md:text-xl leading-relaxed italic mb-10 relative z-10">
                    {testimonials[activeIndex].text}
                  </p>

                  <div className="flex items-center justify-center">
                    {/* <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#5FA4E6] mr-4">
                      <img
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].author}
                        className="w-full h-full object-cover"
                      />
                    </div> */}
                    <div className="text-left">
                      <div className="font-bold text-white text-lg">
                        {testimonials[activeIndex].author}
                      </div>
                      <div className="text-[#5FA4E6] text-sm">
                        {testimonials[activeIndex].position}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation and pagination */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-[#665DCD] to-[#D2AB67] w-8"
                      : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#665DCD] to-[#D2AB67] p-[1px] transition hover:scale-105 group"
                aria-label="Previous testimonial"
              >
                <div className="w-full h-full rounded-full bg-[#0D0D0F] flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white group-hover:text-[#5FA4E6] transition-all" />
                </div>
              </button>

              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#665DCD] to-[#D2AB67] p-[1px] transition hover:scale-105 group"
                aria-label="Next testimonial"
              >
                <div className="w-full h-full rounded-full bg-[#0D0D0F] flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-[#5FA4E6] transition-all" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
