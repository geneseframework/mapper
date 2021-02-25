import { Target } from '../types/target.type';
import { TargetInfo } from '../types/target-info.type';
import { TConstructor } from '../types/t-constructor.type';
import { Key } from '../types/key.type';
import { Tuple } from '../types/tuple.type';
import { throwWarning } from '../utils/errors.util';

export class TargetService {


    static isArray<T>(target: Target<T>): boolean {
        return TargetService.getInfo(target)?.isArray;
    }


    static isTuple(target: Target<any>) {
        return Array.isArray(target) && target.length > 1;
    }


    static getInfo<T>(target: Target<T>): TargetInfo {
        let typeName: string = this.getInfoTypeName(target);
        let isArray: boolean = this.getInfoIsArray(target);
        return {
            typeName: typeName,
            isArray: isArray,
        }
        // if (this.isObject(target)) {
        //     return { typeName: 'object', isArray: false}
        // } else if (this.isObjectArray(target)) {
        //     return { typeName: 'object', isArray: true}
        // } else {
        //     return {
        //         typeName: typeof target === 'string' ? this.removeBrackets(target) : this.getConstructorName(target as TConstructor<T> | [TConstructor<T>]),
        //         isArray: typeof target === 'string' ? this.isStringArray(target) : this.isArrayButNotTuple(target)
        //     }
        // }
    }


    private static getInfoTypeName<T>(target: Target<T>): string {
        if (typeof target === 'string') {
            return this.removeBrackets(target);
        } else if (typeof target === 'function') {
            return target.name;
        } else if (this.isObjectOrObjectsArray(target)) {
            return 'object';
        } else if (this.isArrayButNotTuple(target)) {
            return this.getInfoTypeName((target as any[])?.[0]);
        } else if (Array.isArray(target)) {
            return 'Tuple';
        }
        throwWarning(`Warning: typeName not found for : `, target);
        return undefined;
    }


    private static getInfoIsArray<T>(target: Target<T>): boolean {
        return this.isStringArray(target) || this.isArrayButNotTuple(target);
    }


    private static isStringArray<T>(target: Target<T>): boolean {
        return typeof target === 'string' && this.endsByBrackets(target);
    }


    private static endsByBrackets(targetName: string): boolean {
        return targetName.slice(-2) === '[]';
    }


    private static removeBrackets<T>(targetName: string): string {
        return this.isStringArray(targetName) ? targetName.slice(0, -2) : targetName;
    }


    private static isArrayButNotTuple<T>(target: TConstructor<T> | Key | Tuple): boolean {
        return Array.isArray(target) && !this.isTuple(target);
    }


    private static getConstructorName<T>(target: TConstructor<T> | [TConstructor<T>]): string {
        return Array.isArray(target) ? target[0]?.name : target.name;
    }


    private static isFunction<T>(target: Target<T>): boolean {
        return typeof target === 'function';
    }


    static isObjectOrObjectsArray(target: Target<any>): boolean {
        return this.isObject(target) || this.isObjectArray(target);
    }


    private static isObject(target: Target<any>): boolean {
        if (target === Object) {
            return true;
        } else {
            return typeof target === 'string' && ['object', 'Object'].includes(target);
        }
    }


    private static isObjectArray(target: Target<any>): boolean {
        return typeof target === 'string' && ['object[]', 'Object[]'].includes(target);
    }


}
