import { Target } from '../../types/target/target.type';
import { TargetInfo } from '../../types/target/target-info.type';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { isClassOrInterfaceDeclaration, isDeclaration, isTypeCombination } from '../../utils/ast/ast-declaration.util';
import { TConstructor } from '../../types/t-constructor.type';
import { isArray } from '../../utils/native/arrays.util';
import { isPrimitiveConstructor, Primitive } from '../../types/primitives.type';
import { isFunction } from '../../utils/native/functions.util';
import { isBoolean } from '../../utils/native/booleans.util';
import { isNumber } from '../../utils/native/numbers.util';
import { isString } from '../../utils/native/strings.util';
import { trimTarget } from '../../utils/target.util';

export class TargetService {

    static toString<T>(target: Target<T>): string {
        if (isArray(target)) {
            return this.stringifyArray(target);
        } else if (isFunction(target)) {
            return target?.name;
        } else if (isBoolean(target) || isNumber(target)) {
            return this.stringifyPrimitive(target);
        } else {
            return this.normalize(target);
        }
    }


    static isTuple(target: Target<any>): boolean {
        return Array.isArray(target) && target.length > 1;
    }


    private static stringifyArray(tupleTarget: any[]): string {
        let stringifiedTarget = '[';
        for (const target of tupleTarget) {
            stringifiedTarget = `${stringifiedTarget}${this.toString(target)}, `;
        }
        return `${stringifiedTarget.slice(0, -2)}]`;
    }


    private static stringifyPrimitive(target: Primitive): string {
        return `'${target}'`;
    }


    static isArrayButNotTuple<T>(target: any): boolean {
        return Array.isArray(target) && !this.isTuple(target);
    }


    static normalize(target: string): string {
        if (['String', 'Number', 'Boolean'].includes(target)) {
            return target.toLowerCase();
        }
        target = trimTarget(target);
        const regExps: RegExp[] = this.primitiveRegexps();
        for (const regex of regExps) {
            const matches: string[] = target.match(regex) ?? [];
            for (const match of matches) {
                target = target.replace(match, match.toLowerCase());
            }
        }
        return target;
    }


    private static primitiveRegexps(): RegExp[] {
        const stringRegex: RegExp = /([[ (,|&?:])String([,|&?:) \]])/g;
        const numberRegex: RegExp = /([[ (,|&?:])Number([,|&?:) \]])/g;
        const booleanRegex: RegExp = /([[ (,|&?:])Boolean([,|&?:) \]])/g;
        return [stringRegex, numberRegex, booleanRegex];
    }


    static isDeclaration(target: Target<any>): boolean {
        return (typeof target === 'string' && isDeclaration(target)) || (typeof target === 'function' && isDeclaration(target.name));
    }


    static isTypeCombination(target: Target<any>): boolean {
        return typeof target === 'string' && isTypeCombination(target);
    }


    static getInfo<T>(target: Target<T>): TargetInfo {
        let typeName: string = this.getInfoTypeName(target);
        let isArray: boolean = this.getInfoIsArray(target);
        return {
            typeName: typeName,
            isArray: isArray,
        }
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


    static isConstructorNotPrimitive<T>(target: Target<T>): target is TConstructor<T> {
        return typeof target === 'function' && !isPrimitiveConstructor(target);
    }


    static isObjectOrObjectsArray(target: Target<any>): target is 'object' | 'object[]' {
        return this.isObject(target) || this.isObjectArray(target);
    }


    private static isObject(target: Target<any>): target is 'object' {
        if (target === Object) {
            return true;
        } else {
            return typeof target === 'string' && ['object', 'Object'].includes(target);
        }
    }


    private static isObjectArray(target: Target<any>): boolean {
        if (Array.isArray(target) && target[0] === Object) {
            return true;
        } else {
            return typeof target === 'string' && ['object[]', 'Object[]'].includes(target);
        }
    }


    // static isBoolean(target: any): boolean {
    //     return ['boolean', Boolean].includes(target);
    // }
    //
    //
    // static isNumber(target: any): boolean {
    //     return ['number', Number].includes(target);
    // }
    //
    //
    // static isString(target: any): boolean {
    //     return ['string', String].includes(target);
    // }


    static isDate(target: Target<any>): boolean {
        return target === 'Date' || (typeof target === 'function' && target?.name === 'Date');
    }


    static areStringAndNumberButNotDifferentiateThem(target: Target<any>, data: any, options: CreateOptions): boolean {
        return (this.targetIsStringButNotClassOrInterface(target) && (typeof data === 'string' || (typeof data === 'number' && options.differentiateStringsAndNumbers === false)))
            || (isNumber(target) && (typeof data === 'number' || (typeof data === 'string' && options.differentiateStringsAndNumbers === false)));
    }


    private static targetIsStringButNotClassOrInterface(target: Target<any>): boolean {
        return isString(target) && !isClassOrInterfaceDeclaration(target as string);
    }

}
