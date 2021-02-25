import { Target } from '../types/target.type';
import { TargetInfo } from '../types/target-info.type';
import { isObjectTarget, isObjectTargetArray } from '../utils/objects.util';
import * as chalk from 'chalk';
import { TConstructor } from '../types/t-constructor.type';
import { Key } from '../types/key.type';
import { Tuple } from '../types/tuple.type';

export class TargetService {


    static isArray<T>(target: Target<T>): boolean {
        return TargetService.getInfo(target)?.isArray;
    }


    static isTuple(target: Target<any>) {
        return Array.isArray(target) && target.length > 1;
    }


    static getInfo<T>(target: Target<T>): TargetInfo {
        if (isObjectTarget(target)) {
            return { typeName: 'object', isArray: false}
        } else if (isObjectTargetArray(target)) {
            return { typeName: 'object', isArray: true}
        } else {
            return {
                typeName: typeof target === 'string' ? this.removeBrackets(target) : this.getConstructorName(target as TConstructor<T> | [TConstructor<T>]),
                isArray: typeof target === 'string' ? this.isStringArray(target) : this.isArrayButNotTuple(target)
            }
        }
    }


    private static removeBrackets(target: string): string {
        return this.isStringArray(target) ? target.slice(0, -2) : target;
    }


    private static isStringArray(target: string): boolean {
        return target.slice(-2) === '[]';
    }


    private static isArrayButNotTuple<T>(target: TConstructor<T> | Key | Tuple): boolean {
        return Array.isArray(target) && !this.isTuple(target);
    }


    private static getConstructorName<T>(target: TConstructor<T> | [TConstructor<T>]): string {
        return Array.isArray(target) ? target[0]?.name : target.name;
    }

}
