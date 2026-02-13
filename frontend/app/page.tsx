'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoginModal from '@/components/LoginModal';

const BACKGROUNDS = [
  '/backgrounds/bg1.jpg',
  '/backgrounds/bg2.jpg',
  '/backgrounds/bg3.jpg',
  '/backgrounds/bg4.jpg',
  '/backgrounds/bg5.jpg',
];

interface Dot {
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
  color: string;
}

function FloatingDots() {
  const colors = ['bg-blue-300', 'bg-purple-300'];
  const [dots, setDots] = useState<Dot[] | null>(null);

  useEffect(() => {
    const generated = Array.from({ length: 35 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 4}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setDots(generated);
  }, []);

  if (!dots) return null;

  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`absolute h-2 w-2 rounded-full ${dot.color} animate-float`}
          style={{
            left: dot.left,
            top: dot.top,
            opacity: 0.35,
            animationDuration: dot.animationDuration,
            animationDelay: dot.animationDelay,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export default function LandingPage() {
  const [authed, setAuthed] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * BACKGROUNDS.length));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <section className="relative min-h-screen overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BACKGROUNDS[index]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingDots />
        </div>

        <header className="sticky top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              MedPredict
            </div>

            <nav className="hidden items-center gap-6 md:flex">
              <a href="#features" className="text-sm font-semibold text-white/80 hover:text-white">
                Features
              </a>
              <a href="#how" className="text-sm font-semibold text-white/80 hover:text-white">
                How it works
              </a>
              <a href="#about" className="text-sm font-semibold text-white/80 hover:text-white">
                About
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/15"
                onClick={() => setLoginOpen(true)}
              >
                Log in
              </button>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-6xl flex-col justify-center px-6 pb-20">
          <motion.h1
            className="max-w-3xl text-5xl font-extrabold tracking-tight text-white md:text-6xl"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Make predictions based on your health numbers.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-lg font-semibold text-white/85 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            Analyzes common data to
            estimate risk for diseases starting with <span className="font-extrabold text-2xl">atherosclerosis</span>.
          </motion.p>

          <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center">
            <motion.p className="text-white/80 hover:text-white text-sm font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}>
              Scroll to explore 
              <motion.span
                className='block text-center'
                initial={{ opacity: 0, y: -18 }}
                animate={{ y: [0, 5, 0], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🡇
              </motion.span>
            </motion.p>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900">What <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"> MedPredict </span> does</h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Designed to be scalable across diseases while starting with atherosclerosis risk prediction.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-lg font-extrabold text-red-400">Risk Prediction</div>
            <p className="mt-2 text-sm text-gray-600">
              Input common metrics to receive a risk stage and probability score.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-lg font-extrabold text-red-400">Model Selection</div>
            <p className="mt-2 text-sm text-gray-600">
              Compare outputs across multiple ML models (baseline → deep learning).
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-lg font-extrabold text-red-400">Actionable Guidance</div>
            <p className="mt-2 text-sm text-gray-600">
              Generates recommendations to support better health decisions and prevention.
            </p>
          </div>
        </div>
      </section>
      <section id="how" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-extrabold text-gray-900">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="text-sm font-bold text-blue-400">Step 1</div>
              <div className="mt-2 text-lg font-extrabold text-gray-700">Login for privacy</div>
              <p className="mt-2 text-sm text-gray-600">
                Your health inputs and prediction history are protected by your account.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="text-sm font-bold text-blue-400">Step 2</div>
              <div className="mt-2 text-lg font-extrabold text-gray-700">Enter your metrics</div>
              <p className="mt-2 text-sm text-gray-600">
                Blood pressure, cholesterol, BMI, glucose, and other factors.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow flex flex-col h-full">
              <div className="text-sm font-bold text-blue-400">Step 3</div>
              <div className="mt-2 text-lg font-extrabold text-gray-700">Get results</div>
              <p className="mt-2 text-sm text-gray-600">
                View risk stage, probability, and recommended next actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">MedPredict</div>
              <p className="text-sm">Turning Data Into Better Health Decisions</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#how" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-400">LinkedIn</a>
                <a href="#" className="hover:text-blue-400">GitHub</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 MedPredict. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => setAuthed(true)}
      />
    </main>
  );
}
