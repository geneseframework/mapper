import { TConstructor } from './types/others/t-constructor.type';
import { ArrayOfPrimitiveElements, Primitive } from './types/trivial-types/primitives.type';
import { DateConstructorParameters } from './types/trivial-types/date-constructor-parameters.type';
import {
    NotArray,
    NotBoolean,
    NotDate,
    NotInstance,
    NotNumber,
    NotObject,
    NotString,
    ObjectNotArray
} from './types/trivial-types/not-some-type.type';
import { MainService } from './services/main.service';
import { ConstructorArray } from './types/non-trivial-types/constructor-array.type';
import { Combination } from './types/non-trivial-types/combination.type';
import { Target } from './types/others/target.type';
import { MapperConfigBehavior, throwWarning } from '@genese/core';

/**
 * The create() method
 * Maps untyped objects into safe typed objects
 */

// --------------------------------------------   String overloads   --------------------------------------------------

export function create(target: 'string' | StringConstructor, data: string, options?: MapperConfigBehavior): string
export function create(target: 'string' | StringConstructor, data: NotString, options?: MapperConfigBehavior): unknown
export function create(target: 'string' | StringConstructor, data: any, options?: MapperConfigBehavior): string | undefined

export function create(target: 'string[]' | [StringConstructor], data: Array<any>, options?: MapperConfigBehavior): string[]
export function create(target: 'string[]' | [StringConstructor], data: NotArray, options?: MapperConfigBehavior): unknown
export function create(target: 'string[]' | [StringConstructor], data: any, options?: MapperConfigBehavior): string[] | undefined

// --------------------------------------------   Number overloads   --------------------------------------------------

export function create(target: 'number' | NumberConstructor, data: number, options?: MapperConfigBehavior): number
export function create(target: 'number' | NumberConstructor, data: NotNumber, options?: MapperConfigBehavior): unknown
export function create(target: 'number' | NumberConstructor, data: any, options?: MapperConfigBehavior): number | undefined

export function create(target: 'number[]' | [NumberConstructor], data: Array<any>, options?: MapperConfigBehavior): number[]
export function create(target: 'number[]' | [NumberConstructor], data: NotArray, options?: MapperConfigBehavior): unknown
export function create(target: 'number[]' | [NumberConstructor], data: any, options?: MapperConfigBehavior): number[] | undefined

// -------------------------------------------   Boolean overloads   --------------------------------------------------

export function create(target: 'boolean' | BooleanConstructor, data: boolean, options?: MapperConfigBehavior): boolean
export function create(target: 'boolean' | BooleanConstructor, data: NotBoolean, options?: MapperConfigBehavior): unknown
export function create(target: 'boolean' | BooleanConstructor, data: any, options?: MapperConfigBehavior): boolean | undefined

export function create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>, options?: MapperConfigBehavior): boolean[]
export function create(target: 'boolean[]' | [BooleanConstructor], data: NotArray, options?: MapperConfigBehavior): unknown
export function create(target: 'boolean[]' | [BooleanConstructor], data: any, options?: MapperConfigBehavior): boolean[] | undefined

// -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

export function create(target: 'object' | ObjectConstructor, data: ObjectNotArray, options?: MapperConfigBehavior): object
export function create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>, options?: MapperConfigBehavior): unknown
export function create(target: 'object' | ObjectConstructor, data: object, options?: MapperConfigBehavior): object | undefined

export function create(target: 'object[]' | [ObjectConstructor], data: Array<any>, options?: MapperConfigBehavior): object[]
export function create(target: 'object[]' | [ObjectConstructor], data: NotArray, options?: MapperConfigBehavior): unknown
export function create(target: 'object[]' | [ObjectConstructor], data: any, options?: MapperConfigBehavior): object[] | undefined

// -------------------------------------------   Dates overloads   ----------------------------------------------------

export function create(target: DateConstructor, data: DateConstructorParameters, options?: MapperConfigBehavior): Date
export function create(target: DateConstructor, data: NotDate, options?: MapperConfigBehavior): unknown
export function create(target: DateConstructor, data: any, options?: MapperConfigBehavior): Date | undefined

export function create(target: DateConstructor[], data: Array<any>, options?: MapperConfigBehavior): Date[]
export function create(target: DateConstructor[], data: NotArray, options?: MapperConfigBehavior): unknown
export function create(target: DateConstructor[], data: any, options?: MapperConfigBehavior): Date[] | undefined

// ----------------------------------------   Constructor overloads   -------------------------------------------------

export function create<T>(target: TConstructor<T>, data: T, options?: MapperConfigBehavior): T
export function create<T>(target: TConstructor<T>, data: NotInstance, options?: MapperConfigBehavior): unknown
export function create<T>(target: TConstructor<T>, data: any, options?: MapperConfigBehavior): T | undefined

export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[], options?: MapperConfigBehavior): T[]
export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray, options?: MapperConfigBehavior): unknown
export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any, options?: MapperConfigBehavior): T[] | undefined

// -------------------------------------------   Tuples overloads   ---------------------------------------------------

export function create<T>(target: ConstructorArray, data: any[], options?: MapperConfigBehavior): any[]
export function create<T>(target: ConstructorArray, data: NotArray, options?: MapperConfigBehavior): unknown
export function create<T>(target: ConstructorArray, data: any, options?: MapperConfigBehavior): any

// --------------------------------------   Type combinations overloads   ---------------------------------------------

export function create<T>(target: Combination, data: any, options?: MapperConfigBehavior): any

// --------------------------------------------   Other overloads   ---------------------------------------------------

export function create<T>(target: string, data: any[], options?: MapperConfigBehavior): T[]
export function create<T>(target: string, data: any, options?: MapperConfigBehavior): T
export function create<T>(target: Target<T>, data: any, options?: MapperConfigBehavior): T | T[] | Primitive | ArrayOfPrimitiveElements | Target<T>[] | Date | Date[] | object | object[]
export function create<T>(target: Target<T>, data: unknown, options?: MapperConfigBehavior): any {
    try {
        return MainService.map(target, data, options);
    } catch (err) {
        throwWarning('Mapping failed : an unknown error occurred.', err)
    }
}

