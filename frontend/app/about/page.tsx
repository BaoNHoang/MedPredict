import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-500">About MedPredict</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Turning data into better health decisions
          </h1>
          <p className="mt-5 max-w-3xl text-base text-gray-700 md:text-lg">
            MedPredict is focused on helping people understand disease risk earlier using common
            health metrics. We start with atherosclerosis and design for expansion into additional
            conditions over time.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white hover:bg-blue-600"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
