import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button-new';
import { ArrowRight, ArrowLeft, AlertTriangle, Users, DollarSign, ChevronLeft } from 'lucide-react';
import type { Event, TeamSelection } from '@/pages/Index';
import ProgressBar from './ProgressBar';
import SalaryTracker from './SalaryTracker';
import EventCard from './EventCard';
import contestService from '@/services/contest';
import { formatSalary } from '@/services/contest';
import { Loader2 } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import PageContainer from '@/components/PageContainer';

interface RosterBuilderProps {
  onTeamComplete: (selections: TeamSelection[]) => void;
}

interface ActiveContest {
  id: string;
  name: string;
  entryFee: number;
  startDate: Date;
  endDate: Date;
  salaryCap: number;
  prizes: Array<{
    place: number | string;
    description: string;
    value: number;
  }>;
}

// Helper function to convert score to earnings based on position
export const getEarningsFromScore = (score: number): number => {
  if (score >= 88) return 100000; // 1st place
  if (score >= 85) return 17500;  // 2nd-3rd place
  if (score >= 82) return 17500;  // 2nd-3rd place
  if (score >= 80) return 5000;   // 4th place
  if (score >= 75) return 500;    // 5th-9th place
  return 0;                       // 10th-15th place
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

const RosterBuilder = ({ onTeamComplete }: RosterBuilderProps) => {
  const { navigateTo } = useNavigation();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selections, setSelections] = useState<TeamSelection[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [salaryCap, setSalaryCap] = useState(800000); // $800,000 salary cap
  const [totalSalary, setTotalSalary] = useState(0);
  const [showSalaryWarning, setShowSalaryWarning] = useState(false);
  const [warningKey, setWarningKey] = useState(0); // Add state to force re-render

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const contestEvents = await contestService.getEvents();
        console.log("Fetched events:", contestEvents);
        setEvents(contestEvents);
        
        // Get active contest to get salary cap
        const activeContest = await contestService.getActiveContests() as ActiveContest;
        console.log("Active contest:", activeContest);
        if (activeContest && activeContest.salaryCap) {
          setSalaryCap(activeContest.salaryCap);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load events. Please try again.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calculate total salary whenever selections change
  useEffect(() => {
    const newTotalSalary = selections.reduce((total, selection) => total + selection.salary, 0);
    setTotalSalary(newTotalSalary);
    
    // Automatically show warning when over salary cap
    if (newTotalSalary > salaryCap) {
      setShowSalaryWarning(true);
      setWarningKey(prev => prev + 1);
    } else {
      setShowSalaryWarning(false);
    }
    
    // Hide salary warning after 5 seconds if it was shown
    if (showSalaryWarning) {
      const timer = setTimeout(() => {
        // Only hide warning if not over cap
        if (newTotalSalary <= salaryCap) {
          setShowSalaryWarning(false);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [selections, showSalaryWarning, salaryCap]);

  const handleBackToTeams = () => {
    navigateTo('/teams', 'Teams');
  };

  if (loading) {
    return (
      <PageContainer title="Build Your Team">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
            <p className="text-white font-semibold">Loading events...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error || events.length === 0) {
    return (
      <PageContainer title="Build Your Team">
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="card-western border-2 border-red-600 max-w-md w-full">
            <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white text-center">
              <h2 className="text-xl font-bold">Something went wrong</h2>
              <p className="text-red-100 text-sm">{error || 'No events available'}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="secondary"
                className="mt-4 bg-white text-red-800 hover:bg-gray-100"
              >
                Try Again
              </Button>
            </CardHeader>
          </Card>
        </div>
      </PageContainer>
    );
  }

  const currentEvent = events[currentEventIndex];
  if (!currentEvent) {
    return (
      <PageContainer title="Build Your Team">
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="card-western border-2 border-red-600 max-w-md w-full">
            <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white text-center">
              <h2 className="text-xl font-bold">Event not found</h2>
              <p className="text-red-100 text-sm">Unable to load the current event</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="secondary"
                className="mt-4 bg-white text-red-800 hover:bg-gray-100"
              >
                Try Again
              </Button>
            </CardHeader>
          </Card>
        </div>
      </PageContainer>
    );
  }
  
  const isLastEvent = currentEventIndex === events.length - 1;
  const isFirstEvent = currentEventIndex === 0;
  const hasSelectionForCurrentEvent = selections.some(s => s.eventId === currentEvent.id);
  const isOverSalaryCap = totalSalary > salaryCap;

  const handleContestantSelect = (contestantId: string, contestantName: string, salary: number) => {
    const newSelection: TeamSelection = {
      eventId: currentEvent.id,
      eventName: currentEvent.name,
      contestantId,
      contestantName,
      salary
    };

    // Remove any existing selection for this event
    const updatedSelections = selections.filter(s => s.eventId !== currentEvent.id);
    setSelections([...updatedSelections, newSelection]);
  };

  const handleNext = () => {
    // Always show warning when over salary cap, regardless of which button is clicked
    if (isOverSalaryCap) {
      setShowSalaryWarning(true);
      setWarningKey(prev => prev + 1); // Force re-render of the warning
      return;
    }
    
    if (isLastEvent && hasSelectionForCurrentEvent) {
      // Complete the team
      onTeamComplete(selections);
    } else if (hasSelectionForCurrentEvent && currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
    }
  };

  const currentEventNumber = currentEventIndex + 1;
  const totalEvents = events.length;
  const selectedContestant = selections.find(s => s.eventId === currentEvent.id);
  const selectedContestantId = selectedContestant?.contestantId || null;

  return (
    <PageContainer title="Build Your Team">
      <div className="p-4 pb-24">
        {/* Header with back button */}
        <div className="mb-4 flex items-center">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            leftIcon={<ChevronLeft className="h-4 w-4" />}
            onClick={handleBackToTeams}
          >
            Back to Teams
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar 
            value={(currentEventNumber / totalEvents) * 100}
            max={100}
            label={`Event ${currentEventNumber} of ${totalEvents}`}
          />
        </div>
        
        {/* Salary Tracker */}
        <div className="mb-6">
          <SalaryTracker 
            currentSalary={totalSalary}
            salaryCap={salaryCap}
            showWarning={showSalaryWarning}
            selectionsCount={selections.length}
            key={`salary-tracker-${warningKey}`}
          />
        </div>
        
        {/* Choose Contestant Card */}
        <Card className="card-western border-2 border-red-600 mb-6">
          <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {currentEvent.name}
              </h2>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-red-800"
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  onClick={handlePrevious}
                  disabled={isFirstEvent}
                >
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-red-800"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  onClick={handleNext}
                  disabled={!hasSelectionForCurrentEvent || (isOverSalaryCap && isLastEvent)}
                >
                  {isLastEvent ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 bg-gray-900">
            <p className="text-gray-300 mb-4">
              Select one contestant from this event for your team.
            </p>
            
            <div className="space-y-3">
              {currentEvent.contestants.map(contestant => (
                <div 
                  key={contestant.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedContestantId === contestant.id 
                      ? 'bg-gray-800 border-red-500' 
                      : 'bg-gray-800 border-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => handleContestantSelect(contestant.id, contestant.name, contestant.salary)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">{contestant.name}</p>
                      <p className="text-sm text-gray-400">Rank: #{contestant.rank}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-400">{formatSalary(contestant.salary)}</p>
                      {selectedContestantId === contestant.id && (
                        <div className="mt-1 text-xs text-green-400">Selected</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={handlePrevious}
            disabled={isFirstEvent}
          >
            Previous Event
          </Button>
          
          <Button 
            variant="primary"
            className="bg-red-600 hover:bg-red-700 text-white"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            onClick={handleNext}
            disabled={!hasSelectionForCurrentEvent || (isOverSalaryCap && isLastEvent)}
          >
            {isLastEvent ? 'Complete Team' : 'Next Event'}
          </Button>
        </div>
        
        {/* Warning for over salary cap */}
        {isOverSalaryCap && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
            <p className="text-red-300 text-sm">
              Your team is over the salary cap. Please adjust your selections before continuing.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default RosterBuilder;
