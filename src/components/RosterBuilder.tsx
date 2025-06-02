
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Event, TeamSelection } from '@/pages/Index';

interface RosterBuilderProps {
  onTeamComplete: (selections: TeamSelection[]) => void;
}

// Mock data for PRCA events and contestants
const mockEvents: Event[] = [
  {
    id: 'bareback',
    name: 'Bareback Riding',
    contestants: [
      { id: 'bb1', name: 'Kaycee Feild', rank: 1, winnings: '$45,280' },
      { id: 'bb2', name: 'Richmond Champion', rank: 2, winnings: '$42,150' },
      { id: 'bb3', name: 'Cole Reiner', rank: 3, winnings: '$38,940' },
      { id: 'bb4', name: 'Mason Clements', rank: 4, winnings: '$35,720' },
      { id: 'bb5', name: 'Tilden Hooper', rank: 5, winnings: '$32,580' },
    ]
  },
  {
    id: 'steer-wrestling',
    name: 'Steer Wrestling',
    contestants: [
      { id: 'sw1', name: 'Tyler Waguespack', rank: 1, winnings: '$48,320' },
      { id: 'sw2', name: 'Jesse Brown', rank: 2, winnings: '$44,180' },
      { id: 'sw3', name: 'Dakota Eldridge', rank: 3, winnings: '$40,960' },
      { id: 'sw4', name: 'Stetson Jorgensen', rank: 4, winnings: '$37,540' },
      { id: 'sw5', name: 'Jacob Talley', rank: 5, winnings: '$34,280' },
    ]
  },
  {
    id: 'team-roping-header',
    name: 'Team Roping (Header)',
    contestants: [
      { id: 'trh1', name: 'Kaleb Driggers', rank: 1, winnings: '$52,480' },
      { id: 'trh2', name: 'Clay Smith', rank: 2, winnings: '$48,920' },
      { id: 'trh3', name: 'Erich Rogers', rank: 3, winnings: '$45,160' },
      { id: 'trh4', name: 'Luke Brown', rank: 4, winnings: '$41,580' },
      { id: 'trh5', name: 'Chad Masters', rank: 5, winnings: '$38,240' },
    ]
  },
  {
    id: 'team-roping-heeler',
    name: 'Team Roping (Heeler)',
    contestants: [
      { id: 'tre1', name: 'Junior Nogueira', rank: 1, winnings: '$52,480' },
      { id: 'tre2', name: 'Jade Corkill', rank: 2, winnings: '$48,920' },
      { id: 'tre3', name: 'Paden Bray', rank: 3, winnings: '$45,160' },
      { id: 'tre4', name: 'Hunter Koch', rank: 4, winnings: '$41,580' },
      { id: 'tre5', name: 'Wesley Thorp', rank: 5, winnings: '$38,240' },
    ]
  },
  {
    id: 'saddle-bronc',
    name: 'Saddle Bronc Riding',
    contestants: [
      { id: 'sb1', name: 'Sage Newman', rank: 1, winnings: '$46,780' },
      { id: 'sb2', name: 'Stetson Dell Wright', rank: 2, winnings: '$43,560' },
      { id: 'sb3', name: 'Ryder Wright', rank: 3, winnings: '$40,320' },
      { id: 'sb4', name: 'Brody Cress', rank: 4, winnings: '$37,180' },
      { id: 'sb5', name: 'Zeke Thurston', rank: 5, winnings: '$34,940' },
    ]
  },
  {
    id: 'tie-down-roping',
    name: 'Tie-Down Roping',
    contestants: [
      { id: 'tdr1', name: 'Shad Mayfield', rank: 1, winnings: '$49,640' },
      { id: 'tdr2', name: 'Caleb Smidt', rank: 2, winnings: '$46,280' },
      { id: 'tdr3', name: 'Haven Meged', rank: 3, winnings: '$42,980' },
      { id: 'tdr4', name: 'Tuf Case Cooper', rank: 4, winnings: '$39,760' },
      { id: 'tdr5', name: 'Marty Yates', rank: 5, winnings: '$36,540' },
    ]
  },
  {
    id: 'barrel-racing',
    name: 'Barrel Racing',
    contestants: [
      { id: 'br1', name: 'Hailey Kinsel', rank: 1, winnings: '$51,280' },
      { id: 'br2', name: 'Jordon Briggs', rank: 2, winnings: '$47,940' },
      { id: 'br3', name: 'Kassie Mowry', rank: 3, winnings: '$44,620' },
      { id: 'br4', name: 'Emily Beisel', rank: 4, winnings: '$41,380' },
      { id: 'br5', name: 'Shelley Morgan', rank: 5, winnings: '$38,160' },
    ]
  },
  {
    id: 'bull-riding',
    name: 'Bull Riding',
    contestants: [
      { id: 'bur1', name: 'Sage Kimzey', rank: 1, winnings: '$54,720' },
      { id: 'bur2', name: 'Josh Frost', rank: 2, winnings: '$50,480' },
      { id: 'bur3', name: 'Stetson Dell Wright', rank: 3, winnings: '$46,840' },
      { id: 'bur4', name: 'Creek Young', rank: 4, winnings: '$43,280' },
      { id: 'bur5', name: 'Parker Breding', rank: 5, winnings: '$39,960' },
    ]
  }
];

const RosterBuilder = ({ onTeamComplete }: RosterBuilderProps) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selections, setSelections] = useState<TeamSelection[]>([]);

  const currentEvent = mockEvents[currentEventIndex];
  const progress = ((selections.length) / mockEvents.length) * 100;
  const isLastEvent = currentEventIndex === mockEvents.length - 1;
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
    } else if (hasSelectionForCurrentEvent && currentEventIndex < mockEvents.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
    }
  };

  const selectedContestantId = selections.find(s => s.eventId === currentEvent.id)?.contestantId;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto animate-fade-in">
        {/* Header with Progress */}
        <Card className="card-western border-2 border-red-600 mb-6">
          <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl font-bold">Build Your Team</h1>
              <Badge className="bg-amber-100 text-red-800 font-bold">
                {selections.length} / {mockEvents.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-3 bg-red-800" />
            <p className="text-red-100 text-sm mt-2">
              Select one contestant per event
            </p>
          </CardHeader>
        </Card>

        {/* Current Event */}
        <Card className="card-western border-2 border-amber-400 shadow-xl mb-6">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-amber-300">
            <CardTitle className="text-center text-xl text-stone-800">
              {currentEvent.name}
            </CardTitle>
            <p className="text-center text-stone-600 text-sm">
              Choose your contestant for this event
            </p>
          </CardHeader>
          
          <CardContent className="p-4 space-y-3 bg-gradient-to-br from-white to-amber-50">
            {currentEvent.contestants.map((contestant) => {
              const isSelected = selectedContestantId === contestant.id;
              
              return (
                <button
                  key={contestant.id}
                  onClick={() => handleContestantSelect(contestant.id, contestant.name)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${
                    isSelected 
                      ? 'border-red-600 bg-red-50 shadow-lg ring-2 ring-red-200' 
                      : 'border-stone-300 bg-white hover:border-red-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={isSelected ? "default" : "secondary"}
                          className={`font-bold ${isSelected ? 'bg-red-600' : 'bg-stone-500'}`}
                        >
                          #{contestant.rank}
                        </Badge>
                        <div>
                          <p className="font-bold text-stone-800">{contestant.name}</p>
                          <p className="text-sm text-stone-600">{contestant.winnings}</p>
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="bg-red-600 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

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
              <CardTitle className="text-lg text-stone-800">Current Picks</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selections.map((selection) => (
                  <div key={selection.eventId} className="flex justify-between items-center py-2 border-b border-stone-200">
                    <span className="text-sm font-medium text-stone-700">{selection.eventName}</span>
                    <span className="text-sm text-stone-600">{selection.contestantName}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RosterBuilder;
