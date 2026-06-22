"use client";

import { motion } from "framer-motion";

const PREVIEW_ITEMS = [
  { priority: "HIGH", action: "Finalize pricing page copy", owner: "Joy", due: "Fri" },
  { priority: "HIGH", action: "Launch LinkedIn + Meta ad campaigns", owner: "Marcus", due: "Mon" },
  { priority: "MED",  action: "Compile support ticket feedback report", owner: "Aisha", due: "Mon" },
];

export default function HeroSection({ onExtractClick }: { onExtractClick: () => void }) {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden"
      style={{ background: "#111317" }}
    >
      {/* Cyan radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 px-3 py-1"
          style={{
            border: "1px solid rgba(0,229,255,0.25)",
            background: "rgba(0,229,255,0.05)",
            borderRadius: "4px",
            fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#00e5ff",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: "#34d399" }}
          />
          STATUS: ACTIVE · FREE · NO SIGNUP
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          style={{
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-hanken, 'Hanken Grotesk', sans-serif)",
            color: "#e2e2e8",
          }}
        >
          Raw notes in.
          <br />
          <span style={{ color: "#00e5ff" }}>Clear actions out.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-xl text-base sm:text-lg"
          style={{ color: "#849396" }}
        >
          Paste your messy meeting notes. MeetingMind extracts every action item, decision, owner,
          and deadline — structured and ready to share in 10 seconds.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onExtractClick}
            className="px-8 py-3.5 text-sm font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "#00e5ff",
              color: "#001f24",
              borderRadius: "4px",
              fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
              letterSpacing: "0.05em",
            }}
          >
            EXTRACT ACTIONS →
          </button>
          <span
            className="text-xs"
            style={{
              color: "#849396",
              fontFamily: "var(--font-jetbrains, monospace)",
              fontSize: "11px",
            }}
          >
            Paste notes · 10 seconds · Done
          </span>
        </motion.div>

        {/* Terminal preview card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-2 w-full max-w-sm text-left"
          style={{
            background: "rgba(22,27,34,0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid #30363D",
            borderRadius: "4px",
          }}
        >
          {/* Card header */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid #30363D" }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#00e5ff",
              }}
            >
              EXTRACTED ACTIONS
            </span>
            <span
              className="ml-auto px-2 py-0.5 text-[10px] font-bold"
              style={{
                background: "rgba(52,211,153,0.12)",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.25)",
                borderRadius: "4px",
                fontFamily: "var(--font-jetbrains, monospace)",
                letterSpacing: "0.05em",
              }}
            >
              {PREVIEW_ITEMS.length} items
            </span>
          </div>

          {/* Action rows */}
          <div className="px-4 py-3 flex flex-col gap-2">
            {PREVIEW_ITEMS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-start gap-3 py-2"
                style={{ borderBottom: i < PREVIEW_ITEMS.length - 1 ? "1px solid rgba(48,54,61,0.5)" : "none" }}
              >
                <span
                  className="shrink-0 px-1.5 py-0.5 text-[9px] font-bold"
                  style={{
                    background: a.priority === "HIGH" ? "rgba(0,229,255,0.1)" : "rgba(168,85,247,0.1)",
                    color: a.priority === "HIGH" ? "#00e5ff" : "#A855F7",
                    border: `1px solid ${a.priority === "HIGH" ? "rgba(0,229,255,0.3)" : "rgba(168,85,247,0.3)"}`,
                    borderRadius: "4px",
                    fontFamily: "var(--font-jetbrains, monospace)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {a.priority}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "#e2e2e8",
                      fontFamily: "var(--font-jetbrains, monospace)",
                    }}
                  >
                    {a.action}
                  </p>
                  <p
                    className="mt-0.5"
                    style={{
                      color: "#849396",
                      fontSize: "10px",
                      fontFamily: "var(--font-jetbrains, monospace)",
                    }}
                  >
                    {a.owner} · due {a.due}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span
          style={{
            color: "#849396",
            fontFamily: "var(--font-jetbrains, monospace)",
            fontSize: "10px",
            letterSpacing: "0.12em",
          }}
        >
          TRY IT BELOW
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="h-4 w-px"
          style={{ background: "rgba(132,147,150,0.4)" }}
        />
      </motion.div>
    </section>
  );
}
