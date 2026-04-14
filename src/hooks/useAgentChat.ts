import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ChatRole = "user" | "ai" | "pipeline";

export type ChatMessage = {
  role: ChatRole;
  content: string;
  steps?: string[];
};

export type AgentState = "idle" | "processing" | "searching" | "streaming" | "offline";

type StatusPayload = {
  status: string;
  answer?: string | { answer: string };
};

type IncomingPayload = StatusPayload;

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "ai",
    content: "Hi! I'm Duy's AI assistant. I'm here to help you explore Duy's projects, publications, and skills. Feel free to ask me anything about this portfolio!",
  },
];

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws/query";

function mapStatusToAgentState(status: string): AgentState {
  const normalized = status.toLowerCase();
  if (normalized.includes("fetching") || normalized.includes("connecting")) return "searching";
  if (normalized.includes("success")) return "idle";
  return "processing";
}

export function useAgentChat() {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [agentState, setAgentState] = useState<AgentState>("idle");
  const [statusText, setStatusText] = useState("Idle");
  const [processHistory, setProcessHistory] = useState<string[]>([]);
  const processHistoryRef = useRef<string[]>([]);

  const connect = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState <= WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setAgentState("idle");
      setStatusText("Idle");
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as IncomingPayload;

        if (payload.status) {
          const newState = mapStatusToAgentState(payload.status);
          setAgentState(newState);
          setStatusText(payload.status);

          if (payload.answer) {
            const answerText = typeof payload.answer === "string" 
              ? payload.answer 
              : payload.answer.answer;

            const capturedSteps = [...processHistoryRef.current];

            setMessages((prev) => [
              ...prev,
              ...(capturedSteps.length > 0
                ? [{ role: "pipeline" as const, content: "Pipeline", steps: capturedSteps }]
                : []),
              { role: "ai", content: answerText },
            ]);

            processHistoryRef.current = [];
            setProcessHistory([]);
            setStatusText("Idle");
            setAgentState("idle");
          } else {
            const nextHistory = [...processHistoryRef.current, payload.status];
            processHistoryRef.current = nextHistory;
            setProcessHistory(nextHistory);
          }
          return;
        }
      } catch {
        setAgentState("processing");
        setStatusText("Receiving updates...");
      }
    };

    ws.onerror = () => {
      setAgentState("offline");
      setStatusText("Backend offline");
    };

    ws.onclose = () => {
      setAgentState("offline");
      setStatusText("Backend disconnected");
    };
  }, []);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);

  const sendMessage = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
  processHistoryRef.current = [];
    setProcessHistory([]);
    setInput("");
    setAgentState("processing");
    setStatusText("Processing your request...");

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ question: trimmed }));
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "I can't reach the backend right now.",
      },
    ]);
    setAgentState("offline");
    setStatusText("Backend offline");
  }, [input]);

  const isFlowing = useMemo(
    () => agentState === "processing" || agentState === "searching" || agentState === "streaming",
    [agentState]
  );

  return {
    messages,
    input,
    setInput,
    sendMessage,
    agentState,
    statusText,
    processHistory,
    isFlowing,
  };
}