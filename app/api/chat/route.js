// Anthropic API key is loaded from .env.local → ANTHROPIC_API_KEY
// Paste your key in .env.local: ANTHROPIC_API_KEY=sk-ant-...
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are ScriptSense, an expert medication advisor for seniors. When a user provides their medications, dosages, and health information, use web search to find current FDA drug interaction data, absorption timing recommendations, and evidence-based supplement suggestions. Always cite your sources. Format your response clearly with sections: Drug Interactions Found, Optimal Timing Schedule, Recommended Supplements, and Important Notes. Use plain English — your users are seniors. Always remind users to consult their doctor before making changes.`;

export async function POST(request) {
  const { messages } = await request.json();

  // Convert chat history to Anthropic message format
  const anthropicMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.text,
  }));

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = client.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
            },
          ],
          messages: anthropicMessages,
        });

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        controller.close();
      } catch (err) {
        const msg = err?.message ?? "An error occurred. Please try again.";
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
