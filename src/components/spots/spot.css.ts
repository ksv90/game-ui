import { keyframes, style, styleVariants } from '@vanilla-extract/css';

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const scale = keyframes({
  '0%': { transform: 'translate(-50%, -50%) scale(1)' },
  '50%': { transform: 'translate(-50%, -50%) scale(1.3)' },
  '100%': { transform: 'translate(-50%, -50%) scale(1)' },
});

export const spotSpan = style({
  position: 'relative',
  zIndex: 1,
});

export const grid = style({
  backgroundColor: '#1F2F3E',
  borderRadius: '6px',
  display: 'grid',
  gap: '2px',
  gridTemplateColumns: 'repeat(10, 38px)',
  justifyContent: 'space-around',
  maxWidth: '400px',
});

export const spotBase = style({
  alignItems: 'center',
  animationDuration: '0.4s',
  animationFillMode: 'both',
  animationName: fadeIn,
  animationTimingFunction: 'ease',
  borderRadius: '6px',
  borderStyle: 'solid',
  borderWidth: '1px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '16px',
  fontWeight: 'bold',
  height: '38px',
  justifyContent: 'center',
  position: 'relative',
  transitionBehavior: 'all',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease',
  userSelect: 'none',
  width: '38px',
});

export const spotVariants = styleVariants({
  default: [
    spotBase,
    {
      backgroundColor: '#284662',
      borderColor: '#000000',
      color: '#FFFFFF',

      selectors: {
        '&:hover': {
          backgroundColor: '#1F3450',
          borderColor: '#275290',
        },
      },
    },
  ],

  picked: [
    spotBase,
    {
      backgroundColor: '#0E5BA4',
      borderColor: '#000000',
      color: '#78B7FF',

      selectors: {
        '&:hover': {
          backgroundColor: '#1F3450',
          borderColor: '#275290',
          color: '#78B7FF',
        },
      },
    },
  ],
  disabled: [
    spotBase,
    {
      backgroundColor: '#1F2F3E',
      border: 'none',
      color: '#C4CDD7',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  ],
  drawn: [
    spotBase,
    {
      backgroundColor: '#1F2F3E',
      border: 'none',
      color: '#FFFEFF',
      cursor: 'not-allowed',
      pointerEvents: 'none',

      selectors: {
        '&::after': {
          animationDuration: '0.3s',
          animationFillMode: 'forwards',
          animationName: scale,
          animationTimingFunction: 'ease',
          backgroundColor: '#0E5BA4',
          borderRadius: '50%',
          content: '""',
          height: '32px',
          left: '50%',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '32px',
          zIndex: 0,
        },
      },
    },
  ],
});
