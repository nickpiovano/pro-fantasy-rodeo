import { createContext, useState, useContext, ReactNode } from 'react';
import { TeamSelection, User } from '@/pages/Index';

interface TeamContextType {
  user: User | null;
  teamSelections: TeamSelection[];
  setUser: (user: User) => void;
  addSelection: (selection: TeamSelection) => void;
  removeSelection: (eventId: string) => void;
  clearSelections: () => void;
  isEventSelected: (eventId: string) => boolean;
  getSelectedContestant: (eventId: string) => string | null;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

interface TeamProviderProps {
  children: ReactNode;
}

export const TeamProvider = ({ children }: TeamProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [teamSelections, setTeamSelections] = useState<TeamSelection[]>([]);

  const addSelection = (selection: TeamSelection) => {
    setTeamSelections(prev => {
      // Remove any existing selection for this event
      const filtered = prev.filter(s => s.eventId !== selection.eventId);
      // Add the new selection
      return [...filtered, selection];
    });
  };

  const removeSelection = (eventId: string) => {
    setTeamSelections(prev => prev.filter(s => s.eventId !== eventId));
  };

  const clearSelections = () => {
    setTeamSelections([]);
  };

  const isEventSelected = (eventId: string) => {
    return teamSelections.some(s => s.eventId === eventId);
  };

  const getSelectedContestant = (eventId: string) => {
    const selection = teamSelections.find(s => s.eventId === eventId);
    return selection ? selection.contestantId : null;
  };

  return (
    <TeamContext.Provider
      value={{
        user,
        teamSelections,
        setUser,
        addSelection,
        removeSelection,
        clearSelections,
        isEventSelected,
        getSelectedContestant
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}; 