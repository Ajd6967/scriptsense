import ContactForm from "../components/ContactForm";

const helpTopics = [
  "Getting started with ScriptSense",
  "Understanding your analysis results",
  "Technical or login issues",
  "Accessibility accommodations",
  "Questions about your medications",
  "Caregiver account setup",
];

export default function Contact() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Questions, feedback, or need help getting started? We&apos;re here
            — and we respond personally to every message.
          </p>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Other Ways to Reach Us
                </h2>

                <div className="flex flex-col gap-8">
                  {/* Email */}
                  <div className="flex gap-5 items-start">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="2"
                          y="4"
                          width="20"
                          height="16"
                          rx="2"
                          stroke="#1e40af"
                          strokeWidth="2"
                        />
                        <path
                          d="M2 7l10 7 10-7"
                          stroke="#1e40af"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:hello@scriptsense.com"
                        className="text-xl text-teal-600 hover:underline"
                      >
                        hello@scriptsense.com
                      </a>
                      <p className="text-lg text-gray-500 mt-1">
                        We respond within 1 business day
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-5 items-start">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.27.92z"
                          stroke="#1e40af"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+18005551234"
                        className="text-xl text-teal-600 hover:underline"
                      >
                        1-800-555-1234
                      </a>
                      <p className="text-lg text-gray-500 mt-1">
                        Mon–Fri, 9am–5pm Eastern
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-5 items-start">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#1e40af"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 7V12L15 15"
                          stroke="#1e40af"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Support Hours
                      </h3>
                      <p className="text-xl text-gray-700">
                        Monday – Friday
                      </p>
                      <p className="text-lg text-gray-500 mt-1">
                        9:00am – 5:00pm Eastern Time
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency notice */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-7">
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  Medical Emergency?
                </h3>
                <p className="text-xl text-red-800 leading-relaxed">
                  If you are experiencing a medical emergency, please call{" "}
                  <strong>911</strong> immediately. ScriptSense is not a crisis
                  or emergency service.
                </p>
              </div>

              {/* What we can help with */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  We Can Help With:
                </h3>
                <ul className="flex flex-col gap-3">
                  {helpTopics.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xl text-gray-700">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#0d9488"
                          strokeWidth="2"
                        />
                        <path
                          d="M9 12L11 14L15 10"
                          stroke="#0d9488"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
