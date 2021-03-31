import { TConstructor } from '../t-constructor.type';
import { ConstructorArray } from './constructor-array.type';

/**
 * The possible types of the target parameter of the create() method
 */
export type Target<T> = TConstructor<T> | ConstructorArray | DateConstructor| string ;
