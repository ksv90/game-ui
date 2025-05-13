import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  backgroundColor: '#0D1B2A',
  padding: '16px',
  borderRadius: '8px',
  color: '#FFFFFF',
});

export const presets = style({
  display: 'flex',
  gap: '12px',
});

export const presetButton = style({
  padding: '8px 12px',
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
  gap: '16px',
  backgroundColor: '#1B263B',
  padding: '8px 16px',
  borderRadius: '8px',
  width: '1150',
  height: '380',
  top: '1380px',
  left: '2500px',
});

export const betValue = style({
  fontSize: '20px',
  fontWeight: 600,
  minWidth: '80px',
  textAlign: 'center',
});

export const controls = style({
  display: 'flex',
  gap: '8px',
});

export const controlButton = style({
  width: '25px',
  height: '35px',
  fontSize: '25px',
  fontWeight: 'bold',
  background: '#1F2F3E',
  color: '#C4CDD7',
  borderRadius: '50%',
  cursor: 'pointer',
  fontFamily: 'Roboto',
  lineHeight: '100%',
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
  padding: '20px 50px',
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
