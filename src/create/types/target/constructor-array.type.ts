import { TConstructor } from '../t-constructor.type';
import { PrimitiveConstructor, PrimitiveType } from '../primitives.type';

/**
 * Types defined by arrays of constructors or by 'Date'
 */
export type ConstructorArray = (TConstructor<any> | PrimitiveConstructor | PrimitiveType | DateConstructor | 'Date')[];
