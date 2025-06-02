import { useState, useEffect } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Event, TeamSelection } from '@/pages/Index';
import ProgressBar from './ProgressBar';
import EventCard from './EventCard';
import contestService from '@/services/contest';
import { Loader2 } from 'lucide-react';

interface RosterBuilderProps {
  onTeamComplete: (selections: TeamSelection[]) => void;
}

const RosterBuilder = ({ onTeamComplete }: RosterBuilderProps) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selections, setSelections] = useState<TeamSelection[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const contestEvents = await contestService.getEvents();
        setEvents(contestEvents);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-amber-100 font-semibold">Loading events...</p>
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
  const isLastEvent = currentEventIndex === events.length - 1;
  const hasSelectionForCurrentEvent = selections.some(s => s.eventId === currentEvent.id);

  const handleContestantSelect = (contestantId: string, contestantName: string) => {
    const newSelection: TeamSelection = {
      eventId: currentEvent.id,
      eventName: currentEvent.name,
      contestantId,
      contestantName
    };

    // Remove any existing selection for this event
    const updatedSelections = selections.filter(s => s.eventId !== currentEvent.id);
    setSelections([...updatedSelections, newSelection]);
  };

  const handleNext = () => {
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
      <div className="max-w-md mx-auto animate-fade-in">
        {/* Header with Progress */}
        <Card className="card-western border-2 border-red-600 mb-6">
          <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white">
            <h1 className="text-xl font-bold mb-2">Build Your Team</h1>
            <ProgressBar current={selections.length} total={events.length} />
          </CardHeader>
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
            disabled={!hasSelectionForCurrentEvent}
            className="btn-rodeo flex-1 py-3 group"
          >
            {isLastEvent ? 'Review Team' : 'Next Event'}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Team Summary */}
        {selections.length > 0 && (
          <Card className="card-western mt-6 border border-stone-300">
            <CardHeader>
              <h2 className="text-lg font-bold text-stone-800">Current Picks</h2>
            </CardHeader>
            <div className="p-4">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selections.map((selection) => (
                  <div key={selection.eventId} className="flex justify-between items-center py-2 border-b border-stone-200">
                    <span className="text-sm font-medium text-stone-700">{selection.eventName}</span>
                    <span className="text-sm text-stone-900 font-bold">{selection.contestantName}</span>
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
