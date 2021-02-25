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
            console.log(chalk.cyanBright('INFOOOO'), target);
            return {
                typeName: typeof target === 'string' ? this.removeBrackets(target) : (target as TConstructor<T>).name,
                isArray: typeof target === 'string' ? this.isTypeArray(target) : this.isInstanceArray(target)
            }
        }
    }


    private static removeBrackets(typeOrArrayTypeName: string): string {
        return this.isTypeArray(typeOrArrayTypeName) ? typeOrArrayTypeName.slice(0, -2) : typeOrArrayTypeName;
    }


    private static isTypeArray(typeOrArrayTypeName: string): boolean {
        return typeOrArrayTypeName.slice(-2) === '[]';
    }


    private static isInstanceArray<T>(target: TConstructor<T> | Key | Tuple): boolean {
        // TODO
        return undefined;
    }

}
