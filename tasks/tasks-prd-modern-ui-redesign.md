## Relevant Files

- `src/styles/theme.ts` - Core styling tokens and variables for the redesigned UI.
- `src/styles/global.css` - Global styles and CSS variables for the new design system.
- `src/utils/typography.ts` - Typography utilities for text truncation and overflow handling.
- `src/utils/accessibility.ts` - Accessibility utilities for WCAG contrast checks.
- `src/components/ui/Card.tsx` - Redesigned card component with glass effect and animations.
- `src/components/ui/Button.tsx` - Modern button system with variants and states.
- `src/components/ui/Navigation.tsx` - Bottom navigation with floating action button.
- `src/components/CountdownTimer.tsx` - Enhanced countdown visualization component.
- `src/components/EventCard.tsx` - Redesigned event card with swipe mechanics.
- `src/components/MobileNavigation.tsx` - Redesigned mobile navigation system.
- `src/components/ProgressBar.tsx` - Interactive progress visualization.
- `src/components/TeamSummary.tsx` - Visually striking team summary with animations.
- `src/components/HowItWorks.tsx` - Redesigned information component with modern layout.
- `src/components/PrizeDisplay.tsx` - Enhanced prize information with animations.
- `src/pages/Home.tsx` - Redesigned home page with parallax hero section.
- `src/pages/RosterBuilder.tsx` - Modernized roster builder with card swipe mechanics.
- `src/pages/Leaderboard.tsx` - Data-rich leaderboard with tiered styling.
- `src/pages/PrizeSummary.tsx` - Enhanced summary page with improved layout.
- `src/pages/EntryConfirmation.tsx` - Redesigned confirmation page with animations.
- `src/context/ThemeContext.tsx` - Context for managing theme and appearance settings.
- `src/hooks/useAnimation.ts` - Custom hook for reusable animations.
- `src/utils/motion.ts` - Utility functions for animations and transitions.
- `src/assets/icons/` - Directory for custom Western-inspired SVG icons.
- `src/assets/textures/` - Directory for subtle Western texture assets.

### Notes

- All components should be built with responsiveness and accessibility in mind.
- Use Framer Motion for complex animations and React Spring for physics-based interactions.
- Implement CSS variables for theming to ensure consistency across components.
- Follow the 8pt grid system for consistent spacing throughout the application.
- Ensure all interactive elements have a minimum touch target size of 48x48px.

## Tasks

- [x] 1.0 Design System Foundation
  - [x] 1.1 Install and configure Framer Motion and React Spring for animations
  - [x] 1.2 Create color palette with rodeo red (#C8102E) as primary, navy (#1A2B48) as secondary, and gold (#D4AF37) as accent
  - [x] 1.3 Define color variants (tints/shades) for each primary color
  - [x] 1.4 Set up CSS variables in `theme.ts` for colors, spacing, shadows, and borders
  - [x] 1.5 Implement 8pt spacing grid system in global styles
  - [x] 1.6 Create elevation system with consistent shadow styles for different UI layers
  - [x] 1.7 Define animation timing functions and durations as variables
  - [x] 1.8 Set up responsive breakpoints for mobile-first approach
  - [x] 1.9 Create standard border radiuses for different component types
  - [x] 1.10 Implement ThemeContext for potential light/dark mode support

- [x] 2.0 Typography and Visual Hierarchy Implementation
  - [x] 2.1 Select and integrate display font with subtle Western character
  - [x] 2.2 Select and integrate clean sans-serif body font
  - [x] 2.3 Define typography scale using 8pt grid (headings, subheadings, body, captions)
  - [x] 2.4 Create consistent text styles for different UI contexts
  - [x] 2.5 Implement responsive typography that scales across device sizes
  - [x] 2.6 Set up proper line heights and letter spacing for optimal readability
  - [x] 2.7 Define font weights for different emphasis levels
  - [x] 2.8 Create utility classes for common text treatments
  - [x] 2.9 Verify all text meets WCAG AA contrast requirements
  - [x] 2.10 Implement text truncation and overflow handling strategies

- [ ] 3.0 Component Library Redesign
  - [x] 3.1 Create base Card component with glass effect and hover animations
  - [x] 3.2 Develop Button system with primary, secondary, and tertiary variants
  - [x] 3.3 Implement interactive states (hover, active, disabled) for all buttons
  - [x] 3.4 Create modern form controls (inputs, checkboxes, toggles) with Western accents
  - [x] 3.5 Redesign bottom navigation with floating action button
  - [x] 3.6 Implement navigation active state indicators with animations
  - [x] 3.7 Create List components for contestant data with selection states
  - [x] 3.8 Develop sophisticated loading states and skeletons
  - [x] 3.9 Design empty states with Western character
  - [x] 3.10 Implement Toast notification system with appropriate animations
  - [x] 3.11 Create Dropdown and Select components with modern styling
  - [x] 3.12 Design Badge component for status indicators
  - [x] 3.13 Implement Tabs component with animated indicator
  - [x] 3.14 Create Modal and Dialog components with entrance/exit animations
  - [x] 3.15 Develop Tooltip component with Western styling

- [ ] 4.0 Screen-Specific UI Enhancements
  - [ ] 4.1 Redesign Home page with parallax hero section
  - [ ] 4.2 Create promotional cards with clear hierarchy and CTAs
  - [ ] 4.3 Implement enhanced CountdownTimer with engaging visualization
  - [ ] 4.4 Redesign HowItWorks component with modern, step-based layout
  - [ ] 4.5 Update RosterBuilder with card-swipe selection mechanics
  - [ ] 4.6 Enhance ProgressBar with interactive visualization
  - [ ] 4.7 Redesign contestant selection confirmation with subtle animations
  - [ ] 4.8 Update Leaderboard with tiered styling and data visualization
  - [ ] 4.9 Implement user position highlighting with entrance animation
  - [ ] 4.10 Redesign PrizeSummary with visually striking team presentation
  - [ ] 4.11 Create animated confirmation sequence for EntryConfirmation page
  - [ ] 4.12 Implement sharable team card designs
  - [ ] 4.13 Update all page transitions with smooth animations

- [ ] 5.0 Animation and Motion System
  - [ ] 5.1 Create reusable animation hooks in `useAnimation.ts`
  - [ ] 5.2 Implement page transition animations with shared elements
  - [ ] 5.3 Develop micro-interactions for all interactive elements
  - [ ] 5.4 Create Western-themed loading animations
  - [ ] 5.5 Implement success/completion animations
  - [ ] 5.6 Design scroll-based animations for content revelation
  - [ ] 5.7 Create parallax effects for depth on home page
  - [ ] 5.8 Implement spring physics for natural-feeling interactions
  - [ ] 5.9 Add gesture-based animations for swipes and drags
  - [ ] 5.10 Create "moments of delight" surprise animations
  - [ ] 5.11 Implement animation preference detection for reduced motion
  - [ ] 5.12 Develop staggered animations for lists and groups

- [ ] 6.0 Advanced UI Features Implementation
  - [ ] 6.1 Create contextual blur effects for layered UI components
  - [ ] 6.2 Implement glass morphism for premium UI elements
  - [ ] 6.3 Design and implement custom pull-to-refresh animation
  - [ ] 6.4 Add haptic feedback patterns for critical interactions
  - [ ] 6.5 Create advanced scrolling behaviors (sticky headers, parallax)
  - [ ] 6.6 Implement adaptive color schemes based on content
  - [ ] 6.7 Design and create custom SVG icons with Western influence
  - [ ] 6.8 Create subtle texture overlays for selected UI elements
  - [ ] 6.9 Implement skeleton loading states with animations
  - [ ] 6.10 Add scroll-based progress indicators
  - [ ] 6.11 Create high-quality image treatment system for contestants
  - [ ] 6.12 Implement confetti or celebration effects for achievements
  - [ ] 6.13 Add subtle sound effects for key interactions (optional)
  - [x] 6.14 Create accessibility settings for animations and effects 