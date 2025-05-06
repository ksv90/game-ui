import { EmitterEvents, IEmitterLite } from '../types';

export interface IGame<TGameEvents extends EmitterEvents<TGameEvents>> extends IEmitterLite<TGameEvents> {
  start(): void;
  stop(): void;
}
