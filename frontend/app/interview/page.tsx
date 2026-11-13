"use client";

import { useState } from "react";
import {
  Mic2,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  HelpCircle,
  Lightbulb,
  Send
} from "lucide-react";
import { evaluateInterview, getInterviewQuestion } from "@/lib/api";
import { MockInterviewEvaluation, MockInterviewQuestion } from "@/lib/types";

export default function MockInterviewPage() {
  const [roundType, setRoundType] = useState<"Technical" | "Behavioral" | "HR" | "Coding">("Technical");
  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [currentQuestion, setCurrentQuestion] = useState<MockInterviewQuestion>({
    id: "q-1",
    round_type: "Technical",
    question: "Explain the architecture of a Retrieval-Augmented Generation (RAG) system, and discuss how you minimize hallucinations while ensuring sub-second latency.",
    ideal_focus_points: [
      "Document chunking and dense vector embedding pipelines",
      "Vector database indexing (HNSW) and cosine similarity",
      "Reranking, system prompts, and ground truth guardrails"
    ]
  });

  const [studentAnswer, setStudentAnswer] = useState(
    "A RAG system consists of an ingestion pipeline where documents are chunked and embedded into high-dimensional vectors stored in a vector DB like ChromaDB. When a user queries, we embed the query, fetch the top-k most similar chunks, and pass them as grounded context to a language model like Gemini Flash with a prompt instructing it strictly to answer using only the provided facts. To reduce latency, we cache frequent queries in Redis and use approximate nearest neighbor indexing."
  );

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<MockInterviewEvaluation | null>({
    technical_accuracy: 9,
    confidence_tone: 8,
    communication_clarity: 9,
    completeness: 8,
    overall_round_score: 86,
    strengths: [
      "Excellent explanation of ingestion vs retrieval phase mechanics.",
      "Highlighted concrete production solutions (Redis caching, ANN indexing) for low latency.",
      "Clear, professional tone and logical structure."
    ],
    areas_for_improvement: [
      "Mention cross-encoder re-ranking (e.g. Cohere) for edge cases with ambiguous queries.",
      "Incorporate the STAR framework if answering behavioral or project-based follow-ups."
    ],
    model_answer: "An exemplary answer outlines the dual-pipeline design (offline ingestion vs online inference), details vector indexing (HNSW/IVF), explains re-ranking for precision, and adds automated evaluation metrics (faithfulness and answer relevance via Ragas)."
  });

  const handleFetchNewQuestion = async (selectedRound: any) => {
    setRoundType(selectedRound);
    try {
      const q = await getInterviewQuestion(selectedRound, targetRole);
      setCurrentQuestion(q);
      setStudentAnswer("");
      setEvaluation(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEvaluate = async () => {
    if (!studentAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const result = await evaluateInterview(currentQuestion.question, roundType, studentAnswer, targetRole);
      setEvaluation(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-2">
            <Mic2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Live Placement Interview Round</h1>
          <p className="text-slate-400 text-sm">
            Simulate realistic technical and behavioral rounds with instant scoring on accuracy, delivery, and structure.
          </p>
        </div>

        {/* Round Switcher */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {(["Technical", "Behavioral", "HR", "Coding"] as const).map((r) => (
            <button
              key={r}
              onClick={() => handleFetchNewQuestion(r)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                roundType === r
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interview Stage (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800">
          {/* Question Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Interviewer Question ({roundType} Round)
              </span>
              <button
                onClick={() => handleFetchNewQuestion(roundType)}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Next Question</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <p className="text-sm font-semibold text-white leading-relaxed">
                &ldquo;{currentQuestion.question}&rdquo;
              </p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300">Key Evaluation Expectations:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  {currentQuestion.ideal_focus_points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Student Answer Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>Your Response</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {studentAnswer.split(/\s+/).filter(Boolean).length} Words
              </span>
            </label>
            <textarea
              rows={8}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Speak or type your structured response..."
              className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
            />
          </div>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !studentAnswer.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            {isEvaluating ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>AI Hiring Committee Evaluating Answer...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Submit & Get Comprehensive Feedback</span>
              </>
            )}
          </button>
        </div>

        {/* Right Evaluation Scorecard (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {evaluation ? (
            <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-emerald-500/20 bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Round Scorecard
                  </span>
                  <h3 className="text-lg font-bold text-white">Performance Diagnostic</h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-400">
                    {evaluation.overall_round_score}%
                  </span>
                  <p className="text-[10px] text-slate-400">Offer Grade</p>
                </div>
              </div>

              {/* 4 Score Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: "Technical Accuracy", score: evaluation.technical_accuracy },
                  { label: "Confidence & Tone", score: evaluation.confidence_tone },
                  { label: "Communication Clarity", score: evaluation.communication_clarity },
                  { label: "Completeness", score: evaluation.completeness },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block leading-tight">{item.label}</span>
                    <span className="text-lg font-bold text-emerald-400">{item.score} / 10</span>
                  </div>
                ))}
              </div>

              {/* Strengths & Areas for Improvement */}
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Candidate Strengths</span>
                  </h4>
                  <ul className="space-y-1">
                    {evaluation.strengths.map((str, idx) => (
                      <li key={idx} className="text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-400 flex items-center gap-1.5 mb-1.5">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>Actionable Improvements for Placement Day</span>
                  </h4>
                  <ul className="space-y-1">
                    {evaluation.areas_for_improvement.map((imp, idx) => (
                      <li key={idx} className="text-slate-400 flex items-start gap-2">
                        <span className="text-amber-400">⚠</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Answer Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>AI Model Answer Key</span>
                </span>
                <p className="text-slate-300 leading-relaxed">{evaluation.model_answer}</p>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-slate-800">
              <Mic2 className="h-10 w-10 text-slate-600 mx-auto" />
              <h3 className="font-bold text-sm text-slate-200">Awaiting Your Response</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Type your answer to the interview question on the left and submit to view instant scores and tips.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
