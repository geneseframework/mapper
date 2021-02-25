import { Target } from '../types/target.type';
import { isPrimitiveConstructor, isAPrimitiveTypeName, isPrimitiveValue } from '../utils/primitives.util';
import { isClassDeclaration, isInterfaceDeclaration } from '../utils/ast-declaration.util';
import { isArray } from '../utils/arrays.util';
import { Tuple } from '../types/tuple.type';
import * as chalk from 'chalk';
import { TargetService } from './target.service';
import { PrimitiveConstructor, PrimitiveElement } from '../types/primitives.type';

export class IncompatibilityService {

    static areIncompatible<T>(target: Target<T>, data: any): boolean {
        console.log(chalk.blueBright('ARE INCOMPPPP ??'), target, data, typeof target);
        if (isPrimitiveValue(data) && this.isIncompatibleWithPrimitive(target, data)) {
                console.log(chalk.greenBright('isIncompatibleWithAPrimitiveeeeee)'), data);
                return true;
        } else if (this.isBoolean(target) && typeof data !== 'boolean') {
            return true;
        } else if (this.isNumber(target) && typeof data !== 'number') {
            return true;
        } else if (TargetService.isArray(target) && this.isIncompatibleWithTargetArray(target as any[], data)) {
            return true;
        } else if (this.isClassOrInterface(target) && isArray(data)) {
            return true;
        }
        console.log(chalk.greenBright('ARE COMPPPPP !!!!'), target, data, typeof target);
        return false;
    }


    private static isBoolean(target: any): boolean {
        return ['boolean', Boolean].includes(target);
    }


    private static isNumber(target: any): boolean {
        return ['number', Number].includes(target);
    }


    private static isIncompatibleWithPrimitive(target: Target<any>, data: PrimitiveElement): boolean {
        console.log(chalk.greenBright('this.isClassOrInterface(target))))))'), this.isPrimitiveConstructorNotCorrespondingToDataType(target, data));
        console.log(chalk.greenBright('this.isClassOrInterface(target))))))bjhhgjk'), this.isPrimitiveNameNotCorrespondingToDataType(target, data));
        console.log(chalk.greenBright('this.isClassOrInterface(target))))))  ghghjgj'), this.isClassOrInterface(target));
        return this.isPrimitiveConstructorNotCorrespondingToDataType(target, data)
            || this.isPrimitiveNameNotCorrespondingToDataType(target, data)
            || this.isClassOrInterface(target);
    }


    private static isPrimitiveConstructorNotCorrespondingToDataType(target: Target<any>, data: PrimitiveElement): boolean {
        // console.log(chalk.magentaBright('IS PRIM CSTTRRRRR NOT CTPPPP'), target, data, isPrimitiveConstructor(target), (target as PrimitiveConstructor).name.toLowerCase());
        return isPrimitiveConstructor(target) && typeof data !== (target as PrimitiveConstructor).name.toLowerCase();
    }


    private static isPrimitiveNameNotCorrespondingToDataType(target: Target<any>, data: PrimitiveElement): boolean {
        console.log(chalk.blueBright('this.isClassOrInterface(target))))))'), target, isPrimitiveConstructor(target));
        return isAPrimitiveTypeName(target) && typeof data !== target;
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
