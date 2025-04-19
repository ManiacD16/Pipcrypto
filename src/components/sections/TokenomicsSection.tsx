import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// Tokenomics data
const tokenomicsData = [
  { name: "ICO", percentage: 50, color: "#6B4E71" },
  { name: "STAKING", percentage: 15, color: "#4D4D4D" },
  { name: "ECOSYSTEM", percentage: 8, color: "#C9A66B" },
  { name: "AIRDROP", percentage: 8, color: "#C97B4B" },
  { name: "MARKETING", percentage: 7, color: "#8D4E3C" },
  { name: "ADVISORY/VOLS", percentage: 6, color: "#C25D5D" },
  { name: "REFERRALS", percentage: 5, color: "#4D7A7A" },
  { name: "BUG & BOUNTY", percentage: 1, color: "#D9A45B" },
];

const TokenomicsSection = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  // const [isMobile, setIsMobile] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  // Calculate the total percentage
  const totalPercentage = tokenomicsData.reduce(
    (acc, item) => acc + item.percentage,
    0
  );

  // Start animation when component mounts and check for mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 500);

    // Check if mobile device
    // const checkMobile = () => {
    //   setIsMobile(window.innerWidth < 768);
    // };

    // checkMobile();
    // window.addEventListener("resize", checkMobile);

    return () => {
      clearTimeout(timer);
      //   window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Animate the progress
  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 1500; // 1.5 seconds

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

    tokenomicsData.forEach((item) => {
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

      setTooltipPosition({
        x: x + svgRect.left,
        y: y + svgRect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveSegment(null);
  };

  // Calculate label positions - different for mobile and desktop
  // const getLabelPosition = (item: TokenomicItem, index: number) => {
  //   const size = 300;
  //   const center = size / 2;
  //   // Use different radius for mobile
  //   const labelRadius = isMobile
  //     ? size * 0.25 // Shorter distance on mobile
  //     : size * 0.42; // Normal distance on desktop

  //   // Calculate the angle for the middle of this segment
  //   let angleBeforeThis = tokenomicsData
  //     .slice(0, index)
  //     .reduce((acc, curr) => acc + curr.percentage, 0);

  //   const middleAngle =
  //     -Math.PI / 2 +
  //     ((angleBeforeThis + item.percentage / 2) / totalPercentage) * 2 * Math.PI;

  //   // Calculate position
  //   const x = center + labelRadius * Math.cos(middleAngle);
  //   const y = center + labelRadius * Math.sin(middleAngle);

  //   // Determine if label should be on left or right side
  //   const isRightSide = x > center;

  //   return { x, y, isRightSide, middleAngle };
  // };

  const chartSegments = generateChart();

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden ">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[100px]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[100px]"
          style={{ transform: "translate(50%, 50%)" }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">$IINGO</span>{" "}
            <TypeAnimation
              sequence={["Tokenomics", 2000, ""]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 100 }}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
            />
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our token economy is meticulously designed with a scarce supply of
            just 210 million tokens.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-8">
          {/* SVG Chart container - centered on all screens with glass effect */}
          <div className="relative w-full max-w-lg mx-auto">
            {/* Glass effect background */}
            {/* <div
              className="absolute inset-0 rounded-full backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl"
              style={{
                width: "90%",
                height: "90%",
                left: "5%",
                top: "5%",
                zIndex: 0,
              }}
            /> */}
            <svg
              ref={svgRef}
              viewBox="0 0 300 300"
              className="w-full aspect-square relative z-10 "
            >
              {/* Chart segments */}
              {chartSegments.map((segment, index) => (
                <path
                  key={`segment-${index}`}
                  d={segment.path}
                  fill={segment.color}
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  onMouseEnter={() => handleMouseEnter(segment, index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transition: "transform 0.2s, filter 0.2s",
                    transform:
                      activeSegment === index ? "scale(1.03)" : "scale(1)",
                    filter:
                      activeSegment === index
                        ? "brightness(1.1) drop-shadow(0 0 4px rgba(255,255,255,0.3))"
                        : "brightness(1)",
                    cursor: "pointer",
                  }}
                />
              ))}

              {/* Inner circle (donut hole) with glass effect */}
              <circle
                cx="150"
                cy="150"
                r={300 * 0.4 * 0.6 - 1}
                fill="#0a0a2a"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />

              {/* Glass effect overlay on inner circle */}
              <circle
                cx="150"
                cy="150"
                r={300 * 0.4 * 0.6 - 4}
                fill="url(#glassGradient)"
                opacity="0.6"
              />

              {/* Reflective highlights for glass effect */}
              <ellipse
                cx="140"
                cy="140"
                rx={300 * 0.4 * 0.6 * 0.7}
                ry={300 * 0.4 * 0.6 * 0.4}
                fill="rgba(255, 255, 255, 0.08)"
                transform="rotate(-30 150 150)"
              />

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
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                </radialGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>

            {/* Labels - only show on desktop or selected ones on mobile */}
            {/* <div className="absolute inset-0">
              {tokenomicsData.map((item, index) => {
                // On mobile, only show labels for segments > 10%
                if (isMobile && item.percentage < 10) return null;

                const { x, y, isRightSide } = getLabelPosition(item, index);

                return (
                  <motion.div
                    key={`label-${index}`}
                    className="absolute whitespace-nowrap text-xs text-white flex items-center gap-2"
                    style={{
                      left: `${(x / 300) * 100}%`,
                      top: `${(y / 300) * 100}%`,
                      transform: `translate(${
                        isRightSide ? "0" : "-100%"
                      }, -50%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isInView && animationProgress > 0.7 ? 1 : 0,
                    }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    {!isRightSide && (
                      <span className="text-right">
                        {item.name} {item.percentage}%
                      </span>
                    )}
                    {isRightSide && (
                      <>
                        <span className="w-8 h-[1px] bg-gray-500"></span>
                        <span>
                          {item.name} {item.percentage}%
                        </span>
                      </>
                    )}
                    {!isRightSide && (
                      <span className="w-8 h-[1px] bg-gray-500"></span>
                    )}
                  </motion.div>
                );
              })}
            </div> */}

            {/* Custom tooltip with glass effect */}
            {activeSegment !== null && (
              <div
                className="absolute z-20 px-3 py-2 rounded-md shadow-lg pointer-events-none text-sm"
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y - 40}px`,
                  transform: "translate(-50%, -100%)",
                  backgroundColor: "rgba(15, 15, 35, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="font-bold text-white">
                  {tokenomicsData[activeSegment].name}
                </div>
                <div className="text-center text-white">
                  {tokenomicsData[activeSegment].percentage}%
                </div>
              </div>
            )}
          </div>

          {/* Legend - now below the chart on all screen sizes with glass effect */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-3xl mx-auto p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView && animationProgress > 0.9 ? 1 : 0 }}
            transition={{ delay: 2 }}
          >
            {tokenomicsData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded-sm transition-colors cursor-pointer"
                onMouseEnter={() =>
                  handleMouseEnter(chartSegments[index], index)
                }
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor: item.color,
                    transform:
                      activeSegment === index ? "scale(1.2)" : "scale(1)",
                    transition: "transform 0.2s",
                  }}
                ></div>
                <span className="text-white text-sm">
                  {item.name} {item.percentage}.00%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
