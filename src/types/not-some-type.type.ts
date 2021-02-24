import { PrimitiveElement } from './primitives.type';

export type NotString = number | boolean | object;
export type NotNumber = string | boolean | object;
export type NotBoolean = number | string | object;
export type NotObject = number | string | boolean;
export type ObjectNotArray = { [k: string]: unknown };
export type NotArray = PrimitiveElement | ObjectNotArray;
export type NotInstance = PrimitiveElement | Array<any>;
export type NotArrayOfInstances<T> = NotArray | PrimitiveElement[] | T;
export type NotStringArray = NotArray | number[] | boolean[] | object[];
