import { Target } from '../types/target.type';
import { isPrimitiveValue, isAPrimitiveConstructor, isAPrimitiveTypeName } from '../utils/primitives.util';
import { haveIncompatibleTypes } from '../utils/incompatibility.util';
import * as chalk from 'chalk';
import { PrimitiveConstructor, PrimitiveElement } from '../types/primitives.type';
import { isClassDeclaration, isInterfaceDeclaration } from '../utils/ast-declaration.util';

export class IncompatibilityService {

    static areIncompatible<T>(target: Target<T>, data: any): boolean {
        // console.log(chalk.blueBright('ARE INCOMPPPP ??'), target, data, typeof target, isAPrimitiveTypeName(typeof data));
        if (isPrimitiveValue(data)) {
            if (this.isIncompatibleWithAPrimitive(target)) {
                return true;
            }
        } else if (this.isBooleanOrNumber(target)) {
            return true;
        } else {
            return false;
        }
    }


    private static isBooleanOrNumber(target: any): boolean {
        return ['number', 'boolean', Number, Boolean].includes(target);
    }




    private static isIncompatibleWithAPrimitive<T>(target: Target<T>): boolean {
        return this.isNotAStringAndNotAPrimitiveConstructor(target)
            || this.isClassOrInterface(target);
    }


    private static isNotAStringAndNotAPrimitiveConstructor<T>(target: Target<T>): boolean {
        return typeof target !== 'string' && !isAPrimitiveConstructor(target);
    }


    private static isClassOrInterface<T>(target: Target<T>): boolean {
        return typeof target === 'string' && (isClassDeclaration(target) || isInterfaceDeclaration(target));
    }

}
