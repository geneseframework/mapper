import { TConstructor } from './t-constructor.type';
import { Primitive } from './primitives.type';

export type ObjectNotArray = { [k: string]: number | string };
export type Instance = { constructor: Function }
// export type Instance = { new (...args: any[]): any }
// export type NotArray = string | number | boolean | ObjectNotArray | TConstructor<any>;
export type NotArray = Primitive | ObjectNotArray;
// export type NotArray = string | number | boolean | ObjectNotArray | TConstructor<any> | Instance;
export type NotArrayOfInstances<T> = NotArray | Primitive[] | T;
