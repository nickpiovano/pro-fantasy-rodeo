import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigation } from '@/hooks/useNavigation';

interface LeaderboardProps {
  userTeamName?: string;
  onBackToHome: () => void;
}

// Mock leaderboard data with riders remaining
const mockLeaderboard = [
  { id: "team-1", rank: 1, teamName: "Rodeo Rebels", score: 1247, user: "CowboyMike", ridersRemaining: 3 },
  { id: "team-2", rank: 2, teamName: "Bull Riders United", score: 1198, user: "RodeoQueen22", ridersRemaining: 2 },
  { id: "team-3", rank: 3, teamName: "Bronc Busters", score: 1156, user: "WranglerWilly", ridersRemaining: 4 },
  { id: "team-4", rank: 4, teamName: "Lasso Legends", score: 1134, user: "BarrelRacer99", ridersRemaining: 1 },
  { id: "team-5", rank: 5, teamName: "Cheyenne Champions", score: 1089, user: "SteerWrestler", ridersRemaining: 5 },
  { id: "team-6", rank: 6, teamName: "Prairie Pioneers", score: 1067, user: "RopeRider", ridersRemaining: 2 },
  { id: "team-7", rank: 7, teamName: "Mustang Masters", score: 1045, user: "BroncoBreaker", ridersRemaining: 3 },
  { id: "team-8", rank: 8, teamName: "Cowboy Crusaders", score: 1023, user: "RodeoRanger", ridersRemaining: 0 },
  { id: "team-9", rank: 9, teamName: "Stampede Squad", score: 998, user: "BullRider88", ridersRemaining: 4 },
  { id: "team-10", rank: 10, teamName: "Saddle Stars", score: 976, user: "WesternWild", ridersRemaining: 2 }
];

const Leaderboard = ({ userTeamName, onBackToHome }: LeaderboardProps) => {
  const { navigateTo } = useNavigation();
  
  // Find user's team (simulate user being ranked 12th if their team isn't in top 10)
  const userTeam = userTeamName ? {
    id: "user-team",
    rank: 12,
    teamName: userTeamName,
    score: 934,
    user: "You",
    isCurrentUser: true,
    ridersRemaining: 3
  } : null;

  const handleViewTeam = (teamId: string, teamName: string) => {
    navigateTo(`/team/${teamId}`, teamName);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto animate-fade-in">
        {/* Header */}
        <Card className="card-western border-2 border-red-600 mb-6">
          <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white">
            <CardTitle className="text-center text-2xl">
              Christmas in July
            </CardTitle>
            <p className="text-center text-red-100 mt-1">
              Current Leaderboard
            </p>
          </CardHeader>
        </Card>

        {/* Live Updates Notice */}
        <Card className="card-western border border-red-400 mb-6">
          <CardContent className="p-4 bg-gray-900 text-center">
            <Badge className="bg-green-600 text-white mb-2">
              LIVE SCORING
            </Badge>
            <p className="text-gray-300 text-sm">
              Scores update daily based on PRCA results. Next update: Tonight at 11 PM CT
            </p>
          </CardContent>
        </Card>

        {/* Leaderboard Legend */}
        <div className="flex justify-between text-xs text-gray-400 px-2 mb-2">
          <div>Rank / Team</div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Riders Remaining</span>
          </div>
          <div>Score</div>
        </div>

        {/* Top 10 Leaderboard */}
        <Card className="card-western border-2 border-gray-700 mb-6">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
            <CardTitle className="text-lg text-white">
              Top 10 Teams
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-gray-900">
            <div className="space-y-2">
              {mockLeaderboard.map((team) => (
                <div
                  key={team.rank}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    team.rank <= 3
                      ? 'border-red-600 bg-gray-800'
                      : 'border-gray-700 bg-gray-800'
                  } hover:border-red-500 transition-colors cursor-pointer`}
                  onClick={() => handleViewTeam(team.id, team.teamName)}
                >
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`font-bold min-w-[32px] ${
                        team.rank === 1
                          ? 'bg-yellow-500 text-yellow-900'
                          : team.rank === 2
                          ? 'bg-gray-400 text-gray-900'
                          : team.rank === 3
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      {team.rank}
                    </Badge>
                    <div>
                      <p className="font-semibold text-white">{team.teamName}</p>
                      <p className="text-xs text-gray-400">{team.user}</p>
                    </div>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Badge className={`
                            ${team.ridersRemaining > 0 ? 'bg-blue-900 text-blue-200' : 'bg-gray-700 text-gray-400'}
                          `}>
                            <Clock className="h-3 w-3 mr-1" />
                            {team.ridersRemaining}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{team.ridersRemaining} riders still to perform</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <div className="flex items-center">
                    <div className="text-right mr-2">
                      <p className="font-bold text-white">{team.score.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">points</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User's Team (if not in top 10) */}
        {userTeam && (
          <Card className="card-western border-2 border-green-600 mb-6">
            <CardHeader className="bg-gradient-to-r from-green-900 to-green-800">
              <CardTitle className="text-lg text-white">
                Your Team
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-gray-900">
              <div 
                className="flex items-center justify-between p-3 rounded-lg border-2 border-green-600 bg-gray-800 hover:border-green-500 transition-colors cursor-pointer"
                onClick={() => handleViewTeam(userTeam.id, userTeam.teamName)}
              >
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-600 text-white font-bold min-w-[32px]">
                    {userTeam.rank}
                  </Badge>
                  <div>
                    <p className="font-semibold text-white">{userTeam.teamName}</p>
                    <p className="text-xs text-green-400 font-medium">Your Team</p>
                  </div>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <Badge className="bg-blue-900 text-blue-200">
                          <Clock className="h-3 w-3 mr-1" />
                          {userTeam.ridersRemaining}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{userTeam.ridersRemaining} riders still to perform</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="flex items-center">
                  <div className="text-right mr-2">
                    <p className="font-bold text-white">{userTeam.score.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">points</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-green-400">
                  You're {userTeam.rank - 3} spots away from prize money!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prize Reminder */}
        <Card className="card-western border-2 border-red-500 mb-6">
          <CardHeader className="bg-gradient-to-r from-red-800 to-red-700">
            <CardTitle className="text-center text-lg text-white">
              Prize Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-gray-900">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-gray-700">
                <span className="font-semibold text-white">1st Place</span>
                <span className="text-red-400 font-bold">2024 Ram 1500</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-700">
                <span className="font-semibold text-white">2nd Place</span>
                <span className="text-red-400 font-bold">$15,000</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-700">
                <span className="font-semibold text-white">3rd Place</span>
                <span className="text-red-400 font-bold">$10,000</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-white">4th-20th</span>
                <span className="text-red-400 font-bold">$35,000 Total</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="w-full py-3 border-2 border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Contest Info */}
        <div className="text-center mt-6 text-xs text-gray-400 space-y-1">
          <p>Contest ends July 31st, 2024 • Winners announced August 5th</p>
          <p>Scores based on official PRCA results • Updated daily at 11 PM CT</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

