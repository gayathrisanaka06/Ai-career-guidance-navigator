"use client";

import { useState } from "react";
import {
  MessageSquareCode,
  Sparkles,
  Send,
  User,
  Bot,
  Compass,
  ArrowRight,
  Lightbulb,
  Zap
} from "lucide-react";
import { sendMentorMessage } from "@/lib/api";

interface Message {
  role: "user" | "mentor";
  content: string;
}

const QUICK_PROMPTS = [
  "Compare AI Engineer vs Data Engineer career paths",
  "How should I structure my resume for ATS parsers?",
  "What are the top 3 interview questions for SDE-1?",
  "Suggest a high-impact capstone project with Docker",
  "How do I prepare for DSA in 60 days?"
];

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "mentor",
      content:
        "Hello Aarav! I am your **AI Career Mentor**.\n\nI've analyzed your B.Tech CSE profile, your 8.7 CGPA, and your background in Python, SQL, and FastAPI.\n\nHow can I guide your placement journey today? You can ask me about career selection, project architecture, resume improvements, or interview tactics."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await sendMentorMessage(query, "AI Engineer", messages);
      setMessages((prev) => [...prev, { role: "mentor", content: response.reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-2">
          <MessageSquareCode className="h-3.5 w-3.5 text-cyan-400" />
          <span>Autonomous AI Career Mentor Chat</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Direct Mentor Consultation</h1>
        <p className="text-slate-400 text-sm">
          Real-time strategic advice, career roadmapping, and placement interview coaching.
        </p>
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex flex-wrap gap-2 pt-1">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Lightbulb className="h-3 w-3 text-cyan-400" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="glass-panel rounded-3xl border border-slate-800 h-[520px] flex flex-col overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "mentor" && (
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-violet-600 text-white rounded-tr-none shadow-md"
                    : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0 text-xs font-bold">
                  AS
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-violet-600/30 flex items-center justify-center text-violet-300 shrink-0">
                <Sparkles className="h-4 w-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 italic">
                AI Mentor formulating strategic response...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask your AI Mentor anything about your career roadmap, placements, or projects..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
