import { style } from '@vanilla-extract/css';

export const headerClass = style({
  gridArea: 'header-area',
  textTransform: 'uppercase',
  textAlign: 'center',
});

export const textClass = style({
  fontFamily: 'Roboto',
  fontSize: 40,
  marginTop: '60px',
});
