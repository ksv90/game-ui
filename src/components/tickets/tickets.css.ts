import { style, styleVariants } from '@vanilla-extract/css';

export const ticketContainerClass = style({
  backgroundColor: '#1B2B3C',
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '8px',
  borderRadius: '6px',
});

export const ticketBaseClass = style({
  backgroundColor: '#243447',
  borderRadius: '8px',
  borderStyle: 'solid',
  borderWidth: '1px',
  padding: '12px 16px',
  width: '450px',
});

export const spotRowClass = style({
  display: 'flex',
  gap: '4px',
});

export const betClass = style({
  color: '#FFFFFF',
  fontSize: '18px',
  fontWeight: 700,
  textAlign: 'right',
  whiteSpace: 'nowrap',
});

export const ticketVariants = styleVariants({
  default: [
    ticketBaseClass,
    {
      backgroundColor: '#284662',
      borderColor: '#000000',

      selectors: {
        '&:hover': {
          backgroundColor: '#1F3450',
          borderColor: '#275290',
        },
      },
    },
  ],
  disabled: [
    ticketBaseClass,
    {
      backgroundColor: '#1F2F3E',
      border: 'none',
    },
  ],
});
