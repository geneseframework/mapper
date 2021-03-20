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
import { MapperConfig } from '../shared/models/config.model';
import { Combination } from './types/target/string/combination.type';
import { MainService } from './services/main.service';
import { ConstructorArray } from './types/target/constructor-array.type';

/**
 * Maps some data in the target's format.
 */

// --------------------------------------------   String overloads   --------------------------------------------------

export function create(target: 'string' | StringConstructor, data: string, options?: MapperConfig): string
export function create(target: 'string' | StringConstructor, data: NotString, options?: MapperConfig): unknown
export function create(target: 'string' | StringConstructor, data: any, options?: MapperConfig): string | undefined

export function create(target: 'string[]' | [StringConstructor], data: Array<any>, options?: MapperConfig): string[]
export function create(target: 'string[]' | [StringConstructor], data: NotArray, options?: MapperConfig): unknown
export function create(target: 'string[]' | [StringConstructor], data: any, options?: MapperConfig): string[] | undefined

// --------------------------------------------   Number overloads   --------------------------------------------------

export function create(target: 'number' | NumberConstructor, data: number, options?: MapperConfig): number
export function create(target: 'number' | NumberConstructor, data: NotNumber, options?: MapperConfig): unknown
export function create(target: 'number' | NumberConstructor, data: any, options?: MapperConfig): number | undefined

export function create(target: 'number[]' | [NumberConstructor], data: Array<any>, options?: MapperConfig): number[]
export function create(target: 'number[]' | [NumberConstructor], data: NotArray, options?: MapperConfig): unknown
export function create(target: 'number[]' | [NumberConstructor], data: any, options?: MapperConfig): number[] | undefined

// -------------------------------------------   Boolean overloads   --------------------------------------------------

export function create(target: 'boolean' | BooleanConstructor, data: boolean, options?: MapperConfig): boolean
export function create(target: 'boolean' | BooleanConstructor, data: NotBoolean, options?: MapperConfig): unknown
export function create(target: 'boolean' | BooleanConstructor, data: any, options?: MapperConfig): boolean | undefined

export function create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>, options?: MapperConfig): boolean[]
export function create(target: 'boolean[]' | [BooleanConstructor], data: NotArray, options?: MapperConfig): unknown
export function create(target: 'boolean[]' | [BooleanConstructor], data: any, options?: MapperConfig): boolean[] | undefined

// -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

export function create(target: 'object' | ObjectConstructor, data: ObjectNotArray, options?: MapperConfig): object
export function create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>, options?: MapperConfig): unknown
export function create(target: 'object' | ObjectConstructor, data: object, options?: MapperConfig): object | undefined

export function create(target: 'object[]' | [ObjectConstructor], data: Array<any>, options?: MapperConfig): object[]
export function create(target: 'object[]' | [ObjectConstructor], data: NotArray, options?: MapperConfig): unknown
export function create(target: 'object[]' | [ObjectConstructor], data: any, options?: MapperConfig): object[] | undefined

// -------------------------------------------   Dates overloads   ----------------------------------------------------

export function create(target: DateConstructor, data: DateConstructorParameters, options?: MapperConfig): Date
export function create(target: DateConstructor, data: NotDate, options?: MapperConfig): unknown
export function create(target: DateConstructor, data: any, options?: MapperConfig): Date | undefined

export function create(target: DateConstructor[], data: Array<any>, options?: MapperConfig): Date[]
export function create(target: DateConstructor[], data: NotArray, options?: MapperConfig): unknown
export function create(target: DateConstructor[], data: any, options?: MapperConfig): Date[] | undefined

// ----------------------------------------   Constructor overloads   -------------------------------------------------

export function create<T>(target: TConstructor<T>, data: T, options?: MapperConfig): T
export function create<T>(target: TConstructor<T>, data: NotInstance, options?: MapperConfig): unknown
export function create<T>(target: TConstructor<T>, data: any, options?: MapperConfig): T | undefined

export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[], options?: MapperConfig): T[]
export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray, options?: MapperConfig): unknown
export function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any, options?: MapperConfig): T[] | undefined

// -------------------------------------------   Tuples overloads   ---------------------------------------------------

export function create<T>(target: ConstructorArray, data: any[], options?: MapperConfig): any[]
export function create<T>(target: ConstructorArray, data: NotArray, options?: MapperConfig): unknown
export function create<T>(target: ConstructorArray, data: any, options?: MapperConfig): any

// --------------------------------------   Type combinations overloads   ---------------------------------------------

export function create<T>(target: Combination, data: any, options?: MapperConfig): any

// --------------------------------------------   Other overloads   ---------------------------------------------------

export function create<T>(target: string, data: any[], options?: MapperConfig): T[]
export function create<T>(target: string, data: any, options?: MapperConfig): T
export function create<T>(target: Target<T>, data: any, options?: MapperConfig): T | T[] | Primitive | ArrayOfPrimitiveElements | Target<T>[] | Date | Date[] | object | object[]
export function create<T>(target: Target<T>, data: unknown, options?: MapperConfig): any {
    try {
        return MainService.map(target, data, options);
    } catch (err) {
        throwWarning('Mapping failed : an unknown error occurred.', err)
    }
}

