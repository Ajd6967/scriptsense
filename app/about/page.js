import Link from "next/link";
import Image from "next/image";


const values = [
  {
    title: "Safety First, Always",
    desc: "Every recommendation we make is vetted against peer-reviewed medical literature. We never guess. When we're uncertain, we say so, and tell you to ask your doctor.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
          fill="#0d9488"
          opacity="0.2"
        />
        <path
          d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 12L11 14L15 10"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Clarity Over Complexity",
    desc: "Medical information doesn't have to be confusing. We translate clinical language into plain English so you can understand exactly what your medications are doing, and why.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          fill="#0d9488"
          opacity="0.2"
        />
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Designed for Everyone",
    desc: "Seniors shouldn't need a smartphone course to use a health app. ScriptSense is built from the ground up with large text, clear buttons, and zero jargon, so it works for everyone.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#0d9488" opacity="0.2" />
        <circle cx="12" cy="12" r="10" stroke="#0d9488" strokeWidth="2" />
        <path
          d="M8 12h8M12 8v8"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Science-Backed Guidance",
    desc: "Our recommendations come from clinical pharmacology research, FDA drug interaction databases, and our medical advisory board, not guesswork or supplements industry marketing.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];



export default function About() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About ScriptSense
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            We believe every senior deserves to understand their medications:
            not just what to take, but when, why, and how safely.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          <p className="text-2xl text-gray-700 leading-relaxed font-medium italic mb-10 border-l-4 border-teal-500 pl-8 text-left">
            &ldquo;To give every older adult the clarity, confidence, and safety
            they deserve when managing their daily medications.&rdquo;
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            Americans over 65 take an average of 4 to 8 prescription
            medications daily. Yet most pill reminder apps do nothing more than
            send a notification. They don&apos;t catch dangerous interactions.
            They don&apos;t tell you that your blood pressure medication absorbs
            better with food, or that your statin works best taken at night.
            ScriptSense was built to fill that gap.
          </p>
        </div>
      </section>

      {/* ── Our Story + Video ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Why We Built This
              </h2>
              <div className="flex flex-col gap-6 text-xl text-gray-600 leading-relaxed">
                <p>
                  The global population is aging rapidly, and the healthcare
                  system is struggling to keep up. Seniors managing multiple
                  medications often fall through the cracks, without
                  personalized guidance on how their prescriptions interact or
                  when to take them.
                </p>
                <p>
                  ScriptSense was built to help bridge that gap, giving seniors
                  and their caregivers access to intelligent, evidence-based
                  medication guidance without requiring a doctor&apos;s
                  appointment for every question.
                </p>
              </div>
            </div>

            {/* Pitch video */}
            <div className="rounded-3xl overflow-hidden aspect-video shadow-lg">
              <iframe
                src="https://psu.mediaspace.kaltura.com/embed/secure/iframe/entryId/1_yvumnvx5"
                allowFullScreen
                allow="autoplay *; fullscreen *; encrypted-media *"
                className="w-full h-full"
                title="Founder pitch video"
              />
            </div>
          </div>
        </div>
      </section>


{/* ── Meet the Founder ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet the Founder
            </h2>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              The person behind ScriptSense.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16">
            {["/founder-1.jpg", "/founder-2.jpg", "/founder-3.jpg"].map((src, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="relative w-56 h-56 rounded-3xl overflow-hidden border-4 border-teal-100 shadow-lg">
                  <Image
                    src={src}
                    alt={`Founder photo ${i + 1}`}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-gray-50 rounded-3xl p-10 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">My Story</h3>
            <div className="flex flex-col gap-5 text-lg text-gray-600 leading-relaxed">
              <p>
                My freshman year of college, I was diagnosed with a condition that required me to take a combination of medications and supplements. What followed was one of the most frustrating experiences of my life, not the diagnosis itself, but the process of figuring out a regimen that actually worked. I spent weeks battling side effects, unsure of what was interacting with what, and wishing I had someone, or something, that could just help me make sense of it all. That&apos;s when I realized how much AI-powered guidance could have helped.
              </p>
              <p>
                While I built ScriptSense with seniors in mind because they typically manage more medications than any other group, this problem touches everyone. Anyone navigating a new diagnosis, a complex regimen, or simply trying to understand what they&apos;re putting in their body deserves that same clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* ── Values ── */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              These principles guide every decision we make, from how we
              design the interface to how we validate our AI recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-3xl p-10 flex gap-6 items-start border border-gray-100"
              >
                <div className="shrink-0 mt-1">{v.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {v.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experience ScriptSense for Yourself
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-xl mx-auto leading-relaxed">
            See why seniors and caregivers across the country trust ScriptSense
            to keep them safe.
          </p>
          <Link
            href="/chat"
            className="bg-white text-blue-900 text-xl font-bold px-10 py-5 rounded-full hover:bg-blue-50 transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
