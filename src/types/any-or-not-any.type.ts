import { PrimitiveElement } from './primitives.type';

export type ObjectNotArray = { [k: string]: unknown };
export type NotArray = PrimitiveElement | ObjectNotArray;
export type NotInstance = PrimitiveElement | Array<any>;
export type NotArrayOfInstances<T> = NotArray | PrimitiveElement[] | T;
