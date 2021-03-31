import { TConstructor } from '../others/t-constructor.type';
import { PrimitiveConstructor, PrimitiveType } from '../trivial-types/primitives.type';

/**
 * Types defined by arrays of constructors or by 'Date'
 */
export type ConstructorArray = (TConstructor<any> | PrimitiveConstructor | PrimitiveType | DateConstructor | 'Date')[];
