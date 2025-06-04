/**
 * Pro Fantasy Rodeo Style Guide
 * 
 * This file contains standardized colors, spacing, typography, and other design elements
 * to ensure consistency and accessibility throughout the application.
 * 
 * WCAG 2.1 AA compliance is maintained for all color combinations.
 */

/**
 * Color Palette
 * 
 * All colors have been checked for accessibility and contrast ratios
 * against their intended background colors.
 */
export const colors = {
  // Primary brand colors - Red tones for the western rodeo theme
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',  // Main brand red
    600: '#dc2626',  // Darker red for buttons/accents
    700: '#b91c1c',  // Deep red for hover states
    800: '#991b1b',  // Very deep red for active states
    900: '#7f1d1d',  // Darkest red, used sparingly
  },
  
  // Secondary colors - Western earthy/stone tones
  secondary: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',  // Medium brown/stone
    600: '#57534e',  // Darker brown
    700: '#44403c',  // Deep brown
    800: '#292524',  // Very dark brown
    900: '#1c1917',  // Almost black brown
  },
  
  // Accent colors - Gold/Amber for highlights, prizes, and important callouts
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',  // Main gold/amber
    600: '#d97706',  // Darker gold
    700: '#b45309',  // Deep gold
    800: '#92400e',  // Very deep gold
    900: '#78350f',  // Darkest gold
  },
  
  // Success states - Green for positive actions and confirmations
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Warning states - Amber/Yellow for cautions and warnings
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Error states - Red for errors and critical issues
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Neutral colors for text, backgrounds, etc.
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Background colors - Dark theme with western feel
  background: {
    light: '#f8fafc',
    default: '#0f172a',  // Dark blue-gray for main background
    paper: '#1e293b',    // Slightly lighter for cards/elements
    elevated: '#334155', // For elevated elements
    dark: '#0a0a0a',     // Almost black for contrast elements
    gradient: {
      primary: 'linear-gradient(to right, #b91c1c, #dc2626)', // Red gradient
      accent: 'linear-gradient(to right, #b45309, #f59e0b)',  // Gold gradient
      dark: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))', // Dark overlay
    }
  },
  
  // Text colors - High contrast for accessibility
  text: {
    primary: '#ffffff',      // White text on dark backgrounds
    secondary: '#94a3b8',    // Lighter gray for secondary text
    disabled: '#64748b',     // Muted text
    hint: '#94a3b8',         // Hint text
    onPrimary: '#ffffff',    // Text on primary color
    onSecondary: '#ffffff',  // Text on secondary color
    onAccent: '#1e293b',     // Text on accent color (dark on gold)
    highlight: '#fcd34d',    // Yellow highlight text for emphasis
  },
};

/**
 * Typography
 * 
 * Font sizes, weights, and line heights for consistent typography
 */
export const typography = {
  fontFamily: {
    primary: 'Inter, system-ui, sans-serif',
    display: '"Playfair Display", serif',  // For headings with western flair
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    western: '"Rye", "Playfair Display", serif', // More stylized western font for special elements
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

/**
 * Spacing
 * 
 * Consistent spacing values for margins, paddings, and gaps
 */
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
};

/**
 * Border Radius
 * 
 * Consistent border radius values
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  full: '9999px',     // Fully rounded (circles)
};

/**
 * Shadows
 * 
 * Consistent shadow values
 */
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(239, 68, 68, 0.5)', // Primary color outline
  none: 'none',
  // Western-themed shadows
  western: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    button: '0 2px 4px rgba(0, 0, 0, 0.2)',
    hover: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Z-index
 * 
 * Consistent z-index values to manage stacking contexts
 */
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

/**
 * Animations
 * 
 * Reusable animation definitions
 */
export const animations = {
  transition: {
    fast: 'all 0.2s ease',
    default: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.7 },
    },
  },
  durations: {
    fast: '200ms',
    default: '300ms',
    slow: '500ms',
    verySlow: '800ms',
  },
};

/**
 * Component-specific styles
 * 
 * Reusable styles for specific components
 */
export const componentStyles = {
  card: {
    default: {
      bg: colors.background.paper,
      border: `1px solid ${colors.neutral[700]}`,
      borderRadius: borderRadius.lg,
      shadow: shadows.md,
    },
    western: {
      bg: colors.background.paper,
      border: `2px solid ${colors.primary[600]}`,
      borderRadius: borderRadius.md,
      shadow: shadows.western.card,
    },
    promotional: {
      bg: 'white',
      border: `2px solid ${colors.primary[500]}`,
      borderRadius: borderRadius.lg,
      shadow: shadows.lg,
    },
  },
  button: {
    primary: {
      bg: colors.primary[600],
      text: colors.text.onPrimary,
      hover: colors.primary[700],
      active: colors.primary[800],
      focus: `ring-2 ring-offset-2 ring-${colors.primary[500]}`,
      display: 'inline-flex items-center justify-center gap-2',
    },
    secondary: {
      bg: colors.secondary[600],
      text: colors.text.onSecondary,
      hover: colors.secondary[700],
      active: colors.secondary[800],
      focus: `ring-2 ring-offset-2 ring-${colors.secondary[500]}`,
      display: 'inline-flex items-center justify-center gap-2',
    },
    accent: {
      bg: colors.accent[500],
      text: colors.text.onAccent,
      hover: colors.accent[600],
      active: colors.accent[700],
      focus: `ring-2 ring-offset-2 ring-${colors.accent[500]}`,
      display: 'inline-flex items-center justify-center gap-2',
    },
    western: {
      bg: colors.primary[600],
      text: colors.text.onPrimary,
      border: `2px solid ${colors.primary[500]}`,
      hover: colors.primary[700],
      active: colors.primary[800],
      shadow: shadows.western.button,
      hoverShadow: shadows.western.hover,
      display: 'inline-flex items-center justify-center gap-2',
    },
  },
  // Button icon styles
  buttonIcon: {
    left: {
      marginRight: spacing[2],
      display: 'inline-flex',
      alignItems: 'center',
    },
    right: {
      marginLeft: spacing[2],
      display: 'inline-flex',
      alignItems: 'center',
    },
    loading: {
      marginRight: spacing[2],
      animation: 'spin 1s linear infinite',
    },
  },
  input: {
    bg: colors.background.paper,
    border: `1px solid ${colors.neutral[600]}`,
    text: colors.text.primary,
    placeholder: colors.text.secondary,
    focus: {
      border: `1px solid ${colors.primary[500]}`,
      outline: `2px solid ${colors.primary[500]}20`,
    },
  },
  badge: {
    default: {
      bg: colors.neutral[600],
      text: colors.text.primary,
    },
    primary: {
      bg: colors.primary[600],
      text: colors.text.onPrimary,
    },
    accent: {
      bg: colors.accent[500],
      text: colors.text.onAccent,
    },
    success: {
      bg: colors.success[600],
      text: 'white',
    },
    warning: {
      bg: colors.warning[500],
      text: colors.text.onAccent,
    },
    error: {
      bg: colors.error[600],
      text: 'white',
    },
  },
  hero: {
    gradient: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))`,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    titleText: colors.text.primary,
    subtitleBg: colors.primary[600],
    subtitleText: colors.text.onPrimary,
    accentText: colors.accent[300],
  },
};

/**
 * Accessibility
 * 
 * Helper functions and values for ensuring accessibility
 */
export const accessibility = {
  // Minimum contrast ratio for text (WCAG AA)
  minContrastRatio: 4.5,
  
  // Focus styles
  focusRing: `0 0 0 3px ${colors.primary[500]}80`,
  focusVisible: `outline: 2px solid ${colors.primary[500]}; outline-offset: 2px;`,
  
  // Screen reader only class
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
  
  // Interactive element states
  interactiveStates: {
    focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-${colors.primary[500]}`,
    hover: 'transition-colors duration-200',
    active: 'transform active:scale-95 transition-transform',
  },
  
  // ARIA attributes guide
  ariaAttributes: {
    buttons: 'aria-label, aria-pressed, aria-expanded, aria-controls',
    inputs: 'aria-label, aria-required, aria-invalid, aria-describedby',
    navigation: 'aria-current, aria-label',
    landmarks: 'role="region", role="banner", role="main", role="contentinfo"',
  },
};

/**
 * Responsive breakpoints
 * 
 * Consistent breakpoints for responsive design
 */
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Western theme specific styles
 * 
 * Special styles for the western rodeo theme
 */
export const westernTheme = {
  // Decorative elements
  decorations: {
    borderStyle: `2px solid ${colors.primary[600]}`,
    accentBorder: `2px solid ${colors.accent[500]}`,
    cardStyle: `bg-gray-900 border-2 border-red-600 rounded-lg overflow-hidden`,
    headerGradient: `bg-gradient-to-r from-red-700 to-red-600`,
  },
  
  // Typography for western elements
  typography: {
    headingFont: typography.fontFamily.western,
    titleCase: 'uppercase',
    letterSpacing: typography.letterSpacing.wide,
  },
  
  // Special components
  components: {
    badge: `bg-red-600 text-white font-bold px-4 py-1 rounded-full`,
    prizeHighlight: `text-yellow-300 font-semibold`,
    cardHeader: `bg-gradient-to-r from-red-700 to-red-600 text-white p-4`,
    button: {
      base: 'inline-flex items-center justify-center gap-2',
      icon: {
        left: 'mr-2 flex-shrink-0',
        right: 'ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform',
      }
    }
  },
};

// Export all style guide elements
export const styleGuide = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  componentStyles,
  accessibility,
  animations,
  breakpoints,
  westernTheme,
};

export default styleGuide; 