"use client";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";

const STORAGE_KEY = "scriptsense_chat_history";

const starterPrompts = [
  "I take Metformin 500mg, Lisinopril 10mg, and Atorvastatin 20mg",
  "Add a medication",
  "Enter health information",
  "Check for drug interactions",
];

function BotIcon() {
  return (
    <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="8" width="20" height="8" rx="4" stroke="white" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoadingDots() {
  return (
    <div className="flex gap-1.5 items-center py-1" aria-label="ScriptSense is thinking">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );
}

const initialMessages = [
  {
    role: "assistant",
    text: "Hi! I'm ScriptSense. I'll help you build an accurate medication and health profile.\n\nTo get started, tell me what medications you're currently taking — including the dosage, how often, and how you take them (oral, topical, etc.).",
  },
];

// Strip <SAVE>...</SAVE> block from text and return both parts
function extractSaveBlock(text) {
  const match = text.match(/<SAVE>([\s\S]*?)<\/SAVE>/);
  if (!match) return { displayText: text, saveData: null };
  const displayText = text.replace(/<SAVE>[\s\S]*?<\/SAVE>/, "").trim();
  try {
    const saveData = JSON.parse(match[1].trim());
    return { displayText, saveData };
  } catch {
    return { displayText, saveData: null };
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userIdRef = useRef(null);
  const userContextRef = useRef({ medications: [], healthProfile: null });
  const bottomRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const uid = session.user.id;
      userIdRef.current = uid;

      const [{ data: medications }, { data: healthProfile }] = await Promise.all([
        supabase.from("medications").select("*").eq("user_id", uid),
        supabase.from("health_profiles").select("*").eq("user_id", uid).maybeSingle(),
      ]);
      userContextRef.current = { medications: medications ?? [], healthProfile: healthProfile ?? null };

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages([initialMessages[0], ...parsed]);
          }
        } catch { /* ignore */ }
      }
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function saveToSupabase(saveData) {
    const uid = userIdRef.current;
    if (!uid || !saveData) return;

    // Save new medications
    const meds = saveData.medications ?? [];
    for (const med of meds) {
      if (!med.name) continue;
      const { data, error } = await supabase
        .from("medications")
        .insert({ user_id: uid, name: med.name, dosage: med.dosage ?? "", frequency: med.frequency ?? "", notes: med.notes ?? "" })
        .select()
        .single();
      if (!error && data) {
        userContextRef.current.medications = [...userContextRef.current.medications, data];
      }
    }

    // Save health data
    const health = saveData.health ?? {};
    const healthFields = ["birthday", "weight", "primary_conditions", "known_allergies", "kidney_function", "liver_function"];
    const newHealth = Object.fromEntries(Object.entries(health).filter(([k, v]) => healthFields.includes(k) && v));
    if (Object.keys(newHealth).length > 0) {
      const merged = { ...(userContextRef.current.healthProfile ?? {}), ...newHealth };
      await supabase
        .from("health_profiles")
        .upsert({ user_id: uid, ...merged, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      userContextRef.current.healthProfile = merged;
    }
  }

  async function handleSend(textOverride) {
    const trimmed = (textOverride ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", text: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", text: "", streaming: true }]);

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const history = newMessages
        .filter((m) => m !== initialMessages[0])
        .map((m) => ({ role: m.role, text: m.text }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          medications: userContextRef.current.medications,
          healthProfile: userContextRef.current.healthProfile,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        // Strip <SAVE> block while streaming so user never sees it
        const { displayText } = extractSaveBlock(accumulated);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.streaming) updated[updated.length - 1] = { ...last, text: displayText };
          return updated;
        });
      }

      // Final processing: extract save data and persist
      const { displayText, saveData } = extractSaveBlock(accumulated);
      const finalText = displayText || "I wasn't able to generate a response. Please try again.";

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.streaming) updated[updated.length - 1] = { role: "assistant", text: finalText };
        const clean = updated
          .filter((m) => !m.streaming && m !== initialMessages[0])
          .map((m) => ({ role: m.role, text: m.text }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
        return updated;
      });

      // Save medications and health data directly to Supabase
      if (saveData) await saveToSupabase(saveData);

    } catch (err) {
      if (err.name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.streaming) updated[updated.length - 1] = { role: "assistant", text: "Sorry, something went wrong. Please check your connection and try again." };
        return updated;
      });
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function formatText(text) {
    return text.split("\n").map((line, i, arr) => (
      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
    ));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-blue-900 text-white py-8 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Medication Assistant</h1>
        <p className="text-blue-200 text-lg">Tell me your medications and health information.</p>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" ? <BotIcon /> : (
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-lg">Y</div>
            )}
            <div className={`max-w-xl px-6 py-4 rounded-3xl text-lg leading-relaxed ${
              msg.role === "assistant" ? "bg-white border border-gray-200 text-gray-800 rounded-tl-sm" : "bg-blue-900 text-white rounded-tr-sm"
            }`}>
              {msg.streaming && msg.text === "" ? <LoadingDots /> : formatText(msg.text)}
              {msg.streaming && msg.text !== "" && (
                <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse ml-0.5 align-middle" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && !isLoading && (
        <div className="max-w-3xl w-full mx-auto px-4 pb-4">
          <div className="flex flex-wrap gap-3">
            {starterPrompts.map((prompt) => (
              <button key={prompt} onClick={() => handleSend(prompt)}
                className="bg-white border-2 border-blue-200 text-blue-900 text-base font-medium px-5 py-3 rounded-full hover:border-blue-900 hover:bg-blue-50 transition-colors">
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 bg-white border-t-2 border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="List your medications and dosages..." rows={1} disabled={isLoading}
            className="flex-1 resize-none border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors leading-relaxed disabled:opacity-50"
            style={{ minHeight: "60px", maxHeight: "160px" }} />
          <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
            className="bg-blue-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            aria-label="Send message">
            <SendIcon />
          </button>
        </div>
        <p className="text-center text-sm text-gray-400 mt-3">
          ScriptSense is not a substitute for professional medical advice. Always consult your doctor or pharmacist.
        </p>
      </div>
    </div>
  );
}
