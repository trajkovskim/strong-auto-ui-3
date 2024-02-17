export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export default {
  padding: {
    xs: '0.2rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    '2xl': '8rem',
  },
  breakpoints: {
    maxWidth: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1400px',
    },
    minWidth: {
      xs: '0px',
      sm: '321px',
      md: '481px',
      lg: '769px',
      xl: '1025px',
      '2xl': '1201px',
    },
  },
};
