`use client`;
import { useRouter } from 'next/navigation';


export default function StartPage() {
  const router = useRouter();


  return (
    <main className="flex h-screen items-center justify-center">
      <button
        onClick={() => router.push('/home')}
        className="px-10 py-5 text-2xl rounded-2xl bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition"
      >
        Start Disease Predictor
      </button>
    </main>
  );
}