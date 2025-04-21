import React from "react";
import { motion } from "framer-motion";

// Improved gradient lines with more modern styling
const GradientLine = () => (
  <div className="h-px w-full bg-gradient-to-r from-indigo-500 via-blue-400 to-amber-400" />
);

// Animated stat card for better visual appeal
interface StatCardProps {
  title: string;
  subtitle: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, subtitle, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-6 sm:p-8 text-center flex flex-col justify-center group relative overflow-hidden"
  >
    {/* Background gradient that animates on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/90 via-blue-400/90 to-amber-400/90 transition-opacity duration-300 rounded-lg" />

    {/* Subtle animated accent */}
    <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300" />

    {/* Content with relative positioning to stay above the gradient */}
    <div className="relative z-10">
      <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm sm:text-base mt-2 leading-tight text-gray-300 group-hover:text-white/90 transition-colors duration-300">
        {subtitle}
      </p>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const topRowStats = [
    {
      title: "~$100 billion",
      subtitle: "cumulative trading volume to date",
    },
    {
      title: "0.8%",
      subtitle: "of the global crypto spot trading volume",
    },
    {
      title: "~30",
      subtitle: "IINGO Teammates (& growing)",
    },
    {
      title: "25+",
      subtitle: "leading global and local crypto exchanges",
    },
  ];

  const bottomRowStats = [
    { title: "2017", subtitle: "start, crypto-natives" },
    { title: "1,200+", subtitle: "crypto-asset pairs" },
    { title: "24/7", subtitle: "liquidity" },
    { title: "5 billion+", subtitle: "trades done to date" },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-blue-300 to-amber-300 text-transparent bg-clip-text">
            About IINGO Team
          </h2>

          {/* Subheading */}
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            At IINGO Team, we are on the mission to balance the supply and
            demand across crypto markets worldwide. We are a crypto native
            market maker founded by traders, developers, and innovators who are
            strong believers and supporters of the future of decentralization
            and digital assets.
          </p>
        </motion.div>

        {/* Stats grid with improved spacing and responsiveness */}
        <div className="relative bg-gray-900/50 rounded-xl p-2 md:p-4 backdrop-blur-sm border border-gray-800">
          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 relative">
            {topRowStats.map((item, idx) => (
              <StatCard
                key={idx}
                title={item.title}
                subtitle={item.subtitle}
                delay={idx * 0.1}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="my-2 md:my-4">
            <GradientLine />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 relative">
            {bottomRowStats.map((item, idx) => (
              <StatCard
                key={idx}
                title={item.title}
                subtitle={item.subtitle}
                delay={idx * 0.1 + 0.2}
              />
            ))}
          </div>
        </div>

        {/* Added visual accent */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-indigo-500 via-blue-400 to-amber-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
