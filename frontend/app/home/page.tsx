'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    return (
        <main className="mx-auto max-w-4xl p-10">
            <h1 className="mb-8 text-3xl font-bold">Home</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <button
                    onClick={() => router.push('/predictor')}
                    className="rounded-xl bg-white p-6 shadow hover:shadow-lg"
                >
                    Disease Predictor
                </button>

                <button
                    onClick={() => router.push('/dashboard')}
                    className="rounded-xl bg-white p-6 shadow hover:shadow-lg"
                >
                    Dashboard
                </button>
            </div>
        </main>
    );
}