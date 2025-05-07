import { style } from '@vanilla-extract/css';

export const BALANCE_AREAS = 'balance-area';

export const CONTROLS_AREAS = 'controls-area';

export const HEADER_AREAS = 'header-area';

export const SCENE_AREAS = 'scene-area';

export const baseLayout = style({
  display: 'grid',
  overflow: 'hidden',
  height: '100vh',
});

export const layoutPortrait = style([
  baseLayout,
  {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 3fr 2fr',
    gridTemplateAreas: `
      "${HEADER_AREAS} ${BALANCE_AREAS}"
      "${SCENE_AREAS} ${SCENE_AREAS}"
      "${CONTROLS_AREAS} ${CONTROLS_AREAS}"
    `,
  },
]);

export const layoutLandscape = style([
  baseLayout,
  {
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: '1fr 1fr 4fr',
    gridTemplateAreas: `
      "${SCENE_AREAS} ${HEADER_AREAS}"
      "${SCENE_AREAS} ${BALANCE_AREAS}"
      "${SCENE_AREAS} ${CONTROLS_AREAS}"
    `,
  },
]);
