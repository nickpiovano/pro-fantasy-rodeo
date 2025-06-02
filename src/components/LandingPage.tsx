import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import HowItWorks from './HowItWorks';
import CountdownTimer from './CountdownTimer';

interface LandingPageProps {
  onStartEntry: () => void;
}

const LandingPage = ({ onStartEntry }: LandingPageProps) => {
  // Contest end date: July 31st, 2024
  const contestEndDate = new Date(2024, 6, 31);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto space-y-6 animate-fade-in">
          {/* Hero Banner */}
          <Card className="card-western border-4 border-red-600 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-6 text-center">
              <Badge className="bg-amber-100 text-red-800 font-bold mb-3 text-lg px-4 py-1">
                CHRISTMAS IN JULY
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                WIN A 2024 RAM 1500
              </h1>
              <p className="text-amber-100 text-lg font-semibold">
                + $60,000 Cash Prizes
              </p>
            </div>
            
            {/* Countdown Timer */}
            <CardContent className="p-6 bg-gradient-to-br from-amber-50 to-stone-100">
              <CountdownTimer endDate={contestEndDate} className="mb-4" />
              
              <Button 
                onClick={onStartEntry}
                className="btn-rodeo w-full text-xl py-6 group"
              >
                BUILD YOUR TEAM
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-center text-stone-600 text-sm mt-3">
                Entry Fee: <span className="font-bold text-red-700">$19.95</span>
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <HowItWorks />

          {/* Prize Breakdown */}
          <Card className="card-western border-2 border-amber-400">
            <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
              <CardTitle className="text-center text-xl text-stone-800">
                Prize Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-amber-200">
                <span className="font-semibold">1st Place</span>
                <span className="text-red-700 font-bold">2024 Ram 1500</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-amber-200">
                <span className="font-semibold">2nd Place</span>
                <span className="text-red-700 font-bold">$15,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-amber-200">
                <span className="font-semibold">3rd Place</span>
                <span className="text-red-700 font-bold">$10,000</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold">4th-20th</span>
                <span className="text-red-700 font-bold">$35,000 Total</span>
              </div>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="text-center space-y-2">
            <p className="text-white text-sm">
              Partnered with PRCA • Ages 18+ • See rules for details
            </p>
            <button className="text-white underline text-sm hover:text-amber-100 transition-colors">
              Contest Rules & FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
