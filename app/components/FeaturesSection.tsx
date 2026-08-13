"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ICON_PATHS: Record<string, string> = {
  ACTION_EXTRACT: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  DECISION_LOG: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 8l2 2 4-4",
  OWNER_ASSIGN: "M20 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M4 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  ONE_CLICK_COPY: "M9 9h9a2 2 0 012 2v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9a2 2 0 012-2zM5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  "10S_FLAT": "M12 8v4l3 3M20 12a8 8 0 11-16 0 8 8 0 0116 0z",
  PRIVACY_FIRST: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

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
            color: "#2f7ab3",
            fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
            letterSpacing: "0.12em",
          }}
        >
          // CAPABILITIES
        </p>
        <h2
          className="text-2xl font-bold sm:text-3xl"
          style={{
            color: "#f4efec",
            fontFamily: "var(--font-hanken, 'Hanken Grotesk', sans-serif)",
            letterSpacing: "-0.01em",
          }}
        >
          Every meeting ends with{" "}
          <span style={{ color: "#2f7ab3" }}>clarity</span>
        </h2>
        <p className="mt-3" style={{ color: "#a89f9b" }}>
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
              borderColor: "rgba(47,122,179,0.35)",
              boxShadow: "0 0 16px rgba(47,122,179,0.07)",
            }}
            className="p-5 transition-colors"
            style={{
              background: "rgba(22,18,17,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid #2d2422",
              borderRadius: "4px",
            }}
          >
            <span className="icon-3d mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={ICON_PATHS[f.label]} />
              </svg>
            </span>
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#a89f9b",
              }}
            >
              {f.label}
            </p>
            <p
              className="font-semibold mb-1.5"
              style={{
                color: "#f4efec",
                fontFamily: "var(--font-hanken, sans-serif)",
              }}
            >
              {f.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#a89f9b" }}>
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
