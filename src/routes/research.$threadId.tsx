import { createFileRoute, useParams } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { deriveTitle, loadThreads, saveThreads, type ResearchThread } from "@/lib/research-storage";
import researchBot from "@/assets/research-bot.png";

export const Route = createFileRoute("/research/$threadId")({
  head: ({ params }) => {
    const url = `https://stardust-atlas-explorer.lovable.app/research/${params.threadId}`;
    const title = `Conversation ${params.threadId.slice(0, 8)} — Astralis Research`;
    const desc = `Private astronomy research conversation ${params.threadId} with the Astralis AI assistant.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { name: "robots", content: "noindex" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ThreadPage,
});

function ThreadPage() {
  const { threadId } = useParams({ from: "/research/$threadId" });

  // Load initial messages for this thread from localStorage on mount/thread switch
  const initial = useMemo<UIMessage[]>(() => {
    if (typeof window === "undefined") return [];
    const t = loadThreads().find((x) => x.id === threadId);
    return t?.messages ?? [];
  }, [threadId]);

  // Remount the chat per thread so messages don't bleed across threads
  return <ChatWindow key={threadId} threadId={threadId} initialMessages={initial} />;
}

const transport = new DefaultChatTransport({ api: "/api/chat" });

function ChatWindow({ threadId, initialMessages }: { threadId: string; initialMessages: UIMessage[] }) {
  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
  });

  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Persist to localStorage whenever messages or status changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status !== "ready" && messages.length === 0) return;
    const threads = loadThreads();
    const existing = threads.find((t) => t.id === threadId);
    const updated: ResearchThread = {
      id: threadId,
      title: deriveTitle(messages) || existing?.title || "New conversation",
      updatedAt: Date.now(),
      messages,
    };
    const next = [updated, ...threads.filter((t) => t.id !== threadId)];
    saveThreads(next);
  }, [messages, status, threadId]);

  // Focus management
  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId, status]);

  async function handleSubmit(msg: PromptInputMessage) {
    const t = msg.text.trim();
    if (!t || status === "submitted" || status === "streaming") return;
    setText("");
    await sendMessage({ text: t });
  }

  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-[calc(100vh-12rem)] min-h-[520px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/30 backdrop-blur">
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<img src={researchBot} alt="" width={48} height={48} />}
              title="Astralis Research AI"
              description="Ask about any planet, star, galaxy, mission or theory. I'll cite peer-reviewed sources where possible."
            />
          ) : (
            messages.map((m) => {
              const textContent = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              if (m.role === "user") {
                return (
                  <Message key={m.id} from="user">
                    <MessageContent>{textContent}</MessageContent>
                  </Message>
                );
              }
              return (
                <Message key={m.id} from="assistant">
                  <MessageContent >
                    {textContent ? (
                      <MessageResponse>{textContent}</MessageResponse>
                    ) : (
                      <Shimmer>Thinking…</Shimmer>
                    )}
                  </MessageContent>
                </Message>
              );
            })
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent >
                <Shimmer>Searching the cosmos…</Shimmer>
              </MessageContent>
            </Message>
          )}
          {error && (
            <div className="mx-4 my-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
              {error.message || "Something went wrong. Please try again."}
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border/60 bg-background/40 p-3">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Ask about a planet, mission, theory… (Shift+Enter for newline)"
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={!text.trim() || busy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
