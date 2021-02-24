import { TConstructor } from './t-constructor.model';
import { InitService } from '../services/init.service';
import { isPrimitiveOrPrimitivesArray, } from '../utils/primitives.util';
import { MapInstanceService } from '../services/map-instance.service';
import { MapPrimitiveService } from '../services/map-primitive.service';
import { FlagService } from '../services/flag.service';
import { GLOBAL } from '../const/global.const';
import { Target } from '../types/target.type';
import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType } from '../types/primitives.type';
import { MapTypeService } from '../services/map-type.service';
import { MapEnumService } from '../services/map-enum.service';
import { getDeclarationKind, getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { MapInterfaceService } from '../services/map-interface.service';
import { MapTupleService } from '../services/map-tuple.service';
import { Tuple } from '../types/tuple.type';
import { TypeDeclaration } from '../types/type-declaration.type';
import { isNullOrUndefined } from '../utils/any.util';
import { MapDateService } from '../services/map-date.service';
import { TargetInfo } from '../types/target-info.type';
import { isDateOrDatesArrayType } from '../utils/dates.util';
import { isTuple } from '../utils/tuples.util';
import { isObjectOrObjectsArrayTarget, isObjectTarget, isObjectTargetArray } from '../utils/objects.util';
import { MapObjectService } from '../services/map-object.service';
import { throwWarning } from '../utils/errors.util';
import { DateConstructorParameters } from '../types/date-cpnstructor-parameters.type';
import {
    NotArray,
    NotBoolean,
    NotDate,
    NotInstance,
    NotNumber, NotObject,
    NotString, ObjectNotArray
} from '../types/not-some-type.type';
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
    // TODO : remove ability to receive InstanceArray when target is not an array
    // static async create<T>(target: TConstructor<T>, data: T[]): Promise<T[]>
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
        GLOBAL.start = Date.now();
        await this.init();
        // GLOBAL.logDuration('Finished initialization');
        if (this.isTrivialCase<T>(target, data)) {
            return this.mapTrivialCase(target, data);
        } else {
            return this.mapTypeDeclaration(target, data);
        }
    }


    private static async init<T>(): Promise<void> {
        if (GLOBAL.isFirstMapper) {
            InitService.start();
            await FlagService.init();
        }
    }


    private static isTrivialCase<T>(target: Target<T>, data: any): boolean {
        const info: TargetInfo = this.getInfo(target);
        return isNullOrUndefined(data)
            || isObjectOrObjectsArrayTarget(target)
            || isTuple(target)
            || isPrimitiveOrPrimitivesArray(info.typeName)
            || isDateOrDatesArrayType(info.typeName);
    }


    private static mapTrivialCase(target: Target<any>, data: any):  PrimitiveElement | ArrayOfPrimitiveElements | Promise<Tuple> | Date | Date[] | object | object[] {
        if (isNullOrUndefined(data)) {
            return data;
        } else if (isTuple(target)) {
            return MapTupleService.create(data, target as Tuple);
        }
        const info: TargetInfo = this.getInfo(target);
        if (isObjectOrObjectsArrayTarget(target)) {
            return MapObjectService.create(data, info);
        } else if (isPrimitiveOrPrimitivesArray(info.typeName)) {
            return MapPrimitiveService.create(data, info.typeName as PrimitiveType, info.isArray);
        } else if (isDateOrDatesArrayType(info.typeName)) {
            return MapDateService.createDates(data, info.isArray);
        }
    }


    private static async mapTypeDeclaration<T>(target: Target<T>, data: any): Promise<T | T[] | Date> {
        const info: TargetInfo = this.getInfo(target);
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


    private static getInfo<T>(target: Target<T>): TargetInfo {
        if (isObjectTarget(target)) {
            return { typeName: 'object', isArray: false}
        } else if (isObjectTargetArray(target)) {
            return { typeName: 'object', isArray: true}
        } else {
            return {
                typeName: typeof target === 'string' ? this.removeBrackets(target) : (target as TConstructor<T>).name,
                isArray: typeof target === 'string' ? this.isArrayType(target) : false
            }
        }
    }


    private static removeBrackets(typeOrArrayTypeName: string): string {
        return this.isArrayType(typeOrArrayTypeName) ? typeOrArrayTypeName.slice(0, -2) : typeOrArrayTypeName;
    }


    private static isArrayType(typeOrArrayTypeName: string): boolean {
        return typeOrArrayTypeName.slice(-2) === '[]';
    }
}
