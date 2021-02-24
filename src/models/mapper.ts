import { TConstructor } from './t-constructor.model';
import { InitService } from '../services/init.service';
import { isPrimitiveOrPrimitivesArray, } from '../utils/primitives.util';
import { MapInstanceService } from '../services/map-instance.service';
import { MapPrimitiveService } from '../services/map-primitive.service';
import { FlagService } from '../services/flag.service';
import { GLOBAL } from '../const/global.const';
import { MapTarget } from '../types/map-target.type';
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
import { MapTargetInfo } from '../types/map-target-info.type';
import { isDateOrDatesArrayType } from '../utils/dates.util';
import { isTuple } from '../utils/tuples.util';
import { isObjectOrObjectsArrayTarget, isObjectTarget, isObjectTargetArray } from '../utils/objects.util';
import { MapObjectService } from '../services/map-object.service';
import { throwWarning } from '../utils/errors.util';
import { WrongDataType } from '../types/wrong-data-type.type';
import { DateConstructorParameters } from '../types/date-cpnstructor-parameters.type';
import {
    NotArray,
    NotArrayOfInstances,
    NotBoolean,
    NotDate,
    NotInstance,
    NotNumber, NotObject,
    NotString, ObjectNotArray
} from '../types/not-some-type.type';


export class Mapper<T> {


    // --------------------------------------------   String overloads   -----------------------------------------------------

    static async create(mapTarget: 'string' | StringConstructor, data: string): Promise<string>
    static async create(mapTarget: 'string' | StringConstructor, data: NotString): Promise<unknown>
    static async create(mapTarget: 'string' | StringConstructor, data: any): Promise<string | undefined>

    static async create(mapTarget: 'string[]' | [StringConstructor], data: Array<any>): Promise<string[]>
    static async create(mapTarget: 'string[]' | [StringConstructor], data: NotArray): Promise<unknown>
    static async create(mapTarget: 'string[]' | [StringConstructor], data: any): Promise<string[] | undefined>

    // --------------------------------------------   Number overloads   -----------------------------------------------------

    static async create(mapTarget: 'number' | NumberConstructor, data: number): Promise<number>
    static async create(mapTarget: 'number' | NumberConstructor, data: NotNumber): Promise<unknown>
    static async create(mapTarget: 'number' | NumberConstructor, data: any): Promise<number | undefined>

    static async create(mapTarget: 'number[]' | [NumberConstructor], data: Array<any>): Promise<number[]>
    static async create(mapTarget: 'number[]' | [NumberConstructor], data: NotArray): Promise<unknown>
    static async create(mapTarget: 'number[]' | [NumberConstructor], data: any): Promise<number[] | undefined>

    // -------------------------------------------   Boolean overloads   --------------------------------------------------

    static async create(mapTarget: 'boolean' | BooleanConstructor, data: boolean): Promise<boolean>
    static async create(mapTarget: 'boolean' | BooleanConstructor, data: NotBoolean): Promise<unknown>
    static async create(mapTarget: 'boolean' | BooleanConstructor, data: any): Promise<boolean | undefined>

    static async create(mapTarget: 'boolean[]' | [BooleanConstructor], data: Array<any>): Promise<boolean[]>
    static async create(mapTarget: 'boolean[]' | [BooleanConstructor], data: NotArray): Promise<unknown>
    static async create(mapTarget: 'boolean[]' | [BooleanConstructor], data: any): Promise<boolean[] | undefined>

    // -------------------------------------   Objects overloads (not arrays)   -------------------------------------------

    static async create(mapTarget: 'object' | ObjectConstructor, data: ObjectNotArray): Promise<object>
    static async create(mapTarget: 'object' | ObjectConstructor, data: NotObject | Array<any>): Promise<unknown>
    static async create(mapTarget: 'object' | ObjectConstructor, data: object): Promise<object | undefined>

    // -------------------------------------------   Dates overloads   ----------------------------------------------------

    static async create(mapTarget: DateConstructor, data: DateConstructorParameters): Promise<Date>
    static async create(mapTarget: DateConstructor, data: NotDate): Promise<unknown>
    static async create(mapTarget: DateConstructor, data: any): Promise<Date | undefined>

    static async create(mapTarget: DateConstructor[], data: Array<any>): Promise<Date[]>
    static async create(mapTarget: DateConstructor[], data: NotArray): Promise<unknown>
    static async create(mapTarget: DateConstructor[], data: any): Promise<Date[] | undefined>

    // ----------------------------------------   Constructor overloads   -------------------------------------------------

    static async create<T>(mapTarget: TConstructor<T>, data: T): Promise<T>
    static async create<T>(mapTarget: TConstructor<T>, data: NotInstance): Promise<unknown>
    static async create<T>(mapTarget: TConstructor<T>, data: any): Promise<T | undefined>

    static async create<T>(mapTarget: [TConstructor<T>] | TConstructor<T>[], data: T[]): Promise<T[]> // data must have type which could be an array of T
    static async create<T>(mapTarget: [TConstructor<T>] | TConstructor<T>[], data: NotArray): Promise<unknown> // data must have type which could be an array of T
    static async create<T>(mapTarget: [TConstructor<T>] | TConstructor<T>[], data: any): Promise<T[] | undefined>

    static async create<T>(mapTarget: Tuple, data: any[]): Promise<Tuple>
    static async create<T>(mapTarget: MapTarget<T>, data: any[]): Promise<T[]>
    static async create<T>(mapTarget: MapTarget<T>, data: any): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]>
    static async create<T>(mapTarget: MapTarget<T>, data: unknown): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]> {
        GLOBAL.start = Date.now();
        await this.init();
        // GLOBAL.logDuration('Finished initialization');
        if (this.isTrivialCase<T>(mapTarget, data)) {
            return this.mapTrivialCase(mapTarget, data);
        } else {
            return this.mapTypeDeclaration(mapTarget, data);
        }
    }


    private static async init<T>(): Promise<void> {
        if (GLOBAL.isFirstMapper) {
            InitService.start();
            await FlagService.init();
        }
    }


    private static isTrivialCase<T>(mapTarget: MapTarget<T>, data: any): boolean {
        const info: MapTargetInfo = this.getInfo(mapTarget);
        return isNullOrUndefined(data)
            || isObjectOrObjectsArrayTarget(mapTarget)
            || isTuple(mapTarget)
            || isPrimitiveOrPrimitivesArray(info.typeName)
            || isDateOrDatesArrayType(info.typeName);
    }


    private static mapTrivialCase(mapTarget: MapTarget<any>, data: any):  PrimitiveElement | ArrayOfPrimitiveElements | Promise<Tuple> | Date | Date[] | object | object[] {
        if (isNullOrUndefined(data)) {
            return data;
        } else if (isTuple(mapTarget)) {
            return MapTupleService.create(data, mapTarget as Tuple);
        }
        const info: MapTargetInfo = this.getInfo(mapTarget);
        if (isObjectOrObjectsArrayTarget(mapTarget)) {
            return MapObjectService.create(data, info);
        } else if (isPrimitiveOrPrimitivesArray(info.typeName)) {
            return MapPrimitiveService.create(data, info.typeName as PrimitiveType, info.isArray);
        } else if (isDateOrDatesArrayType(info.typeName)) {
            return MapDateService.createDates(data, info.isArray);
        }
    }


    private static async mapTypeDeclaration<T>(mapTarget: MapTarget<T>, data: any): Promise<T | T[] | Date> {
        const info: MapTargetInfo = this.getInfo(mapTarget);
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


    private static getInfo<T>(mapTarget: MapTarget<T>): MapTargetInfo {
        if (isObjectTarget(mapTarget)) {
            return { typeName: 'object', isArray: false}
        } else if (isObjectTargetArray(mapTarget)) {
            return { typeName: 'object', isArray: true}
        } else {
            return {
                typeName: typeof mapTarget === 'string' ? this.removeBrackets(mapTarget) : (mapTarget as TConstructor<T>).name,
                isArray: typeof mapTarget === 'string' ? this.isArrayType(mapTarget) : false
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
