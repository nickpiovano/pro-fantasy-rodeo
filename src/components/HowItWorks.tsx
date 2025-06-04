import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Users, Send, Trophy } from 'lucide-react';

interface HowItWorksProps {
  className?: string;
  western?: boolean;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ 
  className,
  western = true
}) => {
  const steps = [
    { 
      step: 1, 
      title: "Pick Your Team", 
      description: "Select one contestant from each PRCA event category to build your dream team.",
      icon: <Users className="w-6 h-6" />,
      color: western ? 'red-600' : 'blue-500'
    },
    { 
      step: 2, 
      title: "Submit Entry", 
      description: "Pay the $19.95 entry fee and lock in your picks before the deadline.",
      icon: <Send className="w-6 h-6" />,
      color: western ? 'red-600' : 'indigo-500'
    },
    { 
      step: 3, 
      title: "Win Big", 
      description: "Top teams split $60,000 in cash prizes plus a brand new Ram 1500 truck!",
      icon: <Trophy className="w-6 h-6" />,
      color: western ? 'red-600' : 'purple-500'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Style classes based on theme
  const cardClasses = western 
    ? 'border-2 border-red-600 bg-gray-900 shadow-lg' 
    : 'border border-gray-200 bg-white';
  
  const titleClasses = western 
    ? 'text-red-500 font-bold' 
    : 'text-gray-900';

  return (
    <Card className={`overflow-hidden ${cardClasses} ${className || ''}`}>
      <CardHeader className={western ? 'border-b border-red-800 bg-gradient-to-r from-gray-900 to-gray-800' : 'border-b'}>
        <CardTitle className={`text-center text-2xl ${titleClasses}`}>
          How It Works
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <motion.div 
          className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {steps.map(({ step, title, description, icon, color }) => (
            <motion.div 
              key={step} 
              className="relative"
              variants={itemVariants}
            >
              {/* Step number badge */}
              <div 
                className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 border-2 text-white border-gray-800"
                style={{ backgroundColor: western ? '#dc2626' : '' }}
              >
                {step}
              </div>
              
              {/* Step content */}
              <div className={`
                p-5 rounded-lg h-full flex flex-col
                ${western 
                  ? `bg-gray-800 border border-gray-700` 
                  : `bg-${color}/5 border border-${color}/20`
                }
              `}>
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-full mb-4 flex items-center justify-center
                  ${western 
                    ? `bg-red-900/50 text-red-400` 
                    : `bg-${color}/10 text-${color}`
                  }
                `}>
                  {icon}
                </div>
                
                {/* Title */}
                <h3 className={`
                  font-bold text-lg mb-2
                  ${western ? `text-red-400` : `text-${color}`}
                `}>
                  {title}
                </h3>
                
                {/* Description */}
                <p className={western ? 'text-gray-300' : 'text-gray-600'}>
                  {description}
                </p>
                
                {/* Completion checkmark for animation */}
                <motion.div 
                  className={`
                    mt-auto self-end w-6 h-6 rounded-full flex items-center justify-center
                    ${western ? `bg-red-600 text-white` : `bg-${color} text-white`}
                  `}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.5 + step * 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              </div>
              
              {/* Connector line (only for steps 1 and 2) */}
              {step < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-700">
                  <motion.div 
                    className={western ? "h-full bg-red-500" : `h-full bg-${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.7 + step * 0.2, duration: 0.5 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Mobile view progress indicator */}
        <div className="md:hidden mt-6 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: western ? '#f87171' : '' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorks; 