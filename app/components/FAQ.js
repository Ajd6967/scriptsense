"use client";
import { useState } from "react";

export default function FAQ({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
          <button
            className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-xl font-semibold text-gray-900">
              {item.q}
            </span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`shrink-0 transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="#374151"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {open === i && (
            <div className="px-8 pb-7">
              <p className="text-xl text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
