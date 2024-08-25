import type { RibbonProps, RibbonType } from 'components/card/types';

export const ribbons: Record<RibbonType, RibbonProps> = {
  sold: {
    background: 'linear-gradient(#f14f3f 0, #cb4335 100%)',
    color: '#fff',
    label: 'strongauto.vehicleState.SOLD',
  },
  featured: {
    background: 'linear-gradient(#54f13f 0, #5fcb35 100%)',
    color: '#fff',
    label: 'strongauto.vehicleState.FEATURED',
  },
};
