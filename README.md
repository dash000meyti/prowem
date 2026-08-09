# PROWEM 2.0

High-fidelity interactive prototype of **PROWEM** — digital infrastructure for modern sports.

> Run Sports. Build Communities. Create Experiences.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Local mock data (no backend)
- Local images under `public/images/`
- Football player portraits under `public/images/players/` (`npm run fetch-players`)

## Demo world

- **Bundesliga** · **Socca Austria Pro League** · **The International**
- **Bayern Munich** · **Borussia Dortmund** · **Werder Bremen** · **FC Lorient**
- **Live match** — Bayern vs Dortmund (Der Klassiker), 72'
- **Fan** — Alex Morgan (SUPER FAN)

## Run locally

```bash
npm install
npm run fetch-media   # optional: re-download local assets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy with Docker (from GitHub)

On any server with Docker and Docker Compose:

```bash
git clone https://github.com/<org-or-user>/prowem.git
cd prowem
docker compose up -d --build
```

App listens on port **3000** (override with `PORT=8080 docker compose up -d --build`).

Useful commands:

```bash
docker compose logs -f      # follow logs
docker compose down         # stop
docker compose up -d --build  # rebuild after git pull
```

## Key routes

| Route | Experience |
|-------|------------|
| `/` | B2B marketing — services for organizers & clubs |
| `/events/bundesliga` | Event platform |
| `/clubs/bayern-munich` | Club platform |
| `/clubs/bayern-munich/teams/dota2` | Esports team |
| `/clubs/fc-lorient` | Single-team club (socca) |
| `/fans` | Fan dashboard |
| `/matches/live` | Matchday |
| `/matches/bundesliga/bayern-vs-dortmund` | Match Center + Trigger Goal |

## Docs

See `docs/` for product architecture, IA, data model, design system, and demo flow.
