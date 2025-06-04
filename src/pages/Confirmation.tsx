import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { CheckCircle, Award, TrendingUp, Home } from "lucide-react";

const Confirmation = () => {
  const { navigateTo } = useNavigation();

  return (
    <PageContainer title="Entry Confirmed" showBackButton={false}>
      <div className="p-4 max-w-md mx-auto">
        <div className="flex justify-center my-8">
          <div className="rounded-full bg-green-100 p-4 border-4 border-green-500">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <Card className="mb-6 border-2 border-green-500 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b-2 border-green-200">
            <CardTitle className="text-2xl text-center text-green-800">You're in!</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center bg-white">
            <p className="text-gray-800 mb-4 text-lg">
              Your entry for the Christmas in July contest has been successfully submitted!
            </p>
            <p className="text-gray-600 mb-6">
              Winners will be announced after the contest ends on July 31st.
            </p>
            
            <div className="flex flex-col space-y-3">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => navigateTo("/leaderboard", "Leaderboard")}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                View Leaderboard
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-amber-500 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                onClick={() => navigateTo("/prizes", "Prizes")}
              >
                <Award className="mr-2 h-5 w-5" />
                View Prizes
              </Button>
              
              <Button 
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => navigateTo("/", "Home")}
              >
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-gray-600 text-sm mt-8">
          <p>Need help or have questions?</p>
          <p className="mt-1">Contact support at <a href="mailto:support@profantasyrodeo.com" className="text-blue-600 hover:underline">support@profantasyrodeo.com</a></p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Confirmation; 