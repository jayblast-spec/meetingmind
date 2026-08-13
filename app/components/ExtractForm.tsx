"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MeetingOutput, ActionItem } from "../api/extract/route";

const MONO = "var(--font-jetbrains, 'JetBrains Mono', monospace)";
const SANS = "var(--font-hanken, 'Hanken Grotesk', sans-serif)";

const PRIORITY_STYLE: Record<ActionItem["priority"], { bg: string; color: string; border: string }> = {
  high:   { bg: "rgba(47,122,179,0.08)",    color: "#2f7ab3", border: "rgba(47,122,179,0.3)" },
  medium: { bg: "rgba(168,85,247,0.08)",   color: "#A855F7", border: "rgba(168,85,247,0.3)" },
  low:    { bg: "rgba(48,54,61,0.5)",      color: "#a89f9b", border: "#2d2422" },
};

const CARD: React.CSSProperties = {
  background: "rgba(22,18,17,0.75)",
  backdropFilter: "blur(20px)",
  border: "1px solid #2d2422",
  borderRadius: "4px",
};

const PLACEHOLDER = `[Team standup — Tuesday]
Attendees: Joy, Marcus, Aisha

- Discussed onboarding redesign — Joy will own it, wireframes due Friday
- Marcus confirmed the $2k/mo paid ads budget is approved; will launch LinkedIn + Meta campaigns next week
- Analytics feature paused — moving to Q4 backlog (low usage data)
- Aisha to compile support ticket feedback report by Monday
- No new hires until August per ArkNet Digital's call — pipeline not ready
- Open: which ad platform works best for our ICP?
- Follow-up sync scheduled in 2 weeks`;

type State = "idle" | "loading" | "error" | { demo: boolean; meeting: MeetingOutput };

export default function ExtractForm() {
  const [notes, setNotes] = useState("");
  const [state, setState] = useState<State>("idle");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!notes.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setState({ demo: data.demo, meeting: data.meeting });
    } catch {
      setState("error");
    }
  }

  function copyOutput() {
    if (typeof state !== "object") return;
    const m = state.meeting;
    const text = [
      `# ${m.title}`,
      `${m.date} · ${m.participants.join(", ")}`,
      `\n## Summary\n${m.summary}`,
      `\n## Action Items\n${m.actionItems.map((a) => `- [${a.priority.toUpperCase()}] ${a.action}${a.owner ? ` (${a.owner})` : ""}${a.dueDate ? ` — due ${a.dueDate}` : ""}`).join("\n")}`,
      `\n## Decisions\n${m.decisions.map((d) => `- ${d.decision}${d.rationale ? `\n  Why: ${d.rationale}` : ""}`).join("\n")}`,
      m.openQuestions.length ? `\n## Open Questions\n${m.openQuestions.map((q) => `- ${q}`).join("\n")}` : "",
      `\n## Next Steps\n${m.nextSteps}`,
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const result = typeof state === "object" ? state : null;

  return (
    <section id="extract" className="mx-auto w-full max-w-3xl px-4 pb-32">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
        {/* Input label */}
        <div className="flex items-center gap-2">
          <span style={{ color: "#2f7ab3", fontFamily: MONO, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em" }}>
            $
          </span>
          <label style={{ color: "#a89f9b", fontFamily: MONO, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            PASTE MEETING NOTES
          </label>
        </div>

        {/* Textarea */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={10}
          style={{
            width: "100%",
            background: "#0c0e12",
            border: "1px solid #2d2422",
            borderRadius: "4px",
            padding: "16px",
            fontSize: "13px",
            color: "#f4efec",
            fontFamily: MONO,
            lineHeight: "1.6",
            resize: "none",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#2f7ab3";
            e.currentTarget.style.boxShadow = "0 0 0 1px rgba(47,122,179,0.2)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#2d2422";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <p style={{ color: "#a89f9b", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.04em" }}>
          Bullet points, transcripts, freeform — any format works.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={state === "loading" || !notes.trim()}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-40"
          style={{
            background: "#2f7ab3",
            color: "#f4efec",
            borderRadius: "4px",
            fontFamily: MONO,
            letterSpacing: "0.06em",
          }}
        >
          {state === "loading" ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
              </svg>
              PROCESSING…
            </>
          ) : (
            "EXTRACT ACTIONS →"
          )}
        </button>
      </form>

      {/* Error */}
      {state === "error" && (
        <div
          className="mb-8 p-4 text-sm"
          style={{ background: "rgba(194,59,59,0.08)", border: "1px solid rgba(194,59,59,0.25)", borderRadius: "4px", color: "#c23b3b", fontFamily: MONO }}
        >
          ERR: Something went wrong. Please try again.
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Demo mode notice */}
            {result.demo && (
              <div
                className="flex items-center gap-2 px-4 py-2.5 text-xs"
                style={{ background: "rgba(47,122,179,0.06)", border: "1px solid rgba(47,122,179,0.2)", borderRadius: "4px", color: "#2f7ab3", fontFamily: MONO, letterSpacing: "0.04em" }}
              >
                <span>◈</span> DEMO MODE — add a Groq API key to process your real notes
              </div>
            )}

            {/* Header + copy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-start justify-between gap-4"
              style={CARD}
            >
              <div className="p-5 flex-1">
                <p style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#2f7ab3", marginBottom: "6px" }}>MEETING INTELLIGENCE REPORT</p>
                <h3 className="text-xl font-bold" style={{ color: "#f4efec", fontFamily: SANS }}>{result.meeting.title}</h3>
                <p className="text-sm mt-1" style={{ color: "#a89f9b", fontFamily: MONO, fontSize: "12px" }}>
                  {result.meeting.date} · {result.meeting.participants.join(", ")}
                </p>
              </div>
              <div className="p-4">
                <button
                  onClick={copyOutput}
                  className="px-3 py-1.5 text-xs font-bold transition-colors hover:border-opacity-80"
                  style={{ border: "1px solid #2d2422", borderRadius: "4px", color: "#a89f9b", fontFamily: MONO, letterSpacing: "0.05em", background: "transparent" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(47,122,179,0.4)"; e.currentTarget.style.color = "#2f7ab3"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2d2422"; e.currentTarget.style.color = "#a89f9b"; }}
                >
                  {copied ? "COPIED ✓" : "COPY ALL"}
                </button>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ ...CARD, padding: "20px" }}
            >
              <p style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#2f7ab3", marginBottom: "10px" }}>// SUMMARY</p>
              <p className="text-sm leading-relaxed" style={{ color: "#f4efec" }}>{result.meeting.summary}</p>
            </motion.div>

            {/* Action Items */}
            <div>
              <p style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#a89f9b", marginBottom: "10px" }}>
                ACTION_ITEMS ({result.meeting.actionItems.length})
              </p>
              <div className="flex flex-col gap-2">
                {result.meeting.actionItems.map((item, i) => {
                  const ps = PRIORITY_STYLE[item.priority];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex items-start gap-3 p-4"
                      style={CARD}
                    >
                      <span
                        className="shrink-0 px-1.5 py-0.5 text-[9px] font-bold"
                        style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}`, borderRadius: "4px", fontFamily: MONO, letterSpacing: "0.06em" }}
                      >
                        {item.priority.toUpperCase()}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ color: "#f4efec", fontFamily: MONO }}>{item.action}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          {item.owner && <span style={{ color: "#a89f9b", fontSize: "11px", fontFamily: MONO }}>owner:{item.owner}</span>}
                          {item.dueDate && <span style={{ color: "#a89f9b", fontSize: "11px", fontFamily: MONO }}>due:{item.dueDate}</span>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Decisions */}
            {result.meeting.decisions.length > 0 && (
              <div>
                <p style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#a89f9b", marginBottom: "10px" }}>
                  DECISIONS ({result.meeting.decisions.length})
                </p>
                <div className="flex flex-col gap-2">
                  {result.meeting.decisions.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      className="p-4"
                      style={CARD}
                    >
                      <p className="text-sm font-semibold" style={{ color: "#f4efec", fontFamily: SANS }}>{d.decision}</p>
                      {d.rationale && <p className="text-xs mt-1.5" style={{ color: "#a89f9b", fontFamily: MONO }}>why: {d.rationale}</p>}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Open Questions */}
            {result.meeting.openQuestions.length > 0 && (
              <div>
                <p style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#a89f9b", marginBottom: "10px" }}>
                  OPEN_QUESTIONS ({result.meeting.openQuestions.length})
                </p>
                <div className="flex flex-col gap-2">
                  {result.meeting.openQuestions.map((q, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="flex items-start gap-2 p-3"
                      style={{ background: "rgba(201,151,63,0.05)", border: "1px solid rgba(201,151,63,0.2)", borderRadius: "4px" }}
                    >
                      <span style={{ color: "#c9973f", fontFamily: MONO, fontSize: "13px" }}>?</span>
                      <p className="text-sm" style={{ color: "#a89f9b", fontFamily: MONO }}>{q}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4"
              style={{ background: "rgba(79,157,114,0.05)", border: "1px solid rgba(79,157,114,0.2)", borderRadius: "4px" }}
            >
              <p style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#4f9d72", marginBottom: "8px" }}>NEXT_STEPS</p>
              <p className="text-sm" style={{ color: "#f4efec" }}>{result.meeting.nextSteps}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
