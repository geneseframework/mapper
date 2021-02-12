import { ClassConstructor, TConstructor } from './t-constructor.model';
import { clone } from '../index';
import { MapperOptions } from '../interfaces/mapper-options.interface';
import { AstService } from '../services/ast.service';
import { ClassDeclaration } from 'ts-morph';
import { InitService } from '../services/init.service';
import {
    ArrayOfPrimitiveElements,
    isPrimitiveTypeOrArrayOfPrimitiveTypes,
    PrimitiveElement,
    PrimitiveType,
    PrimitiveTypes
} from '../utils/primitives.util';
import { MapInstanceService } from '../services/map-instance.service';
import { MapPrimitiveService } from '../services/map-primitive.service';
import * as chalk from 'chalk';
import { FlagService } from '../services/flag.service';
import { GLOBAL } from '../const/global.const';

export class Mapper<T> {

    private tConstructor: TConstructor<T> = undefined;
    private typeName: string = undefined;

    /**
     * The constructor takes a Class (ie its constructor) as parameter, or a class name.
     * The tConstructor property is an object with the Type corresponding to this Class
     */
    private constructor(classConstructor: ClassConstructor<T> | string, options?: MapperOptions) {
        this.implement(classConstructor);
    }


    implement(classConstructor: ClassConstructor<T> | string): void {
        if (typeof classConstructor === 'string') {
            this.typeName = classConstructor;
        } else {
            this.tConstructor = classConstructor;
            this.typeName = classConstructor.name;
        }
    }


    private static async getInstance<T>(classConstructor: ClassConstructor<T> | string): Promise<Mapper<T>> {
        if (GLOBAL.isFirstMapper) {
            InitService.start();
            await FlagService.init();
        }
        return this.getMapper<T>(classConstructor) ?? new Mapper<T>(classConstructor);
    }


    private static getMapper<T>(classConstructor: ClassConstructor<T> | string): Mapper<T> {
        const typeName: string = typeof classConstructor === 'string' ? classConstructor : classConstructor.name;
        let mapper: Mapper<T> = GLOBAL.mappers.find(m => m.typeName === typeName);
        return mapper ?? new Mapper(classConstructor);
    }


    static async create<T>(classConstructor: ClassConstructor<T> | string, data: boolean): Promise<boolean>
    static async create<T>(classConstructor: ClassConstructor<T> | string, data: number): Promise<number>
    static async create<T>(classConstructor: ClassConstructor<T> | string, data: string): Promise<string>
    static async create<T>(classConstructor: ClassConstructor<T> | string, data: any[]): Promise<T[]>
    static async create<T>(classConstructor: ClassConstructor<T> | string, data: any): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements> {
        const mapper: Mapper<T> = await this.getInstance<T>(classConstructor);
        console.log(chalk.cyanBright('MAPPERRRRRRR'), mapper);
        if (isPrimitiveTypeOrArrayOfPrimitiveTypes(mapper.typeName)) {
            return MapPrimitiveService.create(data, mapper.typeName as PrimitiveType | PrimitiveTypes);
        } else {
            const classDeclaration: ClassDeclaration = AstService.getClassDeclaration(mapper.typeName);
            if (Array.isArray(data)) {
                return MapInstanceService.createInstances(data, mapper.typeName, classDeclaration);
            } else {
                return MapInstanceService.createInstance(data, mapper.typeName, classDeclaration);
            }
        }
    }



    /**
     * If source and target are both string or number, we cast source into the target's type and returns it.
     * This methodName adds a tolerance for http requests which returns numbers instead of strings and inversely
     * Caution : params target and source should not be falsy values
     */
    _castStringAndNumbers(target: any, source: any): any {
        if ((typeof target !== 'string' && typeof target !== 'number') || source === undefined) {
            console.warn('Genese _castStringAndNumbers : source or target undefined');
            return undefined;
        } else if (source === null) {
            return null;
        } else if (typeof target === 'string' && (typeof source === 'number' || typeof source === 'string')) {
            return  source.toString();
        } else if (typeof target === 'number' && typeof source === 'number') {
            return source;
        } else if (typeof target === 'number' && typeof source === 'string') {
            return isNaN(Number(source)) ? target : +source;
        } else {
            console.warn('Genese _castStringAndNumbers : impossible to cast this elements');
            return undefined;
        }
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
