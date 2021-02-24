import { PrimitiveElement } from './primitives.type';

export type NotString = number | boolean | object;
export type NotNumber = string | boolean | object;
export type NotBoolean = number | string | object;
export type NotObject = number | string | boolean;
export type ObjectNotArray = { [k: string]: unknown };
export type ObjectArray = { [k: number]: unknown };
export type NotArray = PrimitiveElement | ObjectNotArray;
// export type NotArray = PrimitiveElement | ObjectNotArray;
export type NotInstance = PrimitiveElement | Array<any>;
export type NotArrayOfInstances<T> = NotArray | PrimitiveElement[] | T;
export type NotStringArray = NotArray | number[] | boolean[] | object[];

const zzz: ObjectArray = [2]
const zzzaaa: ObjectNotArray = {a: 2}
const ssss: NotArray = 2
