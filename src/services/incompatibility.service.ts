import { Target } from '../types/target.type';
import {
    isPrimitiveConstructor,
    isPrimitiveOrArrayOfPrimitivesValue,
    isPrimitiveTypeName,
    isPrimitiveValue
} from '../utils/primitives.util';
import { isClassOrInterfaceDeclaration } from '../utils/ast-declaration.util';
import { isArray } from '../utils/arrays.util';
import { Tuple } from '../types/tuple.type';
import { TargetService } from './target.service';
import { PrimitiveConstructor, PrimitiveElement } from '../types/primitives.type';
import { isValidDateConstructor } from '../utils/dates.util';
import { SyntaxKind, TypeNode } from 'ts-morph';
import { CreateOptions } from '../interfaces/create-options.interface';
import * as chalk from 'chalk';

export class IncompatibilityService {

    static areIncompatible(target: Target<any>, data: any, options: CreateOptions): boolean {
        if (TargetService.areStringAndNumberButNotDifferentiateThem(target, data, options)) {
            return false;
        }
        if (this.dataIsPrimitiveAndTargetIsIncompatible(target, data)
            || this.targetIsBooleanAndDataNot(target, data)
            || this.targetIsNumberAndDataNot(target, data)
            || this.targetIsConstructorAndDataIsArray(target, data)
            || this.targetIsArrayAndDataIsIncompatible(target, data, options)) {
            return true;
        } else if (this.isClassOrInterfaceIncompatibleWithPrimitive(target) && isArray(data)) {
            return true;
        }
        return false;
    }


    private static dataIsPrimitiveAndTargetIsIncompatible(target: Target<any>, data: any): boolean {
        return isPrimitiveValue(data) && this.isIncompatibleWithPrimitive(target, data);
    }


    private static targetIsBooleanAndDataNot(target: Target<any>, data: any): boolean {
        return TargetService.isBoolean(target) && typeof data !== 'boolean';
    }


    private static targetIsNumberAndDataNot(target: Target<any>, data: any): boolean {
        return TargetService.isNumber(target) && typeof data !== 'number' && typeof data !== 'string';
    }


    private static targetIsConstructorAndDataIsArray(target: Target<any>, data: any): boolean {
        return typeof target === 'function' && isArray(data);
    }


    private static targetIsArrayAndDataIsIncompatible(target: Target<any>, data: any, options: CreateOptions): boolean {
        return TargetService.isArray(target) && this.isIncompatibleWithTargetArray(target as any[], data, options);
    }


    private static isIncompatibleWithPrimitive(target: Target<any>, data: PrimitiveElement): boolean {
        if (this.isCompatibleDate(target, data)) {
            return false;
        }
        return this.isPrimitiveConstructorNotCorrespondingToDataType(target, data)
            || this.isPrimitiveNameNotCorrespondingToDataType(target, data)
            || this.isClassOrInterfaceIncompatibleWithPrimitive(target);
    }


    private static isCompatibleDate(target: Target<any>, data: PrimitiveElement): boolean {
        return TargetService.isDate(target) && isValidDateConstructor(data);
    }


    private static isPrimitiveConstructorNotCorrespondingToDataType(target: Target<any>, data: PrimitiveElement): boolean {
        return isPrimitiveConstructor(target) && typeof data !== (target as PrimitiveConstructor).name.toLowerCase();
    }


    private static isPrimitiveNameNotCorrespondingToDataType(target: Target<any>, data: PrimitiveElement): boolean {
        return isPrimitiveTypeName(target) && typeof data !== target;
    }


    private static isClassOrInterfaceIncompatibleWithPrimitive<T>(target: Target<T>): boolean {
        if (TargetService.isConstructorNotPrimitive(target)) {
            return true;
        } else {
            return typeof target === 'string' && isClassOrInterfaceDeclaration(target);
        }
    }


    private static isIncompatibleWithTargetArray(target: any[], data: any, options: CreateOptions): boolean {
        if (TargetService.isTuple(target)) {
            return this.isIncompatibleWithTuple(target, data, options);
        } else if (!isArray(data)) {
            return true;
        } else {
            return false;
        }
    }


    private static isIncompatibleWithTuple(target: Tuple, data: any, options: CreateOptions): boolean {
        if (!isArray(data) || data?.length !== target.length) {
            return false;
        } else {
            for (let i = 0; i < target.length; i++) {
                if (this.areIncompatible(target[i], data[i], options)) {
                    return true;
                }
            }
        }
        return false;
    }


    static isIncompatibleWithTypeNode(dataValue: any, typeNode: TypeNode): boolean {
        return isPrimitiveOrArrayOfPrimitivesValue(dataValue) && typeNode.getKind() === SyntaxKind.TypeReference;
    }

}
