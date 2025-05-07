import { style } from '@vanilla-extract/css';

export const container = style({
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
});

export const label = style({
  display: 'flex',
  width: '200px',
  alignItems: 'center',
});

export const value = style({
  display: 'flex',
  flexBasis: '50px',
  alignItems: 'center',
});

export const button = style({
  margin: '0 10px',
});
