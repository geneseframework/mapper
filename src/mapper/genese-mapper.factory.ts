import { Tools } from '../services/tools.service';
import { TConstructor } from '../models/t-constructor.model';
import { PRIMITIVES } from '../models/primitive.model';

/**
 * The core of the generic mapper
 * If uConstructor is undefined, U equals T and this methodName returns a mapped T object
 * If not, it returns a mapped U object
 * uConstructor is useful for extraction of given fields of a T class object
 */
export function geneseMapper<T>(data: any, tConstructor: TConstructor<T>): T {
    console.log('%c data', 'font-weight: bold; color: blue;', data);
    console.log('%c tConstructor', 'font-weight: bold; color: blue;', tConstructor);
    checkTConstructor(tConstructor);
    let tObject = new tConstructor();
    if (!data) {
        return tObject;
    }
    console.log('%c tObject', 'font-weight: bold; color: blue;', tObject);
    if (tConstructor.hasOwnProperty('gnRename')) {
        data = _rename(tConstructor, data);
    }
    tObject = Object.assign(tObject, _diveMap<T>(tObject, data));
    console.log('%c tObject', 'font-weight: bold; color: blue;', tObject);
    return tObject;
}

/**
 * Returns array of mapped results
 */
export function mapGetAllResults<T>(data: any[], tConstructor: TConstructor<T>): T[] {
    const gConstructor = tConstructor ? tConstructor : tConstructor;
    const results: any[] = [];
    if (PRIMITIVES.includes(gConstructor.name)) {
        data.forEach(e => {
            const newElement = typeof e === gConstructor.name.toLowerCase() ? e : undefined;
            results.push(newElement);
        });
    } else {
        data.forEach(e => {
            results.push(geneseMapper<T>(e, tConstructor));
        });
    }
    return results;
}


/**
 * If a property of the U class have the decorator @GnRename, this methodName replaces the key of the gnRename http param
 * This methodName is useful when the backend renamed some DTO properties :
 * with @GnRename decorator, you can get values from backend without changing the property name of your T objects in every file
 */
export function _rename<U>(uConstructor: TConstructor<U>, data: any): any {
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
 * For a given object with U type (the target model), returns the source object mapped with the U model
 * If source === null, it returns null
 * CAUTION: param "target" can't be undefined
 */
export function _diveMap<U>(target: U, source: any): any {
    if (source === undefined) {
        return target;
    } else if (source === null) {
        return source;
    } else {
        if (Tools.isPrimitive(target)) {
            if (Tools.isPrimitive(source)) {
                if (_areStringOrNumber(target, source)) {
                    return _castStringAndNumbers(target, source);
                } else {
                    return source === false ? false : target;
                }
            } else {
                return target;
            }
        } else {
            return _mapNotPrimitive(target, source);
        }
    }
}


/**
 * For non-primitive objects, returns source object mapped with the type of the target (U)
 * If source === null, it returns null
 * CAUTION: param "target" can't be undefined
 */
export function _mapNotPrimitive<U>(target: U, source: any): any {
    if (source === undefined) {
        return target;
    } else if (source === null) {
        return null;
    } else {
        let cloneTarget = Object.assign({}, target);
        for (const key of Object.keys(target)) {
            if (key === 'gnIndexableType') {
                cloneTarget = _mapIndexableType(target[key] as unknown as IndexableType, source);
            }
            if (target[key] !== undefined) {
                if (source[key] === null) {
                    cloneTarget[key] = null;
                } else if (source[key] === undefined) {
                    cloneTarget[key] = target[key];
                } else {
                    if (Array.isArray(target[key])) {
                        cloneTarget[key] = Array.isArray(source[key])
                            ? _mapArrayOfObjects(target[key], source[key])
                            : cloneTarget[key];
                    } else {
                        if (_areStringOrNumber(target[key], source[key])) {
                            cloneTarget[key] = _castStringAndNumbers(target[key], source[key]);
                        } else {
                            cloneTarget[key] = _diveMap(target[key], source[key]);
                        }
                    }
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
 * For example, this method can return something like :
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
export function _mapIndexableType(target: any, source: any): any {
    if (!target) {
        console.warn('Impossible to map indexable types with undefined target.');
        return undefined;
    }
    if (source === undefined) {
        return target;
    }
    if (source === null) {
        return null;
    }
    return Array.isArray(target) && target.length > 0
        ? _mapIndexableTypeArray(target[0], source)
        : _mapIndexableTypeObject(target, source);
}



export function _mapIndexableTypeObject(target: any, source: any): any {
    const mappedObject = {};
    for (const key of Object.keys(source)) {
        Object.assign(mappedObject, { [key]: _diveMap(target, source[key])});
    }
    return mappedObject;
}


export function _mapIndexableTypeArray(target: any[], source: any): any {
    const mappedObject: any = {};
    for (const key of Object.keys(source)) {
        const deepMapped = _diveMap({[key]: [target]}, source);
        Object.assign(mappedObject, {[key]: deepMapped[key]});
    }
    delete mappedObject.gnIndexableType;
    return mappedObject;
}


/**
 * Check if two objects are both string or number.
 * In this case, returns true.
 */
export function _areStringOrNumber(target: any, source: any): boolean {
    return ((typeof target === 'string' || typeof target === 'number') && (typeof source === 'number' || typeof source === 'string'));
}


/**
 * If source and target are both string or number, we cast source into the target's type and returns it.
 * This methodName adds a tolerance for http requests which returns numbers instead of strings and inversely
 * Caution : params target and source should not be falsy values
 */
export function _castStringAndNumbers(target: any, source: any): any {
    if ((typeof target !== 'string' && typeof target !== 'number') || source === undefined) {
        console.warn('Genese _castStringAndNumbers : source or target undefined');
        return undefined;
    } else if (source === null) {
        return null;
    } else if (typeof target === 'string' && (typeof source === 'number' || typeof source === 'string')) {
        return  source.toString();
    } else if (typeof target === 'number' && (typeof source === 'number' || typeof source === 'string')) {
        return +source;
        // } else if (Tools.isSameObject(target, source)) {
        //     return source;
    } else {
        console.warn('Genese _castStringAndNumbers : impossible to cast this elements');
        return undefined;
    }
}


/**
 * Mapper to array of objects by calling _diveMap for each object of the array
 */
export function _mapArrayOfObjects(target: {[key: string]: any}[], source: {[key: string]: any}[]): {[key: string]: any}[] {
    if (!Array.isArray(target) || target.length === 0 || !Array.isArray(source)) {
        console.warn('Impossible to map array of objects with undefined or empty array');
        return undefined;
    }
    const arrayOfObjects: any[] = [];
    const model = Tools.clone(target[0]);
    for (const element of source) {
        arrayOfObjects.push(_diveMap(model, element));
    }
    return arrayOfObjects;
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
export function translate(data: any, language: string): any {
    if (!data || !language) {
        console.error('No data or no language : impossible to translate element');
        return undefined;
    } else {
        const result = Tools.clone(data);
        Object.keys(result).map(key => {
            if (key === 'gnTranslate') {
                Object.assign(result, result.gnTranslate[language]);
                delete result.gnTranslate;
            } else {
                if (typeof result[key] === 'object') {
                    const clone = Tools.clone(result[key]);
                    result[key] = translate(clone, language);
                }
            }
        });
        return result;
    }
}

export function checkTConstructor(tConstructor) {
    if (!tConstructor) {
        throw Error('Genese mapper : tConstructor undefined. You must use a valid class as parameter in the Genese mapper.');
    }
}

export interface IndexableType {
    gnIndexableType: {[key: string]: any};
}
