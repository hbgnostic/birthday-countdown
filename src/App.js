import React, { useState, useEffect } from 'react';
import { Cake } from 'lucide-react';
import Confetti from 'react-confetti';

const BirthdayCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthdayDate = new Date(`October 28, ${currentYear} 00:00:00`);
    
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-16">
      {isBirthday && <Confetti />}
      <h1 className="text-4xl font-bold mb-4">
        {coloredName}<span className="text-black">'s</span>
      </h1>
      <h2 className="text-3xl font-bold mb-8">Birthday Countdown!</h2>
      <div className="text-2xl mb-8">
        {!isBirthday ? (
          <span>
            {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
          </span>
        ) : (
          <span>Happy Birthday!</span>
        )}
      </div>
      <div className="flex space-x-4 mb-8">
        {cakeColors.map((color, index) => (
          <Cake 
            key={index} 
            className={`${color} w-16 h-16 animate-bounce`} 
            style={{animationDelay: `${index * 0.2}s`}} 
          />
        ))}
      </div>
    </div>
  );
};

export default BirthdayCountdown;