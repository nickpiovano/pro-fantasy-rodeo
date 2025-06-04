import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button-new';
import { ArrowRight, ArrowLeft, AlertTriangle, Users, DollarSign } from 'lucide-react';
import type { Event, TeamSelection } from '@/pages/Index';
import ProgressBar from './ProgressBar';
import SalaryTracker from './SalaryTracker';
import EventCard from './EventCard';
import contestService from '@/services/contest';
import { formatSalary } from '@/services/contest';
import { Loader2 } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-white font-semibold">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
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
    );
  }

  const currentEvent = events[currentEventIndex];
  if (!currentEvent) {
    return (
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
    );
  }
  
  const isLastEvent = currentEventIndex === events.length - 1;
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

  const selectedContestantId = selections.find(s => s.eventId === currentEvent.id)?.contestantId || null;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header with Progress */}
        <Card className="card-western border-2 border-red-600 mb-6 overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Build Your Team</h1>
              <div className="text-sm bg-red-800 px-3 py-1 rounded-full">
                Event {currentEventIndex + 1} of {events.length}
              </div>
            </div>
            <ProgressBar 
              value={selections.length} 
              max={events.length} 
              showValue={false}
              label="Select one contestant per event"
              size="md"
              variant="western"
            />
          </CardHeader>
          
          {/* Salary Tracker */}
          <CardContent className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
            <SalaryTracker 
              key={`salary-tracker-${warningKey}`} // Force re-render when warning is triggered
              currentSalary={totalSalary} 
              salaryCap={salaryCap} 
              showWarning={showSalaryWarning}
              selectionsCount={selections.length}
            />
          </CardContent>
        </Card>

        {/* Current Event */}
        <EventCard 
          event={currentEvent}
          selectedContestantId={selectedContestantId}
          onContestantSelect={handleContestantSelect}
          className="mb-6"
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3">
          {currentEventIndex > 0 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="sm:flex-1 py-3 border-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Previous Event
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!hasSelectionForCurrentEvent || isOverSalaryCap}
            variant="primary"
            className={`sm:flex-1 py-3 text-white font-bold ${
              isLastEvent ? 'bg-red-600 hover:bg-red-700 text-lg' : ''
            } ${
              isOverSalaryCap ? 'bg-red-700 hover:bg-red-800 opacity-80 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            }`}
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            {isLastEvent ? 'BUILD YOUR TEAM' : 'Next Event'}
          </Button>
        </div>

        {/* Warning for over salary cap */}
        {isOverSalaryCap && (
          <div className="mt-4 bg-red-900/50 border border-red-500 rounded-lg p-4 flex items-center text-red-200">
            <AlertTriangle className="h-5 w-5 text-red-300 mr-2 flex-shrink-0" />
            <p className="text-sm">
              Your team is over the salary cap of {formatSalary(salaryCap)}. Please adjust your selections.
            </p>
          </div>
        )}

        {/* Team Summary */}
        {selections.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-red-400 mr-2" />
              <h2 className="text-lg font-semibold text-white">Current Selections</h2>
            </div>
            <Card className="bg-gray-900 border border-gray-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-12 text-xs text-gray-300 p-2 border-b border-gray-700 bg-gray-800/50">
                  <div className="col-span-5 font-semibold">Contestant</div>
                  <div className="col-span-4 font-semibold">Event</div>
                  <div className="col-span-3 text-right font-semibold">Salary</div>
                </div>
                <div className="divide-y divide-gray-800">
                  {selections.map((selection, index) => (
                    <div key={index} className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-5 font-medium text-white">{selection.contestantName}</div>
                      <div className="col-span-4 text-sm text-gray-400">{selection.eventName}</div>
                      <div className="col-span-3 text-right text-amber-400 font-semibold">
                        {formatSalary(selection.salary)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                      <p className="text-sm font-medium text-white">Potential Earnings</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      Up to <span className="text-green-400 font-bold">{formatCurrency(100000 * selections.length)}</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    1st: $100K | 2nd-3rd: $17.5K | 4th: $5K | 5th-9th: $500
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RosterBuilder;
