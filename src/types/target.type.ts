import { TConstructor } from './t-constructor.type';
import { Tuple } from './tuple.type';
import { Key } from './key.type';

export type Target<T> = TConstructor<T> | Key | Tuple | string;
