import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import MobileNavigation from "./components/MobileNavigation";
import Index from "./pages/Index";
import RosterBuilder from "./pages/RosterBuilder";
import Leaderboard from "./pages/Leaderboard";
import Prizes from "./pages/Prizes";
import Account from "./pages/Account";
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
            <TooltipProvider>
              <Toaster />
              <div className="app-container">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/roster" element={<RosterBuilder />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/prizes" element={<Prizes />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/summary" element={<Summary />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/toast-demo" element={<ToastDemo />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <MobileNavigation />
              </div>
            </TooltipProvider>
          </NavigationProvider>
        </TeamProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
