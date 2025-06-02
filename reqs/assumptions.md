# Assumptions for Pro Fantasy Rodeo Rebuild (June 2025)

## 1. Game Structure & Mechanics

- Pro Fantasy Rodeo is a DFS-style game built around the National Finals Rodeo. Users pay a one-time entry fee (currently $99.95) to participate. No wallet or ongoing deposits are needed for MVP.
- Users create two teams:
  - **Top Riders**: one contestant per event, under a $550,000 salary cap. Salaries are based on pre-event rankings (1st = $150k, 15th = $10k).
  - **Tiebreaker Team**: one contestant per event, no salary cap. This is used in case of ties.
  - **Contenders Team**: In some formats, users can also pick five riders across any events with a lower cap. We may consolidate this or treat it as a variation (need clarity).
- Users also estimate how much their Top Riders team will win — used as a second tie-breaker.

> We’ll want to simplify this setup. Too many steps for a casual user. A streamlined roster builder and clear prize structure will go a long way.

---

## 2. Timeline & Event Model

- The main event is the **National Finals Rodeo (NFR)**, held over 10 nights (Dec 4–13, 2025).
- Signups typically open in early November and close shortly before the event starts.
- Outside of NFR, there are occasional events like “Christmas in July,” daily fantasy options during NFR, and special second-half contests like “Final Five.”
- Right now, the game selection page shows games from prior years with no year labels, which makes it hard to know what’s current. That’s a major UX issue we’ll address.

> Because the main contest is once a year, we need to drive urgency and retention during that window — and build toward more year-round engagement.

---

## 3. User & Platform Assumptions

- Audience includes both:
  - **Core**: Existing rodeo fans who watch the NFR or follow events
  - **Adjacent**: Curious sports fans who like fantasy/betting but are new to rodeo
- This will be a **mobile-first responsive web app**. There’s no current mobile app, but we’d want to ship one soon after MVP.
- Design should match the vibe of the brand — **Western-themed, bold, fun to use**. Think dusty textures, red/tan/black palette, bold typography.

---

## 4. Product Features to Consider

### MVP Features

- Landing page and upcoming contest details
- Account creation and team naming
- Roster builder with budget tracking and validation
- Tiebreaker team selection + earnings prediction
- Entry confirmation
- Entry summary page and standings
- Basic real-time or post-round scoring (depending on API availability)
- Injury replacement system (automatic fallback to next available contestant)

### Secondary Games / Future Features

- Prize challenges (side pools with themed prizes or sponsors)
- Buckle leagues (group/league-based play among friends or orgs)
- Additional contests like daily fantasy or second-half games (e.g. “Final Five”)

### Out of Scope (for MVP)

- Wallet/balance system
- Live chat or social interaction
- Native mobile app (design should be app-like but will be a web app at launch)

---

## 5. Data & Scoring

- We assume access to:
  - Athlete bios and rankings
  - Event schedules and results
  - Scoring APIs (either real-time or per-round)
- Current product does not appear to support live scoring, but we want to support it in the rebuild if possible.

---

## 6. UX & Product Gaps in Current Version

### Major Issues

- Confusing and cluttered team setup (too many steps, hard to know what to do next)
- Outdated site UI and poor mobile experience
- No clear way to find upcoming games (dates missing, past contests still shown)
- Tiebreakers and optional features are overwhelming at first glance

### What We’ll Improve

- Simplified team creation and tiebreaker flow
- Clearer hierarchy of core vs. secondary game features
- Clean, mobile-first UI that feels modern and fun
- Better guidance and deadlines on when/what to enter
- Fix the games list to clearly show upcoming vs. past