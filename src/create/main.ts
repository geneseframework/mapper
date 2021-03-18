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
// export class Mapper<T> {

    // --------------------------------------------   String overloads   --------------------------------------------------

    export async function create(target: 'string' | StringConstructor, data: string, options?: MapperConfig): Promise<string>
    export async function create(target: 'string' | StringConstructor, data: NotString, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'string' | StringConstructor, data: any, options?: MapperConfig): Promise<string | undefined>

    export async function create(target: 'string[]' | [StringConstructor], data: Array<any>, options?: MapperConfig): Promise<string[]>
    export async function create(target: 'string[]' | [StringConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'string[]' | [StringConstructor], data: any, options?: MapperConfig): Promise<string[] | undefined>

    // --------------------------------------------   Number overloads   --------------------------------------------------

    export async function create(target: 'number' | NumberConstructor, data: number, options?: MapperConfig): Promise<number>
    export async function create(target: 'number' | NumberConstructor, data: NotNumber, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'number' | NumberConstructor, data: any, options?: MapperConfig): Promise<number | undefined>

    export async function create(target: 'number[]' | [NumberConstructor], data: Array<any>, options?: MapperConfig): Promise<number[]>
    export async function create(target: 'number[]' | [NumberConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'number[]' | [NumberConstructor], data: any, options?: MapperConfig): Promise<number[] | undefined>

    // -------------------------------------------   Boolean overloads   --------------------------------------------------

    export async function create(target: 'boolean' | BooleanConstructor, data: boolean, options?: MapperConfig): Promise<boolean>
    export async function create(target: 'boolean' | BooleanConstructor, data: NotBoolean, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'boolean' | BooleanConstructor, data: any, options?: MapperConfig): Promise<boolean | undefined>

    export async function create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>, options?: MapperConfig): Promise<boolean[]>
    export async function create(target: 'boolean[]' | [BooleanConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'boolean[]' | [BooleanConstructor], data: any, options?: MapperConfig): Promise<boolean[] | undefined>

    // -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

    export async function create(target: 'object' | ObjectConstructor, data: ObjectNotArray, options?: MapperConfig): Promise<object>
    export async function create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'object' | ObjectConstructor, data: object, options?: MapperConfig): Promise<object | undefined>

    export async function create(target: 'object[]' | [ObjectConstructor], data: Array<any>, options?: MapperConfig): Promise<object[]>
    export async function create(target: 'object[]' | [ObjectConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    export async function create(target: 'object[]' | [ObjectConstructor], data: any, options?: MapperConfig): Promise<object[] | undefined>

    // -------------------------------------------   Dates overloads   ----------------------------------------------------

    export async function create(target: DateConstructor, data: DateConstructorParameters, options?: MapperConfig): Promise<Date>
    export async function create(target: DateConstructor, data: NotDate, options?: MapperConfig): Promise<unknown>
    export async function create(target: DateConstructor, data: any, options?: MapperConfig): Promise<Date | undefined>

    export async function create(target: DateConstructor[], data: Array<any>, options?: MapperConfig): Promise<Date[]>
    export async function create(target: DateConstructor[], data: NotArray, options?: MapperConfig): Promise<unknown>
    export async function create(target: DateConstructor[], data: any, options?: MapperConfig): Promise<Date[] | undefined>

    // ----------------------------------------   Constructor overloads   -------------------------------------------------

    export async function create<T>(target: TConstructor<T>, data: T, options?: MapperConfig): Promise<T>
    export async function create<T>(target: TConstructor<T>, data: NotInstance, options?: MapperConfig): Promise<unknown>
    export async function create<T>(target: TConstructor<T>, data: any, options?: MapperConfig): Promise<T | undefined>

    export async function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[], options?: MapperConfig): Promise<T[]>
    export async function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray, options?: MapperConfig): Promise<unknown>
    export async function create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any, options?: MapperConfig): Promise<T[] | undefined>

    // -------------------------------------------   Tuples overloads   ---------------------------------------------------

    export async function create<T>(target: ConstructorArray, data: any[], options?: MapperConfig): Promise<any[]>
    export async function create<T>(target: ConstructorArray, data: NotArray, options?: MapperConfig): Promise<unknown>
    export async function create<T>(target: ConstructorArray, data: any, options?: MapperConfig): Promise<any>

    // --------------------------------------   Type combinations overloads   ---------------------------------------------

    export async function create<T>(target: Combination, data: any, options?: MapperConfig): Promise<any>

    // --------------------------------------------   Other overloads   ---------------------------------------------------

    export async function create<T>(target: string, data: any[], options?: MapperConfig): Promise<T[]>
    export async function create<T>(target: string, data: any, options?: MapperConfig): Promise<T>
    export async function create<T>(target: Target<T>, data: any, options?: MapperConfig): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Target<T>[] | Date | Date[] | object | object[]>
    export async function create<T>(target: Target<T>, data: unknown, options?: MapperConfig): Promise<any> {
        try {
            return await MainService.map(target, data, options);
        } catch (err) {
            throwWarning('Mapping failed : an unknown error occurred.', err)
        }
    }

// }
