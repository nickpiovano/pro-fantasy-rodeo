import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
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
              className="mt-4 bg-amber-100 text-red-800 hover:bg-amber-200"
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
              className="mt-4 bg-amber-100 text-red-800 hover:bg-amber-200"
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
        <Card className="card-western border-2 border-red-600 mb-6">
          <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white">
            <h1 className="text-xl font-bold mb-2">Build Your Team</h1>
            <ProgressBar 
              value={selections.length} 
              max={events.length} 
              showValue={true}
              label="Select one contestant per event"
              size="sm"
              variant="western"
            />
          </CardHeader>
          
          {/* Salary Tracker */}
          <CardContent className="p-4 bg-gradient-to-br from-gray-800 to-stone-900">
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
        <div className="flex space-x-3">
          {currentEventIndex > 0 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex-1 py-3 border-2 border-stone-400 text-stone-700 hover:bg-stone-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!hasSelectionForCurrentEvent || isOverSalaryCap}
            className={`btn-rodeo flex-1 py-3 group ${isOverSalaryCap ? 'bg-red-700 hover:bg-red-800 opacity-80 cursor-not-allowed' : ''}`}
          >
            {isLastEvent ? 'Review Team' : 'Next Event'}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Team Summary */}
        {selections.length > 0 && (
          <Card className="card-western mt-6 border border-stone-300">
            <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-600">
              <h2 className="text-lg font-bold text-white">Current Picks</h2>
            </CardHeader>
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selections.map((selection) => (
                  <div 
                    key={selection.eventId} 
                    className="bg-white border-2 border-amber-300 rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-1">
                        {selection.eventName}
                      </span>
                      <span className="text-sm font-bold text-stone-800">
                        {selection.contestantName}
                      </span>
                      <span className="text-xs font-medium text-red-600 mt-1">
                        {formatSalary(selection.salary)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RosterBuilder;
