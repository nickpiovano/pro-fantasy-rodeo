# Pro Fantasy Rodeo – MVP Rebuild (Christmas in July)

### TL;DR

A modern mobile-first web app rebuild of Pro Fantasy Rodeo, debuting with the 'Christmas in July' DFS-style contest in partnership with PRCA. Players pay $19.95, pick one contestant per event, and compete for major prizes (2024 Ram 1500, $60k payout). The new app addresses painful UX issues, adds clear flows, and delivers a polished Western theme—upgrading the contest experience for the existing user base.

---

## Goals

### Business Goals

- Retain and migrate existing Pro Fantasy Rodeo users to the new mobile experience
- Minimize user drop-off during transition; reassure current players about improvements and maintain familiarity where possible
- Increase engagement and satisfaction among our existing player base with a more modern, streamlined, and mobile-optimized contest experience
- Increase paid contest entries for "Christmas in July"
- Convert new and returning PRCA fantasy rodeo fans to digital play
- Deliver a credible, mobile-optimized experience to improve contest satisfaction
- Build a codebase and UI pattern library to accelerate future product enhancements

### User Goals

- Enable painless mobile contest entry, team selection, and submission
- Communicate contest rules and prize structures clearly
- Offer a trustworthy, fun, and Western-themed fantasy experience
- Reduce confusion during onboarding and team builds
- Give quick access to team and leaderboard after entry

### Non-Goals

- Wallet and account-balance management features
- Real-time scoring (unless PRCA API is production-ready)
- Social/community functions, chat, or user-generated content

---

## User Stories

**Rodeo Fan**

- As a Rodeo Fan, I want to quickly enter the game on mobile so I can play anywhere.
- As a Rodeo Fan, I want to know how to win and what it costs, so there are no surprises.
- As a Rodeo Fan, I want my team and progress clearly shown so I feel confident submitting.

**Returning User**

- As a Returning User, I want the new version to feel faster and more intuitive than the previous site so I’m not frustrated by change.
- As a Returning User, I want to see familiar contest formats with improved clarity and mobile usability, so I trust the update.
- As a Returning User, I want any transition from the old to the new experience to be smooth—my history, teams, or logins should work.

**New User**

- As a New User, I want a clear explanation of how to play and what I can win.
- As a New User, I want to complete account setup and entry without confusion or friction.

**Organizer**

- As an Organizer, I want strong entry and leaderboard visibility to track contest health, retention, and payout plans.
- As an Organizer, I want to reduce confusion, complaints, and support tickets compared to previous years by providing clearer flows and messaging.

---

## Functional Requirements

- **Home / Landing Page** (Priority: Critical)
  - Featured contest banner, entry deadline, rules intro, clear CTA to "Build Your Team"
  - "How it works" guidance (steps, prizes)
- **Create Account / Name Team** (Critical)
  - One screen, email input, team name input, proceed CTA
- **Roster Builder** (Critical)
  - Scroll events, select one contestant per, progress bar, show picks, checkmarks
  - Event details visible, clean visuals, mobile-optimized touch targets
- **Prize Summary + Confirmation** (Critical)
  - Show full team, prizes outlined, prominent "Submit Entry" CTA, option to edit team
- **Entry Complete** (Critical)
  - Confirmation, clear contest messaging, options to view team/leaderboard
- **Leaderboard (Stub)** (Critical)
  - Top 10 teams, user's team highlighted, clarifying "live scores update daily"
- **Optional: Prize Challenges / Leagues (Stub, Nice-to-have)**
  - Non-functional preview cards for side contests and future leagues
- **Contest Lifecycle**
  - Contests have a set open and close date (e.g. July 1–31).
  - Entry lock date enforced at contest close; no entries after deadline.
  - Results announced on a posted date after contest close.
  - All times processed in a single time zone (e.g., Central Time) to normalize entries and deadlines.
- **Scoring Logic (Stubbed)**
  - Each team’s score is the sum of points/winnings by selected contestants across all events.
  - Scores can be updated daily via PRCA feed (if API available) or entered manually for MVP.

---

## User Experience

**Entry Point & First-Time User Experience**

- Users land on a promotional homepage for "Christmas in July," styled with bold Western fonts and a textured red/tan/black palette.
- Hero banner and countdown timer create urgency.
- "How it works" section sets expectations in 3 steps.
- Primary CTA button: "Build Your Team."

**Onboarding**

- User clicks CTA and sees a mobile-optimized form: email and team name.
- Minimal error states; all fields required.
- Hit "Continue" to create account and move to team build.

**Core Experience**

- Roster Builder walks user through each PRCA event, one at a time in scrollable cards.
  - 5–10 contestant choices per event, select via prominent button.
  - See rank, name (photo optional for MVP), selected state.
  - At top, progress bar (e.g., "3 of 8 events selected").
  - "Next Event" or "Continue" moves user forward.
  - On final event, transitions to summary.

**Review**

- Prize Summary and Confirmation displays full event/contestant roster, prize highlights, and a single "Submit Entry" CTA.
- Clear visual breakdown of selections—option to edit team before submitting.

**Completion**

- Entry Complete screen with "You're in!" headline, subtext on timing for prize announcements.
- Buttons to "View My Team" or "Go to Leaderboard" enable repeat engagement.

**Extras**

- Stub cards for Prize Challenges and Leagues: "Coming Soon" badge or faded-out CTAs, hinting at platform growth but blocked for MVP.

**Key Considerations**

- Keep copy concise and readable; reduce cognitive load.
- Fast paths optimized for mobile thumbs and quick decision-making.
- Progress bars and checkmarks reinforce completion and reduce anxiety.
- Friendly error prevention—don’t allow partial team submission.
- Returning users can use pre-filled data, skipping onboarding where possible.
- **Error Messaging Plan**
  - All errors, form validations, and payment failures are clearly communicated and styled in the Western theme.
  - Submissions not allowed unless all events are filled.
  - Payment errors offer clear retry or alternate path.

---

## Narrative

Samantha, a loyal Pro Fantasy Rodeo player, sees a post about the upgraded 'Christmas in July' fantasy contest. Curious, she visits the new mobile site. Instantly, the bold Western homepage catches her eye and she’s greeted by a familiar—but now streamlined—entry flow. Creating her account, she quickly builds her team with clarity and ease that was missing in previous years. A confident confirmation screen lets her know she’s entered. She checks the leaderboard, spots her team, and shares a screenshot with friends. For Samantha, the new site feels like a leap forward. For Pro Fantasy Rodeo, user numbers hold steady (or grow) through transition, support inquiries drop, and player feedback is overwhelmingly positive.

---

## Success Metrics

| Metric              | Definition                                    | Measurement             |
|---------------------|-----------------------------------------------|-------------------------|
| Retention Rate      | Percent of last-year users submitting         | User DB, analytics      |
| Mobile Conversion   | % of visits resulting in complete entry       | Analytics dashboard     |
| Churn/Drop-Off      | % of users who fail to complete new flow      | Funnel tracking         |
| Time-to-Entry       | Median landing-to-submission duration         | Event tracking          |
| NPS/Feedback        | User survey results, support volume           | Feedback/support tool   |
| Paid Entries        | Total and net-new users for contest           | Payment/entry database  |
| DAU                 | Daily contest and leaderboard visits          | Site analytics          |
| Uptime              | % uptime, July (peak event)                   | Monitoring tools        |
| Error Rate          | Uncaught user errors, form fails (<0.5%)      | Analytics/logs          |

**Tracking Plan**

- Returning user login rate and successful transition
- Landing page views
- Contest CTA clicks
- Account creations
- Team submission completions
- Leaderboard visits
- Stub card ("future features") clicks
- Support requests and complaints, especially around migration

---

## Technical Considerations

### Technical Needs

- Modern, mobile-first frontend (PWA principles where possible)
- Contestant/event table, roster selection logic
- Secure backend for account creation, team storage, and entry processing
- Payment integration for $19.95 entry fee
- Stub leaderboard implementation
- Migration of user data and credentials from the legacy system, if required

### Integration Points

- PRCA data: batch import, CSV/manual minimum for launch; daily/scheduled API for updates if available
- Payment processor: Stripe, Square, or similar
- Optional: Daily scoring feed

### Data Storage & Privacy

- Store user email, team picks, and entry time securely (encryption at rest)
- GDPR-compliant handling and data removal upon request
- Support for migration of legacy user data (where applicable)
- Minimal PII exposure—strict gating on visibility of leaderboard/team data

### Scalability & Performance

- Target up to 10,000 concurrent users during entry surges
- Backend, DB, and frontend all optimized for mobile
- Graceful degradation or caching for periods of heavy load

### Potential Challenges

- Successful migration of accounts/teams from previous platform
- Timeliness/accuracy of PRCA contest and score data
- Payment errors/edge cases in submission
- Network variability, especially mobile rural users
- Error messaging and support documentation for contestants
- Device/browser variety (minimum supported: Android/iOS Safari and Chrome, late 2010s)

---

## Milestones & Sequencing

### Project Estimate

**Medium**: 3–4 weeks for MVP, from kickoff to code complete

### Team Size & Composition

- 2-person core team (Product/Design + Full-Stack Engineer)
- QA included within dev cycles

### Suggested Phases

**Sprint 1: Foundation & Landing (1 week)**

- Product/Design: Spec, wireframe, style guide
- Engineering: Static landing page, "How it Works", CTA
- Dependencies: Contest rules/legal, design sign-off, data migration plan

**Sprint 2: Account & Roster UX (1 week)**

- Engineering: Account/team create flow (including migration path), roster builder, state management
- Product/Design: Progressive disclosure, progress bar interactions
- Dependencies: Final list of contest events/contestants

**Sprint 3: Submission, Payment & Confirmation (1 week)**

- Engineering: Payment integration, team save/validation, entry/confirmation
- Product/Design: Finalize summary, error states, team editing
- Dependencies: Payment processor access, test data

**Sprint 4: Leaderboard & Polish (1 week)**

- Engineering: Leaderboard stub, user team highlight, final QA/debug
- Product: Review, accessibility test, copy refinement
- Dependencies: PRCA data feed or sample scoring

---

### Developer Handoff Assets

- Screen-level interaction specs and annotated UI flows will be delivered using ChatPRD with Cursor integration.Absolutely! Here are both appendices—Detailed User Journeys and Screen-by-Screen Design Specs—presented in markdown, ready to drop into your repo or share directly with your team:

# Appendix A: Detailed User Journeys

## Happy Path (New Mobile User)

1. **Landing Page**
   - **User Action:** User visits the site on their mobile device.
   - **System Response:** Displays the "Christmas in July" promotional homepage with a bold banner.
   - **What User Sees:** Hero banner, countdown timer, brief contest overview, clear "Build Your Team" CTA button.

2. **Account Creation**
   - **User Action:** User taps "Build Your Team".
   - **System Response:** Redirects to account creation screen.
   - **What User Sees:** Simple form with inputs for email and team name; Western-styled fonts.

3. **Team Selection**
   - **User Action:** User completes form and taps "Continue".
   - **System Response:** Progresses to the roster builder screen.
   - **What User Sees:** Scrollable cards for events, contestant choices with selection buttons, visible progress bar.

4. **Prize Summary and Submission**
   - **User Action:** User selects contestants for each event.
   - **System Response:** Highlights selections, updates progress bar.
   - **What User Sees:** Prize summary screen, details of entries, prominent "Submit Entry" CTA.

5. **Entry Confirmation**
   - **User Action:** User taps "Submit Entry".
   - **System Response:** Shows confirmation page with acknowledgment message.
   - **What User Sees:** "You're in!" message, options to "View My Team" or "Go to Leaderboard".

6. **Leaderboard**
   - **User Action:** User taps "Go to Leaderboard".
   - **System Response:** Displays leaderboard stub.
   - **What User Sees:** Top 10 teams, user's team highlighted, note indicating score updates are daily.

---

## Returning User Journey

1. **Landing Page**
   - **User Action:** Returning user visits the site.
   - **System Response:** Recognizes returning visitor through cookies; shows the welcome message.
   - **What User Sees:** Hero banner with personalized message, familiar CTA.

2. **Account Reuse**
   - **User Action:** User taps CTA.
   - **System Response:** Shows account login screen.
   - **What User Sees:** Easy login option, pre-filled data if available.

3. **Pre-filled Team Selection**
   - **User Action:** User logs in.
   - **System Response:** Presents the roster builder with selections/teams from past participation.
   - **What User Sees:** Pre-filled contestant choices (editable), consistent flow.

4. **Prize Summary and Submission**
   - **User Action:** User reviews team, makes changes if needed.
   - **System Response:** Updates selections, progresses.
   - **What User Sees:** Prize summary screen, "Submit Entry" CTA.

5. **Entry Confirmation**
   - **User Action:** User taps "Submit Entry".
   - **System Response:** Confirms entry.
   - **What User Sees:** "You're in!" message, options to view team or check leaderboard.

---

## Edge Cases

### Incomplete Entry (Leaving & Returning, Unsaved Progress)
- **User Action:** User closes the app/browser mid-signup.
- **System Response:** Saves progress locally.
- **What User Sees (upon return):** Welcoming message with "Resume My Entry" option.

### Payment Failure (On Submit & Retry Loop)
- **User Action:** User attempts payment.
- **System Response:** Payment gateway error.
- **What User Sees:** Error message, retry button, optional contact support link.

### Submission Errors (Locked Contest, Missing Picks)
- **User Action:** User tries to submit after contest entry deadline or with incomplete picks.
- **System Response:** Shows error page.
- **What User Sees:** Helpful message about missed deadline or requiring all picks, with next steps or alternate contest options.

---

# Appendix B: Screen-by-Screen Design Specs

## 1. Landing / Home

- **Visual Elements**
  - Hero banner (“Christmas in July is live – Win a 2024 Ram 1500”)
  - Countdown timer
  - “How it Works” (3 step icons or illustrations)
  - Primary CTA: “Build Your Team”
  - Secondary link: Contest Rules/FAQ
- **User Actions**
  - Tap CTA to start sign-up
  - Tap rules for more info
- **Conditional States**
  - Before/after contest opens: CTA enabled/disabled, info banner
  - Loading state if assets slow
- **Accessibility Notes**
  - All buttons ≥48px tap targets
  - Sufficient color contrast (especially on banners/timers)
  - Alt text on all images/illustrations
  - Clear focus order for keyboard users

---

## 2. Create Account / Team Name

- **Visual Elements**
  - Input: Email (labeled, required)
  - Input: Team name (labeled, required)
  - Continue/Next button (prominent, full width)
  - Optional: Brand/logo at top
- **User Actions**
  - Input email/team name
  - Tap continue
- **Conditional States**
  - Input validation (real-time, show error if invalid/missing)
  - Submit loading spinner
  - Error state for network/duplication
- **Accessibility Notes**
  - Inputs labeled clearly, ARIA support
  - High-contrast error messages
  - Auto-focus on first field

---

## 3. Roster Builder

- **Visual Elements**
  - Event scroll cards (event name, contestant list)
  - Select buttons for each contestant
  - Checkmark/tag on selected
  - Progress bar at top (“3 of 8 events selected”)
  - “Next Event”/“Continue” button
- **User Actions**
  - Scroll events and select a contestant per event
  - Progress with “Next Event”/“Continue”
- **Conditional States**
  - Can’t “Continue” until current event picked
  - Error if selection skipped
  - Loading placeholder for contestant data
- **Accessibility Notes**
  - Buttons ≥48px, strong focus indicator
  - List/table has ARIA roles if needed
  - Progress bar text alternative
  - Screen reader announcement on selection

---

## 4. Prize Summary + Confirmation

- **Visual Elements**
  - List: All events & selected contestants
  - Header: “Your Christmas in July Team”
  - Prize summary block (Ram 1500, $60K)
  - CTA: “Submit Entry”
  - Text link: “Edit Team”
- **User Actions**
  - Review selections, submit entry, edit team
- **Conditional States**
  - Button disabled/loading on submit
  - Error for incomplete roster/payment fail
- **Accessibility Notes**
  - All list items have text labels
  - CTA ≥48px, clear focus order
  - Editable link described for screen readers

---

## 5. Entry Confirmation

- **Visual Elements**
  - Headline: “You’re in!”
  - Subtext (success, next steps)
  - 2 buttons: “View My Team” / “Go to Leaderboard”
- **User Actions**
  - Tap to view team or leaderboard
- **Conditional States**
  - If not logged in: login link before leaderboard
- **Accessibility Notes**
  - Success state color pass ratio
  - Buttons ≥48px, labeled for screen readers

---

## 6. Leaderboard (Stub)

- **Visual Elements**
  - Header: “Leaderboard – Christmas in July”
  - Top 10 team list (rank, name, score)
  - Highlight row for current user team
  - Note: “Scores update daily”
- **User Actions**
  - Scroll, tap to return to home
- **Conditional States**
  - Empty state: “Scores not yet available”
  - Highlight logic if user not in top 10
- **Accessibility Notes**
  - Good table/grid semantics
  - High contrast for highlight row
  - ARIA label for scoreboard

---

## 7. Prize Challenges / Leagues (Stub)

- **Visual Elements**
  - Two cards/tiles: “Prize Challenge” and “Summer League”
  - Both faded-out or marked “Coming Soon”
- **User Actions**
  - None (cards are non-functional for MVP)
- **Conditional States**
  - Always read-only
- **Accessibility Notes**
  - Cards labeled as non-interactive
  - Alt text: “Coming Soon”

---

### Micro-Interactions (All Screens)
- Progress bar animated fill
- Button press down/feedback
- Error shake animation for failed validations
- Loading spinners (where relevant)

**Touch Targets:** All tappable UI ≥48px height/width