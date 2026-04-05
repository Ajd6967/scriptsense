"use client";
import { useState, useRef, useEffect } from "react";

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
        <span
          key={i}
          className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

const initialMessages = [
  {
    role: "assistant",
    text: "Hi! I'm ScriptSense. I can help you manage your medications, check for interactions, and build a personalized daily schedule.\n\nTo get started, tell me your medications and dosages — for example: \"I take Metformin 500mg, Lisinopril 10mg, and Atorvastatin 20mg.\"",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(textOverride) {
    const trimmed = (textOverride ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", text: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Placeholder for the streaming assistant reply
    setMessages((prev) => [...prev, { role: "assistant", text: "", streaming: true }]);

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      // Send the full conversation history (excluding the streaming placeholder)
      const history = newMessages.map((m) => ({ role: m.role, text: m.text }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        // Update the streaming message in place
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.streaming) {
            updated[updated.length - 1] = { ...last, text: accumulated };
          }
          return updated;
        });
      }

      // Finalize: remove streaming flag
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.streaming) {
          updated[updated.length - 1] = { role: "assistant", text: accumulated || "I wasn't able to generate a response. Please try again." };
        }
        // Persist conversation for health data extraction on dashboard
        sessionStorage.setItem("scriptsense_chat", JSON.stringify(
          updated.filter((m) => !m.streaming).map((m) => ({ role: m.role, text: m.text }))
        ));
        return updated;
      });
    } catch (err) {
      if (err.name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.streaming) {
          updated[updated.length - 1] = {
            role: "assistant",
            text: "Sorry, something went wrong. Please check your connection and try again.",
          };
        }
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
    // Render newlines as line breaks
    return text.split("\n").map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page header */}
      <div className="bg-blue-900 text-white py-8 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Medication Assistant</h1>
        <p className="text-blue-200 text-lg">
          Tell me your medications and health information — I&apos;ll help you make sense of them.
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-4 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "assistant" ? (
              <BotIcon />
            ) : (
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-lg">
                Y
              </div>
            )}
            <div
              className={`max-w-xl px-6 py-4 rounded-3xl text-lg leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                  : "bg-blue-900 text-white rounded-tr-sm"
              }`}
            >
              {msg.streaming && msg.text === "" ? (
                <LoadingDots />
              ) : (
                formatText(msg.text)
              )}
              {msg.streaming && msg.text !== "" && (
                <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse ml-0.5 align-middle" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Starter prompts */}
      {!isLoading && (
        <div className="max-w-3xl w-full mx-auto px-4 pb-4">
          <div className="flex flex-wrap gap-3">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="bg-white border-2 border-blue-200 text-blue-900 text-base font-medium px-5 py-3 rounded-full hover:border-blue-900 hover:bg-blue-50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="sticky bottom-0 bg-white border-t-2 border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="List your medications and dosages, e.g. Metformin 500mg, Lisinopril 10mg..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors leading-relaxed disabled:opacity-50"
            style={{ minHeight: "60px", maxHeight: "160px" }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="bg-blue-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            aria-label="Send message"
          >
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
