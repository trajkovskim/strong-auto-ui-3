export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type BreakpointsProps = {
  [T in Breakpoints]?: number;
};

export const LARGEST_BREAKPOINT: Breakpoints = '3xl';

export default {
  padding: {
    xs: '0.2rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    '2xl': '8rem',
    '3xl': '10rem',
  },
  breakpoints: {
    maxWidth: {
      xs: '30em',
      sm: '48em',
      md: '62em',
      lg: '80em',
      xl: '96em',
      '2xl': '120em',
      '3xl': '160em',
    },
    minWidth: {
      xs: '0em',
      sm: 'calc(30em + 1px)',
      md: 'calc(48em + 1px)',
      lg: 'calc(62em + 1px)',
      xl: 'calc(80em + 1px)',
      '2xl': 'calc(96em + 1px)',
      '3xl': 'calc(120em + 1px)',
    },
  },
};
