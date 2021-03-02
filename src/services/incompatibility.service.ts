import { Target } from '../types/target/target.type';
import { isClassOrInterfaceDeclaration } from '../utils/ast/ast-declaration.util';
import { isArray } from '../utils/native/arrays.util';
import { TupleOld } from '../types/target/target-tuple-old.type';
import { TargetServiceOld } from './targets/target.service.old';
import { PrimitiveConstructor, Primitive, isPrimitiveConstructor } from '../types/primitives.type';
import { isValidDateConstructor } from '../utils/native/dates.util';
import { SyntaxKind, TypeNode } from 'ts-morph';
import { CreateOptions } from '../interfaces/create-options.interface';
import { isPrimitiveTypeName } from '../utils/native/types.util';
import {
    isNonNullOrPrimitiveValue,
    isPrimitiveOrArrayOfPrimitivesValue
} from '../utils/native/primitives.util';

/**
 * Checks if the data's format is compatible with the mapping's target
 */
export class IncompatibilityService {

    /**
     * Checks if the data's format is compatible with the mapping's target
     * @param target
     * @param data
     * @param options
     */
    static areIncompatible(target: Target<any>, data: any, options: CreateOptions): boolean {
        if (TargetServiceOld.areStringAndNumberButNotDifferentiateThem(target, data, options)) {
            return false;
        }
        return this.dataIsPrimitiveAndTargetIsIncompatible(target, data)
            || this.targetIsBooleanAndDataNot(target, data)
            || this.targetIsNumberAndDataNot(target, data)
            || this.targetIsConstructorAndDataIsArray(target, data)
            || this.targetIsTupleAndDataIsIncompatible(target, data)
            || this.targetIsArrayAndDataIsIncompatible(target, data, options)
            || this.isNotPrimitiveClassOrInterfaceAndDataIsArray(target, data);
    }


    /**
     * Returns true if data is a primitive and if target is incompatible with native, false if not
     * @param target
     * @param data
     * @private
     */
    private static dataIsPrimitiveAndTargetIsIncompatible(target: Target<any>, data: any): boolean {
        return isNonNullOrPrimitiveValue(data) && this.isIncompatibleWithPrimitive(target, data);
    }


    /**
     * Returns true if target is 'boolean' or Boolean and if data is not a boolean, false if not
     * @param target
     * @param data
     * @private
     */
    private static targetIsBooleanAndDataNot(target: Target<any>, data: any): boolean {
        return TargetServiceOld.isBoolean(target) && typeof data !== 'boolean';
    }


    /**
     * Returns true if target is 'number' or Number and if data is not a number AND not a string, false if not
     * @param target
     * @param data
     * @private
     */
    private static targetIsNumberAndDataNot(target: Target<any>, data: any): boolean {
        return TargetServiceOld.isNumber(target) && typeof data !== 'number' && typeof data !== 'string';
    }


    /**
     * Returns true if target is a Class Constructor and if data is an array, false if not
     * @param target
     * @param data
     * @private
     */
    private static targetIsConstructorAndDataIsArray(target: Target<any>, data: any): boolean {
        return typeof target === 'function' && isArray(data);
    }


    /**
     * Returns true if target is an array and if data is incompatible with arrays, false if not
     * @param target
     * @param data
     * @param options
     * @private
     */
    private static targetIsArrayAndDataIsIncompatible(target: Target<any>, data: any, options: CreateOptions): boolean {
        return isArray(target) && this.isIncompatibleWithTargetArray(target as any[], data, options);
    }


    /**
     * Returns true if target is a TupleOld and if data is incompatible with Tuples, false if not
     * @param target
     * @param data
     * @private
     */
    private static targetIsTupleAndDataIsIncompatible(target: Target<any>, data: any): boolean {
        return TargetServiceOld.isTuple(target) && (!isArray(data) || data.length !== (target as any[]).length);
    }


    /**
     * Returns true if data is a primitive and target is incompatible with testMappers type, false if not
     * @param target
     * @param data
     * @private
     */
    private static isIncompatibleWithPrimitive(target: Target<any>, data: Primitive): boolean {
        if (this.isCompatibleDate(target, data)) {
            return false;
        }
        return this.isPrimitiveConstructorNotCorrespondingToDataType(target, data)
            || this.isPrimitiveNameNotCorrespondingToDataType(target, data)
            || this.isNotPrimitiveClassOrInterface(target);
    }


    /**
     * Returns true if target is 'data' or Date and if data may be a valid date constructor, false if not
     * @param target
     * @param data
     * @private
     */
    private static isCompatibleDate(target: Target<any>, data: Primitive): boolean {
        return TargetServiceOld.isDate(target) && isValidDateConstructor(data);
    }


    private static isPrimitiveConstructorNotCorrespondingToDataType(target: Target<any>, data: Primitive): boolean {
        return isPrimitiveConstructor(target) && typeof data !== (target as PrimitiveConstructor).name.toLowerCase();
    }


    private static isPrimitiveNameNotCorrespondingToDataType(target: Target<any>, data: Primitive): boolean {
        return typeof target === 'string' && isPrimitiveTypeName(target) && typeof data !== target;
    }


    private static isNotPrimitiveClassOrInterfaceAndDataIsArray(target: Target<any>, data: Primitive): boolean {
        return this.isNotPrimitiveClassOrInterface(target) && isArray(data);
    }

    private static isNotPrimitiveClassOrInterface<T>(target: Target<T>): boolean {
        if (TargetServiceOld.isConstructorNotPrimitive(target)) {
            return true;
        } else {
            return typeof target === 'string' && isClassOrInterfaceDeclaration(target);
        }
    }


    private static isIncompatibleWithTargetArray(target: any[], data: any, options: CreateOptions): boolean {
        if (TargetServiceOld.isTuple(target)) {
            return this.isIncompatibleWithTuple(target, data, options);
        } else if (!isArray(data)) {
            return true;
        } else {
            return false;
        }
    }


    private static isIncompatibleWithTuple(target: TupleOld, data: any, options: CreateOptions): boolean {
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
