import React, { useState, useEffect } from "react";

// Define testimonial data
const testimonials = [
  {
    id: 1,
    text: "Since 2019, Pipcrypto team has been an astounding market maker for Bitkub. They have proven themselves to be one of the most consistent, committed and driven market makers on our exchange. Pipcrypto Team has contributed high-quality volume and has proven to be very reliable and trustworthy partner. We strongly advocate Pipcrypto Team as they have been an indispensable part of our market-making team.",
    author: "Atthakrit Chimplapibul",
    position: "CEO, Bitkub",
  },
  {
    id: 2,
    text: "Pipcrypto has been instrumental in providing liquidity for our exchange since we partnered with them. Their team's expertise in market making has significantly improved our trading volumes and market stability.",
    author: "Sarah Johnson",
    position: "COO, CryptoExchange",
  },
  {
    id: 3,
    text: "Working with Pipcrypto has been a game-changer for our token. Their market making services have helped us maintain consistent liquidity and price stability during both bull and bear markets.",
    author: "Michael Chen",
    position: "Founder, TokenProject",
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    }, 100);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="w-full py-16 md:py-24 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
          We are in a good company
        </h2>

        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16 text-lg">
          Our partnerships have delivered great value to our projects and we're
          happy to share some of their feedback below
        </p>
        {/* Navigation buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <div className="p-[2px] rounded-full bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] transition hover:scale-105">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-[#0D0D0F] flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="arrowGradientLeft"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#665DCD" />
                    <stop offset="50%" stopColor="#5FA4E6" />
                    <stop offset="100%" stopColor="#D2AB67" />
                  </linearGradient>
                </defs>
                <path
                  d="M19 12H5M5 12L9 8M5 12L9 16"
                  stroke="url(#arrowGradientLeft)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="p-[2px] rounded-full bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] transition hover:scale-105">
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-[#0D0D0F] flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <svg
                className=" w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="arrowGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#665DCD" />
                    <stop offset="50%" stopColor="#5FA4E6" />
                    <stop offset="100%" stopColor="#D2AB67" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 12H19M19 12L15 8M19 12L15 16"
                  stroke="url(#arrowGradient)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial carousel */}
          <div className="overflow-hidden">
            <div
              className={`transition-opacity duration-500 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="text-center max-w-3xl mx-auto mb-10">
                <p className="text-gray-300 text-lg mb-8 md:px-28 px-0">
                  {testimonials[activeIndex].text}
                </p>
                <div className="font-semibold text-white">
                  {testimonials[activeIndex].author}
                </div>
                {/* <div className="text-gray-400 text-sm">
                  {testimonials[activeIndex].position}
                </div> */}
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-blue-500" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
