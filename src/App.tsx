import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import { StyleProvider } from "./components/StyleProvider";
import MobileNavigation from "./components/MobileNavigation";
import Index from "./pages/Index";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import LeaderboardTeamDetail from "./pages/LeaderboardTeamDetail";
import RosterBuilder from "./components/RosterBuilder";
import Leaderboard from "./pages/Leaderboard";
import Prizes from "./pages/Prizes";
import Account from "./pages/Account";
import MyTeams from "./pages/MyTeams";
import PrivacySecurity from "./pages/PrivacySecurity";
import AccountSettings from "./pages/AccountSettings";
import StyleGuide from "./pages/StyleGuide";
import Summary from "./pages/Summary";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import ToastDemo from "./pages/ToastDemo";

// Import navigation styles
import "./styles/navigation.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TeamProvider>
          <NavigationProvider>
            <StyleProvider theme="western">
              <TooltipProvider>
                <Toaster />
                <div className="app-container">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/team/:teamId" element={<TeamDetail />} />
                    <Route path="/leaderboard-team/:teamId" element={<LeaderboardTeamDetail />} />
                    <Route path="/roster" element={<Teams />} />
                    <Route path="/roster-builder" element={<RosterBuilder onTeamComplete={(selections) => console.log('Team complete:', selections)} />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/prizes" element={<Prizes />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/my-teams" element={<MyTeams />} />
                    <Route path="/privacy-security" element={<PrivacySecurity />} />
                    <Route path="/account-settings" element={<AccountSettings />} />
                    <Route path="/style-guide" element={<StyleGuide />} />
                    <Route path="/summary" element={<Summary />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/toast-demo" element={<ToastDemo />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <MobileNavigation />
                </div>
              </TooltipProvider>
            </StyleProvider>
          </NavigationProvider>
        </TeamProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
