import { style } from '@vanilla-extract/css';

export const balanceClass = style({
  gridArea: 'balance-area',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  boxSizing: 'border-box',
  backgroundColor: '#1F2F3E',
  borderRadius: '15px',
});
