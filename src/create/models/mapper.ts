import { TConstructor } from '../types/t-constructor.type';
import { Target } from '../types/target/target.type';
import { ArrayOfPrimitiveElements, Primitive } from '../types/primitives.type';
import { throwWarning } from '../utils/errors.util';
import { DateConstructorParameters } from '../types/date-constructor-parameters.type';
import {
    NotArray,
    NotBoolean,
    NotDate,
    NotInstance,
    NotNumber,
    NotObject,
    NotString,
    ObjectNotArray
} from '../types/not-some-type.type';
import { Config } from '../../shared/models/config.model';
import { Combination } from '../types/target/string/combination.type';
import { MainService } from '../services/main.service';
import { ConstructorArray } from '../types/target/constructor-array.type';

/**
 * Maps some data in the target's format.
 */
export class Mapper<T> {

    // --------------------------------------------   String overloads   --------------------------------------------------

    static async create(target: 'string' | StringConstructor, data: string, options?: Config): Promise<string>
    static async create(target: 'string' | StringConstructor, data: NotString, options?: Config): Promise<unknown>
    static async create(target: 'string' | StringConstructor, data: any, options?: Config): Promise<string | undefined>

    static async create(target: 'string[]' | [StringConstructor], data: Array<any>, options?: Config): Promise<string[]>
    static async create(target: 'string[]' | [StringConstructor], data: NotArray, options?: Config): Promise<unknown>
    static async create(target: 'string[]' | [StringConstructor], data: any, options?: Config): Promise<string[] | undefined>

    // --------------------------------------------   Number overloads   --------------------------------------------------

    static async create(target: 'number' | NumberConstructor, data: number, options?: Config): Promise<number>
    static async create(target: 'number' | NumberConstructor, data: NotNumber, options?: Config): Promise<unknown>
    static async create(target: 'number' | NumberConstructor, data: any, options?: Config): Promise<number | undefined>

    static async create(target: 'number[]' | [NumberConstructor], data: Array<any>, options?: Config): Promise<number[]>
    static async create(target: 'number[]' | [NumberConstructor], data: NotArray, options?: Config): Promise<unknown>
    static async create(target: 'number[]' | [NumberConstructor], data: any, options?: Config): Promise<number[] | undefined>

    // -------------------------------------------   Boolean overloads   --------------------------------------------------

    static async create(target: 'boolean' | BooleanConstructor, data: boolean, options?: Config): Promise<boolean>
    static async create(target: 'boolean' | BooleanConstructor, data: NotBoolean, options?: Config): Promise<unknown>
    static async create(target: 'boolean' | BooleanConstructor, data: any, options?: Config): Promise<boolean | undefined>

    static async create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>, options?: Config): Promise<boolean[]>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: NotArray, options?: Config): Promise<unknown>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: any, options?: Config): Promise<boolean[] | undefined>

    // -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

    static async create(target: 'object' | ObjectConstructor, data: ObjectNotArray, options?: Config): Promise<object>
    static async create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>, options?: Config): Promise<unknown>
    static async create(target: 'object' | ObjectConstructor, data: object, options?: Config): Promise<object | undefined>

    static async create(target: 'object[]' | [ObjectConstructor], data: Array<any>, options?: Config): Promise<object[]>
    static async create(target: 'object[]' | [ObjectConstructor], data: NotArray, options?: Config): Promise<unknown>
    static async create(target: 'object[]' | [ObjectConstructor], data: any, options?: Config): Promise<object[] | undefined>

    // -------------------------------------------   Dates overloads   ----------------------------------------------------

    static async create(target: DateConstructor, data: DateConstructorParameters, options?: Config): Promise<Date>
    static async create(target: DateConstructor, data: NotDate, options?: Config): Promise<unknown>
    static async create(target: DateConstructor, data: any, options?: Config): Promise<Date | undefined>

    static async create(target: DateConstructor[], data: Array<any>, options?: Config): Promise<Date[]>
    static async create(target: DateConstructor[], data: NotArray, options?: Config): Promise<unknown>
    static async create(target: DateConstructor[], data: any, options?: Config): Promise<Date[] | undefined>

    // ----------------------------------------   Constructor overloads   -------------------------------------------------

    static async create<T>(target: TConstructor<T>, data: T, options?: Config): Promise<T>
    static async create<T>(target: TConstructor<T>, data: NotInstance, options?: Config): Promise<unknown>
    static async create<T>(target: TConstructor<T>, data: any, options?: Config): Promise<T | undefined>

    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[], options?: Config): Promise<T[]>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray, options?: Config): Promise<unknown>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any, options?: Config): Promise<T[] | undefined>

    // -------------------------------------------   Tuples overloads   ---------------------------------------------------

    static async create<T>(target: ConstructorArray, data: any[], options?: Config): Promise<any[]>
    static async create<T>(target: ConstructorArray, data: NotArray, options?: Config): Promise<unknown>
    static async create<T>(target: ConstructorArray, data: any, options?: Config): Promise<any>

    // --------------------------------------   Type combinations overloads   ---------------------------------------------

    static async create<T>(target: Combination, data: any, options?: Config): Promise<any>

    // --------------------------------------------   Other overloads   ---------------------------------------------------

    static async create<T>(target: string, data: any[], options?: Config): Promise<T[]>
    static async create<T>(target: string, data: any, options?: Config): Promise<T>
    static async create<T>(target: Target<T>, data: any, options?: Config): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Target<T>[] | Date | Date[] | object | object[]>
    static async create<T>(target: Target<T>, data: unknown, options?: Config): Promise<any> {
        try {
            return await MainService.map(target, data, options);
        } catch (err) {
            throwWarning('Mapping failed : an unknown error occurred.', err)
        }
    }

}
