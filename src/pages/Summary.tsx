import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Edit3, CreditCard } from "lucide-react";
import type { TeamSelection } from "@/pages/Index";

const Summary = () => {
  const { navigateTo } = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would get this from context or params
  // For now, let's mock some selected contestants
  const mockSelections: TeamSelection[] = [
    { eventId: "1", eventName: "Bareback Riding", contestantId: "101", contestantName: "Kaycee Feild" },
    { eventId: "2", eventName: "Steer Wrestling", contestantId: "201", contestantName: "Tyler Waguespack" },
    { eventId: "3", eventName: "Team Roping", contestantId: "301", contestantName: "Kaleb Driggers" },
    { eventId: "4", eventName: "Saddle Bronc Riding", contestantId: "401", contestantName: "Ryder Wright" },
    { eventId: "5", eventName: "Tie-Down Roping", contestantId: "501", contestantName: "Shad Mayfield" },
    { eventId: "6", eventName: "Barrel Racing", contestantId: "601", contestantName: "Hailey Kinsel" },
    { eventId: "7", eventName: "Bull Riding", contestantId: "701", contestantName: "Sage Kimzey" }
  ];

  const handleSubmitEntry = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigateTo("/confirmation", "Entry Confirmed");
    }, 1500);
  };

  const handleEditTeam = () => {
    navigateTo("/roster", "Build Your Team");
  };

  return (
    <PageContainer title="Team Summary">
      <div className="p-4">
        {/* Team Selections */}
        <Card className="glass-card mb-6 border-amber-500/30">
          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-red-500/10 border-b border-amber-500/30">
            <CardTitle className="text-xl text-center text-white">Your Christmas in July Team</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {mockSelections.map((selection) => (
                <div 
                  key={selection.eventId} 
                  className="bg-white/5 rounded-lg p-3 flex justify-between items-center border border-white/10"
                >
                  <div>
                    <div className="text-sm text-stone-400">{selection.eventName}</div>
                    <div className="text-white font-medium">{selection.contestantName}</div>
                  </div>
                  <Badge className="bg-red-600">Selected</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prize Information */}
        <Card className="glass-card mb-6 border-red-500/30">
          <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-700/10 border-b border-red-500/30">
            <CardTitle className="text-xl text-center text-white">Prize Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-lg p-4 border border-amber-500/30">
                <h3 className="text-lg font-bold text-center text-white mb-2">Grand Prize</h3>
                <p className="text-center text-amber-300 font-bold text-xl">2024 RAM 1500</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-center text-white mb-2">Cash Prizes</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-stone-300">2nd Place</span>
                    <span className="text-white font-medium">$20,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-300">3rd Place</span>
                    <span className="text-white font-medium">$15,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-300">4th-10th Place</span>
                    <span className="text-white font-medium">$1,000-$10,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entry Fee and Submit */}
        <Card className="glass-card mb-6 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Entry Fee</h3>
                <p className="text-stone-400 text-sm">One entry per person</p>
              </div>
              <div className="text-2xl font-bold text-green-400">$19.95</div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={handleEditTeam}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Team
              </Button>
              
              <Button 
                className="flex-1 btn-primary"
                onClick={handleSubmitEntry}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Submit Entry
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Summary; 