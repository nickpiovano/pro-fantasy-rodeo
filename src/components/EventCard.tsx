import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Event, Contestant } from '@/pages/Index';

interface EventCardProps {
  event: Event;
  selectedContestantId: string | null;
  onContestantSelect: (contestantId: string, contestantName: string) => void;
  className?: string;
}

const EventCard = ({ 
  event, 
  selectedContestantId, 
  onContestantSelect,
  className 
}: EventCardProps) => {
  return (
    <Card className={`card-western border-2 border-amber-400 shadow-xl ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-amber-300">
        <CardTitle className="text-center text-xl text-stone-800">
          {event.name}
        </CardTitle>
        <p className="text-center text-stone-600 text-sm">
          Choose your contestant for this event
        </p>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3 bg-gradient-to-br from-white to-amber-50">
        {event.contestants.map((contestant) => {
          const isSelected = selectedContestantId === contestant.id;
          
          return (
            <button
              key={contestant.id}
              onClick={() => onContestantSelect(contestant.id, contestant.name)}
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
  );
};

export default EventCard; 