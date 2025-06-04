import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  endDate?: Date;
  className?: string;
  onComplete?: () => void;
  label?: string;
  western?: boolean;
  showProgressRings?: boolean;
  animateOnChange?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  percentComplete: number;
}

const CountdownTimer = ({ 
  endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days from now
  className, 
  onComplete,
  label = "Contest Ends In:",
  western = true,
  showProgressRings = true,
  animateOnChange = true,
  size = 'md'
}: CountdownTimerProps) => {
  const initialTotalSeconds = useRef(Math.floor((endDate.getTime() - new Date().getTime()) / 1000));

  const calculateTimeLeft = (): TimeLeft => {
    const difference = endDate.getTime() - new Date().getTime();
    const totalSeconds = Math.max(0, Math.floor(difference / 1000));
    const percentComplete = Math.max(0, Math.min(100, 100 - (totalSeconds / initialTotalSeconds.current * 100)));
    
    if (difference <= 0) {
      if (onComplete) onComplete();
      return { 
        days: 0, 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
        totalSeconds: 0,
        percentComplete: 100
      };
    }
    
    return {
      days: Math.floor(totalSeconds / (60 * 60 * 24)),
      hours: Math.floor((totalSeconds / (60 * 60)) % 24),
      minutes: Math.floor((totalSeconds / 60) % 60),
      seconds: Math.floor(totalSeconds % 60),
      totalSeconds,
      percentComplete
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevTimeLeft(timeLeft);
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if countdown is complete
      if (newTimeLeft.totalSeconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, timeLeft]);

  // Size classes for containers
  const getSizeClasses = () => {
    switch(size) {
      case 'sm':
        return {
          container: 'p-1',
          digit: 'text-lg md:text-xl',
          label: 'text-[10px]',
          ring: 'w-12 h-12 md:w-14 md:h-14'
        };
      case 'lg':
        return {
          container: 'p-3',
          digit: 'text-3xl md:text-4xl',
          label: 'text-xs md:text-sm',
          ring: 'w-20 h-20 md:w-24 md:h-24'
        };
      case 'md':
      default:
        return {
          container: 'p-2',
          digit: 'text-2xl md:text-3xl',
          label: 'text-xs',
          ring: 'w-16 h-16 md:w-20 md:h-20'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Calculate stroke dash values for circular progress
  const calculateCircleProps = (value: number, max: number) => {
    const radius = 45; // SVG circle radius
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / max) * circumference;
    
    return {
      radius,
      circumference,
      strokeDasharray,
      strokeDashoffset
    };
  };

  // Animation variants for digit changes
  const digitVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  // Get color classes based on western theme
  const getColorClasses = () => {
    if (western) {
      return {
        background: 'bg-secondary-800',
        text: 'text-accent-400',
        labelText: 'text-accent-200',
        ring: 'stroke-accent-500',
        ringBackground: 'stroke-secondary-700'
      };
    }
    return {
      background: 'bg-gray-800',
      text: 'text-white',
      labelText: 'text-gray-300',
      ring: 'stroke-primary-500',
      ringBackground: 'stroke-gray-700'
    };
  };

  const colorClasses = getColorClasses();

  // Time units configuration
  const timeUnits = [
    { 
      label: 'Days', 
      value: timeLeft.days, 
      prevValue: prevTimeLeft.days,
      max: 365,
      changed: timeLeft.days !== prevTimeLeft.days
    },
    { 
      label: 'Hrs', 
      value: timeLeft.hours, 
      prevValue: prevTimeLeft.hours,
      max: 24,
      changed: timeLeft.hours !== prevTimeLeft.hours
    },
    { 
      label: 'Min', 
      value: timeLeft.minutes, 
      prevValue: prevTimeLeft.minutes,
      max: 60,
      changed: timeLeft.minutes !== prevTimeLeft.minutes
    },
    { 
      label: 'Sec', 
      value: timeLeft.seconds, 
      prevValue: prevTimeLeft.seconds,
      max: 60,
      changed: timeLeft.seconds !== prevTimeLeft.seconds
    }
  ];

  return (
    <div className={`text-center ${className || ''}`}>
      {label && (
        <p className={`font-semibold mb-3 ${western ? 'text-accent-300' : 'text-gray-400'}`}>
          {label}
        </p>
      )}
      
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {timeUnits.map(({ label, value, prevValue, max, changed }) => {
          const circleProps = calculateCircleProps(value, max);
          
          return (
            <div 
              key={label} 
              className={`relative ${colorClasses.background} rounded-lg ${western ? 'border-2 border-accent-600' : ''} ${sizeClasses.container}`}
            >
              {showProgressRings && (
                <div className={`absolute inset-0 flex items-center justify-center ${sizeClasses.ring}`}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={circleProps.radius}
                      fill="transparent"
                      strokeWidth="5"
                      className={colorClasses.ringBackground}
                    />
                    
                    {/* Progress circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={circleProps.radius}
                      fill="transparent"
                      strokeWidth="5"
                      className={colorClasses.ring}
                      strokeDasharray={circleProps.strokeDasharray}
                      initial={{ strokeDashoffset: circleProps.circumference }}
                      animate={{ strokeDashoffset: circleProps.strokeDashoffset }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              )}
              
              <div className="relative flex flex-col items-center justify-center h-full">
                {/* Digit */}
                <div className="relative overflow-hidden">
                  {animateOnChange && changed ? (
                    <motion.div
                      key={value}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={digitVariants}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`font-bold ${colorClasses.text} ${sizeClasses.digit}`}
                    >
                      {value.toString().padStart(2, '0')}
                    </motion.div>
                  ) : (
                    <div className={`font-bold ${colorClasses.text} ${sizeClasses.digit}`}>
                      {value.toString().padStart(2, '0')}
                    </div>
                  )}
                </div>
                
                {/* Label */}
                <div className={`uppercase tracking-wide ${colorClasses.labelText} ${sizeClasses.label}`}>
                  {label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Overall progress bar */}
      <motion.div 
        className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className={western ? "h-full bg-accent-500" : "h-full bg-primary-500"}
          initial={{ width: '0%' }}
          animate={{ width: `${timeLeft.percentComplete}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default CountdownTimer; 