"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    label: "ACTION_EXTRACT",
    title: "Action item extraction",
    body: "Every commitment made in the meeting is pulled out, labeled with an owner, and given a concrete deadline.",
  },
  {
    label: "DECISION_LOG",
    title: "Decisions captured",
    body: "What was actually decided gets its own section. No more scrolling back through transcripts looking for the outcome.",
  },
  {
    label: "OWNER_ASSIGN",
    title: "Owner assignment",
    body: "The AI attributes each action to the person responsible — pulled directly from context in your raw notes.",
  },
  {
    label: "ONE_CLICK_COPY",
    title: "One-click copy",
    body: "Copy the structured output as clean text to paste into Slack, Notion, email — wherever your team lives.",
  },
  {
    label: "10S_FLAT",
    title: "10 seconds flat",
    body: "Paste notes, click extract. No templates to fill in, no categories to tag. Works on transcripts, bullets, or freeform scribbles.",
  },
  {
    label: "PRIVACY_FIRST",
    title: "Your notes stay private",
    body: "Notes are sent to the AI and immediately discarded. Nothing is stored, logged, or associated with you.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <p
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{
            color: "#00e5ff",
            fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
            letterSpacing: "0.12em",
          }}
        >
          // CAPABILITIES
        </p>
        <h2
          className="text-2xl font-bold sm:text-3xl"
          style={{
            color: "#e2e2e8",
            fontFamily: "var(--font-hanken, 'Hanken Grotesk', sans-serif)",
            letterSpacing: "-0.01em",
          }}
        >
          Every meeting ends with{" "}
          <span style={{ color: "#00e5ff" }}>clarity</span>
        </h2>
        <p className="mt-3" style={{ color: "#849396" }}>
          Stop losing decisions and commitments in your notes. MeetingMind structures them for you.
        </p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{
              borderColor: "rgba(0,229,255,0.35)",
              boxShadow: "0 0 16px rgba(0,229,255,0.07)",
            }}
            className="p-5 transition-colors"
            style={{
              background: "rgba(22,27,34,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid #30363D",
              borderRadius: "4px",
            }}
          >
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#849396",
              }}
            >
              {f.label}
            </p>
            <p
              className="font-semibold mb-1.5"
              style={{
                color: "#e2e2e8",
                fontFamily: "var(--font-hanken, sans-serif)",
              }}
            >
              {f.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#849396" }}>
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
