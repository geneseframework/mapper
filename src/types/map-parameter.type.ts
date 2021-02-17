import { TConstructor } from '../models/t-constructor.model';
import { Tuple } from './tuple.type';

export type MapParameter<T> = TConstructor<T> | string | Tuple;
