import { style } from '@vanilla-extract/css';

export const DESKTOP_WIDTH = 1080;

export const BALANCE_AREAS = 'balance-area';
export const CONTROLS_AREAS = 'controls-area';
export const HEADER_AREAS = 'header-area';
export const SCENE_AREAS = 'scene-area';
export const INFO_AREAS = 'info-area';
export const TICKET_AREAS = 'ticket-area';

export const layout = style({
  display: 'grid',
  backgroundColor: '#233548',
  overflow: 'hidden',
  padding: '2vmin',
  gap: '5vmin',
  maxWidth: '1920px',
  margin: '0 auto',
  color: '#ffffff',
  fontFamily: 'Roboto',

  minWidth: '320px',
  minHeight: '320px',

  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,

  gridTemplateColumns: '1fr 2fr',
  gridTemplateRows: '1fr 6fr 2fr 3fr',
  gridTemplateAreas: `
    "${HEADER_AREAS} ${BALANCE_AREAS}"
    "${SCENE_AREAS} ${SCENE_AREAS}"
    "${INFO_AREAS} ${INFO_AREAS}"
    "${CONTROLS_AREAS} ${CONTROLS_AREAS}"
  `,

  '@media': {
    '(orientation: landscape)': {
      gap: '2vmin',
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: '1fr 2fr 2fr 7fr',
      gridTemplateAreas: `
        "${SCENE_AREAS} ${HEADER_AREAS}"
        "${SCENE_AREAS} ${BALANCE_AREAS}"
        "${SCENE_AREAS} ${INFO_AREAS}"
        "${SCENE_AREAS} ${CONTROLS_AREAS}"
      `,
    },
    [`(orientation: portrait) and (min-width: ${String(DESKTOP_WIDTH)}px)`]: {
      gap: '2vmin',
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: '1fr 2fr 2fr 2fr 4fr',
      gridTemplateAreas: `
        "${SCENE_AREAS} ${HEADER_AREAS}"
        "${SCENE_AREAS} ${BALANCE_AREAS}"
        "${SCENE_AREAS} ${INFO_AREAS}"
        "${SCENE_AREAS} ${CONTROLS_AREAS}"
        "${TICKET_AREAS} ${CONTROLS_AREAS}"
      `,
    },
    [`(orientation: landscape) and (min-width: ${String(DESKTOP_WIDTH)}px)`]: {
      gap: '2vmin',
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: '1fr 2fr 2fr 6fr',
      gridTemplateAreas: `
        "${TICKET_AREAS} ${SCENE_AREAS} ${HEADER_AREAS}"
        "${TICKET_AREAS} ${SCENE_AREAS} ${BALANCE_AREAS}"
        "${TICKET_AREAS} ${SCENE_AREAS} ${INFO_AREAS}"
        "${TICKET_AREAS} ${SCENE_AREAS} ${CONTROLS_AREAS}"
      `,
    },
    [`(min-width: ${String(DESKTOP_WIDTH)}px) and (min-height: ${String(DESKTOP_WIDTH)}px)`]: {
      gap: '2vmin',
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: '1fr 4fr 4fr 3fr',
      gridTemplateAreas: `
        "${TICKET_AREAS} ${SCENE_AREAS} ${HEADER_AREAS}"
        "${TICKET_AREAS} ${SCENE_AREAS} ${BALANCE_AREAS}"
        "${TICKET_AREAS} ${SCENE_AREAS} ${CONTROLS_AREAS}"
        "${TICKET_AREAS} ${INFO_AREAS} ${CONTROLS_AREAS}"
      `,
    },
  },
});
