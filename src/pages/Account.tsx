import PageContainer from "@/components/PageContainer";
import { User, LogOut, Shield, Star, Truck, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";

const Account = () => {
  const { navigateTo } = useNavigation();

  // Mock data for demonstration
  const userInfo = {
    name: "Rodeo Fan",
    email: "user@example.com",
    teamName: "Western Champions",
    entries: 1,
    joinDate: "July 2024"
  };

  return (
    <PageContainer title="Account">
      <div className="p-4">
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-red-700 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-white text-center mb-1">
            {userInfo.teamName}
          </h2>
          <p className="text-stone-400 text-center text-sm mb-4">
            {userInfo.name} • {userInfo.email}
          </p>
          
          <div className="flex justify-center mb-4">
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
              <p className="text-stone-400 text-xs">Joined</p>
              <p className="text-white">{userInfo.joinDate}</p>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <Button 
              variant="outline" 
              className="w-full flex justify-start items-center bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => navigateTo("/my-teams", "My Teams")}
            >
              <Star className="h-5 w-5 mr-3 text-amber-400" />
              My Teams
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex justify-start items-center bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => navigateTo("/prizes", "Prizes")}
            >
              <Truck className="h-5 w-5 mr-3 text-red-400" />
              Prize Information
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex justify-start items-center bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => navigateTo("/privacy", "Privacy")}
            >
              <Shield className="h-5 w-5 mr-3 text-green-400" />
              Privacy & Security
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex justify-start items-center bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => navigateTo("/settings", "Settings")}
            >
              <Settings className="h-5 w-5 mr-3 text-blue-400" />
              Account Settings
            </Button>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="outline" 
              className="w-full border-red-800/30 text-red-400 hover:bg-red-900/20 hover:text-red-300"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
        
        <div className="text-center text-stone-500 text-xs mt-6">
          <p>Pro Fantasy Rodeo • Version 1.0.0</p>
          <p className="mt-1">© 2024 All Rights Reserved</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Account; 