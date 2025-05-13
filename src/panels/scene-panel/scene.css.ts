import { style } from '@vanilla-extract/css';

export const sceneClass = style({
  gridArea: 'scene-area',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
  backgroundColor: '#1F2F3E',
  borderRadius: '15px',
  padding: '2vmin',
});

export const betButton = style({
  backgroundColor: '#1F2F3E',
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
