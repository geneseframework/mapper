import { TConstructor } from '../models/t-constructor.model';
import { Tuple } from './tuple.type';
import { Key } from './key.type';

export type MapParameter<T> = TConstructor<T> | Key | Tuple;
