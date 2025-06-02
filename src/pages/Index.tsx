
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LandingPage from '@/components/LandingPage';
import AccountCreation from '@/components/AccountCreation';
import RosterBuilder from '@/components/RosterBuilder';
import PrizeSummary from '@/components/PrizeSummary';
import EntryConfirmation from '@/components/EntryConfirmation';
import Leaderboard from '@/components/Leaderboard';

export type User = {
  email: string;
  teamName: string;
};

export type Contestant = {
  id: string;
  name: string;
  rank: number;
  winnings?: string;
};

export type Event = {
  id: string;
  name: string;
  contestants: Contestant[];
};

export type TeamSelection = {
  eventId: string;
  eventName: string;
  contestantId: string;
  contestantName: string;
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'account' | 'roster' | 'summary' | 'confirmation' | 'leaderboard'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [teamSelections, setTeamSelections] = useState<TeamSelection[]>([]);

  const handleStartEntry = () => {
    setCurrentStep('account');
  };

  const handleAccountCreated = (userData: User) => {
    setUser(userData);
    setCurrentStep('roster');
  };

  const handleTeamComplete = (selections: TeamSelection[]) => {
    setTeamSelections(selections);
    setCurrentStep('summary');
  };

  const handleEntrySubmitted = () => {
    setCurrentStep('confirmation');
  };

  const handleViewLeaderboard = () => {
    setCurrentStep('leaderboard');
  };

  const handleBackToHome = () => {
    setCurrentStep('landing');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onStartEntry={handleStartEntry} />;
      case 'account':
        return <AccountCreation onAccountCreated={handleAccountCreated} />;
      case 'roster':
        return <RosterBuilder onTeamComplete={handleTeamComplete} />;
      case 'summary':
        return (
          <PrizeSummary
            user={user!}
            teamSelections={teamSelections}
            onEntrySubmitted={handleEntrySubmitted}
            onEditTeam={() => setCurrentStep('roster')}
          />
        );
      case 'confirmation':
        return (
          <EntryConfirmation
            user={user!}
            teamSelections={teamSelections}
            onViewLeaderboard={handleViewLeaderboard}
            onBackToHome={handleBackToHome}
          />
        );
      case 'leaderboard':
        return (
          <Leaderboard
            userTeamName={user?.teamName}
            onBackToHome={handleBackToHome}
          />
        );
      default:
        return <LandingPage onStartEntry={handleStartEntry} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {renderCurrentStep()}
    </div>
  );
};

export default Index;
