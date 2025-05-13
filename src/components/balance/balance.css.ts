import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#1f2d3d',
  width: '250px',
  height: '60px',
  borderRadius: '8px',
  padding: '15px 50px',
  marginTop: '60px',
  marginRight: '10px',
});

export const label = style({
  color: '#aab8c2',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '100%',
  textAlign: 'center',
});

export const amount = style({
  color: 'white',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '100%',
  textAlign: 'center',
});
