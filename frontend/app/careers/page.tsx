'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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

export default function CareersPage() {
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
                            Careers
                        </h1>
                    </div>
                    <p className="mt-5 max-w-2xl text-lg font-semibold text-white/85 md:text-xl">
                        Join our team and help build the future of medical prediction.
                    </p>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-extrabold text-gray-900">Why work here</h2>
                        <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-600">
                            We believe in the power of data to transform healthcare.
                            Our mission is to build tools that turn complex medical data into patient outcomes and empowering users.
                            If you are passionate about making a real impact and building products that matter, we would love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-extrabold text-gray-900">How we work</h2>
                        <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-600">
                            Our process is simple. Define a problem clearly, ship a clean version, test it with users.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <div>
                            <div className="text-lg font-extrabold text-gray-900">What we value</div>
                            <ul className="mt-4 space-y-3 text-sm font-semibold text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                    <span>Shipping clean, readable UI that makes data understandable</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
                                    <span>Truthful outputs (confidence + uncertainty) instead of overpromising</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                    <span>Strong engineering fundamentals: testing, validation, and clean code</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
                                    <span>Fast iteration with real feedback, not endless planning</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="text-lg font-extrabold text-gray-900">What you’ll own</div>
                            <ul className="mt-4 space-y-3 text-sm font-semibold text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                    <span>Product features end-to-end (design → build → test → ship)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
                                    <span>Readable outputs and explanation flows for model results</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                    <span>Performance, reliability, and deployment quality</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
                                    <span>Privacy-first patterns and safe data handling defaults</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Reveal>
                <section id="roles" className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl font-extrabold text-gray-900">Open roles</h2>
                            <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-600">
                                These are example listings to give a sense of the types of roles we are looking to fill.
                                If you are excited to work with us but do not see a match, we still encourage you to apply.
                            </p>
                        </div>
                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            {[
                                {
                                    title: 'Software Engineer',
                                    type: 'Remote • Full-time',
                                    body:
                                        'Build clean UI flows, wire APIs, and ship features fast. Strong React/Next.js fundamentals plus a willingness to touch backend.',
                                    tags: ['Next.js', 'React', 'FastAPI', 'PostgreSQL'],
                                },
                                {
                                    title: 'Data Engineer',
                                    type: 'Hybrid • Part-time',
                                    body:
                                        'Work on data synthesis, evaluation runs, and model iteration. Focus on repeatable tests and honest metrics.',
                                    tags: ['Python', 'Evaluation', 'Data Pipelines', 'Testing'],
                                },
                                {
                                    title: 'Product Designer (UI/UX)',
                                    type: 'Remote • Full-time',
                                    body:
                                        'Design calm, readable interfaces for medical data. Create flows that feel simple, not clinical or intimidating.',
                                    tags: ['UX', 'Figma', 'Design Systems', 'User Testing'],
                                },
                                {
                                    title: 'Security & Privacy Associate',
                                    type: 'Remote • Part-time',
                                    body:
                                        'Help define safe defaults, reduce data exposure, and write privacy-first documentation that teams can review.',
                                    tags: ['Privacy', 'Threat Modeling', 'Compliance', 'Documentation'],
                                },
                            ].map((r) => (
                                <div key={r.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-xl font-extrabold text-gray-900">{r.title}</div>
                                            <div className="mt-1 text-sm font-bold text-gray-500">{r.type}</div>
                                        </div>
                                        <a
                                            href="#apply"
                                            className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-extrabold text-gray-900 hover:bg-gray-50">
                                            Apply
                                        </a>
                                    </div>
                                    <p className="mt-4 text-sm font-semibold leading-relaxed text-gray-600">{r.body}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {r.tags.map((t) => (
                                            <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Reveal>

                <section id="apply" className="bg-white">
                    <Reveal>
                    <div className="mx-auto max-w-7xl px-6 py-4">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl font-extrabold text-gray-900">Apply</h2>
                            <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-600">
                                Show us your skills.
                            </p>
                        </div>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                            <div className="border p-6">
                                <div className="text-lg font-extrabold text-gray-900">What to include</div>
                                <ul className="mt-4 space-y-3 text-sm font-semibold text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                        <span>Your name + role you are applying for</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
                                        <span>Links: GitHub / portfolio / LinkedIn</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                        <span>1 to 2 projects that prove your skills</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
                                        <span>A short note on what you want to build at MedPredict</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="border p-6">
                                <div className="text-lg font-extrabold text-gray-900">Submit</div>
                                <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-600">
                                    Applications are routed to a real recruiter so we can keep submissions private, organized, and fair.
                                    To submit, email the materials to the address below with the subject line “Job Application - [Your Name] - [Role]”.
                                </p>
                                <div className="mt-6 flex flex-col gap-3 text-lg font-extrabold text-gray-900">
                                    <p className="text-sm">Email: hr.talent@medpredict.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Reveal>
                </section>

            <footer className="bg-gray-900 text-gray-300">
                <div className="mx-auto max-w-7xl px-6 py-5">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div>
                            <div className=" text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1">MedPredict</div>
                            <p className="text-xs">Turning Data Into Better Health Decisions</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Product</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/product/#catalog" className="hover:text-white">Catalog</a></li>
                                <li><a href="/product/#pricing" className="hover:text-white">Pricing</a></li>
                                <li><a href="/product/#FAQ" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/about" className="hover:text-white">About</a></li>
                                <li><a href="/careers" className="hover:text-white">Careers</a></li>
                                <li><a href="/technology" className="hover:text-white">Technology</a></li>
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
