import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface Prize {
  place: number | string;
  description: string;
  value: number;
}

interface PrizeDisplayProps {
  prizes: Prize[];
  className?: string;
}

const PrizeDisplay = ({ prizes, className }: PrizeDisplayProps) => {
  return (
    <Card className={`card-western border-2 border-amber-400 ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-amber-300">
        <div className="flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5 text-red-700" />
          <CardTitle className="text-center text-xl text-stone-800">
            Prize Breakdown
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2 bg-gradient-to-br from-white to-amber-50">
        {prizes.map((prize, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-amber-200 last:border-b-0">
            <span className="font-semibold text-stone-700">
              {typeof prize.place === 'number' 
                ? `${prize.place}${getOrdinalSuffix(prize.place)} Place` 
                : prize.place}
            </span>
            <span className="text-red-700 font-bold">
              {prize.description === 'Cash' 
                ? `$${prize.value.toLocaleString()}` 
                : prize.description}
            </span>
          </div>
        ))}

        <div className="text-center mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
          <p className="text-sm text-stone-600">
            Contest Entry: <span className="font-bold text-red-700">$19.95</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get ordinal suffix (1st, 2nd, 3rd, etc.)
const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
};

export default PrizeDisplay; 