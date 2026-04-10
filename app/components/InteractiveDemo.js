"use client";
import { useState } from "react";

const demoSteps = [
  {
    user: "I take lisinopril 10mg, metformin 500mg, and atorvastatin 20mg. Are there any interactions?",
    ai: "I found a few things worth knowing about your regimen:\n\n• Lisinopril + Metformin: Generally safe together. Both support cardiovascular and blood sugar management in diabetic patients.\n\n• Atorvastatin timing: Take at night — statins work best when your liver is most active producing cholesterol.\n\n• Metformin: Always take with food to reduce stomach upset.\n\nNo dangerous interactions detected. Would you like an optimized daily schedule?",
  },
  {
    user: "Yes, please give me a daily schedule.",
    ai: "Here's your optimized medication schedule:\n\n🌅 Morning (with breakfast)\n  • Metformin 500mg\n  • Lisinopril 10mg\n\n🌙 Evening (with dinner or at bedtime)\n  • Atorvastatin 20mg\n\nSpacing lisinopril and atorvastatin apart helps each absorb more effectively. Want me to check if any supplements would support this regimen?",
  },
  {
    user: "What supplements should I consider?",
    ai: "Based on your medications, here are evidence-backed suggestions:\n\n• CoQ10 (100–200mg/day): Statins can deplete CoQ10, which supports heart and muscle function.\n\n• Magnesium (200–400mg/day): Supports blood pressure and blood sugar regulation — works well alongside lisinopril and metformin.\n\n• Vitamin B12: Metformin can reduce B12 absorption over time. A yearly blood test is a good idea.\n\nAlways discuss new supplements with your doctor before starting.",
  },
];

export default function InteractiveDemo() {
  const [step, setStep] = useState(0);
  const [showAi, setShowAi] = useState(false);

  function handleUserMessage() {
    setShowAi(true);
  }

  function handleNext() {
    setStep((s) => s + 1);
    setShowAi(false);
  }

  const current = demoSteps[step];
  const isLast = step === demoSteps.length - 1;

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Demo header */}
      <div className="bg-blue-900 px-6 py-4 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/20" />
          <span className="w-3 h-3 rounded-full bg-white/20" />
          <span className="w-3 h-3 rounded-full bg-white/20" />
        </div>
        <span className="text-white text-base font-semibold ml-2">ScriptSense AI Chat</span>
        <span className="ml-auto text-xs text-blue-300 bg-blue-800 px-3 py-1 rounded-full">Demo</span>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col gap-4 px-6 py-6 min-h-64">
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="bg-blue-900 text-white rounded-2xl rounded-tr-sm px-5 py-4 max-w-sm text-base leading-relaxed">
            {current.user}
          </div>
        </div>

        {/* AI bubble */}
        {showAi && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center shrink-0 mt-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" fill="white" opacity="0.8" />
              </svg>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 max-w-sm text-base text-gray-800 leading-relaxed whitespace-pre-line">
              {current.ai}
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="border-t-2 border-gray-100 px-6 py-4 flex gap-3">
        {!showAi ? (
          <button
            onClick={handleUserMessage}
            className="flex-1 bg-blue-900 text-white font-semibold text-base px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
          >
            Send Message
          </button>
        ) : !isLast ? (
          <button
            onClick={handleNext}
            className="flex-1 bg-teal-600 text-white font-semibold text-base px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors"
          >
            Continue Demo →
          </button>
        ) : (
          <button
            onClick={() => { setStep(0); setShowAi(false); }}
            className="flex-1 bg-gray-100 text-gray-700 font-semibold text-base px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Restart Demo
          </button>
        )}
      </div>
    </div>
  );
}
