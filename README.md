<div align="center">

# MeetingMind

### Raw Meeting Notes In, Action Items and Decisions Out

MeetingMind converts raw meeting notes or transcripts — bullet points, paragraphs, or full transcripts — into structured action items with owners and deadlines, a decision log, and a clear next-steps summary. The goal is a meeting that produces accountability instead of a wall of notes nobody rereads.

<p>
  <a href="https://meetingmind-pied-one.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/meetingmind"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Product%20Layer-007ACC?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-Design%20System-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-Interface%20Motion-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Groq" src="https://img.shields.io/badge/Groq-Fast%20Inference-F55036?style=flat-square">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated MeetingMind headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Notes+in+%E2%86%92+Action+items+out;Owner+%2B+deadline+%2B+context;Decisions+logged%2C+not+relitigated;Ready+to+paste+into+Slack+or+Notion">
</p>

</div>

## What It Does

MeetingMind extracts every commitment from a meeting into an action item with an inferred owner, deadline, and surrounding context, logs the key decisions made so they do not get relitigated later, and produces a next-steps summary. The output is formatted to paste directly into Slack, email, or a Notion page. It accepts raw notes and full transcripts alike, and requires no signup.

## How It Works

- `app/page.tsx` renders the landing shell with `HeroSection`, `FeaturesSection`, and the `ExtractForm` input component.
- `app/api/extract/route.ts` sends the submitted notes to the Groq Chat Completions API (`llama-3.3-70b-versatile`) and parses the response into action items, decisions, and next steps.
- `app/api/intelligence/route.ts` provides a supporting formatting pass over the extracted output.
- Styling is Tailwind CSS with Framer Motion handling interface transitions; the app is a single Next.js App Router deployment with no database layer.

## Live

[meetingmind-pied-one.vercel.app](https://meetingmind-pied-one.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| AI | Groq (`llama-3.3-70b-versatile`) |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Deployment | Vercel |

<div align="center">

<img alt="Footer" src="https://capsule-render.vercel.app/api?type=rect&height=60&color=0:1D4ED8,55:0B1E3D,100:020617&text=michael%40arknet.digital&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">

</div>
