import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";
import type { ChatMessage } from "@/hooks/useAgentChat";

type ChatInterfaceProps = {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export function ChatInterface({ messages, input, setInput, onSend }: ChatInterfaceProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <section className="rounded-3xl border border-black/10 bg-white h-[min(62vh,620px)] flex flex-col overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-black/10">
        <p className="font-mono text-xs uppercase tracking-wider text-black/40">Chat</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#fcfcfc]">
        {messages.map((message, index) => (
          <motion.div
            key={`${message.role}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-black text-white"
                  : "bg-white border border-black/10 text-black/80"
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        className="p-3 border-t border-black/10 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-black/10 px-3 py-2 focus-within:border-black/30 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects, publications, or skills..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-black/30"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1 rounded-xl bg-[hsl(0,84%,60%)] px-3 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
          >
            Send
            <SendHorizonal className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </section>
  );
}
