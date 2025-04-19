import React, { useEffect, useRef } from "react";

// Define cryptocurrency icons with more simplified designs to match the image
const cryptoIcons = [
  {
    name: "Bitcoin",
    color: "#F7931A",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#F7931A" />
        <path
          d="M17 11.5c0-2.5-2-3-4-3.5.5-2.5-4-2.5-4-1v-1h-1v1h-1v-1h-1v1h-2v1h1c.5 0 .5 0 .5.5v5c0 .5 0 .5-.5.5h-1v1h2v1h1v-1h1v1h1v-1c3 0 5-.5 5-3 0-1-1-2-2-2.5 1-.5 2-1 2-2zm-8 4v-2.5h2c1.5 0 2 .5 2 1.25s-.5 1.25-2 1.25h-2zm0-5.5h1.5c1.5 0 1.5 1 1.5 1.25s0 1.25-1.5 1.25h-1.5v-2.5zm5 5.5c0 1.25-1 1.5-2 1.5h-3v-3h3c1 0 2 .25 2 1.5z"
          fill="white"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 200,
    orbitSpeed: 50,
    startAngle: 0,
  },
  {
    name: "Ethereum",
    color: "#627EEA",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#627EEA" />
        <path
          d="M12 4v6l6 2.5L12 4zm0 0v6l-6 2.5L12 4zm0 16.5v-5l6-3.5L12 20.5zm0 0v-5l-6-3.5L12 20.5zm0-5.5V9l-6-2.5 6 8.5zm0 0V9l6-2.5-6 8.5z"
          fill="white"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 100,
    orbitSpeed: 50,
    startAngle: 60,
  },
  {
    name: "Binance",
    color: "#F3BA2F",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#F3BA2F" />
        <path
          d="M12 7L14.5 9.5 12 12 9.5 9.5 12 7zM12 4L17 9 14.5 11.5 12 9 9.5 11.5 7 9 12 4zM12 16L14.5 13.5 17 16 14.5 18.5 12 16zM12 19L17 14 14.5 11.5 12 14 9.5 11.5 7 14 12 19zM16 12L15 11 14 12 15 13 16 12z"
          fill="white"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 200,
    orbitSpeed: 50,
    startAngle: 120,
  },
  {
    name: "Dash",
    color: "#008CE7",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#008CE7" />
        <path
          d="M7 8h6l-.5 2h-6L7 8zM6 12h6l-.5 2H5.5L6 12zM9 16l1-4h4l-1 4H9z"
          fill="white"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 100,
    orbitSpeed: 50,
    startAngle: 120,
  },
  {
    name: "Tron",
    color: "#EF0027",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#EF0027" />
        <path d="M12 5l6 12h-12l6-12zm0 3l-3 6h6l-3-6z" fill="white" />
      </svg>
    ),
    size: 50,
    orbitRadius: 200,
    orbitSpeed: 50,
    startAngle: 180,
  },
  {
    name: "Polkadot",
    color: "#E6007A",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#E6007A" />
        <circle cx="12" cy="12" r="3" fill="white" />
        <circle cx="12" cy="6" r="1.5" fill="white" />
        <circle cx="12" cy="18" r="1.5" fill="white" />
        <circle cx="6" cy="12" r="1.5" fill="white" />
        <circle cx="18" cy="12" r="1.5" fill="white" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="white" />
        <circle cx="16.5" cy="16.5" r="1.5" fill="white" />
        <circle cx="7.5" cy="16.5" r="1.5" fill="white" />
        <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
      </svg>
    ),
    size: 50,
    orbitRadius: 100,
    orbitSpeed: 50,
    startAngle: 180,
  },
  {
    name: "Solana",
    color: "#14F195",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#9945FF" />
        <path
          d="M8 16l2 2h8l-2-2H8zm0-5l2 2h8l-2-2H8zm0-5l2 2h8l-2-2H8z"
          fill="#14F195"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 200,
    orbitSpeed: 50,
    startAngle: 240,
  },
  {
    name: "Chainlink",
    color: "#2A5ADA",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#2A5ADA" />
        <path
          d="M12 6l-1.5 1v4l1.5 1 1.5-1V7L12 6zm0 12l-1.5-1v-4l1.5-1 1.5 1v4L12 18zm3-6l-1.5-1h-3L9 12l1.5 1h3l1.5-1z"
          fill="white"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 100,
    orbitSpeed: 50,
    startAngle: 240,
  },
  {
    name: "Filecoin",
    color: "#42C1CA",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#42C1CA" />
        <path
          d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
          fill="white"
        />
        <circle cx="12" cy="12" r="2" fill="white" />
      </svg>
    ),
    size: 50,
    orbitRadius: 200,
    orbitSpeed: 50,
    startAngle: 300,
  },
  {
    name: "Cardano",
    color: "#0033AD",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#0033AD" />
        <circle cx="12" cy="8" r="1" fill="white" />
        <circle cx="9" cy="9.5" r="1" fill="white" />
        <circle cx="8" cy="12" r="1" fill="white" />
        <circle cx="9" cy="14.5" r="1" fill="white" />
        <circle cx="12" cy="16" r="1" fill="white" />
        <circle cx="15" cy="14.5" r="1" fill="white" />
        <circle cx="16" cy="12" r="1" fill="white" />
        <circle cx="15" cy="9.5" r="1" fill="white" />
      </svg>
    ),
    size: 50,
    orbitRadius: 100,
    orbitSpeed: 50,
    startAngle: 300,
  },
  {
    name: "Avalanche",
    color: "#E84142",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#E84142" />
        <path
          d="M16 16h-2l-2-3-2 3H8l3-5-3-5h2l2 3 2-3h2l-3 5 3 5z"
          fill="white"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 200,
    orbitSpeed: 50,
    startAngle: 360,
  },
  {
    name: "Cosmos",
    color: "#5064FB",
    icon: (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="#5064FB" />
        <circle cx="12" cy="12" r="3" fill="white" />
        <ellipse
          cx="12"
          cy="12"
          rx="7"
          ry="3"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="7"
          ry="3"
          fill="none"
          stroke="white"
          strokeWidth="1"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="7"
          ry="3"
          fill="none"
          stroke="white"
          strokeWidth="1"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
    size: 50,
    orbitRadius: 100,
    orbitSpeed: 50,
    startAngle: 360,
  },
];

// Central logo component
// const CentralLogo = () => (
//   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-10">
//     <div className="relative w-full h-full">
//       <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//         <rect
//           x="30"
//           y="30"
//           width="40"
//           height="40"
//           fill="#FF3B3B"
//           transform="rotate(45 50 50)"
//         />
//         <rect
//           x="40"
//           y="20"
//           width="20"
//           height="40"
//           fill="#8B41FF"
//           transform="rotate(45 50 50)"
//         />
//       </svg>
//       {/* Glow effect */}
//       <div
//         className="absolute inset-0 rounded-full z-0"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(255,59,59,0.3) 0%, rgba(139,65,255,0.2) 70%, transparent 100%)",
//           filter: "blur(15px)",
//         }}
//       />
//     </div>
//   </div>
// );

interface OrbitingIconProps {
  icon: React.ReactNode;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
}

const OrbitingIcon: React.FC<OrbitingIconProps> = ({
  icon,
  size,
  orbitRadius,
  orbitSpeed,
  startAngle,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animationName = `orbit-${startAngle}-${orbitRadius}`;

    if (!document.getElementById(animationName)) {
      const style = document.createElement("style");
      style.id = animationName;
      style.innerHTML = `
        @keyframes ${animationName} {
          from {
            transform: rotate(${startAngle}deg) translateX(${orbitRadius}px) rotate(-${startAngle}deg);
          }
          to {
            transform: rotate(${
              startAngle + 360
            }deg) translateX(${orbitRadius}px) rotate(-${startAngle + 360}deg);
          }
        }
      `;
      document.head.appendChild(style);
    }

    if (iconRef.current) {
      iconRef.current.style.animation = `${animationName} ${orbitSpeed}s linear infinite`;
    }
  }, [orbitRadius, orbitSpeed, startAngle]);

  return (
    <div
      ref={iconRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Icon with glow effect */}
      <div className="relative w-full h-full">
        <div
          className="absolute inset-0 rounded-full z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            filter: "blur(5px)",
          }}
        />
        <div className="relative z-10 w-full h-full">{icon}</div>
      </div>
    </div>
  );
};

// Grid background component
// const GridBackground = () => (
//   <div
//     className="absolute inset-0 w-full h-full"
//     style={{
//       backgroundColor: "#1a0e2e",
//       backgroundImage: `
//       linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
//       linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
//     `,
//       backgroundSize: "40px 40px",
//       zIndex: -1,
//     }}
//   />
// );

const OrbitingCryptoIcons = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* <GridBackground /> */}

      {/* Container for orbit paths and glows */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Orbit paths (optional) */}
        {/* {cryptoIcons.map((crypto, index) => (
          <div
            key={`orbit-${index}`}
            className="absolute top-1/2 left-1/2 rounded-full border border-white/5"
            style={{
              width: `${crypto.orbitRadius * 2}px`,
              height: `${crypto.orbitRadius * 2}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))} */}

        {/* Center glow */}
        {/* <div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(255,110,110,0.1) 0%, rgba(138,43,226,0.05) 50%, transparent 70%)",
            filter: "blur(20px)",
          }}
        /> */}

        {/* Central logo */}
        {/* <CentralLogo /> */}

        {/* Orbiting icons */}
        {cryptoIcons.map((crypto) => (
          <OrbitingIcon
            key={crypto.name}
            icon={crypto.icon}
            size={crypto.size}
            orbitRadius={crypto.orbitRadius}
            orbitSpeed={crypto.orbitSpeed}
            startAngle={crypto.startAngle}
          />
        ))}
      </div>
    </div>
  );
};

export default OrbitingCryptoIcons;
