import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import PageContainer from "@/components/PageContainer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-new";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, ChevronRight, Plus, Clock, Users, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

// Define types for the data
interface Rider {
  name: string;
  event: string;
  score: number;
  status: 'completed' | 'upcoming';
}

interface Team {
  id: string;
  contestName: string;
  contestDate: string;
  endDate: string;
  position: number;
  totalEntries: number;
  score: number;
  status: 'active' | 'completed';
  winnings: number;
  ridersRemaining: number;
  riders: Rider[];
}

// Mock team data with more realistic earnings
const mockTeams: Team[] = [
  {
    id: "team-1",
    contestName: "Christmas in July",
    contestDate: "June 15, 2025",
    endDate: "July 1, 2025",
    position: 42,
    totalEntries: 5942,
    score: 450,
    status: "active",
    winnings: 0,
    ridersRemaining: 3,
    riders: [
      { name: "Tanner Aus", event: "Bareback Riding", score: 85, status: "completed" },
      { name: "Kaycee Feild", event: "Bareback Riding", score: 78, status: "completed" },
      { name: "Tim O'Connell", event: "Bareback Riding", score: 0, status: "upcoming" },
      { name: "Clayton Biglow", event: "Bareback Riding", score: 82, status: "completed" },
      { name: "Caleb Bennett", event: "Bareback Riding", score: 0, status: "upcoming" },
      { name: "Jess Pope", event: "Bareback Riding", score: 0, status: "upcoming" },
      { name: "Cole Reiner", event: "Bareback Riding", score: 88, status: "completed" },
      { name: "Tilden Hooper", event: "Bareback Riding", score: 76, status: "completed" },
      { name: "Richmond Champion", event: "Bareback Riding", score: 81, status: "completed" },
      { name: "Orin Larsen", event: "Bareback Riding", score: 60, status: "completed" }
    ]
  },
  {
    id: "team-2",
    contestName: "Memorial Day Classic",
    contestDate: "May 27, 2025",
    endDate: "May 31, 2025",
    position: 156,
    totalEntries: 3241,
    score: 235000, // Updated to more realistic earnings
    status: "completed",
    winnings: 0,
    ridersRemaining: 0,
    riders: []
  },
  {
    id: "team-3",
    contestName: "Spring Showdown",
    contestDate: "April 15, 2025",
    endDate: "April 20, 2025",
    position: 23,
    totalEntries: 2850,
    score: 412500, // Updated to more realistic earnings
    status: "completed",
    winnings: 10000,
    ridersRemaining: 0,
    riders: []
  }
];

const Teams = () => {
  const { navigateTo } = useNavigation();
  
  // Get the most recent active team
  const activeTeam = mockTeams.find(team => team.status === 'active');
  
  // Get completed teams
  const completedTeams = mockTeams.filter(team => team.status === 'completed');
  
  const handleViewTeam = (teamId: string, teamName: string) => {
    navigateTo(`/team/${teamId}`, teamName);
  };
  
  const handleBuildTeam = () => {
    navigateTo('/roster-builder', 'Build Your Team');
  };

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
  const getEarningsFromScore = (score: number): number => {
    if (score >= 88) return 100000; // 1st place
    if (score >= 85) return 17500;  // 2nd-3rd place
    if (score >= 82) return 17500;  // 2nd-3rd place
    if (score >= 80) return 5000;   // 4th place
    if (score >= 75) return 500;    // 5th-9th place
    return 0;                       // 10th-15th place
  };
  
  // Sort riders by earnings (completed first, then pending)
  const getSortedRiders = (riders: Rider[]): Rider[] => {
    return [...riders].sort((a, b) => {
      // First sort by status (completed first)
      if (a.status === 'completed' && b.status === 'upcoming') return -1;
      if (a.status === 'upcoming' && b.status === 'completed') return 1;
      
      // Then sort by earnings (higher earnings first)
      if (a.status === 'completed' && b.status === 'completed') {
        const aEarnings = getEarningsFromScore(a.score);
        const bEarnings = getEarningsFromScore(b.score);
        return bEarnings - aEarnings;
      }
      
      // Keep original order for pending riders
      return 0;
    });
  };
  
  // Calculate total earnings for a team
  const calculateTotalEarnings = (riders: Rider[]): number => {
    return riders
      .filter(rider => rider.status === 'completed')
      .reduce((total, rider) => total + getEarningsFromScore(rider.score), 0);
  };
  
  // Calculate expected earnings based on position and total entries
  const getExpectedEarningsForPosition = (position: number, totalEntries: number): number => {
    // For top positions, give higher earnings
    if (position === 1) return 650000; // First place team
    if (position <= 5) return 450000 + Math.floor(Math.random() * 50000); // Top 5
    if (position <= 20) return 350000 + Math.floor(Math.random() * 50000); // Top 20
    if (position <= 50) return 250000 + Math.floor(Math.random() * 50000); // Top 50
    if (position <= 100) return 150000 + Math.floor(Math.random() * 50000); // Top 100
    
    // For lower positions, calculate based on percentile
    const percentile = 1 - (position / totalEntries);
    return Math.floor(percentile * 200000) + 50000; // Ensure minimum of $50,000
  };
  
  return (
    <PageContainer title="Teams">
      <div className="p-4 max-w-4xl mx-auto">
        {/* Header with Build Team button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Teams</h1>
          <Button 
            variant="primary"
            className="bg-red-600 hover:bg-red-700 text-white"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={handleBuildTeam}
          >
            Build Your Team
          </Button>
        </div>
        
        {/* Active Team */}
        {activeTeam && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">Current Contest</h2>
            <Card className="border-2 border-red-600 overflow-hidden rounded-lg bg-gray-900">
              <CardHeader className="bg-gray-900 border-b border-gray-700 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">{activeTeam.contestName}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">
                      {activeTeam.contestDate} - {activeTeam.endDate}
                    </p>
                  </div>
                  <Badge className="bg-green-600 text-white">LIVE</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 bg-gray-900">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Current Position</p>
                    <p className="text-2xl font-bold text-white">
                      {activeTeam.position}
                      <span className="text-sm text-gray-400 ml-1">/ {formatNumber(activeTeam.totalEntries)}</span>
                    </p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Current Earnings</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatCurrency(calculateTotalEarnings(activeTeam.riders))}
                    </p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Riders Remaining</p>
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-2 text-green-400" />
                      <p className="text-2xl font-bold text-green-400">{activeTeam.ridersRemaining}/10</p>
                    </div>
                  </div>
                </div>
                
                {/* Team Summary */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Users className="h-5 w-5 text-red-400 mr-2" />
                    Team Summary
                  </h3>
                  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="grid grid-cols-12 text-xs text-gray-300 p-3 border-b border-gray-700 bg-gray-800/50">
                      <div className="col-span-5 font-semibold">Rider</div>
                      <div className="col-span-4 font-semibold">Event</div>
                      <div className="col-span-3 text-right font-semibold">Earnings</div>
                    </div>
                    
                    <div className="divide-y divide-gray-700">
                      {getSortedRiders(activeTeam.riders).slice(0, 5).map((rider, index) => (
                        <div key={index} className="grid grid-cols-12 p-3 items-center">
                          <div className="col-span-5 font-medium text-white">{rider.name}</div>
                          <div className="col-span-4 text-sm text-gray-300">{rider.event}</div>
                          <div className="col-span-3 text-right">
                            {rider.status === 'completed' ? (
                              <span className="font-bold text-green-400">
                                {formatCurrency(getEarningsFromScore(rider.score))}
                              </span>
                            ) : (
                              <Badge className="bg-blue-900 text-blue-200 ml-auto">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {activeTeam.riders.length > 5 && (
                    <p className="text-center text-sm text-gray-400 mt-2">
                      +{activeTeam.riders.length - 5} more riders
                    </p>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    className="border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => handleViewTeam(activeTeam.id, activeTeam.contestName)}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    View Complete Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Past Teams */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center">
            <Trophy className="h-5 w-5 text-amber-400 mr-2" />
            Past Contests
          </h2>
          
          {completedTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedTeams.map(team => {
                // Calculate realistic earnings based on position
                const calculatedEarnings = getExpectedEarningsForPosition(team.position, team.totalEntries);
                
                return (
                  <Card 
                    key={team.id}
                    className="border border-gray-700 hover:border-red-500 transition-colors cursor-pointer bg-gray-900"
                    onClick={() => handleViewTeam(team.id, team.contestName)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-white">{team.contestName}</h3>
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{team.contestDate}</span>
                          </div>
                        </div>
                        
                        {team.winnings > 0 ? (
                          <Badge className="bg-amber-600 text-white">
                            {formatCurrency(team.winnings)} Won
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-700 text-gray-300">
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-gray-800 p-2 rounded text-center border border-gray-700">
                          <p className="text-xs text-gray-400">Position</p>
                          <p className="text-sm font-bold text-white">
                            {team.position}
                            <span className="text-xs text-gray-500 ml-1">/ {formatNumber(team.totalEntries)}</span>
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-2 rounded text-center border border-gray-700">
                          <p className="text-xs text-gray-400">Earnings</p>
                          <p className="text-sm font-bold text-green-400">{formatCurrency(calculatedEarnings)}</p>
                        </div>
                        
                        <div className="bg-gray-800 p-2 rounded text-center border border-gray-700">
                          <p className="text-xs text-gray-400">Prize</p>
                          <p className="text-sm font-bold text-amber-400">
                            {team.winnings > 0 ? formatCurrency(team.winnings) : '-'}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-700 text-white hover:bg-gray-800"
                        rightIcon={<ChevronRight className="h-4 w-4" />}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-400">No past contests found</p>
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        <div className="text-center p-6 bg-gradient-to-r from-red-700 to-red-600 rounded-lg border-2 border-red-500 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">Ready for the next rodeo?</h3>
          <p className="text-red-100 mb-4">Enter our upcoming contests for a chance to win big prizes!</p>
          <Button 
            variant="primary" 
            className="bg-white hover:bg-gray-100 font-bold text-lg px-8 py-3"
            rightIcon={<ArrowRight className="h-5 w-5 text-red-700" />}
            onClick={handleBuildTeam}
            style={{ color: '#be123c' }}
          >
            <span className="text-red-700">BUILD YOUR TEAM</span>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Teams; 