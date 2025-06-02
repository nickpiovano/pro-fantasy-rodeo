# Pro Fantasy Rodeo – 'Christmas in July' 🐎

A modern, mobile-first fantasy rodeo application that allows users to participate in PRCA's 'Christmas in July' fantasy rodeo contest.

<!-- 
![Pro Fantasy Rodeo](https://github.com/nickpiovano/pro-fantasy-rodeo/raw/main/public/screenshot.png)
NOTE: Add a screenshot of the application here once it's running 
-->

## Overview

Pro Fantasy Rodeo is a web application that enables rodeo fans to enter fantasy contests by selecting contestants across different rodeo events. The flagship 'Christmas in July' contest lets users pay $19.95 to build their dream team of rodeo competitors and compete for major prizes including a 2024 Ram 1500 truck and $60,000 in cash prizes.

## Features

- **User Authentication**: Easy account creation and login for returning users
- **Roster Building**: Select one contestant per rodeo event with intuitive UI
- **Mobile-First Design**: Optimized for mobile devices with a Western-themed interface
- **Live Leaderboard**: Track your progress against other competitors
- **Western-Themed UI**: Authentic rodeo styling and design elements

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS with custom Western theme
- **State Management**: React Context API
- **Data Fetching**: React Query
- **Routing**: React Router
- **Backend**: API integration (PRCA data)
- **Authentication**: Custom auth with secure storage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/nickpiovano/pro-fantasy-rodeo.git
   cd pro-fantasy-rodeo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
src/
├── components/       # UI components
├── context/          # React context for state management
├── pages/            # Page components
├── services/         # API services and data handling
├── styles/           # Global styles and theme
└── utils/            # Utility functions
```

## User Flow

1. **Landing Page**: Users learn about the contest, prizes, and entry fee
2. **Authentication**: Create an account or sign in
3. **Roster Builder**: Select one contestant for each rodeo event
4. **Prize Summary**: Review team selections before submission
5. **Entry Confirmation**: Confirm submission and payment
6. **Leaderboard**: View contest standings and your position

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Roadmap

- [x] Project Setup and Foundation
- [x] User Authentication and Account Management
- [x] Core Contest Experience
- [x] Team Submission and Confirmation
- [x] Leaderboard and Post-Entry Experience
- [x] Mobile Optimization and Western Theme Implementation
- [x] Testing and Quality Assurance
- [x] Mobile Navigation System

## Testing

The application includes comprehensive testing:

- **Unit Tests**: Using Jest and React Testing Library to test individual components
- **End-to-End Tests**: Using Cypress to test critical user flows
- **Accessibility Testing**: Ensuring the application is usable by everyone

To run tests:

```bash
# Run unit tests
npm test

# Run Cypress tests in the browser
npm run cy:open

# Run Cypress tests headlessly
npm run cy:run

# Run end-to-end tests with dev server
npm run e2e
```

## License

[MIT License](LICENSE)

## Acknowledgments

- PRCA for partnership and rodeo data
- All the rodeo fans who participated in testing and feedback
