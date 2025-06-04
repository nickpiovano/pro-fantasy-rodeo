import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Edit3, CreditCard, AlertTriangle } from "lucide-react";
import { useTeam } from "@/context/TeamContext";
import { formatSalary } from "@/services/contest";

const Summary = () => {
  const { navigateTo } = useNavigation();
  const { teamSelections } = useTeam();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate total salary
  const totalSalary = teamSelections.reduce((sum, selection) => sum + selection.salary, 0);
  const salaryCap = 800000; // $800,000 salary cap
  const remainingSalary = salaryCap - totalSalary;
  const isOverCap = totalSalary > salaryCap;

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
        <Card className="mb-6 border-2 border-amber-400 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-200 border-b-2 border-amber-300">
            <CardTitle className="text-xl text-center text-stone-800">Your Christmas in July Team</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-white">
            {/* Salary Summary */}
            <div className="mb-4 p-3 rounded-lg bg-gray-100 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-700 font-medium">Total Salary:</span>
                  <span className={`ml-2 font-bold ${isOverCap ? 'text-red-600' : 'text-green-600'}`}>
                    {formatSalary(totalSalary)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">Remaining:</span>
                  <span className={`ml-2 font-bold ${isOverCap ? 'text-red-600' : 'text-green-600'}`}>
                    {isOverCap ? `-${formatSalary(Math.abs(remainingSalary))}` : formatSalary(remainingSalary)}
                  </span>
                </div>
              </div>
              
              {isOverCap && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md flex items-center text-sm text-red-700">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  <span>You've exceeded the salary cap. Please adjust your selections.</span>
                </div>
              )}
            </div>
            
            {/* Selections List */}
            <div className="space-y-3">
              {teamSelections.length > 0 ? (
                teamSelections.map((selection) => (
                  <div 
                    key={selection.eventId} 
                    className="bg-gray-50 rounded-lg p-3 flex justify-between items-center border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="text-sm text-gray-500 font-medium">{selection.eventName}</div>
                      <div className="text-gray-900 font-semibold">{selection.contestantName}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-red-600 font-medium">{formatSalary(selection.salary)}</span>
                      <Badge className="bg-green-600 hover:bg-green-700">Selected</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500">No contestants selected yet.</p>
                  <Button 
                    className="mt-3 bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={handleEditTeam}
                  >
                    Build Your Team
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Prize Information */}
        <Card className="mb-6 border-2 border-red-400 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-100 to-red-200 border-b-2 border-red-300">
            <CardTitle className="text-xl text-center text-gray-800">Prize Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-white">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                <h3 className="text-lg font-bold text-center text-gray-800 mb-2">Grand Prize</h3>
                <p className="text-center text-red-600 font-bold text-xl">2024 RAM 1500</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-bold text-center text-gray-800 mb-2">Cash Prizes</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">2nd Place</span>
                    <span className="text-gray-900 font-medium">$20,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">3rd Place</span>
                    <span className="text-gray-900 font-medium">$15,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">4th-10th Place</span>
                    <span className="text-gray-900 font-medium">$1,000-$10,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entry Fee and Submit */}
        <Card className="mb-6 border-2 border-green-400 shadow-lg">
          <CardContent className="p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Entry Fee</h3>
                <p className="text-gray-600 text-sm">One entry per person</p>
              </div>
              <div className="text-2xl font-bold text-green-600">$19.95</div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handleEditTeam}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Team
              </Button>
              
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSubmitEntry}
                disabled={isSubmitting || isOverCap}
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