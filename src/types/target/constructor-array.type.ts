import { TConstructor } from '../t-constructor.type';
import { PrimitiveConstructor } from '../primitives.type';

export type ConstructorArray = (TConstructor<any> | PrimitiveConstructor)[];
