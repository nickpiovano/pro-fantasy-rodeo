import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import type { User, TeamSelection } from '@/pages/Index';
import SalaryTracker from './SalaryTracker';
import contestService from '@/services/contest';
import { formatSalary } from '@/services/contest';

interface PrizeSummaryProps {
  user: User;
  teamSelections: TeamSelection[];
  onEntrySubmitted: () => void;
  onEditTeam: () => void;
}

const PrizeSummary = ({ user, teamSelections, onEntrySubmitted, onEditTeam }: PrizeSummaryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalSalary, setTotalSalary] = useState(0);
  const [salaryCap, setSalaryCap] = useState(800000);
  const [isOverSalaryCap, setIsOverSalaryCap] = useState(false);

  // Calculate total salary
  useEffect(() => {
    const newTotalSalary = teamSelections.reduce((total, selection) => total + selection.salary, 0);
    setTotalSalary(newTotalSalary);
    setIsOverSalaryCap(newTotalSalary > salaryCap);
  }, [teamSelections, salaryCap]);

  // Fetch salary cap from active contest
  useEffect(() => {
    const fetchSalaryCap = async () => {
      try {
        const activeContest = await contestService.getActiveContests();
        if (activeContest && typeof activeContest === 'object' && 'salaryCap' in activeContest) {
          setSalaryCap(activeContest.salaryCap as number);
        }
      } catch (error) {
        console.error('Error fetching salary cap:', error);
      }
    };

    fetchSalaryCap();
  }, []);

  const handleSubmitEntry = async () => {
    // Don't allow submission if over salary cap
    if (isOverSalaryCap) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onEntrySubmitted();
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto animate-fade-in">
        {/* Header */}
        <Card className="card-western border-2 border-red-600 mb-6">
          <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white">
            <CardTitle className="text-center text-2xl">
              {user.teamName}
            </CardTitle>
            <p className="text-center text-red-100 mt-1">
              Your Christmas in July Team
            </p>
          </CardHeader>
        </Card>

        {/* Salary Tracker */}
        <Card className="card-western border-2 border-amber-400 mb-6">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="text-lg text-stone-800">
              Team Salary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-gradient-to-br from-gray-800 to-stone-900">
            <SalaryTracker 
              currentSalary={totalSalary} 
              salaryCap={salaryCap} 
              showWarning={isOverSalaryCap}
            />
          </CardContent>
        </Card>

        {/* Team Selections */}
        <Card className="card-western border-2 border-amber-400 mb-6">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="text-lg text-stone-800">
              Team Roster
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 bg-gradient-to-br from-white to-amber-50">
            {teamSelections.map((selection, index) => (
              <div key={selection.eventId} className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200 shadow-sm">
                <div>
                  <p className="font-semibold text-stone-800">{selection.eventName}</p>
                  <div className="flex items-center">
                    <p className="text-stone-600 text-sm">{selection.contestantName}</p>
                    <span className="ml-2 text-xs font-medium text-red-600">
                      {formatSalary(selection.salary)}
                    </span>
                  </div>
                </div>
                <Badge className="bg-red-600 text-white">
                  #{index + 1}
                </Badge>
              </div>
            ))}

            {/* Total Salary */}
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-stone-300 shadow-sm mt-4">
              <p className="font-bold text-stone-800">Total Salary</p>
              <p className={`font-bold ${isOverSalaryCap ? 'text-red-600' : 'text-green-600'}`}>
                {formatSalary(totalSalary)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prize Information */}
        <Card className="card-western border-2 border-amber-400 mb-6">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="text-lg text-stone-800">
              What You're Playing For
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-gradient-to-br from-white to-amber-50">
            <div className="space-y-3">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                <h3 className="text-xl font-bold text-red-700 mb-2">GRAND PRIZE</h3>
                <p className="text-2xl font-bold text-red-800">2024 Ram 1500</p>
                <p className="text-red-600 text-sm">Plus $60,000 in cash prizes</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                  <p className="font-bold text-amber-800">2nd Place</p>
                  <p className="text-lg font-bold text-amber-700">$15,000</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                  <p className="font-bold text-amber-800">3rd Place</p>
                  <p className="text-lg font-bold text-amber-700">$10,000</p>
                </div>
              </div>
              
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-center">
                <p className="font-bold text-stone-700">Places 4-20</p>
                <p className="text-lg font-bold text-stone-600">$35,000 Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entry Fee & Actions */}
        <Card className="card-western border-2 border-green-500 mb-6">
          <CardContent className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 text-center">
            <div className="mb-4">
              <p className="text-stone-700 mb-2">Entry Fee</p>
              <p className="text-4xl font-bold text-green-700">$19.95</p>
              <p className="text-stone-600 text-sm mt-1">Secure payment via Stripe</p>
            </div>
            
            <div className="space-y-3">
              {isOverSalaryCap && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-lg flex items-center text-red-700 mb-2">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Your team is over the salary cap. Please edit your team before submitting.</p>
                </div>
              )}
              
              <Button
                onClick={handleSubmitEntry}
                disabled={isSubmitting || isOverSalaryCap}
                className={`btn-rodeo w-full text-xl py-6 ${isOverSalaryCap ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  'SUBMIT ENTRY'
                )}
              </Button>
              
              <button
                onClick={onEditTeam}
                className="flex items-center justify-center w-full py-3 text-stone-600 hover:text-stone-800 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Edit Team
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Legal Text */}
        <div className="text-center text-xs text-white space-y-2">
          <p>
            By submitting your entry, you agree to the official contest rules and terms of service.
          </p>
          <p>
            Contest ends July 31st, 2024. Winners announced August 5th, 2024.
          </p>
          <p>
            Ages 18+. Void where prohibited. See official rules for complete details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrizeSummary;
