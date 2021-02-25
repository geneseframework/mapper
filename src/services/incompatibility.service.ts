import { Target } from '../types/target.type';
import { isAPrimitiveConstructor, isAPrimitiveTypeName, isPrimitiveValue } from '../utils/primitives.util';
import { isClassDeclaration, isInterfaceDeclaration } from '../utils/ast-declaration.util';
import { isArray } from '../utils/arrays.util';
import { Tuple } from '../types/tuple.type';
import * as chalk from 'chalk';
import { TargetService } from './target.service';

export class IncompatibilityService {

    static areIncompatible<T>(target: Target<T>, data: any): boolean {
        console.log(chalk.blueBright('ARE INCOMPPPP ??'), target, data, typeof target, isAPrimitiveTypeName(target));
        console.log(chalk.magentaBright('isPrimitiveValue(data)))))'), isPrimitiveValue(data));
        if (isPrimitiveValue(data)) {
            if (this.isIncompatibleWithAPrimitive(target)) {
                console.log(chalk.greenBright('isIncompatibleWithAPrimitiveeeeee)'), data);
                return true;
            }
        } else if (this.isBooleanOrNumber(target)) {
            return true;
        } else if (TargetService.isArray(target) && this.isIncompatibleWithTargetArray(target as any[], data)) {
            return true;
        }
        return false;
    }


    private static isBooleanOrNumber(target: any): boolean {
        return ['number', 'boolean', Number, Boolean].includes(target);
    }


    private static isIncompatibleWithAPrimitive<T>(target: Target<T>): boolean {
        console.log(chalk.blueBright('this.isClassOrInterface(target))))))'), target, this.isClassOrInterface(target));
        return this.isNotAStringAndNotAPrimitiveConstructor(target) || this.isClassOrInterface(target) || typeof target === 'function';
    }


    private static isNotAStringAndNotAPrimitiveConstructor<T>(target: Target<T>): boolean {
        return typeof target !== 'string' && !isAPrimitiveConstructor(target);
    }


    private static isClassOrInterface<T>(target: Target<T>): boolean {
        return typeof target === 'string' && (isClassDeclaration(target) || isInterfaceDeclaration(target));
    }


    private static isIncompatibleWithTargetArray(target: any[], data: any): boolean {
        // console.log(chalk.magentaBright('isIncompatibleWithTargetArrayyyyy'), target, data);
        if (TargetService.isTuple(target)) {
            return this.isIncompatibleWithTuple(target, data);
        } else if (!isArray(data)) {
            return true;
        } else {
            return false;
        }
    }


    private static isIncompatibleWithTuple(target: Tuple, data: any): boolean {
        if (!isArray(data) || data?.length !== target.length) {
            return false;
        } else {
            for (let i = 0; i < target.length; i++) {
                if (this.areIncompatible(target[i], data[i])) {
                    return true;
                }
            }
        }
        return false;
    }

}
