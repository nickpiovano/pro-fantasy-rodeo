import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import type { TeamSelection } from '@/pages/Index';

interface TeamSummaryProps {
  teamSelections: TeamSelection[];
  onEditTeam?: () => void;
  className?: string;
  showEditButton?: boolean;
}

const TeamSummary = ({ 
  teamSelections, 
  onEditTeam, 
  className,
  showEditButton = true 
}: TeamSummaryProps) => {
  // Group selections by event name for better display
  const sortedSelections = [...teamSelections].sort((a, b) => a.eventName.localeCompare(b.eventName));

  return (
    <Card className={`card-western border-2 border-amber-400 ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-amber-300 flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-stone-800">Your Team</CardTitle>
        {showEditButton && onEditTeam && (
          <Button 
            onClick={onEditTeam} 
            variant="outline" 
            className="border-2 border-stone-400 text-stone-700 hover:bg-stone-100"
            size="sm"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit Team
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 bg-gradient-to-br from-white to-amber-50">
        {teamSelections.length > 0 ? (
          <div className="space-y-3">
            {sortedSelections.map((selection) => (
              <div 
                key={selection.eventId} 
                className="flex justify-between py-2 border-b border-amber-200 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-600">{selection.eventName}</p>
                  <p className="font-bold text-stone-900">{selection.contestantName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-stone-500 py-4">No contestants selected</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamSummary; 