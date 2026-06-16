"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MeetingOutput, ActionItem } from "../api/extract/route";

const PRIORITY_COLOR: Record<ActionItem["priority"], string> = {
  high: "bg-danger/15 text-danger border-danger/30",
  medium: "bg-warn/15 text-warn border-warn/30",
  low: "bg-border text-muted border-border",
};

type State = "idle" | "loading" | "error" | { demo: boolean; meeting: MeetingOutput };

const PLACEHOLDER = `[Team standup — Tuesday]
Attendees: Joy, Marcus, Aisha

- Discussed onboarding redesign — Joy will own it, wireframes due Friday
- Marcus confirmed the $2k/mo paid ads budget is approved; will launch LinkedIn + Meta campaigns next week
- Analytics feature paused — moving to Q4 backlog (low usage data)
- Aisha to compile support ticket feedback report by Monday
- No new hires until August per ArkNet Digital's call — pipeline not ready
- Open: which ad platform works best for our ICP?
- Follow-up sync scheduled in 2 weeks`;

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Paste your meeting notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={10}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none resize-none font-mono"
          />
          <p className="text-xs text-muted">Bullet points, transcripts, freeform — any format works.</p>
        </div>

        <button
          type="submit"
          disabled={state === "loading" || !notes.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-background hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {state === "loading" ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
              </svg>
              Extracting actions…
            </>
          ) : (
            "Extract actions →"
          )}
        </button>
      </form>

      {state === "error" && (
        <div className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger mb-8">
          Something went wrong. Please try again.
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {result.demo && (
              <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent-soft px-4 py-2.5 text-xs text-accent-2">
                <span>◈</span> Demo output — add a Groq API key to process your real notes
              </div>
            )}

            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground">{result.meeting.title}</h3>
                <p className="text-sm text-muted mt-0.5">
                  {result.meeting.date} · {result.meeting.participants.join(", ")}
                </p>
              </div>
              <button
                onClick={copyOutput}
                className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted hover:border-accent/50 hover:text-accent transition-colors"
              >
                {copied ? "Copied!" : "Copy all"}
              </button>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-accent/20 bg-accent-soft p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Summary</p>
              <p className="text-sm text-foreground leading-relaxed">{result.meeting.summary}</p>
            </motion.div>

            {/* Action items */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Action Items ({result.meeting.actionItems.length})
              </p>
              <div className="flex flex-col gap-2">
                {result.meeting.actionItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
                  >
                    <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 border shrink-0 uppercase ${PRIORITY_COLOR[item.priority]}`}>
                      {item.priority}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{item.action}</p>
                      <div className="flex items-center gap-3 mt-1">
                        {item.owner && <span className="text-xs text-muted">👤 {item.owner}</span>}
                        {item.dueDate && <span className="text-xs text-muted">📅 {item.dueDate}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decisions */}
            {result.meeting.decisions.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                  Decisions ({result.meeting.decisions.length})
                </p>
                <div className="flex flex-col gap-2">
                  {result.meeting.decisions.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      className="rounded-xl border border-border bg-surface p-4"
                    >
                      <p className="text-sm font-semibold text-foreground">{d.decision}</p>
                      {d.rationale && <p className="text-xs text-muted mt-1">Why: {d.rationale}</p>}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Open questions */}
            {result.meeting.openQuestions.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Open Questions</p>
                <div className="flex flex-col gap-2">
                  {result.meeting.openQuestions.map((q, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="flex items-start gap-2 rounded-xl border border-warn/20 bg-warn/5 p-3"
                    >
                      <span className="text-warn text-sm shrink-0">?</span>
                      <p className="text-sm text-muted">{q}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Next steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-success/20 bg-success/5 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-success mb-1">Next Steps</p>
              <p className="text-sm text-foreground">{result.meeting.nextSteps}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
