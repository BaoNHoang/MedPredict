'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import LoginModal from '@/components/LoginModal';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const bp = (p: string) => `${BASE}${p}`;

const BACKGROUNDS = [
    bp('/backgrounds/bg1.jpg'),
    bp('/backgrounds/bg2.jpg'),
    bp('/backgrounds/bg3.jpg'),
    bp('/backgrounds/bg4.jpg'),
    bp('/backgrounds/bg5.jpg'),
];

function Reveal({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 12, }}
            whileInView={{ opacity: 1, y: 0, }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0 }}>
            {children}
        </motion.div>
    );
}

export default function TechnologyPage() {
    const [authed, setAuthed] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(Math.floor(Math.random() * BACKGROUNDS.length));
        }, 9000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        BACKGROUNDS.forEach((src) => {
            const img = new Image();
            img.decoding = 'async';
            img.src = src;
        });
    }, []);

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <section className="relative min-h-[10vh] max-h-[300px] overflow-hidden">
                <AnimatePresence>
                    <motion.div
                        key={index}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${BACKGROUNDS[index]})` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, ease: 'easeInOut' }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
                <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link
                            href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                            MedPredict
                        </Link>
                        <nav className="hidden items-center gap-25 md:flex">
                            <Link href="/" className="text-1xl font-semibold text-white/80 hover:text-white">
                                Home
                            </Link>
                            <Link href="/about" className="text-1xl font-semibold text-white/80 hover:text-white">
                                About
                            </Link>
                            <Link href="/product" className="text-1xl font-semibold text-white/80 hover:text-white">
                                Product
                            </Link>
                            <Link href="/technology" className="text-1xl font-semibold text-white/80 hover:text-white">
                                Technology
                            </Link>
                            <Link href="/careers" className="text-1xl font-semibold text-white/80 hover:text-white">
                                Careers
                            </Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <button
                                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/15"
                                onClick={() => setLoginOpen(true)}>
                                Log in
                            </button>
                        </div>
                    </div>
                </header>
                <div className="relative mx-auto flex min-h-[calc(30vh-72px)] max-w-6xl flex-col justify-center px-6 pb-2">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
                            Technology
                        </h1>
                    </div>
                    <p className="mt-5 max-w-2xl text-lg font-semibold text-white/85 md:text-xl">
                        Learn more about how we are built.
                    </p>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-extrabold text-gray-900">How it works</h2>
                        <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-600">
                            MedPredict is medical prediction proxy application designed to behave like a product. The goal is to convert
                            common health numbers into a clear stage and explanation, while keeping the experience fast and readable.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: 'Input normalization',
                                body:
                                    'We validate ranges, handle missing values safely, and standardize the format of user inputs so models behave consistently.',
                                label: 'Examples',
                                bullets: ['Range checks (e.g., BP, cholesterol)', 'Safe defaults for “unknown” fields'],
                            },
                            {
                                title: 'Risk staging',
                                body:
                                    'The core model converts inputs into a stage label and a 0–100 style risk score so results are easy to interpret.',
                                label: 'Outputs',
                                bullets: ['Stage 1–4 classification', 'Risk score for ranking + trends'],
                            },
                            {
                                title: 'Recommendation + explanation',
                                body:
                                    'Every result is paired with a recommendation and a short, readable “why” section that highlights the biggest contributors.',
                                label: 'Behavior',
                                bullets: ['Recommendation for next steps', 'Key drivers shown in plain language'],
                            },
                        ].map((s) => (
                            <div key={s.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="mt-2 text-smed font-extrabold text-gray-900">{s.title}</div>
                                <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-600">{s.body}</p>
                                <div className="mt-4 text-xs font-extrabold uppercase tracking-wider text-gray-500">{s.label}</div>
                                <ul className="mt-2 space-y-2 text-sm font-semibold text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                        <span>{s.bullets[0]}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
                                        <span>{s.bullets[1]}</span>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-extrabold text-gray-900">Pipeline & Technology Stack</h2>
                        <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-600">
                            A system built to make it easy to add new additions.
                        </p>
                    </div>
                    <Reveal>
                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="text-lg font-extrabold text-gray-900">Frontend</div>
                                <p className="mt-2 text-sm font-semibold text-gray-600">
                                    Next.js + React.js + TailwindCSS for fast, responsive pages and consistent UI components.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">Next.js</span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">React</span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">Tailwind</span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">Framer Motion</span>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="text-lg font-extrabold text-gray-900">API & model serving</div>
                                <p className="mt-2 text-sm font-semibold text-gray-600">
                                    FastAPI for validation of inputs, running the model, and returning a structured result.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">FastAPI</span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">Python</span>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="text-lg font-extrabold text-gray-900">Data & storage</div>
                                <p className="mt-2 text-sm font-semibold text-gray-600">
                                    Secure user accounts + saved runs + history views. Designed to keep storage minimal and intentional.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">PostgreSQL</span>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="text-lg font-extrabold text-gray-900">Deployment</div>
                                <p className="mt-2 text-sm font-semibold text-gray-600">
                                    Optimized for fast web delivery. Can run as static-friendly UI + API backend hosted separately.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">AWS</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <footer className="bg-gray-900 text-gray-300">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div>
                            <div className=" text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">MedPredict</div>
                            <p className="text-sm">Turning Data Into Better Health Decisions</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Product</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/#features" className="hover:text-white">Features</a></li>
                                <li><a href="/product/#how" className="hover:text-white">How it Works</a></li>
                                <li><a href="/product/#pricing" className="hover:text-white">Pricing</a></li>
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
                                <a href="#" className="hover:text-blue-400">Instagram</a>
                                <a href="https://www.linkedin.com/in/bao-nguyen-hoang/" className="hover:text-blue-400">LinkedIn</a>
                                <a href="https://github.com/BaoNHoang/MedPredict://github.com/BaoNHoang/" className="hover:text-blue-400">GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 border-t border-gray-700 pt-5 text-center text-sm">
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