"use client";
import { useState } from "react";

const inputClass =
  "w-full bg-white border-2 border-white/30 focus:border-white rounded-xl px-5 py-4 text-xl text-white placeholder-blue-200 focus:outline-none transition-colors bg-white/10";

export default function EmailCaptureForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="w-16 h-16 bg-teal-400/20 border-2 border-teal-300 rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="#5eead4" strokeWidth="2" />
            <path d="M9 12L11 14L15 10" stroke="#5eead4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-2xl font-bold text-white">You&apos;re on the list!</p>
        <p className="text-lg text-blue-200 text-center">
          Thanks, {form.name}. We&apos;ll be in touch at <strong className="text-white">{form.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {error && (
        <p className="text-base text-red-300 bg-red-900/30 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          id="capture-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="Your name"
          autoComplete="name"
          required
        />
        <input
          id="capture-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="Your email address"
          autoComplete="email"
          required
        />
        <button
          type="submit"
          className="bg-white text-blue-900 text-xl font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0"
        >
          Get Early Access
        </button>
      </div>
      <p className="text-base text-blue-300 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
