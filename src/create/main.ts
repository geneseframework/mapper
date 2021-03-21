import { TConstructor } from './types/t-constructor.type';
import { Target } from './types/target/target.type';
import { ArrayOfPrimitiveElements, Primitive } from './types/primitives.type';
import { throwWarning } from './utils/errors.util';
import { DateConstructorParameters } from './types/date-constructor-parameters.type';
import {
    NotArray,
    NotBoolean,
    NotDate,
    NotInstance,
    NotNumber,
    NotObject,
    NotString,
    ObjectNotArray
} from './types/not-some-type.type';
import { Combination } from './types/target/string/combination.type';
import { MainService } from './services/main.service';
import { ConstructorArray } from './types/target/constructor-array.type';
import { MapperBehavior } from '../shared/models/config-behavior.model';

/**
 * Maps some data in the target's format.
 */

// --------------------------------------------   String overloads   --------------------------------------------------

export function create(target: 'string' | StringConstructor, data: string, options?: MapperBehavior): string
export function create(target: 'string' | StringConstructor, data: NotString, options?: MapperBehavior): unknown
export function create(target: 'string' | StringConstructor, data: any, options?: MapperBehavior): string | undefined

export function create(target: 'string[]' | [StringConstructor], data: Array<any>, options?: MapperBehavior): string[]
export function create(target: 'string[]' | [StringConstructor], data: NotArray, options?: MapperBehavior): unknown
export function create(target: 'string[]' | [StringConstructor], data: any, options?: MapperBehavior): string[] | undefined

// --------------------------------------------   Number overloads   --------------------------------------------------

export function create(target: 'number' | NumberConstructor, data: number, options?: MapperBehavior): number
export function create(target: 'number' | NumberConstructor, data: NotNumber, options?: MapperBehavior): unknown
export function create(target: 'number' | NumberConstructor, data: any, options?: MapperBehavior): number | undefined

export function create(target: 'number[]' | [NumberConstructor], data: Array<any>, options?: MapperBehavior): number[]
export function create(target: 'number[]' | [NumberConstructor], data: NotArray, options?: MapperBehavior): unknown
export function create(target: 'number[]' | [NumberConstructor], data: any, options?: MapperBehavior): number[] | undefined

// -------------------------------------------   Boolean overloads   --------------------------------------------------

export function create(target: 'boolean' | BooleanConstructor, data: boolean, options?: MapperBehavior): boolean
export function create(target: 'boolean' | BooleanConstructor, data: NotBoolean, options?: MapperBehavior): unknown
export function create(target: 'boolean' | BooleanConstructor, data: any, options?: MapperBehavior): boolean | undefined

export function create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>, options?: MapperBehavior): boolean[]
export function create(target: 'boolean[]' | [BooleanConstructor], data: NotArray, options?: MapperBehavior): unknown
export function create(target: 'boolean[]' | [BooleanConstructor], data: any, options?: MapperBehavior): boolean[] | undefined

// -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

export function create(target: 'object' | ObjectConstructor, data: ObjectNotArray, options?: MapperBehavior): object
export function create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>, options?: MapperBehavior): unknown
export function create(target: 'object' | ObjectConstructor, data: object, options?: MapperBehavior): object | undefined

export function create(target: 'object[]' | [ObjectConstructor], data: Array<any>, options?: MapperBehavior): object[]
export function create(target: 'object[]' | [ObjectConstructor], data: NotArray, options?: MapperBehavior): unknown
export function create(target: 'object[]' | [ObjectConstructor], data: any, options?: MapperBehavior): object[] | undefined

// -------------------------------------------   Dates overloads   ----------------------------------------------------

export function create(target: DateConstructor, data: DateConstructorParameters, options?: MapperBehavior): Date
export function create(target: DateConstructor, data: NotDate, options?: MapperBehavior): unknown
export function create(target: DateConstructor, data: any, options?: MapperBehavior): Date | undefined

export function create(target: DateConstructor[], data: Array<any>, options?: MapperBehavior): Date[]
export function create(target: DateConstructor[], data: NotArray, options?: MapperBehavior): unknown
export function create(target: DateConstructor[], data: any, options?: MapperBehavior): Date[] | undefined

// ----------------------------------------   Constructor overloads   -------------------------------------------------

export function create<T>(target: TConstructor<T>, data: T, options?: MapperBehavior): T
export function create<T>(target: TConstructor<T>, data: NotInstance, options?: MapperBehavior): unknown
export function create<T>(target: TConstructor<T>, data: any, options?: MapperBehavior): T | undefined

export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[], options?: MapperBehavior): T[]
export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray, options?: MapperBehavior): unknown
export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any, options?: MapperBehavior): T[] | undefined

// -------------------------------------------   Tuples overloads   ---------------------------------------------------

export function create<T>(target: ConstructorArray, data: any[], options?: MapperBehavior): any[]
export function create<T>(target: ConstructorArray, data: NotArray, options?: MapperBehavior): unknown
export function create<T>(target: ConstructorArray, data: any, options?: MapperBehavior): any

// --------------------------------------   Type combinations overloads   ---------------------------------------------

export function create<T>(target: Combination, data: any, options?: MapperBehavior): any

// --------------------------------------------   Other overloads   ---------------------------------------------------

export function create<T>(target: string, data: any[], options?: MapperBehavior): T[]
export function create<T>(target: string, data: any, options?: MapperBehavior): T
export function create<T>(target: Target<T>, data: any, options?: MapperBehavior): T | T[] | Primitive | ArrayOfPrimitiveElements | Target<T>[] | Date | Date[] | object | object[]
export function create<T>(target: Target<T>, data: unknown, options?: MapperBehavior): any {
    try {
        return MainService.map(target, data, options);
    } catch (err) {
        throwWarning('Mapping failed : an unknown error occurred.', err)
    }
}

