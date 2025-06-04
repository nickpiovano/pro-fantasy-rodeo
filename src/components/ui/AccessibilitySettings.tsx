import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toggle } from "@/components/ui";
import { Label } from "@/components/ui/label";

export interface AccessibilitySettingsProps {
  /**
   * Whether to use Western styling
   */
  westernStyle?: boolean;
  
  /**
   * Whether to use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Initial settings
   */
  initialSettings?: AccessibilityPreferences;
  
  /**
   * Callback when settings change
   */
  onSettingsChange?: (settings: AccessibilityPreferences) => void;
  
  /**
   * Additional className
   */
  className?: string;
}

export interface AccessibilityPreferences {
  /**
   * Whether to reduce motion for animations
   */
  reduceMotion: boolean;
  
  /**
   * Whether to reduce visual effects like glass, blur, etc.
   */
  reduceVisualEffects: boolean;
  
  /**
   * Whether to use high contrast mode
   */
  highContrast: boolean;
  
  /**
   * Font size multiplier (1 = normal, 1.5 = large, 2 = extra large)
   */
  fontSizeMultiplier: number;
}

/**
 * Component for managing accessibility preferences related to animations and effects
 */
export const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({
  westernStyle = false,
  useGlass = false,
  initialSettings,
  onSettingsChange,
  className = '',
}) => {
  // Default settings
  const defaultSettings: AccessibilityPreferences = {
    reduceMotion: false,
    reduceVisualEffects: false,
    highContrast: false,
    fontSizeMultiplier: 1,
  };
  
  // Initialize state with defaults or provided initial settings
  const [settings, setSettings] = useState<AccessibilityPreferences>(
    initialSettings || defaultSettings
  );
  
  // Check for system preferences on mount
  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for prefers-contrast
    const prefersContrast = window.matchMedia('(prefers-contrast: more)').matches;
    
    // Update settings based on system preferences if not explicitly set
    if (!initialSettings) {
      setSettings(prev => ({
        ...prev,
        reduceMotion: prefersReducedMotion,
        highContrast: prefersContrast,
      }));
    }
  }, [initialSettings]);
  
  // Notify parent when settings change
  useEffect(() => {
    if (onSettingsChange) {
      onSettingsChange(settings);
    }
    
    // Apply settings to document
    document.documentElement.style.setProperty(
      '--motion-preference', 
      settings.reduceMotion ? 'reduce' : 'no-preference'
    );
    
    document.documentElement.classList.toggle('reduce-effects', settings.reduceVisualEffects);
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.style.setProperty(
      '--font-size-multiplier', 
      settings.fontSizeMultiplier.toString()
    );
  }, [settings, onSettingsChange]);
  
  // Update a specific setting
  const updateSetting = <T extends boolean | number>(key: keyof AccessibilityPreferences, value: T) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  // Container classes
  const containerClasses = `
    p-4 rounded-lg
    ${useGlass ? 'bg-white/10 backdrop-blur-md border border-white/20' : 
      westernStyle ? 'bg-offwhite border-2 border-accent-500' : 
      'bg-white border border-gray-200'}
    ${className}
  `.trim();
  
  // Section heading classes
  const headingClasses = `
    text-lg font-medium mb-4
    ${westernStyle ? 'text-secondary-800 font-display' : 'text-gray-900'}
  `.trim();
  
  // Section classes
  const sectionClasses = `
    mb-6 last:mb-0
  `.trim();
  
  // Divider classes
  const dividerClasses = `
    my-4 border-t
    ${westernStyle ? 'border-accent-300/30' : 'border-gray-200'}
  `.trim();
  
  // Font size options
  const fontSizeOptions = [
    { label: 'Normal', value: 1 },
    { label: 'Large', value: 1.25 },
    { label: 'Extra Large', value: 1.5 },
  ];
  
  return (
    <div className={containerClasses}>
      <h2 className={headingClasses}>Accessibility Settings</h2>
      
      <div className={sectionClasses}>
        <Toggle
          label="Reduce Motion"
          checked={settings.reduceMotion}
          onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
          helperText="Minimize animations and transitions throughout the application"
          variant={westernStyle ? 'western' : 'default'}
          size="md"
        />
      </div>
      
      <div className={sectionClasses}>
        <Toggle
          label="Reduce Visual Effects"
          checked={settings.reduceVisualEffects}
          onChange={(e) => updateSetting('reduceVisualEffects', e.target.checked)}
          helperText="Disable blur, glass effects, and other intensive visual treatments"
          variant={westernStyle ? 'western' : 'default'}
          size="md"
        />
      </div>
      
      <div className={sectionClasses}>
        <Toggle
          label="High Contrast Mode"
          checked={settings.highContrast}
          onChange={(e) => updateSetting('highContrast', e.target.checked)}
          helperText="Increase contrast for better visibility and readability"
          variant={westernStyle ? 'western' : 'default'}
          size="md"
        />
      </div>
      
      <div className={dividerClasses} />
      
      <div className={sectionClasses}>
        <label className="block mb-2 font-medium text-gray-700">Text Size</label>
        <div className="flex space-x-2">
          {fontSizeOptions.map((option) => (
            <motion.button
              key={option.value}
              className={`
                px-4 py-2 rounded-md border transition-colors
                ${settings.fontSizeMultiplier === option.value
                  ? westernStyle
                    ? 'bg-accent-100 border-accent-500 text-secondary-800'
                    : 'bg-primary-100 border-primary-500 text-primary-800'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
              whileTap={{ scale: 0.97 }}
              onClick={() => updateSetting('fontSizeMultiplier', option.value)}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Adjust the size of text throughout the application
        </p>
      </div>
      
      <div className={dividerClasses} />
      
      <div className="text-xs text-gray-500 mt-4">
        <p>
          Your preferences will be saved and applied across all pages.
          Some settings may require a page refresh to fully apply.
        </p>
      </div>
    </div>
  );
}; 