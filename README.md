# PROWEM 2.0

High-fidelity interactive prototype of **PROWEM** — digital infrastructure for modern sports.

> Run Sports. Build Communities. Create Experiences.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Local mock data (no backend)

## Demo world

- **NOVA CUP 2026** — Berlin football festival
- **NEXUS** — multi-team club (Football / Socca / Dota 2)
- **Live match** — NEXUS FC vs Berlin United (Semi Final)
- **Fan** — Alex Morgan (SUPER FAN)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key routes

| Route | Experience |
|-------|------------|
| `/` | Marketing homepage |
| `/events/nova-cup-2026` | Event platform |
| `/clubs/nexus` | Club platform |
| `/clubs/nexus/teams/dota2` | Esports team |
| `/fans` | Fan dashboard |
| `/matches/live` | Matchday |
| `/matches/nova-cup/nexus-vs-berlin-united` | Match Center + Trigger Goal |

## Docs (Persian)

See [`docs/`](./docs/) for product architecture, IA, design system, data model, demo flow and implementation plan.

## Demo tip

On Match Center, click **Trigger Goal** to show live data propagating to score, timeline, social draft, notifications and fan XP.
