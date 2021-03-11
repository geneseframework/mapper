import { TConstructor } from '../t-constructor.type';
import { ConstructorArray } from './constructor-array.type';

export type Target<T> = TConstructor<T> | ConstructorArray | DateConstructor| string ;
