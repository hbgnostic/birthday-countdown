import { Cake } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import { FollowerPointerCard } from './components/ui/following-pointer'
import { AuroraBackground } from './lib/background'

const BirthdayCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    let birthdayDate = new Date(currentYear, 9, 28, 18, 23, 0) // October 28th at 6:23 PM

    if (now > birthdayDate) {
      birthdayDate.setFullYear(currentYear + 1)
    }

    const difference = birthdayDate - now
    return Math.floor(difference / 1000)
  })

  const [isBirthday, setIsBirthday] = useState(false)
  const [poppingIdx, setPoppingIdx] = useState(null)
  const popTimer = useRef(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    function schedulePop() {
      popTimer.current = setTimeout(() => {
        const idx = Math.floor(Math.random() * pokemon.length)
        setPoppingIdx(idx)
        setTimeout(() => {
          setPoppingIdx(null)
          schedulePop()
        }, 700)
      }, 1200 + Math.random() * 2200)
    }
    schedulePop()
    return () => clearTimeout(popTimer.current)
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsBirthday(true)
      return
    }

    const timerId = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [secondsLeft])

  const days = Math.floor(secondsLeft / (24 * 60 * 60))
  const hours = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((secondsLeft % (60 * 60)) / 60)
  const seconds = secondsLeft % 60

const cakeColors = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-orange-500',
]

const pokemon = [
  { id: 25,  name: 'Pikachu' },
  { id: 6,   name: 'Charizard' },
  { id: 1,   name: 'Bulbasaur' },
  { id: 7,   name: 'Squirtle' },
  { id: 150, name: 'Mewtwo' },
  { id: 133, name: 'Eevee' },
  { id: 94,  name: 'Gengar' },
]

const coloredName = 'Rocket'.split('').map((letter, index) => (
  <span key={index} className={cakeColors[index]}>
    {letter}
  </span>
))

  return (
    <>
      <div className="text-center">
        {isBirthday && <Confetti />}
        <h1 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
          {coloredName}
          <span className="text-black">'s</span>
        </h1>
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
          Birthday Countdown!
        </h2>
        <div className="mb-6 text-center text-base sm:text-lg lg:text-xl">
          {!isBirthday ? (
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>
                <span className="font-semibold">{days}</span> days
              </span>
              <span>
                <span className="font-semibold">{hours}</span> hours
              </span>
              <span>
                <span className="font-semibold">{minutes}</span> minutes
              </span>
              <span>
                <span className="font-semibold">{seconds}</span> seconds
              </span>
            </div>
          ) : (
            <span>Happy Birthday!</span>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {cakeColors.map((color, index) => (
            <Cake
              key={index}
              className={`${color} h-10 w-10 animate-bounce sm:h-12 sm:w-12 lg:h-14 lg:w-14`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {pokemon.map((p, i) => (
            <motion.div
              key={p.id}
              className="flex flex-col items-center cursor-pointer"
              animate={poppingIdx === i
                ? { y: [0, -55, 0], scale: [1, 1.5, 1], rotate: [0, -14, 14, 0] }
                : { y: [0, -(6 + i * 2), 0] }
              }
              transition={poppingIdx === i
                ? { duration: 0.65, ease: 'easeOut' }
                : { duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }
              }
              whileHover={{ scale: 1.35, y: -14, transition: { duration: 0.2 } }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                alt={p.name}
                className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
              />
              <span className="text-xs font-semibold mt-1 text-gray-700">{p.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

function BirthdayCountdownWrapper() {
  console.log("Rendering BirthdayCountdownWrapper");
  return (
    <FollowerPointerCard
      title={
        <TitleComponent
          title={blogContent.author}
          avatar={blogContent.authorAvatar}
        />
      }
    >
      <AuroraBackground>
        <BirthdayCountdown />
      </AuroraBackground>
    </FollowerPointerCard>
  );
}

const blogContent = {
  author: "This is fun",
  date: '28th October, 2026',
  title: "Rocket's Birthday Countdown",
  description: "Counting down the days to Rocket's big day!",
  image: `${process.env.PUBLIC_URL}/Day1Pic.jpg`,
  authorAvatar: `${process.env.PUBLIC_URL}/Day1Pic.jpg`,
}

const TitleComponent = ({ title, avatar }) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      alt="thumbnail"
      className="w-5 h-5 rounded-full border-2 border-white object-cover"
      onError={(e) => {
        console.error("Error loading avatar:", avatar);
        e.target.src = 'https://placehold.co/20x20';
      }}
    />
    <p className="text-sm">{title}</p>
  </div>
);

export default BirthdayCountdownWrapper
