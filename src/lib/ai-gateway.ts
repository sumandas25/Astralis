import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

type AiProviderName = "custom" | "openai" | "gemini" | "lovable";

type AiConfig = {
  name: AiProviderName;
  model: string;
  provider: ReturnType<typeof createOpenAICompatible>;
};

function bearerHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
  };
}

function createProvider(name: string, baseURL: string, apiKey: string) {
  return createOpenAICompatible({
    name,
    baseURL,
    headers: bearerHeaders(apiKey),
  });
}

function createLovableProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export function getAiConfig(env: NodeJS.ProcessEnv): AiConfig | null {
  const requested = env.AI_PROVIDER?.trim().toLowerCase() as AiProviderName | undefined;

  const configs: Partial<Record<AiProviderName, AiConfig | null>> = {
    custom:
      env.AI_API_KEY && env.AI_BASE_URL
        ? {
            name: "custom",
            model: env.AI_MODEL || "gpt-4o-mini",
            provider: createProvider("custom", env.AI_BASE_URL, env.AI_API_KEY),
          }
        : null,
    openai: env.OPENAI_API_KEY
      ? {
          name: "openai",
          model: env.OPENAI_MODEL || "gpt-4o-mini",
          provider: createProvider("openai", "https://api.openai.com/v1", env.OPENAI_API_KEY),
        }
      : null,
    gemini: env.GEMINI_API_KEY
      ? {
          name: "gemini",
          model: env.GEMINI_MODEL || "gemini-2.5-flash",
          provider: createProvider(
            "gemini",
            "https://generativelanguage.googleapis.com/v1beta/openai",
            env.GEMINI_API_KEY,
          ),
        }
      : null,
    lovable: env.LOVABLE_API_KEY
      ? {
          name: "lovable",
          model: env.LOVABLE_MODEL || "google/gemini-3-flash-preview",
          provider: createLovableProvider(env.LOVABLE_API_KEY),
        }
      : null,
  };

  if (requested) return configs[requested] ?? null;
  return configs.custom ?? configs.openai ?? configs.gemini ?? configs.lovable ?? null;
}

export function missingAiConfigMessage() {
  return [
    "Research AI is not configured.",
    "Add one server-side provider key: OPENAI_API_KEY, GEMINI_API_KEY, LOVABLE_API_KEY, or AI_API_KEY with AI_BASE_URL.",
    "Do not expose these values in client-side VITE_* variables.",
  ].join(" ");
}
