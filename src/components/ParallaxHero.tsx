import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button-new';
import useParallax from '@/hooks/useParallax';
import CountdownTimer from './CountdownTimer';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  prizeText: string;
  endDate: Date;
  onStartEntry: () => void;
  className?: string;
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  title,
  subtitle,
  prizeText,
  endDate,
  onStartEntry,
  className = '',
}) => {
  // Refs for parallax elements
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const midgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax effects for different layers
  const backgroundParallax = useParallax(backgroundRef, { speed: 0.2, direction: 'up' });
  const midgroundParallax = useParallax(midgroundRef, { speed: 0.4, direction: 'up' });
  const foregroundParallax = useParallax(foregroundRef, { speed: 0.1, direction: 'down' });
  const contentParallax = useParallax(contentRef, { speed: 0.05, direction: 'up' });

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden h-[500px] md:h-[600px] w-full ${className}`}
    >
      {/* Background layer - Mountains */}
      <div 
        ref={backgroundRef}
        style={{
          ...backgroundParallax.style,
          backgroundImage: 'url("/images/mountains.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
        className="absolute inset-0 z-0"
      />

      {/* Midground layer - Hills */}
      <div 
        ref={midgroundRef}
        style={{
          ...midgroundParallax.style,
          backgroundImage: 'url("/images/hills.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
        className="absolute inset-0 z-10"
      />

      {/* Foreground layer - Western elements */}
      <div 
        ref={foregroundRef}
        style={{
          ...foregroundParallax.style,
          backgroundImage: 'url("/images/western-elements.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
        className="absolute inset-0 z-20"
      />

      {/* Gradient overlay - Darker to ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-30" />

      {/* Content */}
      <div 
        ref={contentRef}
        style={contentParallax.style}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-red-600 text-white font-bold px-4 py-1 rounded-full text-sm md:text-base mb-3"
        >
          {subtitle}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-yellow-300 text-lg md:text-xl font-semibold mb-6 drop-shadow-md"
        >
          {prizeText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
            <CountdownTimer endDate={endDate} className="text-gray-800" />
          </div>

          <Button 
            variant="primary" 
            className="mt-6 px-10 py-4 text-xl font-bold bg-red-600 hover:bg-red-700"
            onClick={onStartEntry}
            rightIcon={<ArrowRight className="h-6 w-6" />}
          >
            BUILD YOUR TEAM
          </Button>
          
          <p className="text-center text-white text-sm mt-3 bg-black/50 py-2 rounded-md">
            Entry Fee: <span className="font-bold text-yellow-300">$19.95</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxHero; 