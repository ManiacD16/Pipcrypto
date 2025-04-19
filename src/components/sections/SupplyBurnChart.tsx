import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  //   useMotionValue,
  //   useTransform,
} from "framer-motion";
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

  // Calculate the stroke dash array and offset for the arc
  //   const radius = 70;
  //   const circumference = Math.PI * radius;

  return (
    <div className="w-full p-8 rounded-xl flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        $IINGO Circulating Supply vs{" "}
        <TypeAnimation
          sequence={["Burning Chart", 2000, ""]}
          wrapper="span"
          speed={{ type: "keyStrokeDelayInMs", value: 100 }}
          repeat={Infinity}
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
        />
      </motion.h1>

      <motion.p
        className="text-center text-white mb-12 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Under our strategic buy-back policy, 50% of monthly revenue from all
        ecosystem modules funds token burns, permanently removing 75% of $IINGO
        from circulation. Track real-time burn progress below.
      </motion.p>

      <div className="flex flex-col md:flex-row w-full max-w-4xl justify-around gap-12">
        <ChartGauge
          title="Total will be burned"
          percentage={burnPercentage}
          color="#990000"
          isLoaded={isLoaded}
        />

        <ChartGauge
          title="Total will be remain"
          percentage={remainPercentage}
          color="#65a30d"
          isLoaded={isLoaded}
        />
      </div>
    </div>
  );
};

// Semi-circular gauge component
interface ChartGaugeProps {
  title: string;
  percentage: number;
  color: string;
  isLoaded: boolean;
}

const ChartGauge = ({
  title,
  percentage,
  color,
  isLoaded,
}: ChartGaugeProps) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      <div className="relative w-64 h-32">
        <svg className="w-full h-full" viewBox="0 0 160 80">
          {/* Background Arc */}
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke="#333355"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Foreground Arc */}
          <AnimatePresence>
            {isLoaded && (
              <motion.path
                d="M 10 80 A 70 70 0 0 1 150 80"
                fill="none"
                stroke={color}
                strokeWidth="20"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage / 100 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  delay: 0.8,
                }}
              />
            )}
          </AnimatePresence>

          {/* Percentage Counter */}
          <AnimatedCounter value={percentage} x={80} y={70} />
        </svg>

        {/* Min and Max Labels */}
        {/* <div className="absolute bottom-0 left-0 text-white text-sm">0%</div>
        <div className="absolute bottom-0 right-0 text-white text-sm">100%</div> */}
      </div>
    </motion.div>
  );
};

// Animated counter component
interface AnimatedCounterProps {
  value: number;
  x: number;
  y: number;
}

const AnimatedCounter = ({ value, x, y }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Starting from 0
    setDisplayValue(0);

    // Animate to target value
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayValue((prev) => {
          const newValue = prev + (value - prev) * 0.1;
          // If we're close enough to the target, just set to target
          if (Math.abs(newValue - value) < 0.05) {
            clearInterval(interval);
            return value;
          }
          return newValue;
        });
      }, 16); // ~60fps

      // Cleanup
      return () => clearInterval(interval);
    }, 1000); // Delay start by 1 second

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="24"
      fontWeight="bold"
      fill="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {displayValue.toFixed(2)}%
    </motion.text>
  );
};

export default TokenBurnChart;
