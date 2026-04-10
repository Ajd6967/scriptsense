import Link from "next/link";
import FAQ from "../components/FAQ";
import InteractiveDemo from "../components/InteractiveDemo";

const steps = [
  {
    number: "1",
    title: "Create Your Health Profile",
    desc: "Start by telling us the basics: your age, weight, and any major health conditions such as diabetes, heart disease, or kidney problems. This allows our AI to personalize its analysis specifically for your body and health history.",
    detail:
      "Takes about 2 minutes. No technical knowledge needed. We ask only what is necessary to give you accurate, relevant guidance.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Add Your Medications",
    desc: "Enter each of your current prescriptions. You can type the brand name or generic name — ScriptSense recognizes thousands of medications. Include the dosage, how often you take it, and your current timing if you have one.",
    detail:
      "ScriptSense also accepts over-the-counter medications like aspirin, antacids, and sleep aids — because these can interact with prescriptions too.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="2"
          y="8"
          width="20"
          height="8"
          rx="4"
          stroke="white"
          strokeWidth="2"
        />
        <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "AI Analyzes Your Full Regimen",
    desc: "This is where ScriptSense goes far beyond a simple pill tracker. Our AI simultaneously checks every medication against every other medication in your list — looking for dangerous interactions, suboptimal timing, and nutritional depletions caused by your drugs.",
    detail:
      "The analysis cross-references FDA interaction databases and peer-reviewed pharmacology research. It views your entire regimen as a system, not a collection of isolated drugs.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Review Your Personalized Report",
    desc: "You receive a clear, easy-to-read report written in plain English. Each finding is explained simply — no medical abbreviations, no confusing terminology. Safety alerts are listed in order of urgency so you always know what to address first.",
    detail:
      "You can print your report to bring to your next doctor's appointment. Many users find their physicians appreciate having this detailed, organized overview.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "5",
    title: "Follow Your Optimized Daily Schedule",
    desc: "ScriptSense generates a personalized daily medication schedule — morning, midday, evening, and night — that accounts for everything: which drugs interact with others, which work best with food, and which need to be spaced apart by several hours.",
    detail:
      "Your schedule updates automatically whenever you add or remove medications. You can set reminders through the app, or print the schedule to keep on your refrigerator.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M3 9h18M8 2v4M16 2v4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "Is ScriptSense a replacement for my doctor or pharmacist?",
    a: "No. ScriptSense is an informational tool designed to help you have better, more informed conversations with your healthcare team — not to replace them. We always recommend bringing your ScriptSense report to your next appointment. Think of it as a thorough second opinion that helps you ask better questions.",
  },
  {
    q: "How accurate is the AI analysis?",
    a: "Our AI cross-references multiple FDA-approved drug interaction databases and clinical pharmacology research. However, no tool is 100% accurate, and medication science continues to evolve. ScriptSense is designed to flag potential concerns for discussion with your doctor, not to make final medical decisions on your behalf.",
  },
  {
    q: "Is my health information kept private?",
    a: "Absolutely. We take privacy extremely seriously, especially given the sensitivity of health data. Your information is encrypted in transit and at rest, is never sold to third parties, and is never shared with pharmaceutical companies or advertisers. We comply fully with HIPAA standards.",
  },
  {
    q: "Does ScriptSense work with over-the-counter medications and vitamins?",
    a: "Yes. Many OTC medications — including aspirin, ibuprofen, antacids, and antihistamines — interact significantly with prescription drugs. ScriptSense lets you include these in your regimen, as well as vitamins, herbal supplements, and other nutraceuticals.",
  },
  {
    q: "How much does ScriptSense cost?",
    a: "Getting started is completely free. You can analyze up to 5 medications at no cost. A full unlimited plan is available for a flat monthly fee with no long-term contracts or commitments. We believe cost should never be a barrier to medication safety for seniors.",
  },
  {
    q: "What if I struggle with technology or can't type well?",
    a: "ScriptSense is designed with seniors in mind from the ground up. The text is large, the buttons are oversized, and every step has clear instructions in plain English. If you still need help, call our support line — a real person will walk you through the setup at no charge.",
  },
];

export default function HowItWorks() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How ScriptSense Works
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            From entering your first medication to receiving your personalized
            plan — here is exactly what happens, step by step.
          </p>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-14">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-8 items-start">
                {/* Step icon block */}
                <div className="shrink-0 w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>

                <div className="flex-1 pt-1">
                  <span className="text-teal-600 text-base font-bold uppercase tracking-widest">
                    Step {step.number}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl px-6 py-4">
                    <p className="text-lg text-teal-800 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Demo ── */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See It in Action</h2>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              Walk through a real conversation with ScriptSense AI. Click to send each message and see how it responds.
            </p>
          </div>
          <InteractiveDemo />
        </div>
      </section>

      {/* ── Safety Disclaimer ── */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-6 items-start">
            <div className="shrink-0">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  fill="#f59e0b"
                  opacity="0.3"
                />
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="9"
                  x2="12"
                  y2="13"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="17" r="1" fill="#d97706" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                Important: ScriptSense Is Not a Medical Device
              </h3>
              <p className="text-xl text-amber-800 leading-relaxed">
                ScriptSense is an informational tool, not a medical device or a
                substitute for professional medical advice. All recommendations
                should be reviewed with your doctor or pharmacist before making
                any changes to your medication regimen. If you are experiencing
                a medical emergency, call{" "}
                <strong className="font-bold">911</strong> immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Have a question not answered here?{" "}
              <Link
                href="/contact"
                className="text-teal-600 font-semibold hover:underline"
              >
                Contact us
              </Link>{" "}
              — we&apos;re happy to help.
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-blue-900 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Try ScriptSense?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto leading-relaxed">
            Create your profile and enter your medications in under 5 minutes.
            Your personalized plan is waiting.
          </p>
          <Link
            href="/chat"
            className="bg-white text-blue-900 text-xl font-bold px-10 py-5 rounded-full hover:bg-blue-50 transition-colors inline-block"
          >
            Start Your Analysis
          </Link>
        </div>
      </section>
    </>
  );
}
