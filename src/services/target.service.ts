import { Target } from '../types/target.type';
import { TargetInfo } from '../types/target-info.type';
import { isObjectTarget, isObjectTargetArray } from '../utils/objects.util';
import * as chalk from 'chalk';
import { TConstructor } from '../models/t-constructor.model';
import { Key } from '../types/key.type';
import { Tuple } from '../types/tuple.type';

export class TargetService {


    static getInfo<T>(target: Target<T>): TargetInfo {
        if (isObjectTarget(target)) {
            return { typeName: 'object', isArray: false}
        } else if (isObjectTargetArray(target)) {
            return { typeName: 'object', isArray: true}
        } else {
            return {
                typeName: typeof target === 'string' ? this.removeBrackets(target) : (target as TConstructor<T>).name,
                isArray: typeof target === 'string' ? this.isStringArray(target) : this.isInstanceArray(target)
            }
        }
    }


    private static removeBrackets(target: string): string {
        return this.isStringArray(target) ? target.slice(0, -2) : target;
    }


    private static isStringArray(target: string): boolean {
        return target.slice(-2) === '[]';
    }


    private static isInstanceArray<T>(target: TConstructor<T> | Key | Tuple): boolean {
        // TODO
        return undefined;
    }

}
