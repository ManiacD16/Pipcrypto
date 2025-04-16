import React from "react";

const LearnMoreLink: React.FC = () => {
  return (
    <a
      href="#"
      className="group inline-flex items-center space-x-2 text-white font-thin relative"
    >
      <span>
        Learn more
        <span className="absolute left-0 -bottom-1 w-3/4 h-0.5 bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] transform scale-x-100 transition-transform origin-left group-hover:scale-x-105" />
      </span>
      <svg
        className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0" y1="0" x2="1" y2="1">
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

      {/* Gradient underline */}
    </a>
  );
};

export default LearnMoreLink;
