import React, { useState, useEffect } from 'react';
import { Cake } from 'lucide-react';
import Confetti from 'react-confetti';

const BirthdayCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthdayDate = new Date(currentYear, 9, 28, 6, 0, 0); // October 28th at 6:00 AM
    
    if (now > birthdayDate) {
      birthdayDate.setFullYear(currentYear + 1);
    }
    
    const difference = birthdayDate - now;
    return Math.floor(difference / 1000);
  });

  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsBirthday(true);
      return;
    }

    const timerId = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [secondsLeft]);

  const days = Math.floor(secondsLeft / (24 * 60 * 60));
  const hours = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
  const seconds = secondsLeft % 60;

  const cakeColors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500'];

  const coloredName = "Rocket".split('').map((letter, index) => (
    <span key={index} className={cakeColors[index % cakeColors.length]}>
      {letter}
    </span>
  ));

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      {isBirthday && <Confetti />}
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
        {coloredName}<span className="text-black">'s</span>
      </h1>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Birthday Countdown!</h2>
      <div className="text-base sm:text-lg lg:text-xl mb-6 text-center">
        {!isBirthday ? (
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
            <span><span className="font-semibold">{days}</span> days</span>
            <span><span className="font-semibold">{hours}</span> hours</span>
            <span><span className="font-semibold">{minutes}</span> minutes</span>
            <span><span className="font-semibold">{seconds}</span> seconds</span>
          </div>
        ) : (
          <span>Happy Birthday!</span>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {cakeColors.map((color, index) => (
          <Cake 
            key={index} 
            className={`${color} w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 animate-bounce`} 
            style={{animationDelay: `${index * 0.2}s`}} 
          />
        ))}
      </div>
      <div className="mt-8 max-w-full">
      <img 
          src={`${process.env.PUBLIC_URL}/Day1Pic.jpg`} 
          alt="Birthday celebration" 
          style={{width: '300px', border: 'none'}}
        />
      </div>
    </div>
  );
};

export default BirthdayCountdown;