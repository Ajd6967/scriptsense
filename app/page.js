import Link from "next/link";
import EmailCaptureForm from "./components/EmailCaptureForm";

function ShieldCheckIcon({ size = 40, color = "#0d9488" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
        fill={color}
        opacity="0.15"
      />
      <path
        d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ size = 40, color = "#0d9488" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill={color} opacity="0.15" />
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path
        d="M12 7V12L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon({ size = 40, color = "#0d9488" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 8C20 14 16 20 12 22C8 20 4 14 4 8C4 4 8 2 12 2C16 2 20 4 20 8Z"
        fill={color}
        opacity="0.15"
      />
      <path
        d="M20 8C20 14 16 20 12 22C8 20 4 14 4 8C4 4 8 2 12 2C16 2 20 4 20 8Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M12 22V14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 14C10 12 8 10 8 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


const features = [
  {
    icon: <ShieldCheckIcon />,
    title: "Drug Interaction Detection",
    desc: "Our AI cross-references your entire medication stack — not just pairs — to catch dangerous combinations that could cause serious harm or reduce the effectiveness of your treatments.",
  },
  {
    icon: <ClockIcon />,
    title: "Optimal Timing Guidance",
    desc: "The right medication at the wrong time can be far less effective. ScriptSense tells you exactly when to take each drug for maximum benefit and minimum side effects.",
  },
  {
    icon: <LeafIcon />,
    title: "Supplement Recommendations",
    desc: "Many common medications deplete essential nutrients over time. ScriptSense identifies the nutritional gaps specific to your regimen and suggests evidence-based supplements to fill them.",
  },
];

const steps = [
  {
    number: "1",
    title: "Enter Your Medications",
    desc: "Type in the names of your current prescriptions. ScriptSense recognizes thousands of medications by their brand or generic names.",
  },
  {
    number: "2",
    title: "AI Analyzes Everything",
    desc: "Our AI cross-references your full regimen against trusted medical databases, checking for interactions and optimization opportunities.",
  },
  {
    number: "3",
    title: "Get Your Personal Plan",
    desc: "Receive a clear, plain-English report with your optimized medication schedule, safety alerts, and supplement suggestions.",
  },
];

const sources = [
  {
    name: "FDA Drug Interaction Database",
    desc: "Official drug safety data from the U.S. Food & Drug Administration",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-6-6z" stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round" fill="#1e3a8a" opacity="0.1" />
        <path d="M9 3v6h6" stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 12v6M9 15h6" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "NIH National Library of Medicine",
    desc: "The world's largest biomedical library and research database",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#1e3a8a" strokeWidth="2" fill="#1e3a8a" opacity="0.1" />
        <path d="M12 7v5l3 3" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Mayo Clinic Drug Reference",
    desc: "Trusted clinical drug information from Mayo Clinic physicians",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="#1e3a8a" strokeWidth="2" fill="#1e3a8a" opacity="0.1" strokeLinejoin="round" />
        <path d="M12 8v8M8 12h8" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "CDC Healthy Aging Guidelines",
    desc: "Centers for Disease Control guidance for adults 65 and older",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 8C20 14 16 20 12 22C8 20 4 14 4 8C4 4 8 2 12 2C16 2 20 4 20 8Z" stroke="#1e3a8a" strokeWidth="2" fill="#1e3a8a" opacity="0.1" />
        <path d="M9 12L11 14L15 10" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Beers Criteria for Older Adults",
    desc: "American Geriatrics Society list of medications to avoid in seniors",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#1e3a8a" strokeWidth="2" fill="#1e3a8a" opacity="0.1" />
        <path d="M8 12h8M8 8h8M8 16h5" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-base font-medium px-5 py-2 rounded-full mb-8">
            <span>Designed Specifically for Adults 65+</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 max-w-4xl mx-auto">
            Your Medications,<br />Finally Working Together
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-12">
            ScriptSense uses AI to analyze your complete prescription regimen —
            catching dangerous drug interactions, recommending the best times to
            take each medication, and suggesting supplements to fill nutritional
            gaps.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/chat"
              className="bg-white text-blue-900 text-xl font-bold px-10 py-5 rounded-full hover:bg-blue-50 transition-colors shadow-lg w-full sm:w-auto text-center"
            >
              Get Started
            </Link>
            <Link
              href="/how-it-works"
              className="border-2 border-white text-white text-xl font-semibold px-10 py-5 rounded-full hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center text-blue-200">
            {[
              "No medical jargon",
              "Analyzes your full medication stack",
              "Plain English guaranteed",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircleIcon />
                <span className="text-lg">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Three Ways ScriptSense Protects You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Most medication tools look at one drug at a time. ScriptSense
              looks at your entire regimen — the way your doctor should, but
              rarely has time to.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-3xl p-10 border border-gray-100"
              >
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {f.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Teaser ── */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple to Use. Powerful Results.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started takes less than 5 minutes. No technical experience
              required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.number} className="text-center">
                <div className="w-20 h-20 bg-blue-900 text-white text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-6">
                  {s.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {s.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/how-it-works"
              className="text-blue-900 text-xl font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-blue-900 pb-1"
            >
              See the full walkthrough
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Email Capture ── */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-teal-700 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Be the First to Know
          </h2>
          <p className="text-xl text-blue-200 mb-10 leading-relaxed">
            ScriptSense is launching soon. Enter your name and email to get early access and updates.
          </p>
          <EmailCaptureForm />
        </div>
      </section>

      {/* ── Sources ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sources Our AI Analyzes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ScriptSense draws from the most trusted medical and pharmacological
              databases available — not general internet searches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map((s) => (
              <div
                key={s.name}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex gap-5 items-start"
              >
                <div className="shrink-0 mt-1">{s.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.name}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re managing your own medications or caring for a
              community of seniors, there&apos;s a plan for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Personal */}
            <div className="bg-white rounded-3xl p-10 border-2 border-gray-200 flex flex-col">
              <div className="mb-8">
                <p className="text-lg font-semibold text-teal-600 uppercase tracking-wide mb-3">
                  Personal
                </p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-6xl font-bold text-gray-900">$5</span>
                  <span className="text-2xl text-gray-500 mb-2">/month</span>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  For individual seniors who want clear, confident guidance on
                  their own medications.
                </p>
              </div>
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {[
                  "Full drug interaction analysis",
                  "Personalized daily schedule",
                  "Supplement recommendations",
                  "Plain-English explanations",
                  "Unlimited medication updates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg text-gray-700">
                    <CheckCircleIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/chat"
                className="bg-blue-900 text-white text-xl font-bold px-8 py-5 rounded-full hover:bg-blue-800 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Group / Facility */}
            <div className="bg-blue-900 rounded-3xl p-10 border-2 border-blue-900 flex flex-col text-white">
              <div className="mb-8">
                <p className="text-lg font-semibold text-teal-300 uppercase tracking-wide mb-3">
                  Group / Facility
                </p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-6xl font-bold">$100</span>
                  <span className="text-2xl text-blue-300 mb-2">/month</span>
                </div>
                <p className="text-xl text-blue-200 leading-relaxed">
                  For nursing homes, assisted living facilities, and care teams
                  managing multiple residents.
                </p>
              </div>
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {[
                  "Everything in Personal",
                  "Unlimited resident profiles",
                  "Caregiver dashboard access",
                  "Bulk medication management",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg text-blue-100">
                    <span className="text-teal-300 mt-0.5">
                      <CheckCircleIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="bg-white text-blue-900 text-xl font-bold px-8 py-5 rounded-full hover:bg-blue-50 transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 max-w-3xl mx-auto leading-tight">
            Ready to Feel Confident About Your Medications?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of seniors and caregivers who use ScriptSense to take
            the confusion — and the danger — out of managing multiple
            prescriptions.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-900 text-xl font-bold px-12 py-5 rounded-full hover:bg-blue-50 transition-colors shadow-lg inline-block"
          >
            Start Your Analysis
          </Link>
        </div>
      </section>
    </>
  );
}
