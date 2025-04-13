import React, { useState, useEffect } from "react";

type CountdownTimerProps = {
  targetDate: Date;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className="flex items-center justify-center text-white">
      <div className="flex space-x-2 md:space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs md:text-sm text-gray-200 ">Days</span>
          <span className="text-3xl md:text-5xl font-bold">
            {formatNumber(timeLeft.days)}
          </span>
        </div>

        <span className="text-3xl md:text-5xl font-bold text-red-400  mt-6">
          :
        </span>

        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs md:text-sm text-gray-200">Hours</span>
          <span className="text-3xl md:text-5xl font-bold">
            {formatNumber(timeLeft.hours)}
          </span>
        </div>

        <span className="text-3xl md:text-5xl font-bold text-red-400 mt-6">
          :
        </span>

        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs md:text-sm text-gray-200">Minutes</span>
          <span className="text-3xl md:text-5xl font-bold">
            {formatNumber(timeLeft.minutes)}
          </span>
        </div>

        <span className="text-3xl md:text-5xl font-bold text-red-400 mt-6">
          :
        </span>

        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs md:text-sm text-gray-200">Seconds</span>
          <span className="text-3xl md:text-5xl font-bold">
            {formatNumber(timeLeft.seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
