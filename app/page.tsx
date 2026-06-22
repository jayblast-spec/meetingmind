'use client';
import { useMemo, useState } from 'react';

type Intel = {
  score: number;
  status: string;
  intelligence_map: Array<{ label: string; value: string; status: string }>;
  action_queue: Array<{ action: string; priority: string; impact: string }>;
  contributor_lanes: Array<{ lane: string; mission: string }>;
};

const product = {
  "repo": "MeetingMind",
  "suite": "AI Productivity Suite",
  "domain": "Meeting intelligence",
  "accent": "from-violet-300 via-fuchsia-300 to-sky-300",
  "hero": "Walk into every meeting with memory, leverage, and follow-through.",
  "sub": "MeetingMind prepares the room before the call, captures the decisions during the call, and turns promises into follow-up memory after the call.",
  "input": "Quarterly review with ACME: renewal risk, support delays, expansion ask, three stakeholders",
  "cta": "Prepare meeting intelligence",
  "score": "Meeting leverage",
  "modules": [
    ["Attendee context", "Know people, roles, tension, promises, and prior history."],
    ["Agenda strategy", "Shape the conversation around outcomes, not noise."],
    ["Decision capture", "Record owners, deadlines, objections, and commitments."],
    ["Follow-up engine", "Generate emails, tasks, and relationship memory."]
  ],
  "rows": [
    ["Renewal review", "Revenue", "High", "Surface risks, proof, objections, and expansion openings."],
    ["Hiring screen", "Talent", "Medium", "Prepare questions, scorecards, and red flags."],
    ["Investor call", "Founder", "High", "Clarify ask, traction, and likely objections."],
    ["Client kickoff", "Delivery", "Medium", "Turn expectations into owners and milestones."]
  ],
  "missions": [
    ["Calendar attendee research", "Pull safe public/company context before meetings."],
    ["Transcript ingestion", "Extract decisions, action items, and objections from call notes."],
    ["CRM sync", "Push follow-ups and relationship memory to the right customer record."],
    ["Meeting memory graph", "Connect recurring people, promises, and unresolved topics."]
  ]
} as const;

function fallback(subject: string): Intel {
  const score = Math.min(96, 61 + (subject.length % 29));
  return {
    score,
    status: score > 84 ? 'strong' : score > 72 ? 'ready' : 'needs review',
    intelligence_map: product.modules.map(([label, value]) => ({ label, value, status: 'review' })),
    action_queue: product.rows.slice(0, 3).map(([item, owner, priority, note]) => ({ action: item + ' — ' + owner, priority, impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
  };
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif";

const CARD: React.CSSProperties = {
  background: 'rgba(22,27,34,0.75)',
  backdropFilter: 'blur(20px)',
  border: '1px solid #30363D',
  borderRadius: '4px',
};

export default function Home() {
  const [subject, setSubject] = useState<string>(product.input);
  const [intel, setIntel] = useState<Intel>(() => fallback(product.input));
  const [loading, setLoading] = useState(false);

  const scoreTone = useMemo(() => {
    if (intel.score >= 86) return { color: '#34d399', border: 'rgba(52,211,153,0.25)', bg: 'rgba(52,211,153,0.08)' };
    if (intel.score >= 72) return { color: '#00e5ff', border: 'rgba(0,229,255,0.25)', bg: 'rgba(0,229,255,0.08)' };
    return { color: '#fbbf24', border: 'rgba(251,191,36,0.25)', bg: 'rgba(251,191,36,0.08)' };
  }, [intel.score]);

  async function run() {
    setLoading(true);
    try {
      const r = await fetch('/api/intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: subject }),
      });
      setIntel(await r.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#111317', color: '#e2e2e8', fontFamily: SANS }}>

      {/* ── HERO ── */}
      <section style={{ borderBottom: '1px solid #30363D', position: 'relative', overflow: 'hidden' }}>
        {/* glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.08), transparent)', pointerEvents: 'none' }} />

        {/* nav */}
        <nav style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.36em', color: '#849396', textTransform: 'uppercase', margin: 0 }}>{product.suite}</p>
            <h1 style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#e2e2e8', margin: '4px 0 0' }}>{product.repo}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {(['Studio', 'Queue', 'Contributors'] as const).map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', color: '#849396', textDecoration: 'none' }}>{l.toUpperCase()}</a>
            ))}
            <a href="#live" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', background: '#00e5ff', color: '#001f24', padding: '8px 20px', borderRadius: 4, textDecoration: 'none' }}>RUN →</a>
          </div>
        </nav>

        {/* hero grid */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '40px 32px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

          {/* left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)', borderRadius: 4, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#00e5ff' }}>STATUS: ACTIVE · {product.domain.toUpperCase()}</span>
            </div>
            <h2 style={{ fontFamily: SANS, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#e2e2e8', margin: 0 }}>{product.hero}</h2>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.7, color: '#849396', maxWidth: 520 }}>{product.sub}</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <a href="#live" style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', background: '#00e5ff', color: '#001f24', padding: '14px 28px', borderRadius: 4, textDecoration: 'none' }}>{product.cta.toUpperCase()} →</a>
              <a href="#contributors" style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', border: '1px solid #30363D', color: '#849396', padding: '14px 24px', borderRadius: 4, textDecoration: 'none' }}>CONTRIBUTOR MISSIONS</a>
            </div>
          </div>

          {/* right — command studio */}
          <div id="live" style={{ ...CARD, padding: 20 }}>
            <div style={{ borderRadius: 4, border: '1px solid #30363D', background: 'rgba(12,14,18,0.9)', padding: 20 }}>
              {/* studio header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#849396', margin: 0 }}>// AI COMMAND STUDIO</p>
                  <h3 style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, color: '#e2e2e8', margin: '6px 0 0' }}>{product.cta}</h3>
                </div>
                <div style={{ padding: '10px 16px', border: `1px solid ${scoreTone.border}`, background: scoreTone.bg, borderRadius: 4, textAlign: 'right', minWidth: 80 }}>
                  <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: scoreTone.color, margin: 0, opacity: 0.8 }}>{product.score.toUpperCase()}</p>
                  <p style={{ fontFamily: MONO, fontSize: 28, fontWeight: 700, color: scoreTone.color, margin: '4px 0 0', lineHeight: 1 }}>{intel.score}</p>
                </div>
              </div>

              {/* textarea */}
              <textarea
                value={subject}
                onChange={e => setSubject(e.target.value)}
                style={{
                  width: '100%', minHeight: 120, resize: 'none', background: '#0c0e12',
                  border: '1px solid #30363D', borderRadius: 4, padding: '12px 14px',
                  fontSize: 13, lineHeight: 1.6, color: '#e2e2e8', fontFamily: MONO,
                  outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,229,255,0.2)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#30363D'; e.currentTarget.style.boxShadow = 'none'; }}
              />

              {/* run button */}
              <button
                onClick={run}
                style={{
                  width: '100%', marginTop: 12, padding: '13px 0',
                  background: '#00e5ff', color: '#001f24', border: 'none', borderRadius: 4,
                  fontFamily: MONO, fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
                  cursor: 'pointer',
                }}
              >
                {loading ? 'PROCESSING…' : product.cta.toUpperCase() + ' →'}
              </button>

              {/* intelligence map */}
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {intel.intelligence_map.map(item => (
                  <div key={item.label} style={{ ...CARD, padding: 14 }}>
                    <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#849396', margin: 0, textTransform: 'uppercase' }}>{item.status}</p>
                    <h4 style={{ fontFamily: SANS, fontWeight: 700, fontSize: 14, color: '#e2e2e8', margin: '8px 0 6px' }}>{item.label}</h4>
                    <p style={{ fontSize: 12, lineHeight: 1.6, color: '#849396', margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDIO / PRODUCT TABLE ── */}
      <section id="studio" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px', display: 'grid', gridTemplateColumns: '0.72fr 1.28fr', gap: 48 }}>
        <div>
          <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#849396', margin: 0 }}>// PRODUCT STUDIO</p>
          <h2 style={{ fontFamily: SANS, fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.025em', color: '#e2e2e8', margin: '16px 0 0', lineHeight: 1.1 }}>
            A real workflow surface, not a thin AI wrapper.
          </h2>
          <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.75, color: '#849396' }}>
            Each module exists so users can move from input to useful output, then into memory, action, export, or collaboration.
          </p>
        </div>
        <div style={{ ...CARD, overflow: 'hidden' }}>
          {product.rows.map(([item, owner, priority, note]) => (
            <div key={item} style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 0.4fr 1.4fr', gap: 16, padding: '16px 20px', borderBottom: '1px solid #30363D' }}>
              <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: 14, color: '#e2e2e8', margin: 0 }}>{item}</p>
              <p style={{ fontFamily: MONO, fontSize: 12, color: '#849396', margin: 0 }}>{owner}</p>
              <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: priority === 'High' ? '#00e5ff' : '#A855F7', margin: 0 }}>{priority.toUpperCase()}</p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#849396', margin: 0 }}>{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACTION QUEUE ── */}
      <section id="queue" style={{ borderTop: '1px solid #30363D', borderBottom: '1px solid #30363D', background: 'rgba(22,27,34,0.3)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {intel.action_queue.map(item => (
            <article key={item.action} style={{ ...CARD, padding: 24 }}>
              <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: item.priority === 'High' ? '#00e5ff' : '#A855F7', margin: 0 }}>{item.priority.toUpperCase()}</p>
              <h3 style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: '#e2e2e8', margin: '14px 0 0', lineHeight: 1.2 }}>{item.action}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#849396', margin: '14px 0 0' }}>{item.impact}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CONTRIBUTORS ── */}
      <section id="contributors" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ marginBottom: 40, maxWidth: 700 }}>
          <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#849396', margin: 0 }}>// CONTRIBUTOR MISSIONS</p>
          <h2 style={{ fontFamily: SANS, fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.025em', color: '#e2e2e8', margin: '16px 0 0', lineHeight: 1.1 }}>
            Open-source should feel like joining a serious lab.
          </h2>
          <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.75, color: '#849396' }}>
            Concrete lanes for builders who want to help ArkNet Digital create useful AI-era tools.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {intel.contributor_lanes.map(item => (
            <article key={item.lane} style={{ ...CARD, padding: 20 }}>
              <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#00e5ff', margin: '0 0 10px' }}>// MISSION</p>
              <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: 16, color: '#e2e2e8', margin: 0, lineHeight: 1.3 }}>{item.lane}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#849396', margin: '10px 0 0' }}>{item.mission}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #30363D', padding: '32px', textAlign: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: 11, color: '#849396', margin: 0, letterSpacing: '0.04em' }}>
          {product.repo} · <a href="https://arknet.digital" style={{ color: '#849396', textDecoration: 'none' }}>ArkNet.digital</a>
        </p>
      </footer>
    </main>
  );
}
