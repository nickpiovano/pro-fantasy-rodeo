import PageContainer from "@/components/PageContainer";
import { useNavigation } from "@/hooks/useNavigation";

// Mock data for demonstration
const MOCK_LEADERBOARD = [
  { rank: 1, name: "Champion Roper", score: 325, isCurrentUser: false },
  { rank: 2, name: "Rodeo Legend", score: 312, isCurrentUser: false },
  { rank: 3, name: "Cowboy King", score: 298, isCurrentUser: false },
  { rank: 4, name: "Your Team", score: 287, isCurrentUser: true },
  { rank: 5, name: "Bull Rider", score: 274, isCurrentUser: false },
  { rank: 6, name: "Western Star", score: 259, isCurrentUser: false },
  { rank: 7, name: "Bronc Master", score: 243, isCurrentUser: false },
  { rank: 8, name: "Lasso Legend", score: 238, isCurrentUser: false },
  { rank: 9, name: "Rodeo Hero", score: 227, isCurrentUser: false },
  { rank: 10, name: "Saddle Champ", score: 214, isCurrentUser: false },
];

const Leaderboard = () => {
  return (
    <PageContainer title="Standings">
      <div className="p-4">
        <div className="glass-card p-4 mb-4">
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            Christmas in July - Standings
          </h2>
          
          <div className="bg-stone-800/50 rounded-lg p-3 mb-3 text-stone-300 text-sm grid grid-cols-12 gap-2">
            <div className="col-span-2 font-bold">Rank</div>
            <div className="col-span-7 font-bold">Team</div>
            <div className="col-span-3 font-bold text-right">Score</div>
          </div>
          
          <div className="space-y-2">
            {MOCK_LEADERBOARD.map((entry) => (
              <div 
                key={entry.rank} 
                className={`
                  rounded-lg p-3 grid grid-cols-12 gap-2 
                  ${entry.isCurrentUser 
                    ? 'bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-orange-500/40' 
                    : 'bg-white/5 border border-white/10'
                  }
                `}
              >
                <div className="col-span-2 font-bold text-xl text-white">
                  {entry.rank}
                </div>
                <div className="col-span-7 text-white">
                  {entry.isCurrentUser ? (
                    <span className="font-bold">{entry.name}</span>
                  ) : (
                    entry.name
                  )}
                </div>
                <div className="col-span-3 text-right font-mono text-white">
                  {entry.score}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center text-stone-400 text-sm">
            Scores updated hourly.
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Leaderboard; 