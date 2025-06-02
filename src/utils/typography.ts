/**
 * Typography utility functions for text handling
 */

/**
 * Truncates text to a specified length and adds an ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns The truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength).trim()}...`;
};

/**
 * Calculates if a text color meets WCAG AA contrast requirements
 * against a background color
 * @param textColor - Hex color of the text
 * @param backgroundColor - Hex color of the background
 * @returns Boolean indicating if the contrast meets WCAG AA requirements
 */
export const meetsContrastRequirements = (
  textColor: string,
  backgroundColor: string
): boolean => {
  // Convert hex to RGB
  const hexToRgb = (hex: string): number[] => {
    const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return [r, g, b];
  };
  
  // Calculate relative luminance
  const getLuminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map(c => {
      const val = c / 255;
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  // Calculate contrast ratio
  const getContrastRatio = (lum1: number, lum2: number): number => {
    const lighterLum = Math.max(lum1, lum2);
    const darkerLum = Math.min(lum1, lum2);
    return (lighterLum + 0.05) / (darkerLum + 0.05);
  };
  
  const textRgb = hexToRgb(textColor);
  const bgRgb = hexToRgb(backgroundColor);
  
  const textLum = getLuminance(textRgb);
  const bgLum = getLuminance(bgRgb);
  
  const contrastRatio = getContrastRatio(textLum, bgLum);
  
  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  return contrastRatio >= 4.5;
};

/**
 * Utility CSS classes for text handling
 */
export const textClasses = {
  truncate: 'overflow-hidden whitespace-nowrap text-ellipsis',
  clamp1: 'overflow-hidden display-webkit-box -webkit-line-clamp-1 -webkit-box-orient-vertical',
  clamp2: 'overflow-hidden display-webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical',
  clamp3: 'overflow-hidden display-webkit-box -webkit-line-clamp-3 -webkit-box-orient-vertical',
};

/**
 * Additional CSS utility classes for responsive text
 */
export const responsiveText = {
  // Make text size responsive based on viewport width
  fluid: 'text-[clamp(1rem,5vw,1.5rem)]',
  
  // Truncate on small screens only
  truncateMobile: 'md:whitespace-normal md:text-ellipsis-none md:overflow-visible',
};

export default {
  truncateText,
  meetsContrastRequirements,
  textClasses,
  responsiveText,
}; 