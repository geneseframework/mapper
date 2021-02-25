import { Target } from '../types/target.type';
import {
    isPrimitiveConstructor,
    isPrimitiveOrArrayOfPrimitivesValue,
    isPrimitiveTypeName,
    isPrimitiveValue
} from '../utils/primitives.util';
import { isClassDeclaration, isInterfaceDeclaration } from '../utils/ast-declaration.util';
import { isArray } from '../utils/arrays.util';
import { Tuple } from '../types/tuple.type';
import * as chalk from 'chalk';
import { TargetService } from './target.service';
import { PrimitiveConstructor, PrimitiveElement } from '../types/primitives.type';
import { types } from 'util';
import { isValidDateConstructor } from '../utils/dates.util';
import { SyntaxKind, TypeNode } from 'ts-morph';

export class IncompatibilityService {

    static areIncompatible<T>(target: Target<T>, data: any): boolean {
        if (isPrimitiveValue(data) && this.isIncompatibleWithPrimitive(target, data)) {
                return true;
        } else if (this.isBoolean(target) && typeof data !== 'boolean') {
            return true;
        } else if (this.isNumber(target) && typeof data !== 'number') {
            return true;
        } else if (TargetService.isArray(target) && this.isIncompatibleWithTargetArray(target as any[], data)) {
            return true;
        } else if (this.isClassOrInterfaceIncompatibleWithPrimitive(target, data) && isArray(data)) {
            return true;
        }
        return false;
    }


    private static isBoolean(target: any): boolean {
        return ['boolean', Boolean].includes(target);
    }


    private static isNumber(target: any): boolean {
        return ['number', Number].includes(target);
    }


    private static isIncompatibleWithPrimitive(target: Target<any>, data: PrimitiveElement): boolean {
        if (this.isCompatibleDate(target, data)) {
            return false;
        }
        return this.isPrimitiveConstructorNotCorrespondingToDataType(target, data)
            || this.isPrimitiveNameNotCorrespondingToDataType(target, data)
            || this.isClassOrInterfaceIncompatibleWithPrimitive(target, data);
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


    private static isClassOrInterfaceIncompatibleWithPrimitive<T>(target: Target<T>, data: PrimitiveElement): boolean {
        if (TargetService.isConstructorNotPrimitive(target)) {
            return true;
        } else {
            return typeof target === 'string' && (isClassDeclaration(target) || isInterfaceDeclaration(target));
        }
    }


    private static isIncompatibleWithTargetArray(target: any[], data: any): boolean {
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


    static isIncompatibleWithTypeNode(dataValue: any, typeNode: TypeNode): boolean {
        return isPrimitiveOrArrayOfPrimitivesValue(dataValue) && typeNode.getKind() === SyntaxKind.TypeReference;
    }

}
