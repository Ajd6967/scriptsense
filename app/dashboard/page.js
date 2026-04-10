"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

// ── Helpers ────────────────────────────────────────────────────────────────

function computeAge(birthday) {
  if (!birthday) return null;
  const today = new Date();
  const dob = new Date(birthday);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

const EMPTY_PROFILE = {
  birthday: "",
  weight: "",
  primary_conditions: "",
  known_allergies: "",
  kidney_function: "",
  liver_function: "",
};

// ── Icons ──────────────────────────────────────────────────────────────────

const tabs = [
  {
    id: "medications",
    label: "Manage Medications",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="8" width="20" height="8" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "health",
    label: "Input Health Data",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 12H4M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "regimen",
    label: "My Regimen",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "notifications",
    label: "Notification Settings",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function EmptyState({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-lg text-gray-500 max-w-sm leading-relaxed">{desc}</p>
    </div>
  );
}

const EMPTY_MED = { name: "", dosage: "", frequency: "", notes: "" };

function MedForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY_MED);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Medication Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Metformin"
            required
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Dosage</label>
          <input
            type="text"
            value={form.dosage}
            onChange={(e) => handleChange("dosage", e.target.value)}
            placeholder="e.g. 500mg"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Frequency</label>
          <input
            type="text"
            value={form.frequency}
            onChange={(e) => handleChange("frequency", e.target.value)}
            placeholder="e.g. Twice daily"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Notes</label>
          <input
            type="text"
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="e.g. Take with food"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-blue-900 text-white text-lg font-semibold px-7 py-3 rounded-full hover:bg-blue-800 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 text-lg font-semibold px-7 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function MedCard({ med, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-200 px-7 py-5 flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-xl font-bold text-gray-900">{med.name}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
          {med.dosage && <p className="text-base text-gray-500">{med.dosage}</p>}
          {med.frequency && <p className="text-base text-gray-500">{med.frequency}</p>}
          {med.notes && <p className="text-base text-gray-400 italic">{med.notes}</p>}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(med)}
          className="text-blue-900 text-base font-semibold px-4 py-2 rounded-full border-2 border-blue-200 hover:bg-blue-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(med.id)}
          className="text-red-500 text-base font-semibold px-4 py-2 rounded-full border-2 border-red-100 hover:bg-red-50 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function MedAISuggestionBanner({ suggestions, onAccept, onDismiss }) {
  return (
    <div className="bg-teal-50 border-2 border-teal-300 rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="8" width="20" height="8" rx="4" stroke="white" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-lg font-bold text-teal-900 mb-1">ScriptSense detected medications in your chat</p>
          <p className="text-base text-teal-800 mb-4">
            Would you like me to add the following to your medication list?
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {suggestions.map((med, i) => (
              <div key={i} className="bg-white rounded-xl border border-teal-200 px-5 py-3">
                <p className="text-lg font-bold text-gray-900">{med.name}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                  {med.dosage && <p className="text-base text-gray-500">{med.dosage}</p>}
                  {med.frequency && <p className="text-base text-gray-500">{med.frequency}</p>}
                  {med.notes && <p className="text-base text-gray-400 italic">{med.notes}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onAccept}
              className="bg-teal-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-teal-700 transition-colors"
            >
              Yes, add these medications
            </button>
            <button
              onClick={onDismiss}
              className="text-gray-500 text-lg font-semibold px-6 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MedicationsTab({ userId }) {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMed, setEditingMed] = useState(null); // { ...med } when editing
  const [suggestions, setSuggestions] = useState([]);
  const [checkingAI, setCheckingAI] = useState(false);

  // Load medications from Supabase
  useEffect(() => {
    if (!userId) return;
    supabase
      .from("medications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setMedications(data ?? []);
        setLoading(false);
      });
  }, [userId]);

  // Check chat history for AI-detected medications
  useEffect(() => {
    if (!userId || loading) return;
    const stored = sessionStorage.getItem("scriptsense_chat");
    if (!stored) return;
    let messages;
    try { messages = JSON.parse(stored); } catch { return; }
    if (!messages || messages.length < 2) return;

    setCheckingAI(true);
    fetch("/api/extract-medications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, currentMedications: medications }),
    })
      .then((r) => r.json())
      .then(({ extracted }) => {
        if (extracted.length > 0) setSuggestions(extracted);
      })
      .catch(() => {})
      .finally(() => setCheckingAI(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, loading]);

  async function handleAdd(form) {
    const { data, error } = await supabase
      .from("medications")
      .insert({ user_id: userId, ...form })
      .select()
      .single();
    if (!error && data) {
      setMedications((prev) => [...prev, data]);
    }
    setShowForm(false);
  }

  async function handleUpdate(form) {
    const { data, error } = await supabase
      .from("medications")
      .update({ name: form.name, dosage: form.dosage, frequency: form.frequency, notes: form.notes })
      .eq("id", editingMed.id)
      .select()
      .single();
    if (!error && data) {
      setMedications((prev) => prev.map((m) => (m.id === data.id ? data : m)));
    }
    setEditingMed(null);
  }

  async function handleDelete(id) {
    await supabase.from("medications").delete().eq("id", id);
    setMedications((prev) => prev.filter((m) => m.id !== id));
  }

  async function handleAcceptSuggestions() {
    const inserted = [];
    for (const med of suggestions) {
      const { data, error } = await supabase
        .from("medications")
        .insert({ user_id: userId, ...med })
        .select()
        .single();
      if (!error && data) inserted.push(data);
    }
    setMedications((prev) => [...prev, ...inserted]);
    setSuggestions([]);
  }

  if (loading) return <p className="text-xl text-gray-400">Loading your medications…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Manage Medications</h2>
          <p className="text-lg text-gray-500 mt-1">Add and organize your current prescriptions</p>
        </div>
        {!showForm && !editingMed && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-900 text-white text-lg font-semibold px-7 py-4 rounded-full hover:bg-blue-800 transition-colors"
          >
            + Add Medication
          </button>
        )}
      </div>

      {checkingAI && (
        <p className="text-base text-teal-600 mb-4">Checking your chat for medications…</p>
      )}

      {suggestions.length > 0 && (
        <MedAISuggestionBanner
          suggestions={suggestions}
          onAccept={handleAcceptSuggestions}
          onDismiss={() => setSuggestions([])}
        />
      )}

      {showForm && (
        <div className="mb-6">
          <MedForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {medications.length === 0 && !showForm ? (
        <EmptyState
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="8" width="20" height="8" rx="4" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
            </svg>
          }
          title="No medications added yet"
          desc="Add your first medication to get started with your personalized regimen analysis."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {medications.map((med) =>
            editingMed?.id === med.id ? (
              <MedForm
                key={med.id}
                initial={editingMed}
                onSave={handleUpdate}
                onCancel={() => setEditingMed(null)}
              />
            ) : (
              <MedCard
                key={med.id}
                med={med}
                onEdit={(m) => { setEditingMed(m); setShowForm(false); }}
                onDelete={handleDelete}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

// AI suggestion banner shown when Claude detected health info in chat
function AISuggestionBanner({ suggestion, onAccept, onDismiss }) {
  return (
    <div className="bg-teal-50 border-2 border-teal-300 rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="8" width="20" height="8" rx="4" stroke="white" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-lg font-bold text-teal-900 mb-1">ScriptSense detected health information</p>
          <p className="text-base text-teal-800 mb-4">
            Based on your recent chat, I found the following. Would you like me to update your health profile?
          </p>
          <div className="bg-white rounded-xl border border-teal-200 p-4 mb-4 flex flex-col gap-2">
            {Object.entries(suggestion).map(([key, val]) => (
              <div key={key} className="flex gap-2 text-base">
                <span className="font-semibold text-gray-700 capitalize w-44 shrink-0">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="text-gray-600">{val}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onAccept}
              className="bg-teal-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-teal-700 transition-colors"
            >
              Yes, update my profile
            </button>
            <button
              onClick={onDismiss}
              className="text-gray-500 text-lg font-semibold px-6 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthDataTab({ userId }) {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // "success" | "error"
  const [suggestion, setSuggestion] = useState(null); // pending AI suggestion
  const [checkingAI, setCheckingAI] = useState(false);

  // Load profile from Supabase
  useEffect(() => {
    if (!userId) return;
    supabase
      .from("health_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile({
            birthday: data.birthday ?? "",
            weight: data.weight ?? "",
            primary_conditions: data.primary_conditions ?? "",
            known_allergies: data.known_allergies ?? "",
            kidney_function: data.kidney_function ?? "",
            liver_function: data.liver_function ?? "",
          });
        }
        setLoading(false);
      });
  }, [userId]);

  // Check chat history for health info AI can extract
  useEffect(() => {
    if (!userId || loading) return;

    const stored = sessionStorage.getItem("scriptsense_chat");
    if (!stored) return;

    let messages;
    try { messages = JSON.parse(stored); } catch { return; }
    if (!messages || messages.length < 2) return;

    setCheckingAI(true);
    fetch("/api/extract-health", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, currentProfile: profile }),
    })
      .then((r) => r.json())
      .then(({ extracted }) => {
        // Only suggest fields that differ from current profile and have a value
        const meaningful = Object.fromEntries(
          Object.entries(extracted).filter(([k, v]) => v && v !== profile[k])
        );
        if (Object.keys(meaningful).length > 0) {
          setSuggestion(meaningful);
        }
      })
      .catch(() => {})
      .finally(() => setCheckingAI(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, loading]);

  async function saveProfile(dataToSave) {
    setSaving(true);
    setSaveStatus(null);

    const { error } = await supabase.from("health_profiles").upsert(
      { user_id: userId, ...dataToSave, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );

    setSaving(false);
    setSaveStatus(error ? "error" : "success");
    setTimeout(() => setSaveStatus(null), 3000);
  }

  function handleAcceptSuggestion() {
    const merged = { ...profile, ...suggestion };
    setProfile(merged);
    setSuggestion(null);
    saveProfile(merged);
  }

  function handleChange(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  const age = computeAge(profile.birthday);

  if (loading) {
    return <p className="text-xl text-gray-400">Loading your health data…</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Input Health Data</h2>
        <p className="text-lg text-gray-500 mt-1">
          Help us personalize your analysis by sharing relevant health information
        </p>
      </div>

      {checkingAI && (
        <p className="text-base text-teal-600 mb-4">Checking your chat for health information…</p>
      )}

      {suggestion && (
        <AISuggestionBanner
          suggestion={suggestion}
          onAccept={handleAcceptSuggestion}
          onDismiss={() => setSuggestion(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Birthday + computed age */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={profile.birthday}
            onChange={(e) => handleChange("birthday", e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 focus:outline-none focus:border-blue-900 transition-colors"
          />
          {age !== null && (
            <p className="text-base text-teal-600 font-medium mt-2">Age: {age} years old</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="text"
            value={profile.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            placeholder="e.g. 160 lbs"
            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Primary Conditions
          </label>
          <input
            type="text"
            value={profile.primary_conditions}
            onChange={(e) => handleChange("primary_conditions", e.target.value)}
            placeholder="e.g. Type 2 Diabetes, Hypertension"
            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Known Allergies
          </label>
          <input
            type="text"
            value={profile.known_allergies}
            onChange={(e) => handleChange("known_allergies", e.target.value)}
            placeholder="e.g. Penicillin, Sulfa drugs"
            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Kidney Function
          </label>
          <input
            type="text"
            value={profile.kidney_function}
            onChange={(e) => handleChange("kidney_function", e.target.value)}
            placeholder="Normal / Reduced — ask your doctor"
            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Liver Function
          </label>
          <input
            type="text"
            value={profile.liver_function}
            onChange={(e) => handleChange("liver_function", e.target.value)}
            placeholder="Normal / Reduced — ask your doctor"
            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-900 transition-colors"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <button
          onClick={() => saveProfile(profile)}
          disabled={saving}
          className="bg-blue-900 text-white text-xl font-bold px-10 py-5 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : "Save Health Data"}
        </button>

        {saveStatus === "success" && (
          <p className="text-lg text-teal-600 font-semibold">✓ Saved successfully</p>
        )}
        {saveStatus === "error" && (
          <p className="text-lg text-red-600 font-semibold">Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  );
}

function RegimenTab() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Regimen</h2>
        <p className="text-lg text-gray-500 mt-1">
          Your personalized daily medication schedule will appear here
        </p>
      </div>
      <EmptyState
        icon={
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
        title="Your regimen is empty"
        desc="Add your medications and health data first. ScriptSense will generate your personalized daily schedule automatically."
      />
    </div>
  );
}

function NotificationsTab() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Notification Settings</h2>
        <p className="text-lg text-gray-500 mt-1">
          Choose how and when ScriptSense reminds you to take your medications
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-xl">
        {[
          { label: "Daily medication reminders", desc: "Get notified when it's time to take each dose" },
          { label: "Interaction alerts", desc: "Be warned immediately if a new medication conflicts with your regimen" },
          { label: "Refill reminders", desc: "Receive a heads-up before you run out of a prescription" },
          { label: "Weekly summary", desc: "A weekly overview of your medication adherence" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between bg-gray-50 rounded-2xl px-7 py-6 border border-gray-200"
          >
            <div>
              <p className="text-xl font-semibold text-gray-900">{item.label}</p>
              <p className="text-base text-gray-500 mt-1">{item.desc}</p>
            </div>
            <div className="w-14 h-8 bg-gray-300 rounded-full relative shrink-0 ml-6 cursor-not-allowed opacity-60">
              <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-1 shadow" />
            </div>
          </div>
        ))}
        <p className="text-base text-gray-400 mt-2">
          Notification delivery will be configurable once your account is set up.
        </p>
      </div>
    </div>
  );
}

// ── Main dashboard ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("medications");
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      } else {
        setUser(session.user);
        setAuthChecked(true);
      }
    });
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading…</p>
      </div>
    );
  }

  const tabContent = {
    medications: <MedicationsTab userId={user?.id} />,
    health: <HealthDataTab userId={user?.id} />,
    regimen: <RegimenTab />,
    notifications: <NotificationsTab />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Dashboard</h1>
              <p className="text-blue-200 text-xl">Manage your medications, health data, and schedule</p>
            </div>
            <Link
              href="/chat"
              className="bg-teal-500 hover:bg-teal-400 text-white text-lg font-bold px-7 py-4 rounded-full transition-colors flex items-center gap-2 shrink-0"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              Chat with ScriptSense AI
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        <aside className="md:w-72 shrink-0">
          <nav className="bg-white rounded-2xl border border-gray-200 overflow-hidden" aria-label="Dashboard navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 text-left text-xl font-semibold transition-colors border-b border-gray-100 last:border-0 ${
                  activeTab === tab.id
                    ? "bg-blue-900 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                }`}
              >
                <span className={activeTab === tab.id ? "text-white" : "text-gray-400"}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
          {tabContent[activeTab]}
        </main>
      </div>
    </div>
  );
}
