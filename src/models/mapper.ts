import { TConstructor } from '../types/t-constructor.type';
import { InitService } from '../services/init.service';
import { MapInstanceService } from '../services/map-instance.service';
import { FlagService } from '../services/flag.service';
import { GLOBAL } from '../const/global.const';
import { Target } from '../types/target.type';
import { ArrayOfPrimitiveElements, PrimitiveElement } from '../types/primitives.type';
import { MapTypeService } from '../services/map-type.service';
import { MapEnumService } from '../services/map-enum.service';
import { getDeclarationKind, getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { MapInterfaceService } from '../services/map-interface.service';
import { MapTupleService } from '../services/map-tuple.service';
import { Tuple } from '../types/tuple.type';
import { TypeDeclaration } from '../types/type-declaration.type';
import { TargetInfo } from '../types/target-info.type';
import { throwWarning } from '../utils/errors.util';
import { DateConstructorParameters } from '../types/date-cpnstructor-parameters.type';
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
import { TargetService } from '../services/target.service';
import { MapTrivialCasesService } from '../services/map-trivial-cases.service';
import { IncompatibilityService } from '../services/incompatibility.service';
import * as chalk from 'chalk';


export class Mapper<T> {

    // --------------------------------------------   String overloads   --------------------------------------------------

    static async create(target: 'string' | StringConstructor, data: string): Promise<string>
    static async create(target: 'string' | StringConstructor, data: NotString): Promise<unknown>
    static async create(target: 'string' | StringConstructor, data: any): Promise<string | undefined>

    static async create(target: 'string[]' | [StringConstructor], data: Array<any>): Promise<string[]>
    static async create(target: 'string[]' | [StringConstructor], data: NotArray): Promise<unknown>
    static async create(target: 'string[]' | [StringConstructor], data: any): Promise<string[] | undefined>

    // --------------------------------------------   Number overloads   --------------------------------------------------

    static async create(target: 'number' | NumberConstructor, data: number): Promise<number>
    static async create(target: 'number' | NumberConstructor, data: NotNumber): Promise<unknown>
    static async create(target: 'number' | NumberConstructor, data: any): Promise<number | undefined>

    static async create(target: 'number[]' | [NumberConstructor], data: Array<any>): Promise<number[]>
    static async create(target: 'number[]' | [NumberConstructor], data: NotArray): Promise<unknown>
    static async create(target: 'number[]' | [NumberConstructor], data: any): Promise<number[] | undefined>

    // -------------------------------------------   Boolean overloads   --------------------------------------------------

    static async create(target: 'boolean' | BooleanConstructor, data: boolean): Promise<boolean>
    static async create(target: 'boolean' | BooleanConstructor, data: NotBoolean): Promise<unknown>
    static async create(target: 'boolean' | BooleanConstructor, data: any): Promise<boolean | undefined>

    static async create(target: 'boolean[]' | [BooleanConstructor], data: Array<any>): Promise<boolean[]>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: NotArray): Promise<unknown>
    static async create(target: 'boolean[]' | [BooleanConstructor], data: any): Promise<boolean[] | undefined>

    // -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

    static async create(target: 'object' | ObjectConstructor, data: ObjectNotArray): Promise<object>
    static async create(target: 'object' | ObjectConstructor, data: NotObject | Array<any>): Promise<unknown>
    static async create(target: 'object' | ObjectConstructor, data: object): Promise<object | undefined>

    static async create(target: 'object[]' | [ObjectConstructor], data: Array<any>): Promise<object[]>
    static async create(target: 'object[]' | [ObjectConstructor], data: NotArray): Promise<unknown>
    static async create(target: 'object[]' | [ObjectConstructor], data: any): Promise<object[] | undefined>

    // -------------------------------------------   Dates overloads   ----------------------------------------------------

    static async create(target: DateConstructor, data: DateConstructorParameters): Promise<Date>
    static async create(target: DateConstructor, data: NotDate): Promise<unknown>
    static async create(target: DateConstructor, data: any): Promise<Date | undefined>

    static async create(target: DateConstructor[], data: Array<any>): Promise<Date[]>
    static async create(target: DateConstructor[], data: NotArray): Promise<unknown>
    static async create(target: DateConstructor[], data: any): Promise<Date[] | undefined>

    // ----------------------------------------   Constructor overloads   -------------------------------------------------

    static async create<T>(target: TConstructor<T>, data: T): Promise<T>
    static async create<T>(target: TConstructor<T>, data: NotInstance): Promise<unknown>
    static async create<T>(target: TConstructor<T>, data: any): Promise<T | undefined>

    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: T[]): Promise<T[]>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: NotArray): Promise<unknown>
    static async create<T>(target: [TConstructor<T>] | TConstructor<T>[], data: any): Promise<T[] | undefined>

    // -------------------------------------------   Tuples overloads   ---------------------------------------------------

    static async create<T>(target: Tuple, data: any[]): Promise<Tuple>

    // --------------------------------------------   Other overloads   ---------------------------------------------------

    static async create<T>(target: Target<T>, data: any[]): Promise<T[]>
    static async create<T>(target: Target<T>, data: any): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]>
    static async create<T>(target: Target<T>, data: unknown): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]> {
        try {
            await this.init();
            if (IncompatibilityService.areIncompatible(target, data)) {
                return undefined;
            } else if (MapTrivialCasesService.isTrivialCase(target, data)) {
                return MapTrivialCasesService.mapTrivialCase(target, data);
            } else {
                return this.mapDeclaration(target, data);
            }
        } catch (err) {
            throwWarning('Mapping failed : an unknown error occurred.', err)
        }
    }


    private static async init<T>(): Promise<void> {
        if (GLOBAL.isFirstMapper) {
            InitService.start();
            await FlagService.init();
        }
    }


    private static async mapDeclaration<T>(target: Target<T>, data: any): Promise<T | T[] | Date | Tuple> {
        if (TargetService.isTuple(target)) {
            return MapTupleService.create(data, target as Tuple);
        }
        const info: TargetInfo = TargetService.getInfo(target);
        const typeDeclaration: TypeDeclaration = getTypeDeclaration(info.typeName);
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                return MapInstanceService.createInstances<T>(data, info.typeName);
            case TypeDeclarationKind.ENUM_DECLARATION:
                return MapEnumService.createEnums(data, info.typeName, info.isArray);
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                return MapInterfaceService.createInterfaces(data, info.typeName, info.isArray);
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                return MapTypeService.createTypes(data, info.typeName, info.isArray);
            default:
                throwWarning(`Warning : type declaration "${info.typeName}" not found.`);
                return undefined;
        }
    }
}
