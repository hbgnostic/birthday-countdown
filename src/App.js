import React, { useState, useEffect } from 'react';
import { Balloon } from 'lucide-react';

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(`October 28, ${new Date().getFullYear()}`) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const balloonColors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Birthday Countdown!</h1>
      <div className="text-2xl mb-8">
        {Object.keys(timeLeft).length === 0 ? (
          <span>Happy Birthday!</span>
        ) : (
          <span>
            {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
          </span>
        )}
      </div>
      <div className="flex space-x-4 mb-8">
        {balloonColors.map((color, index) => (
          <Balloon key={index} className={`${color} w-16 h-16 animate-bounce`} style={{animationDelay: `${index * 0.2}s`}} />
        ))}
      </div>
    </div>
  );
};

export default BirthdayCountdown;