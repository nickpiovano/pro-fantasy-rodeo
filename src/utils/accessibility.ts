/**
 * Accessibility utilities for ensuring WCAG compliance
 */

/**
 * Check if a color combination meets WCAG AA contrast requirements
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param isLargeText - Whether the text is considered "large" (18pt+/14pt+ bold)
 * @returns Whether the contrast ratio meets WCAG AA requirements
 */
export const meetsWCAGAA = (
  foreground: string,
  background: string,
  isLargeText = false
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
};

/**
 * Check if a color combination meets WCAG AAA contrast requirements
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param isLargeText - Whether the text is considered "large" (18pt+/14pt+ bold)
 * @returns Whether the contrast ratio meets WCAG AAA requirements
 */
export const meetsWCAGAAA = (
  foreground: string,
  background: string,
  isLargeText = false
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  // WCAG AAA requires 7:1 for normal text, 4.5:1 for large text
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Calculate the contrast ratio between two colors
 * 
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @returns Contrast ratio between the two colors
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const lighterLum = Math.max(lum1, lum2);
  const darkerLum = Math.min(lum1, lum2);
  
  return (lighterLum + 0.05) / (darkerLum + 0.05);
};

/**
 * Calculate the relative luminance of a color
 * 
 * @param color - Color in hex format
 * @returns Relative luminance of the color
 */
export const getLuminance = (color: string): number => {
  const rgb = hexToRgb(color);
  
  const [r, g, b] = rgb.map(val => {
    const channel = val / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  
  // Luminance formula based on WCAG specification
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Convert a hex color to RGB values
 * 
 * @param hex - Color in hex format (with or without #)
 * @returns Array of RGB values [r, g, b]
 */
export const hexToRgb = (hex: string): number[] => {
  // Remove # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  
  // Handle shorthand hex (e.g., #FFF)
  const processedHex = cleanHex.length === 3
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;
  
  const r = parseInt(processedHex.substring(0, 2), 16);
  const g = parseInt(processedHex.substring(2, 4), 16);
  const b = parseInt(processedHex.substring(4, 6), 16);
  
  return [r, g, b];
};

/**
 * Get an accessible text color (black or white) based on background color
 * 
 * @param backgroundColor - Background color in hex format
 * @returns '#FFFFFF' for dark backgrounds or '#000000' for light backgrounds
 */
export const getAccessibleTextColor = (backgroundColor: string): string => {
  const luminance = getLuminance(backgroundColor);
  // If background is dark, use white text; otherwise, use black text
  return luminance > 0.179 ? '#000000' : '#FFFFFF';
};

/**
 * Verify if a set of theme colors meets WCAG AA contrast requirements
 * 
 * @param colors - Object containing theme colors
 * @returns Object with results of contrast checks
 */
export const verifyThemeContrast = (colors: Record<string, string>): Record<string, boolean> => {
  const results: Record<string, boolean> = {};
  
  // Text colors on backgrounds
  if (colors.textPrimary && colors.background) {
    results['textPrimary_on_background'] = meetsWCAGAA(colors.textPrimary, colors.background);
  }
  
  if (colors.textSecondary && colors.background) {
    results['textSecondary_on_background'] = meetsWCAGAA(colors.textSecondary, colors.background);
  }
  
  // Primary color as background
  if (colors.white && colors.primary) {
    results['white_on_primary'] = meetsWCAGAA(colors.white, colors.primary);
  }
  
  if (colors.black && colors.primary) {
    results['black_on_primary'] = meetsWCAGAA(colors.black, colors.primary);
  }
  
  // Secondary color as background
  if (colors.white && colors.secondary) {
    results['white_on_secondary'] = meetsWCAGAA(colors.white, colors.secondary);
  }
  
  if (colors.black && colors.secondary) {
    results['black_on_secondary'] = meetsWCAGAA(colors.black, colors.secondary);
  }
  
  return results;
};

export default {
  meetsWCAGAA,
  meetsWCAGAAA,
  getContrastRatio,
  getLuminance,
  hexToRgb,
  getAccessibleTextColor,
  verifyThemeContrast,
}; 