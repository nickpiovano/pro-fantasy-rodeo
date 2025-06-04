import React from 'react';
import PageContainer from "@/components/PageContainer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-new";
import { Trophy, Calendar, Users, ChevronRight } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import AccountMenu from "@/components/AccountMenu";

const MyTeams = () => {
  const { navigateTo } = useNavigation();
  
  // Mock data for teams
  const teams = [
    {
      id: "team-1",
      contestName: "Christmas in July",
      contestDate: "July 1, 2025",
      position: 42,
      totalEntries: 5942,
      score: 450,
      status: "active"
    },
    {
      id: "team-2",
      contestName: "Memorial Day Classic",
      contestDate: "May 27, 2025",
      position: 156,
      totalEntries: 3241,
      score: 325,
      status: "completed"
    },
    {
      id: "team-3",
      contestName: "Spring Showdown",
      contestDate: "April 15, 2025",
      position: 23,
      totalEntries: 2850,
      score: 520,
      status: "completed"
    }
  ];

  return (
    <PageContainer title="My Teams">
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-white">My Teams</h1>
          <AccountMenu />
        </div>
        
        {/* Team List */}
        <div className="space-y-4 mb-8">
          {teams.map(team => (
            <Card 
              key={team.id} 
              className={`border ${team.status === 'active' ? 'border-red-500' : 'border-gray-700'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white">{team.contestName}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                      <span>{team.contestDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {team.status === 'active' ? (
                      <span className="bg-green-900 text-green-400 text-xs px-2 py-1 rounded-full">
                        Live
                      </span>
                    ) : (
                      <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-2 text-gray-400 hover:text-white"
                      onClick={() => navigateTo(`/team/${team.id}`, team.contestName)}
                      rightIcon={<ChevronRight className="h-5 w-5" />}
                      ariaLabel={`View details for ${team.contestName}`}
                    >
                      View
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-center">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Position</div>
                    <div className="text-lg font-bold text-white">
                      {team.position}
                      <span className="text-xs text-gray-400 ml-1">/ {team.totalEntries}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Score</div>
                    <div className="text-lg font-bold text-white">{team.score}</div>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Status</div>
                    <div className={`text-lg font-bold ${team.status === 'active' ? 'text-green-400' : 'text-gray-300'}`}>
                      {team.status === 'active' ? 'Active' : 'Finished'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* No Teams State */}
        {teams.length === 0 && (
          <Card className="border border-gray-700 p-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-16 w-16 text-gray-600 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white mb-2">No Teams Yet</h3>
              <p className="text-gray-400 mb-6">You haven't created any teams yet.</p>
              <Button 
                variant="primary"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => navigateTo('/roster', 'Build Your Team')}
                leftIcon={<Trophy className="h-4 w-4" />}
              >
                Enter a Contest
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default MyTeams; 