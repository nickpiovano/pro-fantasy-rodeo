import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, DollarSign } from 'lucide-react';
import ProgressBar from './ProgressBar';
import contestService from '@/services/contest';
import { formatSalary } from '@/services/contest';

interface SalaryTrackerProps {
  /**
   * Current total salary
   */
  currentSalary: number;
  
  /**
   * Maximum salary cap
   */
  salaryCap?: number;
  
  /**
   * Whether to show warning when over salary cap
   */
  showWarning?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;

  /**
   * Number of selections made so far
   */
  selectionsCount: number;
}

const SalaryTracker: React.FC<SalaryTrackerProps> = ({
  currentSalary,
  salaryCap = 800000,
  showWarning = true,
  className = '',
  selectionsCount = 0,
}) => {
  // Calculate what percentage of the salary cap is used
  const percentUsed = Math.min(100, (currentSalary / salaryCap) * 100);
  
  // Determine if over salary cap
  const isOverCap = currentSalary > salaryCap;
  
  // Format salary for display
  const formattedCurrentSalary = formatSalary(currentSalary);
  const formattedSalaryCap = formatSalary(salaryCap);
  
  // Calculate average salary remaining per pick
  const remainingSalary = salaryCap - currentSalary;
  const remainingPicks = 10 - selectionsCount;
  const averageSalaryPerPick = remainingPicks > 0 ? Math.floor(remainingSalary / remainingPicks) : 0;
  const formattedAverageSalary = formatSalary(averageSalaryPerPick > 0 ? averageSalaryPerPick : 0);
  
  // Determine variant based on how close to cap
  const getVariant = () => {
    if (isOverCap) return 'danger';
    if (percentUsed > 90) return 'warning';
    if (percentUsed > 75) return 'info';
    return 'success';
  };
  
  // Animation for warning
  const warningAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };
  
  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="bg-red-600 p-1.5 rounded-md mr-2">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Salary Cap</span>
        </div>
        
        <div className="text-sm font-mono">
          <span className={`font-bold ${isOverCap ? 'text-red-400' : 'text-white'}`}>
            {formattedCurrentSalary}
          </span>
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-gray-300">{formattedSalaryCap}</span>
        </div>
      </div>
      
      <ProgressBar 
        value={currentSalary}
        max={salaryCap}
        variant={getVariant()}
        animate={true}
        showMilestones={true}
        milestones={[salaryCap * 0.25, salaryCap * 0.5, salaryCap * 0.75, salaryCap]}
      />
      
      <div className="flex justify-between items-center mt-2 text-xs">
        {/* Remaining salary */}
        <div className={`${isOverCap ? 'text-red-400' : 'text-gray-300'}`}>
          {isOverCap 
            ? <span className="font-medium">{formatSalary(currentSalary - salaryCap)} over</span> 
            : <span>{formatSalary(salaryCap - currentSalary)} remaining</span>
          }
        </div>
        
        {/* Average salary remaining per pick */}
        {!isOverCap && remainingPicks > 0 && (
          <div className="text-gray-300">
            Avg. per pick: <span className="font-medium text-red-300">{formattedAverageSalary}</span>
          </div>
        )}
      </div>
      
      {/* Warning message when over cap - always show when over cap */}
      {isOverCap && (
        <motion.div 
          className="mt-3 p-2 bg-red-900/50 border border-red-500 rounded-md flex items-center text-sm text-red-200"
          variants={warningAnimation}
          initial="hidden"
          animate="visible"
          key={`warning-${Date.now()}`} // Force re-render when triggered
        >
          <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
          <span>
            You've exceeded the salary cap. Please adjust your selections to continue.
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default SalaryTracker; 