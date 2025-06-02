import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { CheckCircle, Award, TrendingUp, Home } from "lucide-react";

const Confirmation = () => {
  const { navigateTo } = useNavigation();

  return (
    <PageContainer title="Entry Confirmed" showBackButton={false}>
      <div className="p-4">
        <div className="flex justify-center my-6">
          <div className="rounded-full bg-green-500/20 p-4 border-4 border-green-500/40">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>

        <Card className="glass-card mb-6 border-green-500/30">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-700/10 border-b border-green-500/30">
            <CardTitle className="text-xl text-center text-white">You're in!</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <p className="text-white mb-4">
              Your entry for the Christmas in July contest has been successfully submitted!
            </p>
            <p className="text-stone-400 mb-6">
              Winners will be announced after the contest ends on July 31st.
            </p>
            
            <div className="flex flex-col space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700"
                onClick={() => navigateTo("/leaderboard", "Leaderboard")}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                View Leaderboard
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                onClick={() => navigateTo("/prizes", "Prizes")}
              >
                <Award className="mr-2 h-5 w-5" />
                View Prizes
              </Button>
              
              <Button 
                variant="ghost"
                className="w-full text-stone-400 hover:text-white hover:bg-white/5"
                onClick={() => navigateTo("/", "Home")}
              >
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-stone-500 text-sm mt-8">
          <p>Need help or have questions?</p>
          <p className="mt-1">Contact support at support@profantasyrodeo.com</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Confirmation; 