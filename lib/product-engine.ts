export type IntelligenceInput = { input?: string };
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
    [
      "Attendee context",
      "Know people, roles, tension, promises, and prior history."
    ],
    [
      "Agenda strategy",
      "Shape the conversation around outcomes, not noise."
    ],
    [
      "Decision capture",
      "Record owners, deadlines, objections, and commitments."
    ],
    [
      "Follow-up engine",
      "Generate emails, tasks, and relationship memory."
    ]
  ],
  "rows": [
    [
      "Renewal review",
      "Revenue",
      "High",
      "Surface risks, proof, objections, and expansion openings."
    ],
    [
      "Hiring screen",
      "Talent",
      "Medium",
      "Prepare questions, scorecards, and red flags."
    ],
    [
      "Investor call",
      "Founder",
      "High",
      "Clarify ask, traction, and likely objections."
    ],
    [
      "Client kickoff",
      "Delivery",
      "Medium",
      "Turn expectations into owners and milestones."
    ]
  ],
  "missions": [
    [
      "Calendar attendee research",
      "Pull safe public/company context before meetings."
    ],
    [
      "Transcript ingestion",
      "Extract decisions, action items, and objections from call notes."
    ],
    [
      "CRM sync",
      "Push follow-ups and relationship memory to the right customer record."
    ],
    [
      "Meeting memory graph",
      "Connect recurring people, promises, and unresolved topics."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 57 + Math.min(30, Math.floor(subject.length / 6)); if (/risk|urgent|investor|client|payment|contract|meeting|decision|launch|proof|delay/i.test(subject)) score += 7; return Math.min(98, score); }
function band(score: number) { return score >= 86 ? 'strong' : score >= 72 ? 'ready' : score >= 60 ? 'needs review' : 'starter'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.repo,
    brand: 'ArkNet Digital',
    suite: product.suite,
    domain: product.domain,
    subject,
    score,
    status: band(score),
    executive_summary: product.sub,
    intelligence_map: product.modules.map(([label, value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })),
    action_queue: product.rows.slice(0, 3).map(([item, owner, priority, note]) => ({ action: item + ' - ' + owner, priority, impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    generated_at: new Date().toISOString()
  };
}
