// Modern UI redesign theme for Pro Fantasy Rodeo
// Inspired by FanDuel and DraftKings with Western charm

export const colors = {
  // Primary palette
  primary: {
    50: '#FDECEF',
    100: '#FAD5DB',
    200: '#F2A8B7',
    300: '#EA7A92',
    400: '#E24D6D',
    500: '#C8102E', // Main rodeo red
    600: '#A10D24',
    700: '#7A0A1B',
    800: '#530612',
    900: '#2C0309',
  },
  
  // Secondary palette - Navy
  secondary: {
    50: '#E6E9EF',
    100: '#CCD3DE',
    200: '#99A7BE',
    300: '#667A9D',
    400: '#334E7D',
    500: '#1A2B48', // Deep navy
    600: '#15223A',
    700: '#101A2C',
    800: '#0A111D',
    900: '#05090F',
  },
  
  // Accent palette - Gold
  accent: {
    50: '#FBF7E8',
    100: '#F7EFD0',
    200: '#F0DFA1',
    300: '#E8D073',
    400: '#E0C044',
    500: '#D4AF37', // Gold accent
    600: '#A98C2C',
    700: '#7F6921',
    800: '#544616',
    900: '#2A230B',
  },
  
  // Neutrals
  neutrals: {
    white: '#FFFFFF',
    offWhite: '#F8F5F2', // Warm off-white
    gray: {
      50: '#F5F3F2',
      100: '#E9E6E3',
      200: '#D2CCC7',
      300: '#BCB3AB',
      400: '#A59A8F',
      500: '#8E8174',
      600: '#72685D',
      700: '#554E46',
      800: '#39342F',
      900: '#1C1A17',
    },
    black: '#0F0D0B', // Warm black
  },
  
  // Feedback colors
  feedback: {
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    error: '#EF4444',   // Red
    info: '#3B82F6',    // Blue
  },
  
  // Transparent colors for glass effects
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    heavy: 'rgba(255, 255, 255, 0.2)',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #C8102E 0%, #A10D24 100%)',
    secondary: 'linear-gradient(135deg, #1A2B48 0%, #15223A 100%)',
    accent: 'linear-gradient(135deg, #D4AF37 0%, #A98C2C 100%)',
  },
};

// Spacing based on 8pt grid
export const spacing = {
  0: '0',
  0.5: '4px',
  1: '8px',
  1.5: '12px',
  2: '16px',
  2.5: '20px',
  3: '24px',
  3.5: '28px',
  4: '32px',
  5: '40px',
  6: '48px',
  7: '56px',
  8: '64px',
  9: '72px',
  10: '80px',
  12: '96px',
  14: '112px',
  16: '128px',
  20: '160px',
  24: '192px',
  28: '224px',
  32: '256px',
  36: '288px',
  40: '320px',
};

// Responsive breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Border radiuses
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

// Shadows for elevation
export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(15, 13, 11, 0.1)',
  md: '0 4px 6px -1px rgba(15, 13, 11, 0.1), 0 2px 4px -2px rgba(15, 13, 11, 0.1)',
  lg: '0 10px 15px -3px rgba(15, 13, 11, 0.1), 0 4px 6px -4px rgba(15, 13, 11, 0.1)',
  xl: '0 20px 25px -5px rgba(15, 13, 11, 0.1), 0 8px 10px -6px rgba(15, 13, 11, 0.1)',
  '2xl': '0 25px 50px -12px rgba(15, 13, 11, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(15, 13, 11, 0.05)',
  glass: '0 4px 30px rgba(15, 13, 11, 0.1)',
};

// Animation configurations
export const animation = {
  // Duration in ms
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
    verySlow: 500,
  },
  
  // Easing functions
  easing: {
    // Standard easing
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    
    // Emphasized easing
    emphasized: [0.2, 0, 0, 1],
    
    // Spring-like
    spring: [0.23, 1, 0.32, 1],
    
    // Bounce
    bounce: [0.175, 0.885, 0.32, 1.275],
  },
  
  // Spring configurations for react-spring
  spring: {
    gentle: {
      tension: 170,
      friction: 26,
    },
    wobbly: {
      tension: 180,
      friction: 12,
    },
    stiff: {
      tension: 300,
      friction: 20,
    },
    slow: {
      tension: 280,
      friction: 60,
    },
    molasses: {
      tension: 280,
      friction: 120,
    },
  },
  
  // Page transitions
  pageTransitions: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { y: 10, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -10, opacity: 0 },
    },
    scale: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
    },
  },
};

// Typography
export const typography = {
  // Font families
  fontFamily: {
    // TODO: Replace with actual font choices
    display: '"Playfair Display", Georgia, serif', // Western display font
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Font sizes (in px)
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },
  
  // Font weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Z-index values
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 100,
  overlay: 200,
  modal: 300,
  popover: 400,
  toast: 500,
  tooltip: 600,
};

// Default theme object
const theme = {
  colors,
  spacing,
  breakpoints,
  borderRadius,
  shadows,
  animation,
  typography,
  zIndex,
};

export default theme; 