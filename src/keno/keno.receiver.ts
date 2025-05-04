import { IKenoReceiver } from '@ui/helpers';
import { Centrifuge } from 'centrifuge';

export * from 'centrifuge';

export class KenoReceiver extends Centrifuge implements IKenoReceiver {}
