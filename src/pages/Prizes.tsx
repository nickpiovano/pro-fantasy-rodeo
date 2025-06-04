import PageContainer from "@/components/PageContainer";
import { Trophy, Truck, DollarSign, Medal } from "lucide-react";

const Prizes = () => {
  return (
    <PageContainer title="Prizes">
      <div className="p-4">
        <div className="glass-card p-4 mb-4">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Christmas in July Prizes
          </h2>
          
          {/* Grand Prize */}
          <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/40 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="text-amber-400 h-14 w-14" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Grand Prize</h3>
            <div className="flex items-center justify-center mb-4">
              <Truck className="text-white h-8 w-8 mr-2" />
              <p className="text-white text-xl font-bold">2024 Ram 1500</p>
            </div>
            <p className="text-stone-300 text-center text-sm">
              The overall winner with the highest score takes home a brand new 2024 Ram 1500 truck.
            </p>
          </div>
          
          {/* Cash Prizes */}
          <div className="glass-card p-5 mb-6">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="text-green-400 h-12 w-12" />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-4">Cash Prizes</h3>
            
            <div className="space-y-3">
              {[
                { place: "2nd Place", amount: "$20,000" },
                { place: "3rd Place", amount: "$15,000" },
                { place: "4th Place", amount: "$10,000" },
                { place: "5th Place", amount: "$8,000" },
                { place: "6th-10th Place", amount: "$1,500 each" }
              ].map((prize) => (
                <div 
                  key={prize.place} 
                  className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10"
                >
                  <div className="flex items-center">
                    <Medal className="text-amber-400 h-5 w-5 mr-2" />
                    <span className="text-white">{prize.place}</span>
                  </div>
                  <span className="text-rodeo-tan font-bold">{prize.amount}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Total Prize Pool */}
          <div className="text-center bg-gradient-to-r from-stone-800/50 to-stone-700/50 p-4 rounded-lg">
            <p className="text-white font-bold mb-1">Total Prize Pool</p>
            <p className="text-3xl font-bold text-rodeo-tan">$60,000</p>
            <p className="text-white/70 text-sm mt-2">
              Plus a 2024 Ram 1500 for the Grand Prize winner
            </p>
          </div>
          
          <div className="mt-6 text-center text-stone-400 text-sm">
            Winners will be announced the first week of July.
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Prizes; 