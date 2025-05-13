import { style } from '@vanilla-extract/css';

export const BALANCE_AREAS = 'balance-area';
export const CONTROLS_AREAS = 'controls-area';
export const HEADER_AREAS = 'header-area';
export const SCENE_AREAS = 'scene-area';
export const INFO_AREAS = 'info-area';

export const layout = style({
  display: 'grid',
  backgroundColor: '#233548',
  overflow: 'hidden',
  height: '100vh',
  padding: '2vmin',
  gap: '5vmin',
  maxWidth: '1920px',
  margin: '0 auto',

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
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: '2fr 2fr 2fr 6fr',
      gridTemplateAreas: `
        "${SCENE_AREAS} ${HEADER_AREAS}"
        "${SCENE_AREAS} ${BALANCE_AREAS}"
        "${SCENE_AREAS} ${INFO_AREAS}"
        "${SCENE_AREAS} ${CONTROLS_AREAS}"
      `,
    },
  },
});
