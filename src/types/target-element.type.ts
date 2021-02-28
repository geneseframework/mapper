import { TConstructor } from './t-constructor.type';
import { PrimitiveConstructor } from './primitives.type';

export type TargetElement<T> = TConstructor<T> | PrimitiveConstructor | string;
