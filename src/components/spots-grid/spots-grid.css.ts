import { style } from '@vanilla-extract/css';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 48px)',
  gridAutoRows: '48px',
  gap: '2px',
  justifyContent: 'center',
  marginTop: '24px',
});
