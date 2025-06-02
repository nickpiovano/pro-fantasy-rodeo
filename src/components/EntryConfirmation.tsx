
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { User, TeamSelection } from '@/pages/Index';

interface EntryConfirmationProps {
  user: User;
  teamSelections: TeamSelection[];
  onViewLeaderboard: () => void;
  onBackToHome: () => void;
}

const EntryConfirmation = ({ user, teamSelections, onViewLeaderboard, onBackToHome }: EntryConfirmationProps) => {
  return (
    <div className="min-h-screen px-4 py-8 flex items-center justify-center">
      <div className="max-w-md mx-auto animate-scale-in">
        {/* Success Header */}
        <Card className="card-western border-4 border-green-500 shadow-2xl mb-6">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center">
            <div className="mb-4">
              <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">You're In!</h1>
              <p className="text-green-100 text-lg">
                Entry successfully submitted
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 text-center">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-stone-800 mb-2">{user.teamName}</h2>
                <p className="text-stone-600">
                  Your team is locked and loaded for Christmas in July!
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <p className="text-stone-700 font-semibold mb-2">What happens next?</p>
                <ul className="text-sm text-stone-600 space-y-1 text-left">
                  <li>• Contest runs through July 31st, 2024</li>
                  <li>• Scores update daily based on PRCA results</li>
                  <li>• Winners announced August 5th, 2024</li>
                  <li>• Track your progress on the leaderboard</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Summary */}
        <Card className="card-western border-2 border-amber-400 mb-6">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="text-lg text-stone-800 text-center">
              Your Final Team
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-gradient-to-br from-white to-amber-50">
            <div className="space-y-2">
              {teamSelections.map((selection, index) => (
                <div key={selection.eventId} className="flex items-center justify-between p-2 bg-white rounded border border-stone-200">
                  <div>
                    <p className="font-medium text-stone-800 text-sm">{selection.eventName}</p>
                    <p className="text-stone-600 text-xs">{selection.contestantName}</p>
                  </div>
                  <Badge className="bg-red-600 text-white text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prize Reminder */}
        <Card className="card-western border-2 border-red-500 mb-6">
          <CardContent className="p-4 bg-gradient-to-r from-red-50 to-pink-50 text-center">
            <h3 className="text-lg font-bold text-red-700 mb-2">Playing For</h3>
            <p className="text-2xl font-bold text-red-800 mb-1">2024 Ram 1500</p>
            <p className="text-red-600 font-semibold">+ $60,000 Cash Prizes</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onViewLeaderboard}
            className="btn-rodeo w-full text-lg py-4"
          >
            View Leaderboard
          </Button>
          
          <Button
            onClick={onBackToHome}
            variant="outline"
            className="w-full py-3 border-2 border-stone-400 text-stone-700 hover:bg-stone-100"
          >
            Back to Home
          </Button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-6 text-xs text-stone-500">
          <p>Questions? Contact support@profantasyrodeo.com</p>
          <p className="mt-1">Good luck, cowboy! 🤠</p>
        </div>
      </div>
    </div>
  );
};

export default EntryConfirmation;
