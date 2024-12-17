import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center my-16">
      <div className="flex justify-center gap-16">
        <div className="bg-white p-6 rounded-lg shadow-lg w-36">
          <span className="text-7xl font-bold text-primary block mb-3">
            {timeLeft.days}
          </span>
          <p className="text-gray-600 font-medium uppercase tracking-wider text-base">
            Days
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-36">
          <span className="text-7xl font-bold text-primary block mb-3">
            {timeLeft.hours}
          </span>
          <p className="text-gray-600 font-medium uppercase tracking-wider text-base">
            Hours
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-36">
          <span className="text-7xl font-bold text-primary block mb-3">
            {timeLeft.minutes}
          </span>
          <p className="text-gray-600 font-medium uppercase tracking-wider text-base">
            Minutes
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-36">
          <span className="text-7xl font-bold text-primary block mb-3">
            {timeLeft.seconds}
          </span>
          <p className="text-gray-600 font-medium uppercase tracking-wider text-base">
            Seconds
          </p>
        </div>
      </div>
    </div>
  );
}
