export async function POST(request) {
  const { messages, medications = [], healthProfile = null } = await request.json();

  const medList = medications.length > 0
    ? medications.map((m) => `- ${m.name}${m.dosage ? ` ${m.dosage}` : ""}${m.frequency ? `, ${m.frequency}` : ""}${m.notes ? ` (${m.notes})` : ""}`).join("\n")
    : "None saved yet.";

  const profileLines = healthProfile
    ? [
        healthProfile.birthday ? `Date of birth: ${healthProfile.birthday}` : null,
        healthProfile.weight ? `Weight: ${healthProfile.weight}` : null,
        healthProfile.primary_conditions ? `Conditions: ${healthProfile.primary_conditions}` : null,
        healthProfile.known_allergies ? `Allergies: ${healthProfile.known_allergies}` : null,
        healthProfile.kidney_function ? `Kidney function: ${healthProfile.kidney_function}` : null,
        healthProfile.liver_function ? `Liver function: ${healthProfile.liver_function}` : null,
      ].filter(Boolean).join("\n")
    : "No health profile saved yet.";

  const systemPrompt = `You are ScriptSense, an expert medication advisor. Use plain English. Always remind users to consult their doctor before making changes.

The user's saved medications are:
${medList}

The user's saved health profile is:
${profileLines}

Your primary goal is to collect and update the user's medication list and health information. When the user shares any medications or health details, acknowledge what you've recorded and ask follow-up questions to fill in missing details such as dosage, frequency, and route (oral, topical, etc.).

IMPORTANT: At the very end of EVERY response, you MUST include a <SAVE> block in exactly this format — even if nothing changed (use empty arrays/object):

<SAVE>
{
  "medications": [
    { "name": "...", "dosage": "...", "frequency": "...", "notes": "..." }
  ],
  "health": {
    "primary_conditions": "...",
    "known_allergies": "...",
    "weight": "...",
    "birthday": "...",
    "kidney_function": "...",
    "liver_function": "..."
  }
}
</SAVE>

Only include medications the user explicitly said they are currently taking that are NOT already in their saved list. Only include health fields the user explicitly stated. Omit any field you do not have a value for. If nothing new was mentioned, use empty arrays/objects.`;

  const openRouterMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.text,
  }));

  let response;
  try {
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
          { role: "system", content: systemPrompt },
          ...openRouterMessages,
        ],
        stream: true,
      }),
    });
  } catch (err) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`[Debug] Connection error: ${err.message}`));
        controller.close();
      },
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  if (!response.ok) {
    const errorText = await response.text();
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`[Debug] OpenRouter error ${response.status}: ${errorText}`));
        controller.close();
      },
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

          for (const line of lines) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const text = parsed.choices?.[0]?.delta?.content;
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // skip malformed chunks
            }
          }
        }

        controller.close();
      } catch (err) {
        controller.enqueue(encoder.encode(`\n\n[Error: ${err.message}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
