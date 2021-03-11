import { TConstructor } from '../t-constructor.type';
import { PrimitiveConstructor, PrimitiveType } from '../primitives.type';

export type ConstructorArray = (TConstructor<any> | PrimitiveConstructor | PrimitiveType | DateConstructor | 'Date')[];
