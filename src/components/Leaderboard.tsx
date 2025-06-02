import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface LeaderboardProps {
  userTeamName?: string;
  onBackToHome: () => void;
}

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, teamName: "Rodeo Rebels", score: 1247, user: "CowboyMike" },
  { rank: 2, teamName: "Bull Riders United", score: 1198, user: "RodeoQueen22" },
  { rank: 3, teamName: "Bronc Busters", score: 1156, user: "WranglerWilly" },
  { rank: 4, teamName: "Lasso Legends", score: 1134, user: "BarrelRacer99" },
  { rank: 5, teamName: "Cheyenne Champions", score: 1089, user: "SteerWrestler" },
  { rank: 6, teamName: "Prairie Pioneers", score: 1067, user: "RopeRider" },
  { rank: 7, teamName: "Mustang Masters", score: 1045, user: "BroncoBreaker" },
  { rank: 8, teamName: "Cowboy Crusaders", score: 1023, user: "RodeoRanger" },
  { rank: 9, teamName: "Stampede Squad", score: 998, user: "BullRider88" },
  { rank: 10, teamName: "Saddle Stars", score: 976, user: "WesternWild" }
];

const Leaderboard = ({ userTeamName, onBackToHome }: LeaderboardProps) => {
  // Find user's team (simulate user being ranked 12th if their team isn't in top 10)
  const userTeam = userTeamName ? {
    rank: 12,
    teamName: userTeamName,
    score: 934,
    user: "You",
    isCurrentUser: true
  } : null;

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
        <Card className="card-western border border-amber-400 mb-6">
          <CardContent className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 text-center">
            <Badge className="bg-green-600 text-white mb-2">
              LIVE SCORING
            </Badge>
            <p className="text-stone-700 text-sm">
              Scores update daily based on PRCA results. Next update: Tonight at 11 PM CT
            </p>
          </CardContent>
        </Card>

        {/* Top 10 Leaderboard */}
        <Card className="card-western border-2 border-amber-400 mb-6">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="text-lg text-stone-800">
              Top 10 Teams
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-gradient-to-br from-white to-amber-50">
            <div className="space-y-2">
              {mockLeaderboard.map((team) => (
                <div
                  key={team.rank}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    team.rank <= 3
                      ? 'border-red-300 bg-red-50'
                      : 'border-stone-200 bg-white'
                  }`}
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
                          : 'bg-stone-500 text-white'
                      }`}
                    >
                      {team.rank}
                    </Badge>
                    <div>
                      <p className="font-semibold text-stone-800">{team.teamName}</p>
                      <p className="text-xs text-stone-600">{team.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-stone-800">{team.score.toLocaleString()}</p>
                    <p className="text-xs text-stone-600">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User's Team (if not in top 10) */}
        {userTeam && (
          <Card className="card-western border-2 border-green-500 mb-6">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
              <CardTitle className="text-lg text-stone-800">
                Your Team
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-center justify-between p-3 rounded-lg border-2 border-green-300 bg-green-100">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-600 text-white font-bold min-w-[32px]">
                    {userTeam.rank}
                  </Badge>
                  <div>
                    <p className="font-semibold text-stone-800">{userTeam.teamName}</p>
                    <p className="text-xs text-green-700 font-medium">Your Team</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-800">{userTeam.score.toLocaleString()}</p>
                  <p className="text-xs text-stone-600">points</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-stone-600">
                  You're {userTeam.rank - 3} spots away from prize money!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prize Reminder */}
        <Card className="card-western border-2 border-red-500 mb-6">
          <CardContent className="p-4 bg-gradient-to-r from-red-50 to-pink-50">
            <h3 className="text-center text-lg font-bold text-red-700 mb-3">Prize Structure</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-red-200">
                <span className="font-semibold text-stone-700">1st Place</span>
                <span className="text-red-700 font-bold">2024 Ram 1500</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-red-200">
                <span className="font-semibold text-stone-700">2nd Place</span>
                <span className="text-red-700 font-bold">$15,000</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-red-200">
                <span className="font-semibold text-stone-700">3rd Place</span>
                <span className="text-red-700 font-bold">$10,000</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-stone-700">4th-20th</span>
                <span className="text-red-700 font-bold">$35,000 Total</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="w-full py-3 border-2 border-stone-400 text-stone-700 hover:bg-stone-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Contest Info */}
        <div className="text-center mt-6 text-xs text-white space-y-1">
          <p>Contest ends July 31st, 2024 • Winners announced August 5th</p>
          <p>Scores based on official PRCA results • Updated daily at 11 PM CT</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
