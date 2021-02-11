import { ClassConstructor, TConstructor } from '../models/t-constructor.model';
import { PRIMITIVES } from '../models/primitive.model';
import { clone, isPrimitive } from '..';
import { MapperOptions } from '../interfaces/mapper-options.interface';
import { AstService } from '../services/ast.service';
import { ConstructorFile } from '../interfaces/constructor-file.interface';
import { ClassDeclaration, Project } from 'ts-morph';
import { InitService } from '../services/init.service';
import * as chalk from 'chalk';
import { InstanceService } from './new-instance';
import { GLOBAL } from '../const/global.const';
import { Global } from '../models/global.model';

export class Mapper<T> {

    readonly className: string = undefined;
    readonly tConstructor: TConstructor<T> = undefined;

    /**
     * The constructor takes a Class (ie its constructor) as parameter, or a class name.
     * The tConstructor property is an object with the Type corresponding to this Class
     */
    constructor(classConstructor: ClassConstructor<T> | string, options?: MapperOptions) {
        if (typeof classConstructor === 'string') {
            this.className = classConstructor;
        } else {
            this.tConstructor = classConstructor;
            this.className = classConstructor.name;
        }
    }


    /**
     * The core of the generic mapper
     * If uConstructor is undefined, U equals T and this methodName returns a mapped T object
     * If not, it returns a mapped U object
     * uConstructor is useful for extraction of given fields of a T class object
     */
    async create(data: any[]): Promise<T[]>
    async create(data: any): Promise<T>
    async create(data: any): Promise<T | T[]> {
        InitService.start();
        const classDeclaration: ClassDeclaration = AstService.getClassDeclaration(this.className);
        console.log(chalk.greenBright('CSTR FILE PATHHHHHH'), classDeclaration?.getName());
        if (Array.isArray(data)) {
            return InstanceService.newInstances(data, this.className, classDeclaration);
        } else {
            return InstanceService.newInstance(data, this.className, classDeclaration);
        }
    }


    /**
     * Receives an array of elements to map (with type T) and returns the array of mapped results (with T type)
     */
    public arrayMap(data: any[], tConstructor: TConstructor<any> = this.tConstructor): T[] {
        if (data === null) {
            return null;
        }
        if (!Array.isArray(data)) {
            return [];
        }
        const results: any[] = [];
        if (PRIMITIVES.includes(tConstructor.name)) {
            data.forEach(e => {
                if (typeof e === tConstructor.name.toLowerCase()) {
                    results.push(e);
                } else if (tConstructor.name === 'String' && typeof e === 'number') {
                    results.push(e.toString());
                } else if (tConstructor.name === 'Number' && typeof e === 'string' && !isNaN(Number(e))) {
                    results.push(+e);
                } else if (e === null) {
                    results.push(null);
                }
            });
        } else {
            data.forEach(e => {
                results.push(this.create(e));
            });
        }
        return results;
    }


    // --------------------------------------------------
    //                 INTERNAL METHODS
    // --------------------------------------------------


    /**
     * Check if two objects are both string or number.
     * In this case, returns true.
     */
    _areStringOrNumber(target: any, source: any): boolean {
        return ((typeof target === 'string' || typeof target === 'number') && (typeof source === 'number' || typeof source === 'string'));
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
     * For a given object with U type (the target model), returns the source object mapped with the U model
     * If source === null, it returns null
     * CAUTION: param "target" can't be undefined
     */
    _diveMap<U>(target: U, source: any): any {
        if (source === undefined) {
            return target;
        } else if (source === null) {
            return source;
        } else {
            if (isPrimitive(target)) {
                if (isPrimitive(source)) {
                    if (this._areStringOrNumber(target, source)) {
                        return this._castStringAndNumbers(target, source);
                    } else {
                        return (typeof source === 'boolean' && typeof target === 'boolean') ? source : target;
                    }
                } else {
                    return target;
                }
            } else {
                return this._mapNotPrimitive(target, source);
            }
        }
    }


    /**
     * For non-primitive objects, returns source object mapped with the type of the target (U)
     * If source === null, it returns null
     * CAUTION: param "target" can't be undefined
     */
    _mapNotPrimitive<U>(target: U, source: any): any {
        if (source === undefined) {
            return target;
        } else if (source === null) {
            return null;
        } else {
            let cloneTarget = Object.assign({}, target);
            for (const key of Object.keys(target)) {
                if (key === 'gnIndexableType') {
                    cloneTarget = this._mapIndexableType(target as unknown as IndexableType, source);
                } else {
                    if (target[key] !== undefined) {
                        if (source[key] === null) {
                            cloneTarget[key] = null;
                        } else if (source[key] === undefined) {
                            cloneTarget[key] = this._purge(target[key]);
                        } else {
                            if (Array.isArray(target[key])) {
                                cloneTarget[key] = Array.isArray(source[key])
                                    ? this._mapArray(target[key], source[key])
                                    : cloneTarget[key];
                            } else {
                                if (this._areStringOrNumber(target[key], source[key])) {
                                    cloneTarget[key] = this._castStringAndNumbers(target[key], source[key]);
                                } else {
                                    cloneTarget[key] = this._diveMap(target[key], source[key]);
                                }
                            }
                        }
                    } else {
                        return source;
                    }
                }
            }
            return cloneTarget;
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
        const mappedObject: any = {};
        for (const key of Object.keys(source)) {
            const deepMapped = this._diveMap({[key]: [target]}, source);
            Object.assign(mappedObject, {[key]: deepMapped[key]});
        }
        return mappedObject;
    }



    _mapIndexableTypeObject(target: any, source: any): any {
        const mappedObject: any = {};
        for (const key of Object.keys(source)) {
            Object.assign(mappedObject, {[key]: this._diveMap(target, source[key])});
        }
        return mappedObject;
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
                mappedElement = this._diveMap(model, element);
            }
            arrayOfObjects.push(mappedElement);
        }
        return arrayOfObjects;
    }


    /**
     * Remove specific genese properties
     */
    _purge(obj: any): any {
        if (!obj) {
            return obj;
        }
        delete obj.gnIndexableType;
        return obj;
    }


    /**
     * If a property of the U class have the decorator @GnRename, this methodName replaces the key of the gnRename http param
     * This methodName is useful when the backend renamed some DTO properties :
     * with @GnRename decorator, you can get values from backend without changing the property name of your T objects in every file
     */
    _rename<U>(uConstructor: TConstructor<U>, data: any): any {
        const constr: any = uConstructor;
        Object.keys(constr.gnRename).map(oldKey => {
            const newKey = constr.gnRename[oldKey];
            if (data[newKey]) {
                data[oldKey] = data[newKey];
                delete data[newKey];
            }
        });
        return data;
    }



    /**
     * If data object with type U have keys 'gnTranslate', this methodName returns the same object removing gnTranslate key
     * and preserving only the gnTranslate[language] objects
     * Example :
     * if data is like
     * {
     *     gnTranslate: {
     *         fr: {
     *             country: 'Allemagne'
     *         },
     *         en: {
     *             country: 'Germany'
     *         }
     *     }
     * }
     * and if language is 'fr', his methodName will return
     * {
     *     country: 'Allemagne'
     * }
     */
    public translate(data: any, language: string): any {
        if (!data || !language) {
            console.error('No data or no language : impossible to translate element');
            return undefined;
        } else {
            const result = clone(data);
            Object.keys(result).map(key => {
                if (key === 'gnTranslate') {
                    Object.assign(result, result.gnTranslate[language]);
                    delete result.gnTranslate;
                } else {
                    if (typeof result[key] === 'object') {
                        const copy = clone(result[key]);
                        result[key] = this.translate(copy, language);
                    }
                }
            });
            return result;
        }
    }
}

export interface IndexableType {
    gnIndexableType: {[key: string]: any};
}
