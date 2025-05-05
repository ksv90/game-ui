import { Centrifuge } from 'centrifuge';

import { IKenoReceiver } from './keno.types';

export * from 'centrifuge';

export class KenoReceiver extends Centrifuge implements IKenoReceiver {}
