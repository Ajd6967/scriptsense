"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data?.session) {
      // Email confirmation is disabled — user is immediately signed in
      router.push("/dashboard");
    } else {
      // Email confirmation is required
      setSuccess(true);
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 6L9 17L4 12" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Check your email</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            We sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account, then come back to sign in.
          </p>
          <Link
            href="/login"
            className="bg-blue-900 text-white text-xl font-bold px-10 py-5 rounded-full hover:bg-blue-800 transition-colors inline-block"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="8" width="20" height="8" rx="4" stroke="white" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-900">ScriptSense</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create your account</h1>
          <p className="text-xl text-gray-500">Free to start — no credit card required</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-lg rounded-2xl px-6 py-4">
                {error}
              </div>
            )}

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 6 characters"
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Confirm password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 text-white text-xl font-bold py-5 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-lg text-gray-500 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-900 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
