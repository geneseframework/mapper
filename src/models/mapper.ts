import { TConstructor } from './t-constructor.model';
import { clone } from '../index';
import { MapperOptions } from '../interfaces/mapper-options.interface';
import { ClassDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { InitService } from '../services/init.service';
import {
    isPrimitiveTypeOrArrayOfPrimitiveTypeNodes,
} from '../utils/primitives.util';
import { MapInstanceService } from '../services/map-instance.service';
import { MapPrimitiveService } from '../services/map-primitive.service';
import * as chalk from 'chalk';
import { FlagService } from '../services/flag.service';
import { GLOBAL } from '../const/global.const';
import { MapParameter } from '../types/map-parameter.type';
import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType, PrimitiveTypes } from '../types/primitives.type';
import { DeclarationService } from '../services/declaration.service';
import { MapTypeService } from '../services/map-type.service';

export class Mapper<T> {

    private tConstructor: TConstructor<T> = undefined;
    private typeName: string = undefined;

    /**
     * The constructor takes a Class (ie its constructor) as parameter, or a class name.
     * The tConstructor property is an object with the Type corresponding to this Class
     */
    private constructor(mapParameter: MapParameter<T>) {
        if (typeof mapParameter === 'string') {
            this.typeName = mapParameter;
        } else {
            this.tConstructor = mapParameter;
            this.typeName = mapParameter.name;
        }
    }


    static async create<T>(mapParameter: MapParameter<T>, data: boolean): Promise<boolean>
    static async create<T>(mapParameter: MapParameter<T>, data: number): Promise<number>
    static async create<T>(mapParameter: MapParameter<T>, data: string): Promise<string>
    static async create<T>(mapParameter: MapParameter<T>, data: any[], options?: MapperOptions): Promise<T[]>
    static async create<T>(mapParameter: MapParameter<T>, data: any, options: { isType: true }): Promise<T | any>
    static async create<T>(mapParameter: MapParameter<T>, data: any, options: { isInterface: true }): Promise<T>
    static async create<T>(mapParameter: TConstructor<T>, data: any, options?: MapperOptions): Promise<T>
    // static async create<T>(mapParameter: MapParameter<T>, data: any, options?: MapperOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements>
    static async create<T>(mapParameter: MapParameter<T>, data: any, options?: MapperOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements> {
        const mapper: Mapper<T> = await this.getInstance<T>(mapParameter);
        // TODO : Enums and types
        // TODO : Indexable types
        // TODO : properties "any" or without types
        if (isPrimitiveTypeOrArrayOfPrimitiveTypeNodes(mapper.typeName)) {
            return MapPrimitiveService.create(data, mapper.typeName as PrimitiveType | PrimitiveTypes);
        } else if (options?.isType === true) {
            const typeDeclaration: TypeAliasDeclaration = DeclarationService.getDeclaration(mapper.typeName, 'TypeAliasDeclaration');
            return MapTypeService.createTypes(data, mapper.typeName, typeDeclaration);
        } else if (options?.isInterface === true) {
            // TODO
        } else if (options?.isEnum === true) {
            // TODO
        } else {
            const classDeclaration: ClassDeclaration = DeclarationService.getDeclaration(mapper.typeName, 'ClassDeclaration');
            return MapInstanceService.createInstances(data, mapper.typeName, classDeclaration);
        }
    }


    private static async getInstance<T>(mapParameter: MapParameter<T>): Promise<Mapper<T>> {
        if (GLOBAL.isFirstMapper) {
            InitService.start();
            await FlagService.init();
        }
        return this.getMapper<T>(mapParameter) ?? new Mapper<T>(mapParameter);
    }


    private static getMapper<T>(mapParameter: MapParameter<T>): Mapper<T> {
        const typeName: string = typeof mapParameter === 'string' ? mapParameter : mapParameter.name;
        let mapper: Mapper<T> = GLOBAL.mappers.find(m => m.typeName === typeName);
        return mapper ?? new Mapper(mapParameter);
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
