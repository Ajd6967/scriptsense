import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="8"
                    width="20"
                    height="8"
                    rx="4"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="16"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold">ScriptSense</span>
            </div>
            <p className="text-blue-200 text-lg leading-relaxed">
              AI-powered medication management designed specifically for seniors
              and their caregivers.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-blue-200 text-lg hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-lg">
              <li>
                <a
                  href="mailto:hello@scriptsense.com"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  hello@scriptsense.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18005551234"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  1-800-555-1234
                </a>
              </li>
              <li className="text-blue-300">Mon–Fri, 9am–5pm Eastern</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-blue-800 flex flex-col md:flex-row gap-4 justify-between text-base text-blue-300">
          <p>© {new Date().getFullYear()} ScriptSense. All rights reserved.</p>
          <p className="max-w-lg md:text-right">
            <strong className="text-blue-200">Medical Disclaimer:</strong>{" "}
            ScriptSense is an informational tool and does not replace
            professional medical advice. Always consult your doctor or
            pharmacist before making changes to your medications.
          </p>
        </div>
      </div>
    </footer>
  );
}
