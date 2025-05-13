import { style } from '@vanilla-extract/css';

export const ticketClass = style({
  gridArea: 'ticket-area',
  boxSizing: 'border-box',
  backgroundColor: '#1F2F3E',
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
