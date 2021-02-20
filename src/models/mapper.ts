import { TConstructor } from './t-constructor.model';
import { MapOptions } from '../interfaces/mapper-options.interface';
import { InitService } from '../services/init.service';
import { isPrimitiveTypeOrArrayOfPrimitiveType, } from '../utils/primitives.util';
import { MapInstanceService } from '../services/map-instance.service';
import { MapPrimitiveService } from '../services/map-primitive.service';
import { FlagService } from '../services/flag.service';
import { GLOBAL } from '../const/global.const';
import { MapTarget } from '../types/map-target.type';
import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType } from '../types/primitives.type';
import { MapTypeService } from '../services/map-type.service';
import { clone } from '../utils/clone.util';
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
import { isArray } from '../utils/arrays.util';
import * as chalk from 'chalk';

export class Mapper<T> {


    static async create<T>(mapTarget: MapTarget<T>, data: boolean): Promise<boolean>
    static async create<T>(mapTarget: MapTarget<T>, data: number): Promise<number>
    static async create<T>(mapTarget: MapTarget<T>, data: string): Promise<string>
    static async create<Date>(mapTarget: MapTarget<Date>, data: Date): Promise<Date>
    static async create<T>(mapTarget: Tuple, data: any[], options?: MapOptions): Promise<Tuple>
    static async create<Date>(mapTarget: MapTarget<Date>, data: Date[]): Promise<Date[]>
    static async create<T>(mapTarget: MapTarget<T>, data: any[], options?: MapOptions): Promise<T[]>
    static async create<T>(mapTarget: TConstructor<T>, data: any, options?: MapOptions): Promise<T>
    static async create<T>(mapTarget: MapTarget<T>, data: any, options?: MapOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[]> {
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
            || this.isTuple(mapTarget)
            || isPrimitiveTypeOrArrayOfPrimitiveType(info.typeName)
            || isDateOrDatesArrayType(info.typeName);
    }


    private static mapTrivialCase(mapTarget: MapTarget<any>, data: any, options?: MapOptions):  PrimitiveElement | ArrayOfPrimitiveElements | Promise<Tuple> | Date | Date[] {
        const info: MapTargetInfo = this.getInfo(mapTarget);
        if (isNullOrUndefined(data)) {
            return data;
        }
        if (this.isTuple(mapTarget)) {
            return MapTupleService.create(data, mapTarget as Tuple);
        }
        if (isPrimitiveTypeOrArrayOfPrimitiveType(info.typeName)) {
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
        return {
            typeName: typeof mapTarget === 'string' ? this.removeBrackets(mapTarget) : (mapTarget as TConstructor<T>).name,
            isArray: typeof mapTarget === 'string' ? this.isArrayType(mapTarget) : false
        }
    }


    private static removeBrackets(typeOrArrayTypeName: string): string {
        return this.isArrayType(typeOrArrayTypeName) ? typeOrArrayTypeName.slice(0, -2) : typeOrArrayTypeName;
    }


    private static isArrayType(typeOrArrayTypeName: string): boolean {
        return typeOrArrayTypeName.slice(-2) === '[]';
    }


    private static isTuple(mapTarget: MapTarget<any>) {
        return isArray(mapTarget);
    }




    /**
     * When an object haves a field named 'gnIndexableType', that means that this object haves a model like this :
     * {
     *   [key: string]: {
     *       country: string
     *      }
     *   } = {
     *      gnIndexableType: {
     *           country: ''
     *      }
     *  };
     * For each key of gnIndexableType field, this method returns the corresponding mapped object with the target model
     * For example, this method will receive an object like this :
     *
     * gnIndexableType: {
     *      country: ''
     * }
     *
     * and will return something like this :
     *
     * {
     *     fr: {
     *         country: 'France'
     *     },
     *     en: {
     *         country: 'England'
     *     }
     * }
     * Caution: param target should be defined
     */
    _mapIndexableType(target: any, source: any): any {
        if (target === undefined || target.gnIndexableType === undefined) {
            console.warn('Impossible to map indexable types with undefined target.');
            return undefined;
        }
        if (source === undefined) {
            return target;
        }
        if (source === null) {
            return null;
        }
        return Array.isArray(target.gnIndexableType) && target.gnIndexableType.length > 0
            ? this._mapIndexableTypeArray(target.gnIndexableType[0], source)
            : Object.assign({}, this._mapIndexableTypeObject(target.gnIndexableType, source));
    }


    _mapIndexableTypeArray(target: any[], source: any): any {
        // const mappedObject: any = {};
        // for (const key of Object.keys(source)) {
        //     const deepMapped = this._diveMap({[key]: [target]}, source);
        //     Object.assign(mappedObject, {[key]: deepMapped[key]});
        // }
        // return mappedObject;
    }



    _mapIndexableTypeObject(target: any, source: any): any {
        // const mappedObject: any = {};
        // for (const key of Object.keys(source)) {
        //     Object.assign(mappedObject, {[key]: this._diveMap(target, source[key])});
        // }
        // return mappedObject;
    }


    /**
     * Map array of objects
     */
    _mapArray(target: any[], source: any[]): any[] {
        if (source === null) {
            return null;
        }
        if (source === undefined || !Array.isArray(source) || (Array.isArray(target) && !Array.isArray(source))) {
            return target;
        }
        if (!Array.isArray(target) || target.length === 0) {
            console.warn('Impossible to map array of objects with undefined or empty array');
            return undefined;
        }
        const arrayOfObjects: any[] = [];
        const model = clone(target[0]);
        for (const element of source) {
            let mappedElement: any;
            if (Array.isArray(model) && Array.isArray(element)) {
                mappedElement = this._mapArray(model, element);
            } else if (Array.isArray(model) && !Array.isArray(element) && !!element) {
                return target;
            } else {
                // mappedElement = this._diveMap(model, element);
            }
            arrayOfObjects.push(mappedElement);
        }
        return arrayOfObjects;
    }

}

export interface IndexableType {
    gnIndexableType: {[key: string]: any};
}
