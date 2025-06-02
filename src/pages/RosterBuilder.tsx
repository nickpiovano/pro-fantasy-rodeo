import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import ProgressBar from "@/components/ProgressBar";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import type { Event, Contestant } from "@/pages/Index";

// Mock data for demonstration with contestants
const MOCK_EVENTS: Event[] = [
  { 
    id: "1", 
    name: "Bareback Riding", 
    contestants: [
      { id: "101", name: "Kaycee Feild", rank: 1, winnings: "$125,000" },
      { id: "102", name: "Tim O'Connell", rank: 2, winnings: "$98,500" },
      { id: "103", name: "Clayton Biglow", rank: 3, winnings: "$87,400" },
      { id: "104", name: "Jess Pope", rank: 4, winnings: "$76,300" },
      { id: "105", name: "Tilden Hooper", rank: 5, winnings: "$65,200" }
    ] 
  },
  { 
    id: "2", 
    name: "Steer Wrestling", 
    contestants: [
      { id: "201", name: "Tyler Waguespack", rank: 1, winnings: "$132,500" },
      { id: "202", name: "J.D. Struxness", rank: 2, winnings: "$105,700" },
      { id: "203", name: "Will Lummus", rank: 3, winnings: "$92,300" },
      { id: "204", name: "Jacob Talley", rank: 4, winnings: "$81,400" },
      { id: "205", name: "Stetson Jorgensen", rank: 5, winnings: "$72,900" }
    ] 
  },
  { 
    id: "3", 
    name: "Team Roping", 
    contestants: [
      { id: "301", name: "Kaleb Driggers", rank: 1, winnings: "$143,200" },
      { id: "302", name: "Clay Smith", rank: 2, winnings: "$118,400" },
      { id: "303", name: "Erich Rogers", rank: 3, winnings: "$101,500" },
      { id: "304", name: "Luke Brown", rank: 4, winnings: "$89,300" },
      { id: "305", name: "Cody Snow", rank: 5, winnings: "$76,500" }
    ] 
  },
  { 
    id: "4", 
    name: "Saddle Bronc Riding", 
    contestants: [
      { id: "401", name: "Ryder Wright", rank: 1, winnings: "$138,700" },
      { id: "402", name: "Zeke Thurston", rank: 2, winnings: "$115,900" },
      { id: "403", name: "Wyatt Casper", rank: 3, winnings: "$92,800" },
      { id: "404", name: "Stetson Wright", rank: 4, winnings: "$86,400" },
      { id: "405", name: "Brody Cress", rank: 5, winnings: "$74,200" }
    ] 
  },
  { 
    id: "5", 
    name: "Tie-Down Roping", 
    contestants: [
      { id: "501", name: "Shad Mayfield", rank: 1, winnings: "$128,900" },
      { id: "502", name: "Tuf Cooper", rank: 2, winnings: "$112,600" },
      { id: "503", name: "Shane Hanchey", rank: 3, winnings: "$95,700" },
      { id: "504", name: "Marty Yates", rank: 4, winnings: "$82,300" },
      { id: "505", name: "Caleb Smidt", rank: 5, winnings: "$71,500" }
    ] 
  },
  { 
    id: "6", 
    name: "Barrel Racing", 
    contestants: [
      { id: "601", name: "Hailey Kinsel", rank: 1, winnings: "$147,300" },
      { id: "602", name: "Dona Kay Rule", rank: 2, winnings: "$126,800" },
      { id: "603", name: "Brittany Pozzi Tonozzi", rank: 3, winnings: "$107,500" },
      { id: "604", name: "Emily Beisel", rank: 4, winnings: "$89,200" },
      { id: "605", name: "Lisa Lockhart", rank: 5, winnings: "$76,100" }
    ] 
  },
  { 
    id: "7", 
    name: "Bull Riding", 
    contestants: [
      { id: "701", name: "Sage Kimzey", rank: 1, winnings: "$157,200" },
      { id: "702", name: "Stetson Wright", rank: 2, winnings: "$139,800" },
      { id: "703", name: "Ky Hamilton", rank: 3, winnings: "$115,600" },
      { id: "704", name: "Josh Frost", rank: 4, winnings: "$98,400" },
      { id: "705", name: "Dustin Boquet", rank: 5, winnings: "$82,900" }
    ] 
  },
];

const RosterBuilder = () => {
  const { navigateTo } = useNavigation();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedContestants, setSelectedContestants] = useState<Record<string, string>>({});

  const currentEvent = MOCK_EVENTS[currentEventIndex];
  const selectedContestantId = selectedContestants[currentEvent.id] || null;

  const handleContestantSelect = (contestantId: string, contestantName: string) => {
    setSelectedContestants({
      ...selectedContestants,
      [currentEvent.id]: contestantId
    });
  };

  const handleNext = () => {
    if (currentEventIndex < MOCK_EVENTS.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      // Transform selections to the expected format
      const selections = Object.entries(selectedContestants).map(([eventId, contestantId]) => {
        const event = MOCK_EVENTS.find(e => e.id === eventId)!;
        const contestant = event.contestants.find(c => c.id === contestantId)!;
        return {
          eventId,
          eventName: event.name,
          contestantId,
          contestantName: contestant.name
        };
      });
      // Go to summary page with selections
      console.log('Team complete:', selections);
      navigateTo("/summary", "Team Summary");
    }
  };

  const handleBack = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
    } else {
      // Go back to home
      navigateTo("/", "Home");
    }
  };

  return (
    <PageContainer title="Build Your Team">
      <div className="p-4">
        <div className="glass-card p-4 mb-4">
          <ProgressBar 
            current={Object.keys(selectedContestants).length}
            total={MOCK_EVENTS.length}
            label="Select one contestant per event"
          />
        </div>

        <EventCard 
          event={currentEvent}
          selectedContestantId={selectedContestantId}
          onContestantSelect={handleContestantSelect}
          className="mb-4"
        />

        <div className="flex justify-between">
          <Button 
            onClick={handleBack} 
            variant="outline"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!selectedContestantId}
          >
            {currentEventIndex < MOCK_EVENTS.length - 1 ? "Next Event" : "Review Team"}
          </Button>
        </div>

        {/* Selected Contestants Summary */}
        {Object.keys(selectedContestants).length > 0 && (
          <div className="glass-card p-4 mt-6">
            <h3 className="text-lg font-bold text-white mb-3">Your Selections</h3>
            <div className="space-y-2">
              {Object.entries(selectedContestants).map(([eventId, contestantId]) => {
                const event = MOCK_EVENTS.find(e => e.id === eventId)!;
                const contestant = event.contestants.find(c => c.id === contestantId)!;
                return (
                  <div key={eventId} className="bg-white/10 rounded-lg p-3 flex justify-between border border-white/20">
                    <span className="text-white">{event.name}</span>
                    <span className="text-amber-300 font-medium">{contestant.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default RosterBuilder; 