'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/LoginModal';
import LogoutConfirmModal from '@/components/LogoutConfirmModal';

const API_BASE = '/api';

type ID = {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
};

type PredictionResult = {
    history_id?: number;
    health_label?: string;
    risk_score?: number;
    plaque_stage?: number;
    stage_name?: string;
    severity?: string;
    summary?: string;
    recommendations?: string[];
    warning?: string;
};

type PredictPayload = {
    age_years: number;
    sex: string;
    height_cm: number;
    weight_kg: number;
    smoking_status: string;
    activity_level: string;
    family_history_heart_disease: boolean;
    hypertension: boolean;
    diabetes: boolean;
    on_statin: boolean;
    on_bp_meds: boolean;
    clinical_ascvd_history: boolean;
    heart_attack_history: boolean;
    stroke_tia_history: boolean;
    peripheral_artery_disease_history: boolean;
    recent_cardio_event_12mo: boolean;
    multi_plaque_dev: boolean;
    blood_pressure_mmHg: number;
    ldl_mg_dL: number;
};

type PredictionHistoryItem = {
    id: number;
    timeCreated: string;
    inputs: PredictPayload;
    results: PredictionResult;
};

export default function HistoryPage() {
    const router = useRouter();
    const [loginOpen, setLoginOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [id, setID] = useState<ID | null>(null);
    const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function loadHistory() {
        try {
            setError(null);

            const res = await fetch(`${API_BASE}/predict/history`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.detail || 'Could not load history');
            }

            const data = (await res.json()) as PredictionHistoryItem[];
            setHistory(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    }

    async function process() {
        try {
            setError(null);
            const res = await fetch(`${API_BASE}/auth/cookie`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!res.ok) {
                setID(null);
                setLoginOpen(true);
                return;
            }
            const data = (await res.json()) as ID;
            setID(data);
            await loadHistory();
        } catch {
            setID(null);
        }
    }

    useEffect(() => {
        process();
    }, []);

    async function logout() {
        try {
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } finally {
            setID(null);
            setHistory([]);
            setLogoutOpen(false);
            setLoginOpen(true);
        }
    }

    return (
        <main className="min-h-screen">
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-800 to-slate-700" />
                <div className="relative mx-auto max-w-7xl px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="flex flex-col gap-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent">
                                MedPredict
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-extrabold text-white ring-1 ring-white/15 hover:bg-white/25"
                                    onClick={() => router.push('/')}>
                                    Home
                                </button>
                                <button
                                    className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-extrabold text-slate-900 hover:bg-slate-100"
                                    onClick={() => router.push('/predictor')}>
                                    Predictor
                                </button>
                                {id ? (
                                    <button
                                        className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-extrabold text-white ring-1 ring-white/15 hover:bg-red-800"
                                        onClick={() => setLogoutOpen(true)}>
                                        Logout
                                    </button>
                                ) : (
                                    <button
                                        className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-extrabold text-white ring-1 ring-white/15 hover:bg-white/15"
                                        onClick={() => setLoginOpen(true)}>
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            {id ? (
                                <div className="text-lg font-extrabold text-white">
                                    <h1 className="text-4xl font-extrabold text-white md:text-5xl">
                                        History
                                    </h1>
                                </div>
                            ) : (
                                <div className="text-lg font-extrabold text-white/80">
                                    Please login to access your history
                                </div>
                            )}
                            <div className="mt-3 text-sm font-semibold text-white/75">
                                Note: This history is for informational product features only.
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-10">
                {!id ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
                                <div className="mt-4 h-6 w-44 animate-pulse rounded bg-gray-100" />
                                <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-100" />
                                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-gray-100" />
                                <div className="mt-6 h-10 w-32 animate-pulse rounded-xl bg-gray-100" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <button
                            className="rounded-xl border border-gray-300 bg-gray px-6 py-2 text-md font-extrabold text-black hover:bg-gray-100"
                            onClick={() => router.push('/dashboard')}>
                            Back
                        </button>
                        <div className="mt-2 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="text-2xl font-extrabold text-gray-900">
                                Prediction History
                            </div>

                            <div className="mt-2 text-sm font-semibold text-gray-600">
                                Previous predictions saved for this account.
                            </div>
                            {error && (
                                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                                    {error}
                                </div>
                            )}
                            {history.length === 0 ? (
                                <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm font-semibold text-gray-500">
                                    No saved predictions yet.
                                </div>
                            ) : (
                                <div className="mt-6 space-y-4">
                                    {history.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-2xl border border-gray-200 bg-slate-50 p-5">
                                            <div className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                                {new Date(item.timeCreated).toLocaleString()}
                                            </div>
                                            <div className="mt-4 grid gap-6 md:grid-cols-2">
                                                <div>
                                                    <div className="text-sm font-bold text-gray-500">
                                                        Results
                                                    </div>
                                                    <div className="mt-2 space-y-1 text-sm font-medium text-gray-800">
                                                        <div>Health: {item.results.health_label ?? '--'}</div>
                                                        <div>Stage: {item.results.stage_name ?? '--'}</div>
                                                        <div>Severity: {item.results.severity ?? '--'}</div>
                                                        <div>Risk: {item.results.risk_score ?? '--'}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-500">
                                                        Inputs
                                                    </div>
                                                    <div className="mt-2 space-y-1 text-sm font-medium text-gray-800">
                                                        <div>Age: {item.inputs.age_years}</div>
                                                        <div>Sex: {item.inputs.sex}</div>
                                                        <div>Smoking: {item.inputs.smoking_status}</div>
                                                        <div>Activity: {item.inputs.activity_level}</div>
                                                        <div>BP: {item.inputs.blood_pressure_mmHg}</div>
                                                        <div>LDL: {item.inputs.ldl_mg_dL}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {item.results.summary && (
                                                <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-800">
                                                    {item.results.summary}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                )}
            </section>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSuccess={() => {
                    setLoginOpen(false);
                    process();}}/>
            <LogoutConfirmModal
                open={logoutOpen}
                onClose={() => setLogoutOpen(false)}
                onConfirm={logout}/>
        </main>
    );
}