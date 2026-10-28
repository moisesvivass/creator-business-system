# Creator Business System

A real system, shown with fictional numbers: a one-page look at the system that runs behind a beauty
creator's content business, in English and Spanish.

> **Every number, title and date on this page is fictional.** The real system is private and
> belongs to a real creator; this demo shows how it works without identifying her or touching her data.
> The page makes no network calls: it is static and its "live" numbers are simulated in the browser.

---

## What the real system does

The deliverable is a row, a job or an agent, not a screen. The real system has no dashboard: it keeps one
database current by itself and speaks up when something needs a person.

| Piece | What it does |
|---|---|
| **One database** | Instagram, Pinterest, YouTube and TikTok APIs, plus affiliate links built in working sessions, land in one PostgreSQL database |
| **Scheduled jobs** | Daily refresh, daily Pinterest metrics, a 15-minute new-post check, a freshness check, a Monday token check and a weekly report |
| **Data alerts** | Anything that needs a person arrives as a short phone message: a new post with no DM flow, a stale snapshot, a brand enquiry |
| **Comment to DM** | An AI agent drafts the products in each new video; affiliate links and the DM are built as a draft; a person reviews and presses Start |
| **YouTube Shorts** | Each video gets an upload kit (title, description, product links); a person uploads it from a phone |
| **Pinterest** | Pins built from existing covers and product lists, approved by a person, measured daily |
| **Media kit** | A public page whose audience figures are read from the database, never typed by hand |

---

## This demo

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + TypeScript + Vite + Tailwind CSS v4 |
| **Data** | Fictional records in `frontend/src/data/`, page copy in English and Spanish in `frontend/src/content/` |
| **Deploy** | Vercel |
| **Built with** | Claude Code |

```
frontend/src/
├── content/        Page copy in English and Spanish, and the language switch
├── types/          Types for every mock record
├── data/           The fictional numbers (mockData) and the real story and rules (story)
├── hooks/          Playback for the phones, the product path and the day clock
└── components/     Story, system, database, stores, jobs and alerts, media kit
```

### Running locally

```bash
cd frontend
npm install
npm run dev
```

No environment variables, API keys or backend are needed.

---

## Author

**Moises Vivas** — Data and analytics tools · Python · SQL · React · AI-assisted development · Toronto, Canada

- GitHub: [github.com/moisesvivass](https://github.com/moisesvivass)
- LinkedIn: [linkedin.com/in/moisesvivas](https://linkedin.com/in/moisesvivas)
