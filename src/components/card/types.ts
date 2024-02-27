export type RibbonProps = {
  label: React.ReactNode;
  background: React.CSSProperties['background'];
  color?: React.CSSProperties['color'];
};

export type RibbonType = 'sold' | 'featured';

export type StyledRibbonProps = Omit<RibbonProps, 'label'>;
