import { TConstructor } from './t-constructor.model';
import { MapperOptions } from '../interfaces/mapper-options.interface';
import { InitService } from '../services/init.service';
import { isPrimitiveTypeOrArrayOfPrimitiveTypeNodes, } from '../utils/primitives.util';
import { MapInstanceService } from '../services/map-instance.service';
import { MapPrimitiveService } from '../services/map-primitive.service';
import { FlagService } from '../services/flag.service';
import { GLOBAL } from '../const/global.const';
import { MapParameter } from '../types/map-parameter.type';
import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType } from '../types/primitives.type';
import { MapTypeService } from '../services/map-type.service';
import { clone } from '../utils/clone.util';
import { MapEnumService } from '../services/map-enum.service';
import { getDeclarationKind, getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { MapInterfaceService } from '../services/map-interface.service';
import { isTuple } from '../utils/tuples.util';
import { MapTupleService } from '../services/map-tuple.service';
import { Tuple } from '../types/tuple.type';
import { TypeDeclaration } from '../types/type-declaration.type';

export class Mapper<T> {


    static async create<T>(mapParameter: MapParameter<T>, data: boolean): Promise<boolean>
    static async create<T>(mapParameter: MapParameter<T>, data: number): Promise<number>
    static async create<T>(mapParameter: MapParameter<T>, data: string): Promise<string>
    static async create<T>(mapParameter: Tuple, data: any[], options?: MapperOptions): Promise<Tuple>
    static async create<T>(mapParameter: MapParameter<T>, data: any[], options?: MapperOptions): Promise<T[]>
    static async create<T>(mapParameter: TConstructor<T>, data: any, options?: MapperOptions): Promise<T>
    static async create<T>(mapParameter: MapParameter<T>, data: any, options?: MapperOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple> {
        if (isTuple(mapParameter)) {
            return MapTupleService.create(data, mapParameter as Tuple);
        }
        const infos: { typeName: string, isArray: boolean } = this.getInfos(mapParameter);
        const typeName = infos.typeName;
        const isArray = infos.isArray;
        await this.init();
        // TODO : Indexable types
        // TODO : properties "any" or without types
        // TODO : Dates
        // console.log(chalk.blueBright('MAPPERRRRRR'), mapParameter, data, typeName, isArray);
        if (isPrimitiveTypeOrArrayOfPrimitiveTypeNodes(typeName)) {
            return MapPrimitiveService.create(data, typeName as PrimitiveType, isArray);
        } else {
            const typeDeclaration: TypeDeclaration = getTypeDeclaration(typeName);
            switch (getDeclarationKind(typeDeclaration)) {
                case TypeDeclarationKind.CLASS_DECLARATION:
                    return MapInstanceService.createInstances(data, typeName);
                case TypeDeclarationKind.ENUM_DECLARATION:
                    return MapEnumService.createEnums(data, typeName, isArray);
                case TypeDeclarationKind.INTERFACE_DECLARATION:
                    return MapInterfaceService.createInterfaces(data, typeName, isArray);
                case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                    return MapTypeService.createTypes(data, typeName, isArray);
                default:
                    return undefined;
            }
        }
    }


    private static async init<T>(): Promise<void> {
        if (GLOBAL.isFirstMapper) {
            InitService.start();
            await FlagService.init();
        }
    }


    private static getInfos<T>(mapParameter: MapParameter<T>): { typeName: string, isArray: boolean } {
        return {
            typeName: typeof mapParameter === 'string' ? this.removeBrackets(mapParameter) : (mapParameter as TConstructor<T>).name,
            isArray: typeof mapParameter === 'string' ? this.isArrayType(mapParameter) : false
        }
    }


    private static removeBrackets(typeOrArrayTypeName: string): string {
        return this.isArrayType(typeOrArrayTypeName) ? typeOrArrayTypeName.slice(0, -2) : typeOrArrayTypeName;
    }


    private static isArrayType(typeOrArrayTypeName: string): boolean {
        return typeOrArrayTypeName.slice(-2) === '[]';
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
