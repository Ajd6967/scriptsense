export async function POST(request) {
  const { medications } = await request.json();

  if (!medications || medications.length === 0) {
    return Response.json({ regimen: null });
  }

  const medList = medications
    .map((m) => `- ${m.name}${m.dosage ? ` ${m.dosage}` : ""}${m.frequency ? `, ${m.frequency}` : ""}${m.notes ? ` (${m.notes})` : ""}`)
    .join("\n");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://scriptsense.vercel.app",
      "X-Title": "ScriptSense",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are a medication scheduling expert. Given a list of medications, generate an optimized daily schedule. Return ONLY a JSON object with exactly these keys: "morning", "afternoon", "evening", "bedtime". Each key maps to an array of objects with:
- medication (string): medication name and dosage
- notes (string): brief instruction like "take with food" or "take on empty stomach"

Distribute medications to minimize interactions and maximize effectiveness. Use empty arrays for time slots with no medications. Return only valid JSON, no markdown.`,
        },
        {
          role: "user",
          content: `Generate a daily schedule for these medications:\n${medList}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return Response.json({ regimen: null });
  }

  const json = await response.json();
  const text = json.choices?.[0]?.message?.content ?? "{}";

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const regimen = JSON.parse(cleaned);
    return Response.json({ regimen });
  } catch {
    return Response.json({ regimen: null });
  }
}
