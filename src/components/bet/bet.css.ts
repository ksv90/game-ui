import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1vmin',
  alignItems: 'center',
  padding: '5px',
  color: '#FFFFFF',
});

export const presets = style({
  display: 'flex',
  gap: '1vmin',
});

export const presetButton = style({
  padding: '5px',
  fontSize: '14px',
  fontWeight: 'bold',
  background: '#0D1B2A',
  color: '#FFFFFF',
  borderRadius: '6px',
  cursor: 'pointer',
  border: 'none',
  transition: 'background-color 0.2s',
  ':hover': {
    background: '#1F2F3E',
  },
});

export const betControl = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1vmin',
  backgroundColor: '#1B263B',
  padding: '5px',
  borderRadius: '8px',
  width: '100%',
  justifyContent: 'center',
});

export const betValue = style({
  fontSize: '1em',
  fontWeight: 600,
  textAlign: 'center',
});

export const controls = style({
  display: 'flex',
  gap: '1vmin',
});

export const controlButton = style({
  width: '30px',
  height: '30px',
  fontSize: '1em',
  background: '#1F2F3E',
  color: '#C4CDD7',
  borderRadius: '50%',
  cursor: 'pointer',
  fontFamily: 'Roboto',
  lineHeight: '30px',
  letterSpacing: '100%',
  textAlign: 'center',
  verticalAlign: 'middle',

  ':hover': {
    backgroundColor: '#778DA9',
  },
});

export const betButton = style({
  backgroundColor: '#84D531',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '14px',
  padding: '10px',
  borderRadius: '6px',
  transition: 'opacity 0.2s ease',
  selectors: {
    '&:disabled': {
      backgroundColor: '#1f2d3d',
      color: '#aab8c2',
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
});
