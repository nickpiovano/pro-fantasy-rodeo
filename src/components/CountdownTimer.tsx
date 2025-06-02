import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate?: Date;
  className?: string;
  onComplete?: () => void;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ 
  endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days from now
  className, 
  onComplete,
  label = "Contest Ends In:"
}: CountdownTimerProps) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = endDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      if (onComplete) onComplete();
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if countdown is complete
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className={`text-center ${className || ''}`}>
      <p className="text-stone-400 font-semibold mb-3">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hrs', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sec', value: timeLeft.seconds }
        ].map(({ label, value }) => (
          <div key={label} className="bg-red-700 text-white rounded-lg p-3">
            <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase tracking-wide">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer; 