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
import ParallaxHero from "@/components/ParallaxHero";
import PromotionalCard from "@/components/PromotionalCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, DollarSign, Trophy, Info } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import { motion } from "framer-motion";

export type User = {
  email: string;
  teamName: string;
};

export type Contestant = {
  id: string;
  name: string;
  rank: number;
  winnings?: string;
  salary: number;
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
  salary: number;
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

  // Animation variants for staggered content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Contest end date
  const contestEndDate = new Date("2025-06-14T23:59:59");

  return (
    <PageContainer 
      title="Pro Fantasy Rodeo" 
      showBackButton={false}
      fullHeight
      hideHeader
    >
      {/* Hero Section with Parallax */}
      <ParallaxHero
        title="WIN A 2024 RAM 1500"
        subtitle="CHRISTMAS IN JULY"
        prizeText="+ $60,000 in Cash Prizes"
        endDate={contestEndDate}
        onStartEntry={() => navigateTo('/roster', 'Build Your Team')}
      />

      {/* Main Content */}
      <motion.div 
        className="px-4 py-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {/* How It Works Section */}
        <motion.div className="mb-10" variants={itemVariants}>
          <HowItWorks western={true} />
        </motion.div>

        {/* Promotional Cards Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Why Join Pro Fantasy Rodeo?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <PromotionalCard
              title="Massive Prizes"
              description="Win a brand new 2024 Ram 1500 truck and a share of $60,000 in cash prizes!"
              ctaText="See Prize Details"
              onCtaClick={() => navigateTo('/prizes', 'Prize Details')}
              icon={<Trophy className="h-6 w-6" />}
              badgeText="1st PLACE"
              western={true}
            />
            
            <PromotionalCard
              title="Simple Entry"
              description="Just $19.95 to enter. Pick one contestant from each event category to build your team."
              ctaText="Enter Now"
              onCtaClick={() => navigateTo('/roster', 'Build Your Team')}
              icon={<DollarSign className="h-6 w-6" />}
              badgeText="$19.95"
              western={true}
            />
            
            <PromotionalCard
              title="Limited Time"
              description="Contest runs June 15 - July 1. All entries must be complete by June 14th."
              ctaText="View Schedule"
              onCtaClick={() => {}}
              secondaryCtaText="Rules"
              onSecondaryCtaClick={() => {}}
              icon={<Calendar className="h-6 w-6" />}
              badgeText="JUNE 15 - JULY 1"
              western={true}
            />
          </div>
        </motion.div>

        {/* Countdown and CTA Section */}
        <motion.div 
          className="bg-secondary-900/80 backdrop-blur-sm border-2 border-accent-500 rounded-lg p-6 text-center mb-10"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-accent-400 mb-4">
            Time is Running Out!
          </h2>
          
          <div className="max-w-md mx-auto mb-6">
            <CountdownTimer 
              endDate={contestEndDate}
              label="Contest Closes In:"
              western={true}
              showProgressRings={true}
              size="lg"
            />
          </div>
          
          <Button 
            onClick={() => navigateTo('/roster', 'Build Your Team')} 
            variant="western"
            size="lg"
            useGradient={true}
            className="w-full md:w-auto md:px-12 py-6 text-xl"
          >
            Build Your Team <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="text-center mb-6"
          variants={itemVariants}
        >
          <Button 
            variant="ghost" 
            className="text-white hover:text-accent-300 flex items-center gap-2"
          >
            <Info className="h-4 w-4" /> Contest Rules & FAQ
          </Button>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default Index;
