'use client';


import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


interface Dot {
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
  color: string;
}


function FloatingDots({ count = 25 }: { count?: number }) {
  const [dots, setDots] = useState<Dot[]>([]);
  useEffect(() => {
    const colors = ['bg-blue-300', 'bg-purple-300'];
    const generated = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${6 + Math.random() * 6}s`,
      animationDelay: `${Math.random() * 4}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setDots(generated);
  }, [count]);


  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`absolute h-2 w-2 rounded-full opacity-40 animate-float ${dot.color}`}
          style={{
            left: dot.left,
            top: dot.top,
            animationDuration: dot.animationDuration,
            animationDelay: dot.animationDelay,
          }}
        />
      ))}
    </>
  );
}


export default function StartPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[linear-gradient(to_right,#87a8ff20_1px,transparent_1px),linear-gradient(to_bottom,#87a8ff20_1px,transparent_1px)] bg-[size:50px_50px] animate-[gridMove_12s_linear_infinite]"></div>
      </div>

      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-300 opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-purple-300 opacity-20 blur-3xl animate-pulse" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloatingDots />
      </div>

      <motion.h1
        className="z-10 mb-4 text-center text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 md:text-9xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        MedPredict
      </motion.h1>
      <motion.p
        className="z-10 mb-8 max-w-2xl text-center text-xl font-semibold text-gray-800 md:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Predict, Prevent, Empower{' '}
        <span className="text-lg">your healthcare decisions</span>
      </motion.p>

      <motion.div
        className="z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Link href="/home">
          <motion.button
            className="rounded-full bg-blue-600 px-12 py-5 text-3xl font-extrabold tracking-wide text-white shadow-xl hover:bg-blue-700"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            Start
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}