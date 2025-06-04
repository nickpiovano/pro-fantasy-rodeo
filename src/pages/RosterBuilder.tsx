import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { useNavigation } from "@/hooks/useNavigation";
import RosterBuilder from "@/components/RosterBuilder";
import type { TeamSelection } from "@/pages/Index";

const RosterBuilderPage = () => {
  const { navigateTo } = useNavigation();

  const handleTeamComplete = (selections: TeamSelection[]) => {
    // Go to summary page with selections
    console.log('Team complete:', selections);
    navigateTo("/summary", "Team Summary");
  };

  return (
    <PageContainer title="Build Your Team">
      <RosterBuilder onTeamComplete={handleTeamComplete} />
    </PageContainer>
  );
};

export default RosterBuilderPage; 