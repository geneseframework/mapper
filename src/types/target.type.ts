import { TConstructor } from '../models/t-constructor.model';
import { Tuple } from './tuple.type';
import { Key } from './key.type';
import { PrimitiveElement } from './primitives.type';

export type Target<T> = TConstructor<T> | Key | Tuple | string;
