import { TConstructor } from './t-constructor.model';
import { MapOptions } from '../interfaces/mapper-options.interface';
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

export class Mapper<T> {


    static async create<T>(mapTarget: MapTarget<T>, data: boolean): Promise<boolean>
    static async create<T>(mapTarget: MapTarget<T>, data: number): Promise<number>
    static async create<T>(mapTarget: MapTarget<T>, data: string): Promise<string>
    static async create<T>(mapTarget: {} | Object, data: object): Promise<object>
    static async create<T>(mapTarget: [{}] | Object[], data: object[]): Promise<object[]>
    static async create<Date>(mapTarget: MapTarget<Date>, data: Date): Promise<Date>
    static async create<T>(mapTarget: Tuple, data: any[], options?: MapOptions): Promise<Tuple>
    static async create<Date>(mapTarget: MapTarget<Date>, data: Date[]): Promise<Date[]>
    static async create<T>(mapTarget: MapTarget<T>, data: any[], options?: MapOptions): Promise<T[]>
    static async create<T>(mapTarget: TConstructor<T>, data: any, options?: MapOptions): Promise<T>
    static async create<T>(mapTarget: MapTarget<T>, data: any, options?: MapOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]> {
        await this.init();
        if (this.isTrivialCase<T>(mapTarget, data)) {
            return this.mapTrivialCase(mapTarget, data, options);
        } else {
            return this.mapTypeDeclaration(mapTarget, data, options);
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


    private static mapTrivialCase(mapTarget: MapTarget<any>, data: any, options?: MapOptions):  PrimitiveElement | ArrayOfPrimitiveElements | Promise<Tuple> | Date | Date[] | object | object[] {
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


    private static mapTypeDeclaration<T>(mapTarget: MapTarget<T>, data: any, options?: MapOptions): T | T[] | Date {
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
