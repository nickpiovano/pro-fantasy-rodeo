import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTeam } from '@/context/TeamContext';
import LandingPage from '@/components/LandingPage';
import AuthenticationContainer from '@/components/AuthenticationContainer';
import RosterBuilder from '@/components/RosterBuilder';
import PrizeSummary from '@/components/PrizeSummary';
import EntryConfirmation from '@/components/EntryConfirmation';
import Leaderboard from '@/components/Leaderboard';
import PageContainer from "@/components/PageContainer";
import HowItWorks from "@/components/HowItWorks";
import CountdownTimer from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";

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
  const { navigateTo } = useNavigation();

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
    <PageContainer 
      title="Pro Fantasy Rodeo" 
      showBackButton={false}
      fullHeight
    >
      <div className="p-4 animate-fade-in">
        {/* Hero Banner */}
        <div className="glass-card p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Pro Fantasy Rodeo
          </h1>
          <p className="text-rodeo-tan mb-4">
            Win a 2024 Ram 1500 & $60K in prizes!
          </p>
          <div className="mb-4">
            <CountdownTimer 
              endDate={new Date("2024-07-31T23:59:59")} 
              className="text-white"
              label="Contest Closes In:"
            />
          </div>
          <Button 
            onClick={() => navigateTo('/roster', 'Build Your Team')} 
            size="lg" 
            className="btn-primary w-full md:w-auto md:px-8"
          >
            Build Your Team <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* How It Works Section */}
        <div className="glass-card p-6 mb-6">
          <HowItWorks />
        </div>

        {/* Entry Fee Section */}
        <div className="glass-card p-6 mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Entry Fee
          </h2>
          <p className="text-rodeo-tan text-xl font-bold mb-2">
            $19.95
          </p>
          <p className="text-white/70 text-sm">
            One entry per person. All entries must be complete by July 31st.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
