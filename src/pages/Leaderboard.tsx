import PageContainer from "@/components/PageContainer";
import { useNavigation } from "@/hooks/useNavigation";
import { Clock, ChevronRight, Trophy, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/components/RosterBuilder";

// Generate randomized earnings for 150 riders based on the payout structure
const generateRandomizedLeaderboard = (totalRiders = 150, userTeamName?: string) => {
  // Create array of all riders
  const riders = Array.from({ length: totalRiders }, (_, i) => ({
    id: `team-${i + 1}`,
    rank: i + 1,
    name: `Team ${i + 1}`,
    earnings: 0,
    isCurrentUser: false,
    ridersRemaining: Math.floor(Math.random() * 11) // 0-10 riders remaining
  }));
  
  // For each team, generate 10 riders with random earnings
  riders.forEach(team => {
    let teamEarnings = 0;
    
    // Generate 10 riders per team
    for (let i = 0; i < 10; i++) {
      // Randomly determine if this rider has completed their event
      const isCompleted = Math.random() > 0.3; // 70% chance of completion
      
      if (isCompleted) {
        // Random position for this rider (1-15, with lower numbers being more rare)
        const position = Math.floor(Math.random() * 100) + 1;
        let riderEarnings = 0;
        
        // Apply earnings based on position
        if (position === 1) riderEarnings = 100000;
        else if (position <= 3) riderEarnings = 17500;
        else if (position === 4) riderEarnings = 5000;
        else if (position <= 9) riderEarnings = 500;
        // positions 10-15 earn $0
        
        teamEarnings += riderEarnings;
      }
    }
    
    team.earnings = teamEarnings;
  });
  
  // Sort by earnings (highest first)
  riders.sort((a, b) => b.earnings - a.earnings);
  
  // Re-assign ranks based on new order
  riders.forEach((rider, index) => {
    rider.rank = index + 1;
    
    // If this is the user's team, mark it
    if (userTeamName && rider.name === userTeamName) {
      rider.isCurrentUser = true;
    }
  });
  
  // If userTeamName is provided but not found, make a random team the user's team
  if (userTeamName && !riders.some(r => r.isCurrentUser)) {
    const randomIndex = Math.floor(Math.random() * 20); // Put user in top 20
    riders[randomIndex].name = userTeamName;
    riders[randomIndex].isCurrentUser = true;
  }
  
  return riders;
};

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  earnings: number;
  isCurrentUser: boolean;
  ridersRemaining: number;
}

interface LeaderboardProps {
  userTeamName?: string;
  onBackToHome?: () => void;
}

const Leaderboard = ({ userTeamName, onBackToHome }: LeaderboardProps) => {
  const { navigateTo } = useNavigation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  useEffect(() => {
    // Generate randomized leaderboard data
    const data = generateRandomizedLeaderboard(150, userTeamName);
    setLeaderboard(data);
  }, [userTeamName]);
  
  const handleViewTeam = (teamId: string, teamName: string) => {
    navigateTo(`/leaderboard-team/${teamId}`, teamName);
  };
  
  // Get user team rank if available
  const userTeam = leaderboard.find(entry => entry.isCurrentUser);
  
  return (
    <PageContainer title="Standings">
      <div className="p-4 max-w-3xl mx-auto">
        <div className="rounded-lg border-2 border-red-600 mb-6 overflow-hidden shadow-lg" role="region" aria-label="Leaderboard standings">
          <div className="bg-gradient-to-r from-red-700 to-red-600 p-4 rounded-t-lg">
            <h2 className="text-xl font-bold text-white text-center">
              Christmas in July - Standings
            </h2>
            <p className="text-center text-red-100 mt-1">
              Current Leaderboard
            </p>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-b-lg">
            {/* Header Row */}
            <div className="flex justify-between items-center px-3 py-2 mb-3 text-gray-300 text-sm font-semibold" role="rowheader">
              <div className="flex items-center">
                <span className="w-12">Rank</span>
                <span>Team</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                  <span>Riders Left</span>
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" aria-hidden="true" />
                  <span>Earnings</span>
                </span>
              </div>
            </div>
            
            {/* User Team Highlight (if not in top 20) */}
            {userTeam && userTeam.rank > 20 && (
              <div className="mb-3">
                <button 
                  className="w-full rounded-lg p-3 flex justify-between items-center bg-green-900/30 border border-green-500 hover:bg-green-900/40 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
                  onClick={() => handleViewTeam(userTeam.id, userTeam.name)}
                  aria-label={`View your team details, ranked ${userTeam.rank} with ${formatCurrency(userTeam.earnings)} earnings and ${userTeam.ridersRemaining} riders remaining`}
                >
                  {/* Left side: Rank and Team Name */}
                  <div className="flex items-center">
                    <Badge className="mr-3 font-bold w-8 flex justify-center bg-gray-600 text-white">
                      {userTeam.rank}
                    </Badge>
                    
                    <div>
                      <span className="font-bold text-green-300">{userTeam.name}</span>
                      <span className="ml-2 text-xs text-green-400">(Your Team)</span>
                    </div>
                  </div>
                  
                  {/* Right side: Riders Left and Earnings */}
                  <div className="flex items-center space-x-6">
                    <Badge className={`
                      ${userTeam.ridersRemaining > 0 ? 'bg-blue-900 text-blue-200' : 'bg-gray-700 text-gray-400'}
                    `}>
                      <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                      {userTeam.ridersRemaining}/10
                    </Badge>
                    
                    <div className="flex items-center">
                      <span className="font-bold font-mono text-green-400">{formatCurrency(userTeam.earnings)}</span>
                      <ChevronRight className="h-4 w-4 text-gray-500 ml-1" aria-hidden="true" />
                    </div>
                  </div>
                </button>
                
                <div className="text-center text-xs text-gray-500 mt-1">
                  <span>⋯</span>
                </div>
              </div>
            )}
            
            <ul className="space-y-2" role="list">
              {leaderboard.slice(0, 20).map((entry) => (
                <li 
                  key={entry.rank}
                  role="listitem"
                >
                  <button 
                    className={`
                      w-full rounded-lg p-3 flex justify-between items-center
                      ${entry.isCurrentUser 
                        ? 'bg-green-900/30 border border-green-500 hover:bg-green-900/40 focus:ring-2 focus:ring-green-500 focus:outline-none' 
                        : entry.rank <= 3 
                          ? 'bg-gray-800 border border-red-600/40 hover:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none'
                          : 'bg-gray-800 border border-gray-700 hover:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none'
                      }
                      transition-colors
                    `}
                    onClick={() => handleViewTeam(entry.id, entry.name)}
                    aria-label={`View ${entry.name}'s team details, ranked ${entry.rank} with ${formatCurrency(entry.earnings)} earnings and ${entry.ridersRemaining} riders remaining`}
                  >
                    {/* Left side: Rank and Team Name */}
                    <div className="flex items-center">
                      <Badge 
                        className={`mr-3 font-bold w-8 flex justify-center ${
                          entry.rank === 1 ? 'bg-yellow-500 text-yellow-900' : 
                          entry.rank === 2 ? 'bg-gray-300 text-gray-900' : 
                          entry.rank === 3 ? 'bg-orange-600 text-white' : 
                          'bg-gray-600 text-white'
                        }`}
                      >
                        {entry.rank}
                      </Badge>
                      
                      <div className="flex items-center">
                        {entry.rank <= 3 && (
                          <Trophy 
                            className={`h-4 w-4 mr-2 ${
                              entry.rank === 1 ? 'text-yellow-500' : 
                              entry.rank === 2 ? 'text-gray-300' : 
                              'text-orange-600'
                            }`} 
                            aria-hidden="true"
                          />
                        )}
                        
                        <span className={`font-bold ${entry.isCurrentUser ? 'text-green-300' : 'text-white'}`}>
                          {entry.name}
                        </span>
                        
                        {entry.isCurrentUser && (
                          <span className="ml-2 text-xs text-green-400">(Your Team)</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Right side: Riders Left and Earnings */}
                    <div className="flex items-center space-x-6">
                      <Badge className={`
                        ${entry.ridersRemaining > 0 ? 'bg-blue-900 text-blue-200' : 'bg-gray-700 text-gray-400'}
                      `}>
                        <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                        {entry.ridersRemaining}/10
                      </Badge>
                      
                      <div className="flex items-center">
                        <span className="font-bold font-mono text-green-400">{formatCurrency(entry.earnings)}</span>
                        <ChevronRight className="h-4 w-4 text-gray-500 ml-1" aria-hidden="true" />
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Back to Home Button */}
            {onBackToHome && (
              <div className="mt-6 text-center">
                <button 
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors"
                  onClick={onBackToHome}
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Prize Structure */}
        <div className="rounded-lg border border-red-500 bg-gray-900 p-4 shadow-md">
          <div className="flex items-center mb-3">
            <Trophy className="h-5 w-5 text-amber-400 mr-2" aria-hidden="true" />
            <h3 className="text-lg font-bold text-white">Prize Structure</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white">1st Place:</span>
              <span className="text-amber-400 font-semibold">2024 Ram 1500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">2nd Place:</span>
              <span className="text-amber-400 font-semibold">$15,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">3rd Place:</span>
              <span className="text-amber-400 font-semibold">$10,000</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center mb-2">
              <DollarSign className="h-4 w-4 text-green-400 mr-2" aria-hidden="true" />
              <h4 className="text-sm font-semibold text-white">Rider Earnings Structure</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-300">1st Place:</span>
                <span className="text-green-400">$100,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">2nd-3rd Place:</span>
                <span className="text-green-400">$17,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">4th Place:</span>
                <span className="text-green-400">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">5th-9th Place:</span>
                <span className="text-green-400">$500</span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-gray-300">10th-15th Place:</span>
                <span className="text-gray-400">$0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Leaderboard; 