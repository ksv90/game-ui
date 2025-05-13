import { style } from '@vanilla-extract/css';

export const headerClass = style({
  gridArea: 'header-area',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const textClass = style({
  fontFamily: 'Roboto',
  fontSize: '2rem',
  textTransform: 'uppercase',
  textAlign: 'center',
});
