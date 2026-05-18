import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

type ChatRequestBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are Astralis Research Assistant, an expert AI for astronomy and astrophysics. You help professional researchers, students, and curious readers explore celestial bodies, cosmology, missions, and theory.

Guidelines:
- Be precise and source-aware. Distinguish established consensus from open questions.
- Use clear markdown: headings, bullets, and short paragraphs. Use LaTeX-style inline math sparingly when helpful.
- ALWAYS, when relevant, end your answer with a "References" section listing 3-6 high-quality research links (arXiv, NASA ADS, NASA/ESA mission pages, peer-reviewed journals like Nature, Science, ApJ, MNRAS, A&A). Format each as a clickable markdown link with title — venue — year. Prefer direct DOI / arXiv URLs.
- If the user asks about a specific body, include vital stats, current research questions, and notable papers.
- Be honest about uncertainty and do not fabricate citations. If unsure of an exact URL, point to the canonical search (e.g. arXiv search, NASA ADS query) instead.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
