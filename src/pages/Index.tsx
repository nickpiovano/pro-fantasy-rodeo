import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTeam } from '@/context/TeamContext';
import LandingPage from '@/components/LandingPage';
import AuthenticationContainer from '@/components/AuthenticationContainer';
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
  const [currentStep, setCurrentStep] = useState<'landing' | 'auth' | 'roster' | 'summary' | 'confirmation' | 'leaderboard'>('landing');
  const { user, login, isAuthenticated } = useAuth();
  const { teamSelections, setUser, addSelection, clearSelections } = useTeam();

  // Handle initial app state based on authentication
  useEffect(() => {
    if (isAuthenticated && user && currentStep === 'landing') {
      // If user is already authenticated, sync the user with team context
      setUser(user);
    }
  }, [isAuthenticated, user, currentStep, setUser]);

  const handleStartEntry = () => {
    if (isAuthenticated && user) {
      // If user is already authenticated, go straight to roster builder
      setCurrentStep('roster');
    } else {
      // Otherwise, go to authentication
      setCurrentStep('auth');
    }
  };

  const handleAuthSuccess = (userData: User) => {
    login(userData);
    setUser(userData);
    setCurrentStep('roster');
  };

  const handleTeamComplete = (selections: TeamSelection[]) => {
    // In a real implementation, we would use addSelection for each item
    // For this MVP, we'll just clear and add all at once
    clearSelections();
    selections.forEach(selection => addSelection(selection));
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
      case 'auth':
        return <AuthenticationContainer onAuthSuccess={handleAuthSuccess} />;
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
