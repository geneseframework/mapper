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
import { CreateOptions } from '../interfaces/create-options.interface';
import { ClassDeclaration } from 'ts-morph';


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

    static async create<T>(target: Tuple, data: any[], options?: CreateOptions): Promise<Tuple>

    // --------------------------------------------   Other overloads   ---------------------------------------------------

    static async create<T>(target: Target<T>, data: any[], options?: CreateOptions): Promise<T[]>
    static async create<T>(target: Target<T>, data: any, options?: CreateOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]>
    static async create<T>(target: Target<T>, data: unknown, options?: CreateOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]> {
        try {
            await this.init();
            options = this.setOptions(options);
            if (IncompatibilityService.areIncompatible(target, data, options)) {
                return undefined;
            } else if (MapTrivialCasesService.isTrivialCase(target, data)) {
                return MapTrivialCasesService.mapTrivialCase(target, data, options);
            } else {
                return this.mapDeclaration(target, data, options);
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


    private static setOptions(options: CreateOptions): CreateOptions {
        if (!options) {
            return {differentiateStringsAndNumbers: true};
        } else if (options.differentiateStringsAndNumbers !== false) {
            options.differentiateStringsAndNumbers = true;
        }
        return options;
    }


    private static async mapDeclaration<T>(target: Target<T>, data: any, options: CreateOptions): Promise<T | T[] | Date | Tuple> {
        if (TargetService.isTuple(target)) {
            return MapTupleService.create(data, target as Tuple);
        }
        const info: TargetInfo = TargetService.getInfo(target);
        const typeDeclaration: TypeDeclaration = getTypeDeclaration(info.typeName);
        console.log(chalk.cyanBright('MAPPPPP'), target, data, options, typeDeclaration.getName(), getDeclarationKind(typeDeclaration));
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                return MapInstanceService.createInstances<T>(data, info.typeName, options);
            case TypeDeclarationKind.ENUM_DECLARATION:
                return MapEnumService.createEnums(data, info.typeName, info.isArray);
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                return MapInterfaceService.createInterfaces(data, info.typeName, info.isArray, options);
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                return MapTypeService.createTypes(data, info.typeName, info.isArray, options);
            default:
                throwWarning(`Warning : type declaration "${info.typeName}" not found.`);
                return undefined;
        }
    }
}
