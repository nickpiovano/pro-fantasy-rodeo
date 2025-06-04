import PageContainer from "@/components/PageContainer";
import { User, LogOut, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button-new";
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
      <div className="p-4 max-w-md mx-auto">
        <div className="glass-card p-6 mb-6 bg-gray-900/80 border border-gray-800 rounded-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-red-700 flex items-center justify-center">
              <User className="h-10 w-10 text-white" aria-hidden="true" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-white text-center mb-1">
            {userInfo.teamName}
          </h2>
          <p className="text-stone-400 text-center text-sm mb-4">
            {userInfo.name} • {userInfo.email}
          </p>
          
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-center">
              <p className="text-stone-400 text-xs">Joined</p>
              <p className="text-white">{userInfo.joinDate}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 mt-6 items-center">
            <Button 
              variant="outline" 
              className="w-full bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
              onClick={() => navigateTo("/privacy-security", "Privacy & Security")}
              leftIcon={<Shield className="h-5 w-5 text-green-400" />}
            >
              Privacy & Security
            </Button>
            <Button 
              variant="outline" 
              className="w-full bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
              onClick={() => navigateTo("/account-settings", "Account Settings")}
              leftIcon={<Settings className="h-5 w-5 text-blue-400" />}
            >
              Account Settings
            </Button>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              className="w-full sm:max-w-xs border-red-800/30 text-red-400 hover:bg-red-900/20 hover:text-red-300"
              leftIcon={<LogOut className="h-5 w-5" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
        
        <div className="text-center text-stone-500 text-xs mt-6">
          <p>Pro Fantasy Rodeo • Version 1.0.0</p>
          <p className="mt-1">© 2025 All Rights Reserved</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Account; 