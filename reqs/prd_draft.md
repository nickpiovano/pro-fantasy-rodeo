# Pro Fantasy Rodeo – MVP Rebuild

**Mobile-first rebuild of a DFS-style rodeo game, launching first with the ‘Christmas in July’ contest.**

---

## Overview

This is a responsive web app for Pro Fantasy Rodeo, launching first with the “Christmas in July” contest — a month-long fantasy rodeo game run in partnership with PRCA. Players pay a one-time $19.95 fee to enter, pick one contestant per event, and compete for big prizes like a 2024 Ram 1500 and a share of a $60,000 prize pool.

The existing site is outdated, confusing, and not optimized for mobile. We’re rebuilding it from the ground up with modern UX, a mobile-first layout, and a Western-inspired design.

---

## Target Users

- Rodeo fans who follow PRCA events throughout the summer  
- Returning users who have played in past NFR or July games  
- New users curious about Western sports or prize-based fantasy games

---

## Problem Statement

The current site makes it hard to understand:

- What games are active and when to enter  
- How the team-building flow works  
- What prizes are available and how users win  

The layout isn’t responsive, the team creation is clunky, and secondary features (like leagues and prize challenges) get in the way of core onboarding. We want to fix all of that.

---

## Core User Flow (Christmas in July)

1. Landing page with the featured contest (Christmas in July)  
2. Account creation and team naming  
3. Roster builder: one athlete per event  
4. Prize summary and confirmation  
5. Entry submitted — view team or leaderboard  
6. Optional entry into a prize challenge or summer league

---

## Must-Have Screens

1. **Home / Landing Page**
   - Featured banner: “Christmas in July is live – enter now for a shot at a new Ram 1500”
   - Show entry deadline and contest overview
   - CTA: “Build Your Team”
   - Quick ‘How it Works’ section

2. **Create Account / Name Team**
   - Simple form: email + team name

3. **Roster Builder**
   - Pick one contestant per event (no salary cap in this version)
   - Show event name and contestant info (name, rank, photo optional)
   - Indicate which event is being picked

4. **Prize Summary + Confirmation**
   - Show grand prize (Ram 1500) and $60k payout pool
   - Recap selected team
   - CTA: “Submit Entry”

5. **Entry Complete**
   - Confirmation screen
   - Show options to view team or check leaderboard

6. **Leaderboard** (stub only for now)
   - Top 10 teams with scores
   - User’s team highlighted if logged in

7. **Optional: Summer Special Leagues / Prize Challenges**
   - Stub cards with text like “Join a prize challenge for more chances to win”
   - Not functional for MVP — just visually hint at future expansion

---

## Design Direction

- Mobile-first, responsive layout  
- Western-themed: bold serif fonts, deep red/tan/black palette, rugged visual texture  
- Keep it clean — strip out distractions and over-explaining  
- Visual affordances for team progress, entry deadlines, and contest status

---

## Out of Scope for MVP

- Wallet/balance system  
- Real-time scoring (unless API is confirmed — can default to daily updates)  
- Native app  
- Buckle leagues or prize challenges (beyond a stub visual)  
- Chat, community, or social features