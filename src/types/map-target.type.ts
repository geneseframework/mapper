import { TConstructor } from '../models/t-constructor.model';
import { Tuple } from './tuple.type';
import { Key } from './key.type';
import { PrimitiveElement } from './primitives.type';

export type MapTarget<T> = TConstructor<T> | Key | Tuple | PrimitiveElement;
