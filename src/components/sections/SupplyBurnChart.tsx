import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const TokenBurnChart = () => {
  const [burnPercentage, setBurnPercentage] = useState(0);
  const [remainPercentage, setRemainPercentage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // On component mount, animate from 0 to target values
  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setBurnPercentage(75);
      setRemainPercentage(25);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundParticles />
      </div>

      <motion.div
        className="w-full max-w-5xl mx-auto p-6 md:p-10 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 shadow-2xl z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          $IINGO{" "}
          <TypeAnimation
            sequence={["Burning Chart", 2000, "Circulation Metrics", 2000]}
            wrapper="span"
            speed={{ type: "keyStrokeDelayInMs", value: 100 }}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400"
          />
        </motion.h1>

        <motion.p
          className="text-center text-gray-300 text-lg md:text-xl mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Under our strategic buy-back policy, 50% of monthly revenue from all
          ecosystem modules funds token burns, permanently removing{" "}
          <span className="font-bold text-pink-400">75%</span> of $IINGO from
          circulation. Track real-time burn progress below.
        </motion.p>

        <div className="flex flex-col md:flex-row w-full justify-around gap-12 md:gap-6">
          <ChartGauge
            title="Burn Target"
            percentage={burnPercentage}
            colorStart="#990000"
            colorEnd="#990000"
            isLoaded={isLoaded}
            icon="🔥"
          />

          <ChartGauge
            title="Remaining Supply"
            percentage={remainPercentage}
            colorStart="#65a30d"
            colorEnd="#65a30d"
            isLoaded={isLoaded}
            icon="💎"
          />
        </div>

        {/* <motion.div
          className="mt-16 border-t border-gray-700/50 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-gray-400 text-sm md:text-base">
            Next scheduled burn:{" "}
            <span className="text-white font-medium">June 15, 2025</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
              View Burn History
            </button>
            <button className="px-6 py-2 bg-transparent border border-gray-600 rounded-full text-gray-300 font-medium hover:border-purple-500 hover:text-white transition-all duration-300">
              Token Economics
            </button>
          </div>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

// Semi-circular gauge component
interface ChartGaugeProps {
  title: string;
  percentage: number;
  colorStart: string;
  colorEnd: string;
  isLoaded: boolean;
  icon: string;
}

const ChartGauge = ({ title, percentage, isLoaded, icon }: ChartGaugeProps) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center">
        <span className="mr-2 text-2xl">{icon}</span> {title}
      </h2>
      <div className="relative w-full max-w-xs h-48 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          {/* Background semi-circle (unfilled portion) */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#333355"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Foreground semi-circle (filled portion) - exact match to image */}
          <AnimatePresence>
            {isLoaded && (
              <motion.path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={title.includes("Burn") ? "#990000" : "#65a30d"}
                strokeWidth="20"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage / 100 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              />
            )}
          </AnimatePresence>

          {/* Percentage text in the center */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <PercentageDisplay percentage={percentage} />
          </motion.g>
        </svg>
      </div>

      {/* <motion.div
        className="mt-3 bg-gray-800/50 rounded-lg px-4 py-2 text-center min-w-[200px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="text-gray-400 text-sm">Total Tokens</p>
        <p className="text-white font-mono text-lg">
          {percentage === 75 ? "750,000,000" : "250,000,000"}
        </p>
      </motion.div> */}
    </motion.div>
  );
};

// Percentage display component
interface PercentageDisplayProps {
  percentage: number;
}

const PercentageDisplay = ({ percentage }: PercentageDisplayProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Starting from 0
    setDisplayValue(0);

    // Animate to target value
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayValue((prev) => {
          const newValue = prev + (percentage - prev) * 0.1;
          // If we're close enough to the target, just set to target
          if (Math.abs(newValue - percentage) < 0.05) {
            clearInterval(interval);
            return percentage;
          }
          return newValue;
        });
      }, 16); // ~60fps

      // Cleanup
      return () => clearInterval(interval);
    }, 1000); // Delay start by 1 second

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <text
      x="100"
      y="90"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="20"
      fontWeight="bold"
      fill="white"
      fontFamily="monospace"
    >
      {displayValue.toFixed(2)}%
    </text>
  );
};

// Animated background particles
interface Particle {
  id: number;
  size: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity1: number;
  opacity2: number;
  duration: number;
}

const BackgroundParticles = () => {
  // Create an array of particles with random positions
  const particles: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 150 + 50,
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    opacity1: Math.random() * 0.5 + 0.1,
    opacity2: Math.random() * 0.2 + 0.1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: `${particle.x1}%`,
            y: `${particle.y1}%`,
            opacity: particle.opacity1,
          }}
          animate={{
            x: [`${particle.x1}%`, `${particle.x2}%`],
            y: [`${particle.y1}%`, `${particle.y2}%`],
            opacity: [particle.opacity1, particle.opacity2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </>
  );
};

export default TokenBurnChart;
