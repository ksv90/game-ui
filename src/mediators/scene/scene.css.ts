import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'inline-flex',
  flexDirection: 'column',
  margin: '10px',
});

export const controls = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '12px',
});

export const buttonsGroup = style({
  display: 'flex',
});

export const buttonMarginRight = style({
  marginRight: '4px',
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
