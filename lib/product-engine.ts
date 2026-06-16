export type IntelligenceInput = { input?: string };

const product = {
  "repo": "MeetingMind",
  "suite": "AI Productivity Suite",
  "category": "Meeting intelligence",
  "audience": "sales teams, founders, recruiters, and client-facing operators",
  "promise": "prepare, capture, and follow up on meetings with memory that compounds",
  "inputLabel": "Meeting agenda, transcript, or attendee list",
  "placeholder": "Quarterly review with ACME: renewal risk, support delays, expansion ask",
  "primary": "Prepare meeting",
  "gradient": "from-violet-300 via-fuchsia-300 to-sky-300",
  "modules": [
    "Attendee context",
    "Agenda builder",
    "Decision capture",
    "Follow-up draft",
    "Relationship memory"
  ],
  "outputs": [
    "Meeting brief",
    "Questions to ask",
    "Commitment tracker",
    "Follow-up email"
  ],
  "next": [
    "calendar attendee research",
    "transcript ingestion",
    "CRM sync",
    "relationship memory graph"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
