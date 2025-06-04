import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigation } from '@/hooks/useNavigation';
import PageContainer from '@/components/PageContainer';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button-new';
import { 
  Trophy, Calendar, Clock, Users, DollarSign, 
  Share2, ChevronLeft, ArrowUp, ArrowDown, 
  Award, Info, Star
} from 'lucide-react';

// Define types
interface Rider {
  name: string;
  event: string;
  score: number;
  status: 'completed' | 'upcoming';
  position?: number;
}

interface Team {
  id: string;
  teamName: string;
  contestName: string;
  contestDate: string;
  endDate: string;
  position: number;
  totalEntries: number;
  earnings: number;
  status: 'active' | 'completed';
  ridersRemaining: number;
  riders: Rider[];
  positionChange?: number;
  owner?: string;
  location?: string;
}

// Mock data for demonstration
const mockTeams: Record<string, Team> = {
  "lb-team-1": {
    id: "lb-team-1",
    teamName: "Buckin' Broncos",
    contestName: "Christmas in July",
    contestDate: "June 15, 2025",
    endDate: "July 1, 2025",
    position: 1,
    totalEntries: 5942,
    earnings: 650000,
    status: "active",
    ridersRemaining: 0,
    positionChange: 0,
    owner: "John Smith",
    location: "Dallas, TX",
    riders: [
      { name: "Tanner Aus", event: "Bareback Riding", score: 92, status: "completed", position: 1 },
      { name: "Kaycee Feild", event: "Bareback Riding", score: 90, status: "completed", position: 1 },
      { name: "Tim O'Connell", event: "Bareback Riding", score: 88, status: "completed", position: 1 },
      { name: "Clayton Biglow", event: "Bareback Riding", score: 86, status: "completed", position: 2 },
      { name: "Caleb Bennett", event: "Bareback Riding", score: 85, status: "completed", position: 2 },
      { name: "Jess Pope", event: "Bareback Riding", score: 84, status: "completed", position: 3 },
      { name: "Cole Reiner", event: "Bareback Riding", score: 82, status: "completed", position: 4 },
      { name: "Tilden Hooper", event: "Bareback Riding", score: 80, status: "completed", position: 5 },
      { name: "Richmond Champion", event: "Bareback Riding", score: 78, status: "completed", position: 6 },
      { name: "Orin Larsen", event: "Bareback Riding", score: 76, status: "completed", position: 7 }
    ]
  },
  "lb-team-2": {
    id: "lb-team-2",
    teamName: "Rodeo Kings",
    contestName: "Christmas in July",
    contestDate: "June 15, 2025",
    endDate: "July 1, 2025",
    position: 2,
    totalEntries: 5942,
    earnings: 520000,
    status: "active",
    ridersRemaining: 1,
    positionChange: 1,
    owner: "Sarah Johnson",
    location: "Houston, TX",
    riders: [
      { name: "Sage Kimzey", event: "Bull Riding", score: 91, status: "completed", position: 1 },
      { name: "Stetson Wright", event: "Saddle Bronc", score: 89, status: "completed", position: 1 },
      { name: "Zeke Thurston", event: "Saddle Bronc", score: 87, status: "completed", position: 2 },
      { name: "Ryder Wright", event: "Saddle Bronc", score: 85, status: "completed", position: 2 },
      { name: "Tuf Cooper", event: "Tie-Down Roping", score: 83, status: "completed", position: 3 },
      { name: "Shane Hanchey", event: "Tie-Down Roping", score: 81, status: "completed", position: 4 },
      { name: "Tyler Waguespack", event: "Steer Wrestling", score: 79, status: "completed", position: 5 },
      { name: "Shad Mayfield", event: "Tie-Down Roping", score: 77, status: "completed", position: 6 },
      { name: "Will Lummus", event: "Steer Wrestling", score: 0, status: "upcoming" },
      { name: "Jacob Talley", event: "Steer Wrestling", score: 75, status: "completed", position: 7 }
    ]
  },
  "lb-team-3": {
    id: "lb-team-3",
    teamName: "Cowboy Crew",
    contestName: "Christmas in July",
    contestDate: "June 15, 2025",
    endDate: "July 1, 2025",
    position: 3,
    totalEntries: 5942,
    earnings: 480000,
    status: "active",
    ridersRemaining: 0,
    positionChange: -1,
    owner: "Mike Williams",
    location: "Cheyenne, WY",
    riders: [
      { name: "Caleb Smidt", event: "Tie-Down Roping", score: 90, status: "completed", position: 1 },
      { name: "Haven Meged", event: "Tie-Down Roping", score: 88, status: "completed", position: 1 },
      { name: "Marty Yates", event: "Tie-Down Roping", score: 86, status: "completed", position: 2 },
      { name: "Riley Pruitt", event: "Tie-Down Roping", score: 84, status: "completed", position: 3 },
      { name: "Ty Harris", event: "Tie-Down Roping", score: 82, status: "completed", position: 4 },
      { name: "Hunter Herrin", event: "Tie-Down Roping", score: 80, status: "completed", position: 5 },
      { name: "Timber Moore", event: "Tie-Down Roping", score: 78, status: "completed", position: 6 },
      { name: "Cory Solomon", event: "Tie-Down Roping", score: 76, status: "completed", position: 7 },
      { name: "Ryan Jarrett", event: "Tie-Down Roping", score: 74, status: "completed", position: 8 },
      { name: "Westyn Hughes", event: "Tie-Down Roping", score: 72, status: "completed", position: 9 }
    ]
  },
  "default": {
    id: "default",
    teamName: "Top Competitor",
    contestName: "Current Contest",
    contestDate: "June 15, 2025",
    endDate: "July 1, 2025",
    position: 5,
    totalEntries: 4500,
    earnings: 425000,
    status: "active",
    ridersRemaining: 2,
    positionChange: 3,
    owner: "Anonymous Rider",
    location: "Las Vegas, NV",
    riders: [
      { name: "Tanner Aus", event: "Bareback Riding", score: 90, status: "completed", position: 1 },
      { name: "Kaycee Feild", event: "Bareback Riding", score: 87, status: "completed", position: 2 },
      { name: "Tim O'Connell", event: "Bareback Riding", score: 85, status: "completed", position: 3 },
      { name: "Clayton Biglow", event: "Bareback Riding", score: 82, status: "completed", position: 4 },
      { name: "Caleb Bennett", event: "Bareback Riding", score: 80, status: "completed", position: 5 },
      { name: "Jess Pope", event: "Bareback Riding", score: 78, status: "completed", position: 6 },
      { name: "Cole Reiner", event: "Bareback Riding", score: 76, status: "completed", position: 7 },
      { name: "Tilden Hooper", event: "Bareback Riding", score: 0, status: "upcoming" },
      { name: "Richmond Champion", event: "Bareback Riding", score: 0, status: "upcoming" },
      { name: "Orin Larsen", event: "Bareback Riding", score: 74, status: "completed", position: 8 }
    ]
  }
};

const LeaderboardTeamDetail = () => {
  const { teamId = 'default' } = useParams<{ teamId: string }>();
  const { navigateTo } = useNavigation();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    // In a real app, we would fetch the team data from an API
    // For now, we'll use the mock data
    setTeam(mockTeams[teamId] || mockTeams.default);
  }, [teamId]);

  if (!team) {
    return (
      <PageContainer title="Team Details">
        <div className="p-4 flex justify-center items-center h-full">
          <p className="text-white">Loading team details...</p>
        </div>
      </PageContainer>
    );
  }

  // Helper function to format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };
  
  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Convert score to earnings based on position
  const getEarningsFromPosition = (position?: number): number => {
    if (!position) return 0;
    if (position === 1) return 100000; // 1st place
    if (position <= 3) return 17500;  // 2nd-3rd place
    if (position === 4) return 5000;   // 4th place
    if (position <= 9) return 500;    // 5th-9th place
    return 0;                        // 10th-15th place
  };

  // Sort riders by earnings (completed first, then pending)
  const getSortedRiders = (riders: Rider[]): Rider[] => {
    return [...riders].sort((a, b) => {
      // First sort by status (completed first)
      if (a.status === 'completed' && b.status === 'upcoming') return -1;
      if (a.status === 'upcoming' && b.status === 'completed') return 1;
      
      // Then sort by earnings (higher earnings first)
      if (a.status === 'completed' && b.status === 'completed') {
        const aEarnings = getEarningsFromPosition(a.position);
        const bEarnings = getEarningsFromPosition(b.position);
        return bEarnings - aEarnings;
      }
      
      // Keep original order for pending riders
      return 0;
    });
  };

  // Calculate total earnings
  const totalEarnings = team.riders
    .filter(rider => rider.status === 'completed')
    .reduce((total, rider) => total + getEarningsFromPosition(rider.position), 0);

  // Calculate statistics
  const completedRiders = team.riders.filter(rider => rider.status === 'completed').length;
  const pendingRiders = team.riders.filter(rider => rider.status === 'upcoming').length;
  const ridersWithEarnings = team.riders.filter(rider => rider.status === 'completed' && (rider.position || 0) <= 9).length;
  
  // Get position display with ordinal suffix
  const getOrdinal = (position: number): string => {
    if (position === 1) return '1st';
    if (position === 2) return '2nd';
    if (position === 3) return '3rd';
    return `${position}th`;
  };
  
  return (
    <PageContainer title={`${team.teamName} - ${team.contestName}`}>
      <div className="p-4 max-w-4xl mx-auto">
        {/* Team Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white mb-4"
            leftIcon={<ChevronLeft className="h-4 w-4" />}
            onClick={() => navigateTo('/leaderboard', 'Leaderboard')}
          >
            Back to Leaderboard
          </Button>
          
          <Card className="border-2 border-gray-700 overflow-hidden rounded-lg bg-gray-900">
            <CardHeader className="bg-gray-900 border-b border-gray-700 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-white">{team.teamName}</CardTitle>
                    {team.position <= 3 && (
                      <Trophy className={`h-5 w-5 ${
                        team.position === 1 ? 'text-yellow-500' :
                        team.position === 2 ? 'text-gray-300' :
                        'text-orange-600'
                      }`} />
                    )}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{team.contestName} • {team.contestDate} - {team.endDate}</span>
                  </div>
                </div>
                <Badge className={`
                  ${team.position === 1 ? 'bg-yellow-500 text-yellow-900' : 
                    team.position === 2 ? 'bg-gray-300 text-gray-900' : 
                    team.position === 3 ? 'bg-orange-600 text-white' : 
                    team.position <= 10 ? 'bg-green-700 text-white' : 
                    'bg-gray-700 text-gray-300'}
                `}>
                  {getOrdinal(team.position)} Place
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 bg-gray-900">
              {/* Team Owner Info */}
              {(team.owner || team.location) && (
                <div className="mb-6 p-3 bg-gray-800 rounded-lg border border-gray-700 flex items-center">
                  <Star className="h-5 w-5 text-amber-400 mr-3" />
                  <div>
                    {team.owner && (
                      <p className="text-white font-medium">Owner: {team.owner}</p>
                    )}
                    {team.location && (
                      <p className="text-gray-400 text-sm">Location: {team.location}</p>
                    )}
                  </div>
                </div>
              )}
            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Current Position</p>
                  <div className="flex items-center justify-center">
                    <p className="text-2xl font-bold text-white">
                      {team.position}
                      <span className="text-sm text-gray-400 ml-1">/ {formatNumber(team.totalEntries)}</span>
                    </p>
                    {team.positionChange !== undefined && (
                      <div className={`ml-2 ${team.positionChange < 0 ? 'text-green-400' : team.positionChange > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        {team.positionChange < 0 ? (
                          <ArrowUp className="h-5 w-5" />
                        ) : team.positionChange > 0 ? (
                          <ArrowDown className="h-5 w-5" />
                        ) : null}
                        <span className="text-xs font-medium">{Math.abs(team.positionChange)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-400">
                    {formatCurrency(totalEarnings)}
                  </p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Riders Remaining</p>
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-2 text-green-400" />
                    <p className="text-2xl font-bold text-green-400">{pendingRiders}/10</p>
                  </div>
                </div>
              </div>
              
              {/* Team Statistics */}
              <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Award className="h-5 w-5 text-amber-400 mr-2" />
                  Team Statistics
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Completed Riders</p>
                    <p className="text-lg font-bold text-white">{completedRiders}/10</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Riders with Earnings</p>
                    <p className="text-lg font-bold text-green-400">{ridersWithEarnings}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Average Earnings</p>
                    <p className="text-lg font-bold text-green-400">
                      {completedRiders > 0 ? formatCurrency(totalEarnings / completedRiders) : '$0'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Top Placement</p>
                    <p className="text-lg font-bold text-amber-400">
                      {team.riders.some(r => r.position === 1) ? '1st' : 
                       team.riders.some(r => r.position === 2) ? '2nd' : 
                       team.riders.some(r => r.position === 3) ? '3rd' : 
                       team.riders.some(r => r.position !== undefined) ? `${Math.min(...team.riders.filter(r => r.position !== undefined).map(r => r.position as number))}th` : 
                       'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Complete Team Roster */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Users className="h-5 w-5 text-red-400 mr-2" />
                  Complete Team Roster
                </h3>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <div className="grid grid-cols-12 text-xs text-gray-300 p-3 border-b border-gray-700 bg-gray-800/50">
                    <div className="col-span-4 font-semibold">Rider</div>
                    <div className="col-span-3 font-semibold">Event</div>
                    <div className="col-span-2 text-center font-semibold">Position</div>
                    <div className="col-span-3 text-right font-semibold">Earnings</div>
                  </div>
                  
                  <div className="divide-y divide-gray-700">
                    {getSortedRiders(team.riders).map((rider, index) => (
                      <div key={index} className="grid grid-cols-12 p-3 items-center">
                        <div className="col-span-4 font-medium text-white">{rider.name}</div>
                        <div className="col-span-3 text-sm text-gray-300">{rider.event}</div>
                        <div className="col-span-2 text-center">
                          {rider.status === 'completed' ? (
                            <Badge className={`
                              ${rider.position === 1 ? 'bg-yellow-500 text-yellow-900' : 
                                rider.position === 2 ? 'bg-gray-300 text-gray-900' : 
                                rider.position === 3 ? 'bg-orange-600 text-white' : 
                                rider.position && rider.position <= 9 ? 'bg-green-700 text-white' : 
                                'bg-gray-700 text-gray-300'}
                            `}>
                              {rider.position === 1 ? '1st' : 
                               rider.position === 2 ? '2nd' : 
                               rider.position === 3 ? '3rd' : 
                               rider.position ? `${rider.position}th` : '-'}
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-900 text-blue-200">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                        <div className="col-span-3 text-right">
                          {rider.status === 'completed' ? (
                            <span className="font-bold text-green-400">
                              {formatCurrency(getEarningsFromPosition(rider.position))}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Earnings Breakdown */}
              <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                  Earnings Breakdown
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">1st Place Riders:</span>
                    <span className="text-green-400 font-semibold">
                      {team.riders.filter(r => r.position === 1).length} × $100,000
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">2nd-3rd Place:</span>
                    <span className="text-green-400 font-semibold">
                      {team.riders.filter(r => r.position === 2 || r.position === 3).length} × $17,500
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">4th Place:</span>
                    <span className="text-green-400 font-semibold">
                      {team.riders.filter(r => r.position === 4).length} × $5,000
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">5th-9th Place:</span>
                    <span className="text-green-400 font-semibold">
                      {team.riders.filter(r => r.position && r.position >= 5 && r.position <= 9).length} × $500
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
                  <span className="text-white font-bold">Total Earnings:</span>
                  <span className="text-green-400 font-bold">{formatCurrency(totalEarnings)}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-gray-800"
                  leftIcon={<Share2 className="h-4 w-4" />}
                >
                  Share Team
                </Button>
                
                <Button 
                  variant="primary"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => navigateTo('/roster-builder', 'Build Your Team')}
                >
                  Create Similar Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Earnings Structure Reminder */}
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 mb-6">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 text-blue-400 mr-2" />
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
        
        {/* Contest Rules */}
        <div className="text-center text-gray-500 text-xs">
          <p>Contest rules and prize details available at <a href="#" className="text-red-400 hover:text-red-300 underline">profantasyrodeo.com/rules</a></p>
        </div>
      </div>
    </PageContainer>
  );
};

export default LeaderboardTeamDetail; 