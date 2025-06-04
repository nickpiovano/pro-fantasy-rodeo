# Pro Fantasy Rodeo – 'Christmas in July' 🤠🐎

A premium fantasy sports platform for rodeo enthusiasts featuring PRCA's 'Christmas in July' contest with $60,000 in cash prizes and a 2024 Ram 1500 truck grand prize.

## 🏆 Overview

Pro Fantasy Rodeo brings the thrill of fantasy sports to professional rodeo. Our flagship 'Christmas in July' contest lets fans build their dream team of rodeo athletes for $19.95 entry, competing for substantial prizes while experiencing the excitement of PRCA events in a new interactive way.

## ✨ Key Features

- **Authentic Western Experience**: Immersive rodeo-themed design with authentic styling
- **Intuitive Team Building**: Select top contestants across multiple rodeo disciplines
- **Real-time Leaderboard**: Track your position with live updates during events
- **Detailed Contestant Stats**: Make informed selections with comprehensive performance data
- **Secure Transactions**: Reliable payment processing and account management
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Social Sharing**: Share your team and standings with fellow rodeo fans

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS with custom western theme components
- **State Management**: React Context API with custom hooks
- **Data Fetching**: React Query for efficient API integration
- **Authentication**: JWT with secure storage and session management
- **Animations**: Framer Motion for fluid UI transitions
- **Testing**: Jest, React Testing Library, and Cypress

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/nickpiovano/pro-fantasy-rodeo.git
cd pro-fantasy-rodeo

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/  
├── components/     # Reusable UI components  
├── context/        # State management  
├── hooks/          # Custom React hooks  
├── layouts/        # Page layout components  
├── pages/          # Main application pages  
├── services/       # API and external services  
├── styles/         # Global styles and theming  
├── types/          # TypeScript type definitions  
└── utils/          # Helper functions and utilities  
```

## 📋 Documentation

- [Clickable live prototype](https://pro-fantasy-rodeo.lovable.app/) - View the interactive demo
- [Assumptions](./tasks/assumptions.md) - Initial project assumptions
- [PRD Final](./tasks/prd_final.md) - Product Requirements Document
- [Task Breakdown](./tasks/tasks-prd_final.md) - Development task breakdown
- [UI Redesign Tasks](./tasks/tasks-prd-modern-ui-redesign.md) - UI modernization plan

## 📱 User Experience

1. **Discover**: Learn about the contest, prizes, and entry details
2. **Build Team**: Select contestants across multiple rodeo events
3. **Submit Entry**: Review selections and complete payment
4. **Track Performance**: Follow your team's performance on the leaderboard

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run e2e

# Run accessibility tests
npm run test:a11y
```

## 🔜 Roadmap

- [x] Core platform launch with Christmas in July contest (using dummy data)
- [x] Mobile-optimized experience
- [x] Western-themed UI implementation
- [x] Comprehensive leaderboard experience
- [x] Smooth team-buiilder experience
- [ ] User authentication
- [ ] Payment flows
- [ ] Social sharing capabilities
- [ ] Additional PRCA event integrations
- [ ] Real data integrations
- [ ] Enhanced statistics and analytics
