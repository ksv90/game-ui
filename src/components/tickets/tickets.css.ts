import { style, styleVariants } from '@vanilla-extract/css';

export const ticketContainerClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const ticketBaseClass = style({
  width: '450px',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #2d3e50',
  backgroundColor: '#243447',
});

export const spotRowClass = style({
  display: 'flex',
  gap: '4px',
});

export const betClass = style({
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '18px',
  whiteSpace: 'nowrap',
  textAlign: 'right',
});

export const ticketVariants = styleVariants({
  default: [
    ticketBaseClass,
    {
      backgroundColor: '#2c3e50',
      borderColor: '#2c3e50',
      selectors: {
        '&:hover': {
          borderColor: '#4169e1',
        },
      },
    },
  ],
  disabled: [ticketBaseClass, { backgroundColor: '#1a232f', borderColor: '#1a232f' }],
});
