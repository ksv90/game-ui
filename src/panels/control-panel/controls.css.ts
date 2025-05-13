import { style } from '@vanilla-extract/css';

export const controlsClass = style({
  gridArea: 'controls-area',
  boxSizing: 'border-box',
  backgroundColor: '#1F2F3E',
  borderRadius: '15px',
});

export const buttonsGroup = style({
  display: 'flex',
});

export const buttonTemp = style({
  height: '5vmin',
  margin: '0 5px',
});
