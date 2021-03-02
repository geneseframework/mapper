import { TConstructor } from '../t-constructor.type';
import { TupleOld } from './target-tuple-old.type';
import { Key } from '../key.type';
import { ConstructorArray } from './constructor-array.type';

export type Target<T> = TConstructor<T> | ConstructorArray | string;
// export type Target<T> = TConstructor<T> | TupleOld | string;
// export type Target<T> = TConstructor<T> | Key | TupleOld | string;
