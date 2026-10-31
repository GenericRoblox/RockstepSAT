# Rockstep SAT

Daily, Duolingo-style SAT and PSAT practice. Students set their grade, test, test date,
past section scores (or take a short placement quiz), and goal scores. The app builds a
"climbing route" for each subject and sets a daily pace that finishes before test day.

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repo, and keep the default
   Next.js settings.
3. Under **Settings → Environment Variables**, add:

| Name | Value | Required |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Your OpenRouter key (`sk-or-v1-…`) | For AI features |
| `OPENROUTER_MODEL` | Defaults to `nvidia/nemotron-3-super-120b-a12b` | No |
| `ROCKSTEP_ACCESS_CODE` | Any passcode you choose | Recommended |

4. Redeploy so the variables take effect.

Never commit your API key. `.gitignore` already excludes `.env` files.

**Why set an access code?** The AI routes are public URLs. Without a code, anyone who
finds your site could spend your OpenRouter credits. With one set, the student enters
the same code once in **Settings → AI questions**. Setting a monthly credit limit on the
key in your OpenRouter dashboard is a good second safeguard.

## Run locally

```bash
npm install
cp .env.example .env.local   # then paste your key into .env.local
npm run dev                  # http://localhost:3000
```

The app works without a key. Lessons then use only the built-in question bank.

## How the course works

- **Starting point:** each section score maps to a level. Below 480 starts at
  Foundation, 480–590 at Core, and 600+ at Advanced. Goals of 600+ include Advanced lessons.
- **Test-outs:** students who start above Foundation get one quick check per area at
  the level below. Scoring 5 of 6 skips those lessons; missing more adds them to the route.
- **Daily plan:** days alternate between Reading & Writing and Math. Each day opens with a
  5-question warm-up on the previous study day's subject, then 1–4 lessons. The count is
  remaining lessons divided by remaining days for that subject, recalculated daily.
- **Test within 30 days:** if the route can't fit, the lowest-value lessons are set aside,
  ranked by how often each skill appears on the test. A timed 10-question section is
  added once a week at official pacing.
- **Last 2 days:** final review of mistakes only. Test day has no lessons.
- **Lessons:** up to 8 questions. Missed questions come back once at the end and go into a
  review pile. Checkpoints need 75% to clear.
- **Motivation:** streaks, chalk points (XP), and streak freezes earned every 7 days (hold up to 2).

## AI questions (Nemotron via OpenRouter)

- When a lesson is running low on unseen questions, the app asks `/api/questions` for 4 more.
- The server makes two calls. The first writes the questions, and the second answers them
  independently. Only questions where both agree are kept, and they're saved on the device
  so the bank grows.
- While the student is on the home screen, the next lessons are prepared in the background.
- "Why was I wrong?" calls `/api/explain` for a personal explanation.
- Both routes run within Vercel's 60-second function limit. If responses time out often,
  switch `OPENROUTER_MODEL` to `nvidia/nemotron-3-nano-30b-a3b`, which is faster.

## Data and scaling later

Progress is saved in the browser's localStorage, with backup download and restore in
Settings. All saving goes through `lib/storage.ts`. To support many students with logins:

1. Create a Supabase project and enable Auth.
2. Add a `progress` table with `user_id` (uuid, primary key) and `state` (jsonb).
3. Write a `SupabaseAdapter` with the same `load()` and `save()` methods and swap it in
   `lib/storage.ts`.

## Project map

| Path | What it does |
| --- | --- |
| `lib/engine.ts` | Routes, daily plan, pacing, streaks, projections |
| `lib/sessions.ts` | Picks questions for each session type |
| `lib/curriculum.ts` | Official Digital SAT domains and skills, weights, tips |
| `lib/bank/` | 150 built-in questions (`npm run check:bank` checks their structure) |
| `lib/scales.ts` | Score ranges for SAT, PSAT/NMSQT, PSAT 10, PSAT 8/9 |
| `app/api/` | Server routes for OpenRouter (key stays on the server) |
| `components/` | Screens: onboarding, home route, session player, progress, settings |
