import { style } from '@vanilla-extract/css';

export const grid = style({
  backgroundColor: '#1F2F3E',
  borderRadius: '6px',
  display: 'grid',
  gap: '2px',
  gridAutoRows: '48px',
  gridTemplateColumns: 'repeat(10, 48px)',
  justifyContent: 'center',
  marginTop: '24px',
  padding: '8px',
});
