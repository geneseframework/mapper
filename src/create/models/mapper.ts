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
import { MapperConfig } from '../../shared/models/config.model';
import { Combination } from '../types/target/string/combination.type';
import { MainService } from '../services/main.service';
import { ConstructorArray } from '../types/target/constructor-array.type';

/**
 * Maps some data in the target's format.
 */
export class Mapper<T> {

    // --------------------------------------------   String overloads   --------------------------------------------------

    static async create(target: 'string' | StringConstructor, data: string, options?: MapperConfig): Promise<string>
    static async create(target: 'string' | StringConstructor, data: NotString, options?: MapperConfig): Promise<unknown>
    static async create(target: 'string' | StringConstructor, data: any, options?: MapperConfig): Promise<string | undefined>

    static async create(target: 'string[]' | [StringConstructor], data: Array<any>, options?: MapperConfig): Promise<string[]>
    static async create(target: 'string[]' | [StringConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    static async create(target: 'string[]' | [StringConstructor], data: any, options?: MapperConfig): Promise<string[] | undefined>

    // --------------------------------------------   Number overloads   --------------------------------------------------

    static async create(target: 'number' | NumberConstructor, data: number, options?: MapperConfig): Promise<number>
    static async create(target: 'number' | NumberConstructor, data: NotNumber, options?: MapperConfig): Promise<unknown>
    static async create(target: 'number' | NumberConstructor, data: any, options?: MapperConfig): Promise<number | undefined>

    static async create(target: 'number[]' | [NumberConstructor], data: Array<any>, options?: MapperConfig): Promise<number[]>
    static async create(target: 'number[]' | [NumberConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    static async create(target: 'number[]' | [NumberConstructor], data: any, options?: MapperConfig): Promise<number[] | undefined>

    // -------------------------------------------   Boolean overloads   --------------------------------------------------

    static async create(target: 'boolean' | BooleanConstructor, data: boolean, options?: MapperConfig): Promise<boolean>
    static async create(target: 'boolean' | BooleanConstructor, data: NotBoolean, options?: MapperConfig): Promise<unknown>
    static async create(target: 'boolean' | BooleanConstructor, data: any, options?: MapperConfig): Promise<boolean | undefined>

    static async create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>, options?: MapperConfig): Promise<boolean[]>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: any, options?: MapperConfig): Promise<boolean[] | undefined>

    // -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

    static async create(target: 'object' | ObjectConstructor, data: ObjectNotArray, options?: MapperConfig): Promise<object>
    static async create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>, options?: MapperConfig): Promise<unknown>
    static async create(target: 'object' | ObjectConstructor, data: object, options?: MapperConfig): Promise<object | undefined>

    static async create(target: 'object[]' | [ObjectConstructor], data: Array<any>, options?: MapperConfig): Promise<object[]>
    static async create(target: 'object[]' | [ObjectConstructor], data: NotArray, options?: MapperConfig): Promise<unknown>
    static async create(target: 'object[]' | [ObjectConstructor], data: any, options?: MapperConfig): Promise<object[] | undefined>

    // -------------------------------------------   Dates overloads   ----------------------------------------------------

    static async create(target: DateConstructor, data: DateConstructorParameters, options?: MapperConfig): Promise<Date>
    static async create(target: DateConstructor, data: NotDate, options?: MapperConfig): Promise<unknown>
    static async create(target: DateConstructor, data: any, options?: MapperConfig): Promise<Date | undefined>

    static async create(target: DateConstructor[], data: Array<any>, options?: MapperConfig): Promise<Date[]>
    static async create(target: DateConstructor[], data: NotArray, options?: MapperConfig): Promise<unknown>
    static async create(target: DateConstructor[], data: any, options?: MapperConfig): Promise<Date[] | undefined>

    // ----------------------------------------   Constructor overloads   -------------------------------------------------

    static async create<T>(target: TConstructor<T>, data: T, options?: MapperConfig): Promise<T>
    static async create<T>(target: TConstructor<T>, data: NotInstance, options?: MapperConfig): Promise<unknown>
    static async create<T>(target: TConstructor<T>, data: any, options?: MapperConfig): Promise<T | undefined>

    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[], options?: MapperConfig): Promise<T[]>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray, options?: MapperConfig): Promise<unknown>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any, options?: MapperConfig): Promise<T[] | undefined>

    // -------------------------------------------   Tuples overloads   ---------------------------------------------------

    static async create<T>(target: ConstructorArray, data: any[], options?: MapperConfig): Promise<any[]>
    static async create<T>(target: ConstructorArray, data: NotArray, options?: MapperConfig): Promise<unknown>
    static async create<T>(target: ConstructorArray, data: any, options?: MapperConfig): Promise<any>

    // --------------------------------------   Type combinations overloads   ---------------------------------------------

    static async create<T>(target: Combination, data: any, options?: MapperConfig): Promise<any>

    // --------------------------------------------   Other overloads   ---------------------------------------------------

    static async create<T>(target: string, data: any[], options?: MapperConfig): Promise<T[]>
    static async create<T>(target: string, data: any, options?: MapperConfig): Promise<T>
    static async create<T>(target: Target<T>, data: any, options?: MapperConfig): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Target<T>[] | Date | Date[] | object | object[]>
    static async create<T>(target: Target<T>, data: unknown, options?: MapperConfig): Promise<any> {
        try {
            return await MainService.map(target, data, options);
        } catch (err) {
            throwWarning('Mapping failed : an unknown error occurred.', err)
        }
    }

}
