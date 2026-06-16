"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "✅",
    title: "Action item extraction",
    body: "Every commitment made in the meeting is pulled out, labeled with an owner, and given a concrete deadline.",
  },
  {
    icon: "🎯",
    title: "Decisions captured",
    body: "What was actually decided gets its own section. No more scrolling back through transcripts looking for the outcome.",
  },
  {
    icon: "👤",
    title: "Owner assignment",
    body: "The AI attributes each action to the person responsible — pulled from context in your raw notes.",
  },
  {
    icon: "📋",
    title: "One-click copy",
    body: "Copy the structured output as clean text to paste into Slack, Notion, email — wherever your team lives.",
  },
  {
    icon: "⚡",
    title: "10 seconds flat",
    body: "Paste notes, click extract. No templates to fill in, no categories to tag. Works on transcripts, bullet points, or messy scribbles.",
  },
  {
    icon: "🔒",
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
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Every meeting ends with{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            clarity
          </span>
        </h2>
        <p className="mt-3 text-muted">
          Stop losing decisions and commitments in your notes. MeetingMind structures them for you.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors"
          >
            <div className="mb-3 text-2xl">{f.icon}</div>
            <p className="mb-1 font-semibold text-foreground">{f.title}</p>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
