"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onExtractClick }: { onExtractClick: () => void }) {
  return (
    <section className="teal-bg wave-grid relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/6 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-2"
        >
          <span>◈</span> Meeting notes → actions · Free · No signup
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Raw notes in.
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Clear actions out.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          Paste your messy meeting notes and MeetingMind extracts every action item, key decision,
          owner, and deadline — structured and ready to share with your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onExtractClick}
            className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-background hover:opacity-90 active:scale-95 transition-all"
          >
            Extract actions →
          </button>
          <span className="text-xs text-muted">Paste notes · 10 seconds · Done</span>
        </motion.div>

        {/* Output preview chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-4 w-full max-w-sm rounded-2xl border border-border bg-surface p-5 text-left shadow-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Extracted actions</p>
          {[
            { owner: "Joy", action: "Finalize pricing page copy", due: "Fri" },
            { owner: "Team", action: "Review competitor analysis doc", due: "Mon" },
            { owner: "Joy", action: "Schedule investor call", due: "This week" },
          ].map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex items-start gap-3 mb-3 last:mb-0"
            >
              <span className="mt-0.5 h-4 w-4 rounded-full bg-accent/20 text-accent text-[9px] flex items-center justify-center font-bold shrink-0">✓</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground">{a.action}</p>
                <p className="text-[10px] text-muted mt-0.5">{a.owner} · Due {a.due}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <span className="text-xs">Try it below</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="h-4 w-px bg-muted/50" />
      </motion.div>
    </section>
  );
}
