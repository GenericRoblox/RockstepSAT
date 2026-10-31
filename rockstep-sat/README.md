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

**Four difficulty levels.** Foundation, Core, Advanced, and Expert. Expert matches the hardest
questions on the Digital SAT (for example: "The solutions to x² + 11x + 12 = 0 are (−11 ± √k)/2.
What is k?").

**Score sets the difficulty.** A past section score maps to a starting level (SAT scale, which
the PSATs share): below 480 Foundation, 480–579 Core, 580–679 Advanced, 680+ Expert. Every route
climbs at least one level and reaches at least Advanced. Goals of 600+ climb to Expert.

**Placement sets what to skip.** Everyone takes placement, with or without a past score:
8 short checks (one per test domain), resumable between checks, about 35 minutes total.
- Each of the 30 skills gets a question at the starting level.
- Right: a harder follow-up decides whether the next level can be skipped too.
- Wrong: with a past score, lessons for that skill begin at the starting level. Without a score,
  an easier follow-up finds where to begin, and the section score is estimated from the results.
- Every skill keeps its top-level lesson, so each route ends on the hardest material.

**Lessons ramp up.** Each lesson is 6 questions at its level, easiest first, then 2 "stretch"
questions from the level above. The route itself climbs level by level, with a checkpoint
(75% to clear) at the end of each area.

**Daily plan.** Days alternate between Reading & Writing and Math. Each day starts with a
5-question warm-up on the subject practiced last time, then 1–4 lessons. The count is remaining
lessons divided by remaining days for that subject, recalculated daily.

**Short on time.** Within 30 days of the test, if the route can't fit, the lowest-value
lessons are set aside (ranked by how often each skill appears on the test, and by how far above
the starting level they are). A timed 10-question section is added weekly at official pacing.
The last 2 days are review only, and test day has no lessons.

**Motivation.** Streaks, chalk points (XP), and streak freezes earned every 7 days (hold up to 2).

**Question bank.** 240 built-in questions: at least 2 Foundation, 2 Core, 2 Advanced, and
2 Expert per skill. With the AI connected, lessons fill up with fresh verified questions.

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
| `lib/engine.ts` | Levels, placement scoring, routes, daily plan, pacing, streaks, projections |
| `lib/sessions.ts` | Picks questions for lessons (with stretch questions), placement checks, reviews |
| `lib/curriculum.ts` | Official Digital SAT domains and skills, weights, tips |
| `lib/bank/` | 240 built-in questions (`npm run check:bank` checks their structure) |
| `lib/scales.ts` | Score ranges for SAT, PSAT/NMSQT, PSAT 10, PSAT 8/9 |
| `app/api/` | Server routes for OpenRouter (key stays on the server) |
| `components/` | Screens: onboarding, home route, session player, progress, settings |
