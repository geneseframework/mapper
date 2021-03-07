import { Primitive } from './primitives.type';

export type NotString = number | boolean | object;
export type NotNumber = string | boolean | object;
export type NotBoolean = number | string | object;
export type NotObject = number | string | boolean;
export type NotDate = NotString & NotNumber;
export type ObjectNotArray = { [k: string]: unknown };
export type NotArray = Primitive | ObjectNotArray;
export type NotInstance = Primitive | Array<any>;