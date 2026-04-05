"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

function PillLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="20" height="8" rx="4" stroke="white" strokeWidth="2" />
      <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  }

  return (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 bg-blue-900 rounded-xl flex items-center justify-center">
            <PillLogo />
          </div>
          <span className="text-2xl font-bold text-blue-900 tracking-tight">
            ScriptSense
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-lg font-medium transition-colors ${
                pathname === href
                  ? "text-teal-600 font-semibold"
                  : "text-gray-700 hover:text-blue-900"
              }`}
            >
              {label}
            </Link>
          ))}

          {!authLoading && (
            <>
              {user ? (
                // Logged in
                <div className="flex items-center gap-3 ml-2">
                  <Link
                    href="/dashboard"
                    className={`text-lg font-medium transition-colors ${
                      pathname === "/dashboard"
                        ? "text-teal-600 font-semibold"
                        : "text-gray-700 hover:text-blue-900"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-lg font-semibold text-blue-900 px-5 py-3 rounded-full border-2 border-blue-900 hover:bg-blue-50 transition-colors whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                // Logged out
                <div className="flex items-center gap-3 ml-2">
                  <Link
                    href="/login"
                    className="text-lg font-semibold text-blue-900 px-5 py-3 rounded-full border-2 border-blue-900 hover:bg-blue-50 transition-colors whitespace-nowrap"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-900 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-blue-800 transition-colors whitespace-nowrap"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden border-t-2 border-gray-100 bg-white px-6 pt-4 pb-6 flex flex-col"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-xl font-medium text-gray-900 py-4 border-b border-gray-100"
            >
              {label}
            </Link>
          ))}

          {!authLoading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-xl font-medium text-gray-900 py-4 border-b border-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="mt-6 text-blue-900 border-2 border-blue-900 text-xl font-semibold px-6 py-4 rounded-full text-center hover:bg-blue-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-xl font-medium text-gray-900 py-4 border-b border-gray-100"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="mt-6 bg-blue-900 text-white text-xl font-semibold px-6 py-4 rounded-full text-center hover:bg-blue-800 transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      )}
    </header>
  );
}
