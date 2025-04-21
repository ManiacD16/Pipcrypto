import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
// import Logo from "../../assets/IINGO.png";

// Tokenomics data
const tokenomicsData = [
  { name: "ICO", percentage: 50, color: "#8A5CF6" },
  { name: "STAKING", percentage: 15, color: "#5B5BD6" },
  { name: "ECOSYSTEM", percentage: 8, color: "#EC4899" },
  { name: "AIRDROP", percentage: 8, color: "#F43F5E" },
  { name: "MARKETING", percentage: 7, color: "#8B5CF6" },
  { name: "ADVISORY/VOLS", percentage: 6, color: "#3B82F6" },
  { name: "REFERRALS", percentage: 5, color: "#14B8A6" },
  { name: "BUG & BOUNTY", percentage: 1, color: "#F59E0B" },
];

// Define interfaces for our chart data
interface TokenomicItem {
  name: string;
  percentage: number;
  color: string;
}

interface ChartSegment {
  path: string;
  color: string;
  startAngle: number;
  endAngle: number;
  middlePoint: { x: number; y: number };
  data: TokenomicItem;
}

const TokenomicsSection = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">(
    "large"
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Calculate the total percentage
  const totalPercentage = tokenomicsData.reduce(
    (acc, item) => acc + item.percentage,
    0
  );

  // Handle intersection observer for triggering animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Check screen size for responsive layouts
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small");
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate the progress
  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(elapsed / duration, 1);

      setAnimationProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isInView]);

  // Generate SVG paths for the donut chart
  const generateChart = () => {
    const size = 300;
    const center = size / 2;
    const radius = size * 0.4;
    const innerRadius = radius * 0.6;

    let startAngle = -Math.PI / 2; // Start from the top
    const segments: ChartSegment[] = [];

    // Process all segments except Bug & Bounty first
    const regularSegments = tokenomicsData.filter(
      (item) => item.name !== "BUG & BOUNTY"
    );
    const bugBountySegment = tokenomicsData.find(
      (item) => item.name === "BUG & BOUNTY"
    );

    // Process regular segments
    regularSegments.forEach((item) => {
      const segmentAngle =
        (item.percentage / totalPercentage) * 2 * Math.PI * animationProgress;
      const endAngle = startAngle + segmentAngle;

      // Calculate the SVG arc path
      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const x3 = center + innerRadius * Math.cos(endAngle);
      const y3 = center + innerRadius * Math.sin(endAngle);
      const x4 = center + innerRadius * Math.cos(startAngle);
      const y4 = center + innerRadius * Math.sin(startAngle);

      // Build the path string - outer arc, then inner arc
      const largeArcFlag = segmentAngle > Math.PI ? 1 : 0;

      const pathData = [
        `M ${x1} ${y1}`, // Move to the starting point
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
        `L ${x3} ${y3}`, // Line to the inner radius
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc
        "Z", // Close the path
      ].join(" ");

      // Calculate the middle point of the segment for hover effects
      const middleAngle = startAngle + segmentAngle / 2;
      const middleRadius = (radius + innerRadius) / 2;
      const middleX = center + middleRadius * Math.cos(middleAngle);
      const middleY = center + middleRadius * Math.sin(middleAngle);

      segments.push({
        path: pathData,
        color: item.color,
        startAngle,
        endAngle,
        middlePoint: { x: middleX, y: middleY },
        data: item,
      });

      startAngle = endAngle;
    });

    // Process Bug & Bounty segment last to ensure it's on top
    if (bugBountySegment) {
      const segmentAngle =
        (bugBountySegment.percentage / totalPercentage) *
        2 *
        Math.PI *
        animationProgress;
      const endAngle = startAngle + segmentAngle;

      // Calculate the SVG arc path
      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const x3 = center + innerRadius * Math.cos(endAngle);
      const y3 = center + innerRadius * Math.sin(endAngle);
      const x4 = center + innerRadius * Math.cos(startAngle);
      const y4 = center + innerRadius * Math.sin(startAngle);

      // Build the path string - outer arc, then inner arc
      const largeArcFlag = segmentAngle > Math.PI ? 1 : 0;

      const pathData = [
        `M ${x1} ${y1}`, // Move to the starting point
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
        `L ${x3} ${y3}`, // Line to the inner radius
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc
        "Z", // Close the path
      ].join(" ");

      // Calculate the middle point of the segment for hover effects
      const middleAngle = startAngle + segmentAngle / 2;
      const middleRadius = (radius + innerRadius) / 2;
      const middleX = center + middleRadius * Math.cos(middleAngle);
      const middleY = center + middleRadius * Math.sin(middleAngle);

      segments.push({
        path: pathData,
        color: bugBountySegment.color,
        startAngle,
        endAngle,
        middlePoint: { x: middleX, y: middleY },
        data: bugBountySegment,
      });
    }

    return segments;
  };

  // Handle mouse events for tooltips
  const handleMouseEnter = (segment: ChartSegment, index: number) => {
    setActiveSegment(index);

    // Calculate tooltip position based on segment middle point
    if (segment.middlePoint && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const x = (segment.middlePoint.x / 300) * svgRect.width;
      const y = (segment.middlePoint.y / 300) * svgRect.height;

      // For small adjacent segments (like Referrals and Bug & Bounty), adjust position
      let offsetY = 0;
      const segmentName = tokenomicsData[index].name;

      if (segmentName === "REFERRALS") {
        offsetY = -15; // Move tooltip up a bit
      } else if (segmentName === "BUG & BOUNTY") {
        offsetY = 15; // Move tooltip down a bit
      }

      setTooltipPosition({
        x: x + svgRect.left,
        y: y + svgRect.top + offsetY,
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveSegment(null);
  };

  // Calculate label positions for different screen sizes
  const getLabelPosition = (item: TokenomicItem, index: number) => {
    const size = 300;
    const center = size / 2;

    // Adjust label radius based on screen size
    let labelRadius;
    if (screenSize === "small") {
      labelRadius = size * 0.22; // Shorter for small screens
    } else if (screenSize === "medium") {
      labelRadius = size * 0.25; // Medium distance
    } else {
      labelRadius = size * 0.42; // Normal distance on desktop
    }

    // Calculate the angle for the middle of this segment
    let angleBeforeThis = tokenomicsData
      .slice(0, index)
      .reduce((acc, curr) => acc + curr.percentage, 0);

    const middleAngle =
      -Math.PI / 2 +
      ((angleBeforeThis + item.percentage / 2) / totalPercentage) * 2 * Math.PI;

    // Calculate position
    const x = center + labelRadius * Math.cos(middleAngle);
    const y = center + labelRadius * Math.sin(middleAngle);

    // Determine if label should be on left or right side
    const isRightSide = x > center;

    // Special case for Bug & Bounty - just ensure it's properly positioned on large screens
    if (item.name === "BUG & BOUNTY" && screenSize === "large") {
      // On large screens, extend it outward slightly more
      const extendedRadius = labelRadius * 1.1;
      const adjustedX = center + extendedRadius * Math.cos(middleAngle);
      const adjustedY = center + extendedRadius * Math.sin(middleAngle);

      return {
        x: adjustedX,
        y: adjustedY,
        isRightSide,
        middleAngle,
      };
    }

    return { x, y, isRightSide, middleAngle };
  };

  // Determine if we should show this label based on screen size and percentage
  const shouldShowLabel = (percentage: number) => {
    if (screenSize === "small") {
      return percentage >= 15; // Only show labels for segments >= 15% on mobile
    } else if (screenSize === "medium") {
      return percentage >= 8; // Only show labels for segments >= 8% on tablets
    }
    return true; // Show all labels on desktop
  };

  const chartSegments = generateChart();

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-purple-500/20 rounded-full blur-[120px]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-3/4 h-3/4 bg-pink-500/15 rounded-full blur-[120px]"
          style={{ transform: "translate(50%, 50%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[100px]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">$IINGO</span>{" "}
            <TypeAnimation
              sequence={["Tokenomics", 2000, ""]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 100 }}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
            />
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our token economy is meticulously designed with a scarce supply of
            just 210 million tokens.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-12">
          {/* Chart container with enhanced glass effect */}
          <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto transition-all duration-500">
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              style={{
                width: "94%",
                height: "94%",
                left: "3%",
                top: "3%",
                filter: "blur(20px)",
                zIndex: 0,
              }}
              animate={{
                opacity: [0.5, 0.7, 0.5],
                scale: [0.98, 1.01, 0.98],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Glass effect background */}
            {/* <div
              className="absolute rounded-full backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl"
              style={{
                width: "92%",
                height: "92%",
                left: "4%",
                top: "4%",
                zIndex: 1,
              }}
            /> */}

            <svg
              ref={svgRef}
              viewBox="0 0 300 300"
              className="w-full aspect-square relative z-10"
            >
              {/* Chart segments with enhanced animations */}
              {chartSegments.map((segment, index) => {
                const isBugBounty = segment.data.name === "BUG & BOUNTY";

                return (
                  <motion.path
                    key={`segment-${index}`}
                    d={segment.path}
                    fill={segment.color}
                    stroke="#FFFFFF"
                    strokeWidth={isBugBounty ? "1.5" : "1"}
                    onMouseEnter={() => handleMouseEnter(segment, index)}
                    onMouseLeave={handleMouseLeave}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      scale:
                        activeSegment === index ? 1.03 : isBugBounty ? 1.02 : 1,
                      filter:
                        activeSegment === index
                          ? "brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.4))"
                          : isBugBounty
                          ? "brightness(1.1)"
                          : "brightness(1)",
                    }}
                    transition={{
                      opacity: {
                        duration: 0.5,
                        delay: isBugBounty ? 0.5 : 0.2 + index * 0.05,
                      },
                      scale: { duration: 0.3 },
                      filter: { duration: 0.3 },
                    }}
                    style={{
                      cursor: "pointer",
                      zIndex: isBugBounty ? 10 : 1,
                    }}
                  />
                );
              })}

              {/* Inner circle (donut hole) with enhanced glass effect */}
              <motion.circle
                cx="150"
                cy="150"
                r={300 * 0.4 * 0.6 - 1}
                fill="#0a0a2a"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: "easeOut",
                }}
              />

              {/* Glass effect overlay on inner circle */}
              <motion.circle
                cx="150"
                cy="150"
                r={300 * 0.4 * 0.6 - 4}
                fill="url(#glassGradient)"
                opacity="0.7"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 0.7 : 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              />

              {/* Reflective highlights for glass effect */}
              <motion.ellipse
                cx="140"
                cy="140"
                rx={300 * 0.4 * 0.6 * 0.7}
                ry={300 * 0.4 * 0.6 * 0.4}
                fill="rgba(255, 255, 255, 0.12)"
                transform="rotate(-30 150 150)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />

              {/* Central token icon or logo placeholder */}
              {/* <motion.circle
                cx="150"
                cy="150"
                r="25"
                fill="url(#tokenGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.5,
                  type: "spring",
                  stiffness: 200,
                }}
              /> */}

              {/* Token symbol */}
              {/* <motion.img
                src={Logo}
                alt="IINGO Logo"
                className="h-16 w-auto absolute top-[155px] left-[150px] transform -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              /> */}

              {/* Definitions for gradients and filters */}
              <defs>
                <radialGradient
                  id="glassGradient"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                </radialGradient>

                <linearGradient
                  id="tokenGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>

                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>

            {/* Improved responsive labels */}
            <div className="absolute inset-0 pointer-events-none">
              {tokenomicsData.map((item, index) => {
                // Skip labels based on screen size and percentage
                if (!shouldShowLabel(item.percentage)) return null;

                const { x, y, isRightSide } = getLabelPosition(item, index);
                const isBugAndBounty = item.name === "BUG & BOUNTY";

                return (
                  <motion.div
                    key={`label-${index}`}
                    className={`absolute whitespace-nowrap text-xs md:text-sm text-white flex items-center gap-2 ${
                      isBugAndBounty ? "z-20" : ""
                    }`}
                    style={{
                      left: `${(x / 300) * 100}%`,
                      top: `${(y / 300) * 100}%`,
                      transform: `translate(${
                        isRightSide ? "0" : "-100%"
                      }, -50%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isInView && animationProgress > 0.8 ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: isBugAndBounty ? 0.6 : 1.8 + index * 0.1,
                    }}
                  >
                    {!isRightSide && (
                      <span className="text-right font-medium">
                        {item.name} {item.percentage}%
                      </span>
                    )}
                    {isRightSide && (
                      <>
                        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></span>
                        <span className="font-medium">
                          {item.name} {item.percentage}%
                        </span>
                      </>
                    )}
                    {!isRightSide && (
                      <span className="w-8 h-[1px] bg-gradient-to-r from-gray-400 to-transparent"></span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced tooltip with glass effect */}
            <AnimatePresence>
              {activeSegment !== null && (
                <motion.div
                  className="fixed z-50 px-4 py-3 rounded-xl shadow-lg pointer-events-none"
                  style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y - 40}px`,
                    transform: "translate(-50%, -100%)",
                    backgroundColor: "rgba(15, 15, 35, 0.7)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(128, 0, 255, 0.2)",
                    // Add positioning adjustment for Referrals and Bug & Bounty to prevent overlap
                    marginTop:
                      tokenomicsData[activeSegment].name === "REFERRALS"
                        ? "-15px"
                        : tokenomicsData[activeSegment].name === "BUG & BOUNTY"
                        ? "15px"
                        : "0px",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-bold text-white text-center mb-1">
                    {tokenomicsData[activeSegment].name}
                  </div>
                  <div
                    className="text-center text-xl font-semibold"
                    style={{ color: tokenomicsData[activeSegment].color }}
                  >
                    {tokenomicsData[activeSegment].percentage}%
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Improved legend with glass effect and responsive grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl mx-auto p-5 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView && animationProgress > 0.9 ? 1 : 0,
              y: isInView && animationProgress > 0.9 ? 0 : 20,
            }}
            transition={{
              duration: 0.8,
              delay: 2.2,
            }}
          >
            {tokenomicsData.map((item, index) => (
              <motion.div
                key={item.name}
                className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() =>
                  handleMouseEnter(chartSegments[index], index)
                }
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="w-4 h-4 md:w-5 md:h-5 rounded-md"
                  style={{
                    backgroundColor: item.color,
                    boxShadow:
                      activeSegment === index
                        ? `0 0 12px ${item.color}`
                        : "none",
                    transform:
                      activeSegment === index ? "scale(1.2)" : "scale(1)",
                    transition: "all 0.3s ease",
                  }}
                ></div>
                <span className="text-white text-sm md:text-base font-medium">
                  {item.name}{" "}
                  <span className="opacity-80">{item.percentage}%</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
