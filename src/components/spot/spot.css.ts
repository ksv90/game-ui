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

export const spotBase = style({
  width: '48px',
  height: '48px',
  borderRadius: '6px',
  border: '1px solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  position: 'relative',
  cursor: 'pointer',
  animationName: fadeIn,
  animationDuration: '0.4s',
  animationTimingFunction: 'ease',
  animationFillMode: 'both',
});

export const spotVariants = styleVariants({
  default: {
    backgroundColor: '#284662',
    borderColor: '#0f1116',
    color: '#ffffff',
    border: '2px solid #000000',
    selectors: {
      '&:hover': {
        background: '#1F3450',
        border: '2px solid #275290',
      },
    },
  },

  picked: {
    backgroundColor: '#284662',
    color: '#78B7FF',
    border: '2px solid rgb(0, 0, 0)',
    selectors: {
      '&:hover': {
        background: '#1F3450',
        color: '#78B7FF',
        border: '2px solid #275290',
      },
    },
  },
  disabled: {
    backgroundColor: '#1e2a38',
    borderColor: '#0f1116',
    color: '#C4CDD7',
    opacity: 0.6,
    cursor: 'not-allowed',
    pointerEvents: 'none',
    background: '#1F2F3E',
  },
  drawn: {
    backgroundColor: '#1F2F3E',
    borderColor: '#0f1116',
    color: '#FFFEFF',
    cursor: 'not-allowed',
    pointerEvents: 'none',
    selectors: {
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#0E5BA4',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        animationName: scale,
        animationDuration: '0.3s',
        animationTimingFunction: 'ease',
        animationFillMode: 'forwards',
      },
    },
  },
});

export const spotSpan = style({
  position: 'relative',
  zIndex: 1,
});
