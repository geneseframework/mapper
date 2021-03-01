import { TConstructor } from '../t-constructor.type';
import { Tuple } from '../tuples/tuple.type';
import { Key } from '../key.type';

export type Target<T> = TConstructor<T> | Tuple | string;
// export type Target<T> = TConstructor<T> | Key | Tuple | string;
