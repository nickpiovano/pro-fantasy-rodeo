import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Event, Contestant } from '@/pages/Index';
import contestService from '@/services/contest';
import { formatSalary } from '@/services/contest';

interface EventCardProps {
  event: Event;
  selectedContestantId: string | null;
  onContestantSelect: (contestantId: string, contestantName: string, salary: number) => void;
  className?: string;
}

const EventCard = ({ 
  event, 
  selectedContestantId, 
  onContestantSelect,
  className 
}: EventCardProps) => {
  console.log("EventCard received event:", event);
  
  // Add defensive check for event
  if (!event || !event.contestants) {
    return (
      <Card className={`card-western border-2 border-amber-400 shadow-xl ${className || ''}`}>
        <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-amber-300 py-3">
          <CardTitle className="text-center text-lg text-stone-800">
            Event not available
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 bg-gradient-to-br from-white to-amber-50">
          <p className="text-center text-stone-600">Unable to load event data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`card-western border-2 border-amber-400 shadow-xl ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-amber-300 py-3">
        <CardTitle className="text-center text-lg text-stone-800">
          {event.name}
        </CardTitle>
        <p className="text-center text-stone-600 text-xs">
          Choose your contestant for this event
        </p>
      </CardHeader>
      
      <CardContent className="p-3 bg-gradient-to-br from-white to-amber-50 max-h-[500px] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {event.contestants.map((contestant) => {
            if (!contestant) return null;
            const isSelected = selectedContestantId === contestant.id;
            
            return (
              <button
                key={contestant.id}
                onClick={() => onContestantSelect(contestant.id, contestant.name, contestant.salary || 0)}
                className={`w-full p-2 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${
                  isSelected 
                    ? 'border-red-600 bg-red-50 shadow-lg ring-2 ring-red-200' 
                    : 'border-stone-300 bg-white hover:border-red-400 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={isSelected ? "default" : "secondary"}
                        className={`font-bold text-xs ${isSelected ? 'bg-red-600' : 'bg-stone-500'}`}
                      >
                        #{contestant.rank || 0}
                      </Badge>
                      <div>
                        <p className="font-bold text-stone-800 text-sm">{contestant.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-red-600">
                            {formatSalary(contestant.salary)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="bg-red-600 text-white rounded-full p-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard; 