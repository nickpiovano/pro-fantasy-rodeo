import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showText?: boolean;
  showCounter?: boolean;
  label?: string;
}

const ProgressBar = ({
  current,
  total,
  className,
  showText = true,
  showCounter = true,
  label = 'Select one contestant per event'
}: ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        {showText && (
          <p className="text-white text-sm">
            {label}
          </p>
        )}
        {showCounter && (
          <Badge className="bg-amber-100 text-red-800 font-bold">
            {current} / {total}
          </Badge>
        )}
      </div>
      <Progress value={progress} className="h-3 bg-red-800" />
    </div>
  );
};

export default ProgressBar; 