import { TConstructor } from '../types/t-constructor.type';
import { Target } from '../types/target/target.type';
import { ArrayOfPrimitiveElements, Primitive } from '../types/primitives.type';
import { TupleOld } from '../types/target/target-tuple-old.type';
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
import { CreateOptions } from './create-options.model';
import { MainServiceOld } from '../services/main.service.old';
import { Union } from '../types/target/string/union.type';
import { Combination } from '../types/target/string/combination.type';
import { MainService } from '../services/main.service';
import { ConstructorArray } from '../types/target/constructor-array.type';

/**
 * Maps some data in the target's format.
 */
export class Mapper<T> {

    // --------------------------------------------   String overloads   --------------------------------------------------

    static async create(target: 'string' | StringConstructor, data: string, options?: CreateOptions): Promise<string>
    static async create(target: 'string' | StringConstructor, data: NotString, options?: CreateOptions): Promise<unknown>
    static async create(target: 'string' | StringConstructor, data: any, options?: CreateOptions): Promise<string | undefined>

    static async create(target: 'string[]' | [StringConstructor], data: Array<any>, options?: CreateOptions): Promise<string[]>
    static async create(target: 'string[]' | [StringConstructor], data: NotArray, options?: CreateOptions): Promise<unknown>
    static async create(target: 'string[]' | [StringConstructor], data: any, options?: CreateOptions): Promise<string[] | undefined>

    // --------------------------------------------   Number overloads   --------------------------------------------------

    static async create(target: 'number' | NumberConstructor, data: number, options?: CreateOptions): Promise<number>
    static async create(target: 'number' | NumberConstructor, data: NotNumber, options?: CreateOptions): Promise<unknown>
    static async create(target: 'number' | NumberConstructor, data: any, options?: CreateOptions): Promise<number | undefined>

    static async create(target: 'number[]' | [NumberConstructor], data: Array<any>, options?: CreateOptions): Promise<number[]>
    static async create(target: 'number[]' | [NumberConstructor], data: NotArray, options?: CreateOptions): Promise<unknown>
    static async create(target: 'number[]' | [NumberConstructor], data: any, options?: CreateOptions): Promise<number[] | undefined>

    // -------------------------------------------   Boolean overloads   --------------------------------------------------

    static async create(target: 'boolean' | BooleanConstructor, data: boolean, options?: CreateOptions): Promise<boolean>
    static async create(target: 'boolean' | BooleanConstructor, data: NotBoolean, options?: CreateOptions): Promise<unknown>
    static async create(target: 'boolean' | BooleanConstructor, data: any, options?: CreateOptions): Promise<boolean | undefined>

    static async create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>, options?: CreateOptions): Promise<boolean[]>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: NotArray, options?: CreateOptions): Promise<unknown>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: any, options?: CreateOptions): Promise<boolean[] | undefined>

    // -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

    static async create(target: 'object' | ObjectConstructor, data: ObjectNotArray, options?: CreateOptions): Promise<object>
    static async create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>, options?: CreateOptions): Promise<unknown>
    static async create(target: 'object' | ObjectConstructor, data: object, options?: CreateOptions): Promise<object | undefined>

    static async create(target: 'object[]' | [ObjectConstructor], data: Array<any>, options?: CreateOptions): Promise<object[]>
    static async create(target: 'object[]' | [ObjectConstructor], data: NotArray, options?: CreateOptions): Promise<unknown>
    static async create(target: 'object[]' | [ObjectConstructor], data: any, options?: CreateOptions): Promise<object[] | undefined>

    // -------------------------------------------   Dates overloads   ----------------------------------------------------

    static async create(target: DateConstructor, data: DateConstructorParameters, options?: CreateOptions): Promise<Date>
    static async create(target: DateConstructor, data: NotDate, options?: CreateOptions): Promise<unknown>
    static async create(target: DateConstructor, data: any, options?: CreateOptions): Promise<Date | undefined>

    static async create(target: DateConstructor[], data: Array<any>, options?: CreateOptions): Promise<Date[]>
    static async create(target: DateConstructor[], data: NotArray, options?: CreateOptions): Promise<unknown>
    static async create(target: DateConstructor[], data: any, options?: CreateOptions): Promise<Date[] | undefined>

    // ----------------------------------------   Constructor overloads   -------------------------------------------------

    static async create<T>(target: TConstructor<T>, data: T, options?: CreateOptions): Promise<T>
    static async create<T>(target: TConstructor<T>, data: NotInstance, options?: CreateOptions): Promise<unknown>
    static async create<T>(target: TConstructor<T>, data: any, options?: CreateOptions): Promise<T | undefined>

    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[], options?: CreateOptions): Promise<T[]>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray, options?: CreateOptions): Promise<unknown>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any, options?: CreateOptions): Promise<T[] | undefined>

    // -------------------------------------------   Tuples overloads   ---------------------------------------------------

    static async create<T>(target: ConstructorArray, data: any[], options?: CreateOptions): Promise<any[]>
    static async create<T>(target: ConstructorArray, data: NotArray, options?: CreateOptions): Promise<unknown>
    static async create<T>(target: ConstructorArray, data: any, options?: CreateOptions): Promise<any>

    // --------------------------------------   Type combinations overloads   ---------------------------------------------

    static async create<T>(target: Combination, data: any, options?: CreateOptions): Promise<any>

    // --------------------------------------------   Other overloads   ---------------------------------------------------

    static async create<T>(target: string, data: any[], options?: CreateOptions): Promise<T[]>
    static async create<T>(target: string, data: any, options?: CreateOptions): Promise<T>
    static async create<T>(target: Target<T>, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | TupleOld | Date | Date[] | object | object[]>
    static async create<T>(target: Target<T>, data: unknown, options?: CreateOptions): Promise<any> {
        try {
            return await MainService.map(target, data, options);
        } catch (err) {
            throwWarning('Mapping failed : an unknown error occurred.', err)
        }
    }


    static async createOld<T>(target: Target<T>, data: unknown, options?: CreateOptions): Promise<any> {
        try {
            return await MainServiceOld.map(target, data, options);
        } catch (err) {
            throwWarning('Mapping failed : an unknown error occurred.', err)
        }
    }

}
