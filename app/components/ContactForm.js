"use client";
import { useState } from "react";

const topics = [
  "Getting Started",
  "Understanding My Results",
  "Technical or Login Issue",
  "Accessibility Help",
  "Question About My Medications",
  "Caregiver Account Setup",
  "Billing or Account",
  "Other",
];

const inputClass =
  "w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-4 text-xl text-gray-900 focus:outline-none focus:border-blue-700 transition-colors";

const labelClass = "block text-xl font-semibold text-gray-900 mb-2";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email address, and message.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-3xl p-12 text-center">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
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
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Message Sent!
        </h3>
        <p className="text-xl text-gray-600 leading-relaxed">
          Thank you for reaching out, {form.name}. We&apos;ll respond to{" "}
          <strong>{form.email}</strong> within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4">
          <p className="text-xl text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>
          Your Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="Margaret Thompson"
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="your@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="topic" className={labelClass}>
          What is this about?
        </label>
        <select
          id="topic"
          name="topic"
          value={form.topic}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a topic...</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Your Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          rows={6}
          placeholder="Type your message here..."
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-900 text-white text-xl font-bold px-10 py-5 rounded-full hover:bg-blue-800 transition-colors w-full mt-2"
      >
        Send Message
      </button>

      <p className="text-lg text-gray-500 text-center">
        We respond within 1 business day. For medical emergencies, call 911.
      </p>
    </form>
  );
}
