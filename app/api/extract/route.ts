import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export type ActionItem = {
  action: string;
  owner: string | null;
  dueDate: string | null;
  priority: "high" | "medium" | "low";
};

export type Decision = {
  decision: string;
  rationale?: string;
};

export type MeetingOutput = {
  title: string;
  date: string;
  participants: string[];
  summary: string;
  actionItems: ActionItem[];
  decisions: Decision[];
  openQuestions: string[];
  nextSteps: string;
};

const DEMO: MeetingOutput = {
  title: "Product Strategy Sync",
  date: "This week",
  participants: ["Joy", "Marcus", "Aisha"],
  summary: "Discussed Q3 roadmap priorities, agreed to pause the analytics feature and focus on onboarding. Budget for paid ads approved at $2k/mo. Hiring decision deferred to next month.",
  actionItems: [
    { action: "Redesign onboarding flow — wireframes to share by Friday", owner: "Joy", dueDate: "Friday", priority: "high" },
    { action: "Set up paid ad campaigns (LinkedIn + Meta) with $2k/mo budget", owner: "Marcus", dueDate: "Next week", priority: "high" },
    { action: "Compile user feedback report from last 90 days of support tickets", owner: "Aisha", dueDate: "Monday", priority: "medium" },
    { action: "Pause analytics feature — move tickets to backlog", owner: "Joy", dueDate: "Today", priority: "high" },
    { action: "Schedule follow-up hiring call for next month", owner: "Marcus", dueDate: "Next month", priority: "low" },
  ],
  decisions: [
    { decision: "Analytics feature paused for Q3 — onboarding takes priority", rationale: "Low usage data + high drop-off at signup step" },
    { decision: "Paid ad budget approved at $2,000/month", rationale: "Organic growth plateaued; need to test paid channels" },
    { decision: "No new hires until August — re-evaluate at end of Q3", rationale: "Runway concern + insufficient pipeline to justify headcount" },
  ],
  openQuestions: [
    "What is the target completion date for the new onboarding flow?",
    "Which platforms perform best for our ICP — LinkedIn or Meta?",
  ],
  nextSteps: "Joy leads onboarding redesign sprint. Marcus launches ads by next week. Full team sync in 2 weeks to review metrics.",
};

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  if (!notes || typeof notes !== "string") {
    return NextResponse.json({ error: "notes required" }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    await new Promise((r) => setTimeout(r, 1700));
    return NextResponse.json({ demo: true, meeting: DEMO });
  }

  const systemPrompt = `You are an expert meeting facilitator and productivity coach.
Given raw meeting notes (could be bullet points, transcript excerpts, or freeform text), extract a structured meeting summary.

Return ONLY valid JSON matching exactly this shape:
{
  "title": "inferred meeting title",
  "date": "inferred date or 'This meeting'",
  "participants": ["name1", "name2"],
  "summary": "2-3 sentence executive summary of what was discussed and decided",
  "actionItems": [
    {
      "action": "specific task description",
      "owner": "person name or null",
      "dueDate": "deadline or null",
      "priority": "high|medium|low"
    }
  ],
  "decisions": [
    {
      "decision": "what was decided",
      "rationale": "why or null"
    }
  ],
  "openQuestions": ["question still unresolved", ...],
  "nextSteps": "one sentence on what happens next"
}

Be specific and concrete. If a deadline isn't mentioned, set dueDate to null. Infer priority from context.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Meeting notes:\n\n${notes}` },
      ],
      temperature: 0.2,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "";

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const meeting: MeetingOutput = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    return NextResponse.json({ demo: false, meeting });
  } catch {
    return NextResponse.json({ error: "Failed to parse output" }, { status: 500 });
  }
}
