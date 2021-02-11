import {
    ClassDeclaration,
    EnumDeclaration,
    NamedTupleMember,
    PropertyDeclaration,
    TupleTypeNode,
    TypeNode
} from 'ts-morph';
import * as chalk from 'chalk';
import { hasPrimitiveType, isPrimitiveType } from '../utils/primitives.util';
import { Cat } from '../debug/project/src/models/cat.model';
import { getImportDeclaration, isEnumValue } from '../utils/ast.util';
import { Person } from '../debug/project/src/models/person.model';
import { Address } from '../debug/project/src/models/address.model';
import { ClassOrEnumDeclaration } from '../types/class-or-enum-declaration.type';

export class InstanceService<T> {


    static createInstance(className: string): any {
        switch (className) {
            case 'Address':
                return new Address(undefined, undefined, undefined);
            case 'Cat':
                return new Cat(undefined, undefined, undefined);
            case 'Person':
                return new Person(undefined, undefined, undefined, undefined, undefined, undefined);
            default:
                return undefined;
        }
    }


    static newInstances<T>(data: any[], className: string, classDeclaration: ClassDeclaration): T[] {
        const instancesArray: T[] = [];
        for (const element of data) {
            const instance: T = this.newInstance(element, className, classDeclaration);
            this.map(data, instance, classDeclaration);
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    static newInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration): T {
        const instance: T = this.createInstance(className);
        return this.map(data, instance, classDeclaration);
    }


    private static map<T>(data: any, instance: T, classDeclaration: ClassDeclaration): T {
        for (const key of Object.keys(data)) {
            this.keyMap(instance, classDeclaration, key, data[key]);
        }
        // console.log(chalk.greenBright('INSTANCEEEEEE'), instance);
        return instance;
    }


    private static keyMap<T>(target: any, classDeclaration: ClassDeclaration, key: string, dataValue: any): void {
        const property: PropertyDeclaration = classDeclaration.getProperties().find(p => p.getName() === key);
        if (!property) {
            return;
        }
        const propertyStructureType: string = property.getStructure().type as string;
        const apparentType: string = property.getType().getApparentType().getText().toLowerCase();
        const propertyType = propertyStructureType ?? apparentType;
        // console.log(chalk.yellowBright('propertyyyy '), property.getName(), propertyType, property.getType().isTuple());
        if (isPrimitiveType(propertyType)) {
            this.setPrimitiveType(target, key, dataValue);
            return;
        }
        if (this.isArrayType(property)) {
            this.setArrayType(target, key, dataValue, propertyType, apparentType);
            return;
        }
        if (this.isTupleType(property)) {
            console.log(chalk.yellowBright('propertyyyy '), property.getName(), propertyType, apparentType);
            // console.log(chalk.yellowBright('propertyyyy STRUCT'), property.getType());
            const tupleType: TupleTypeNode = property.getTypeNode() as TupleTypeNode;
            // console.log(chalk.yellowBright('propertyyyy TUPLE ELTSSSS'), tupleType.getElements());
            this.setTupleType(target, key, dataValue, propertyType, apparentType, property.getTypeNode() as TupleTypeNode);
            return;
        }
        const declaration: ClassOrEnumDeclaration = getImportDeclaration(apparentType, propertyType);
        console.log(chalk.magentaBright('IMPT DECLLLLLLL NAME'), declaration?.getName());
        if (!declaration) {
            return;
        }
        if (declaration instanceof ClassDeclaration) {
            this.setClassType(target, key, dataValue, propertyType, declaration);
            return;
        }
        if (declaration instanceof EnumDeclaration) {
            this.setEnumType(target, key, dataValue, declaration);
            return;
        }
    }


    private static setPrimitiveType(target: any, key: string, dataValue: any): void {
        if (hasPrimitiveType(dataValue)) {
            target[key] = dataValue;
        }
    }


    private static setEnumType(target: any, key: string, dataValue: any, declaration: EnumDeclaration): void {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }


    private static setClassType(target: any, key: string, dataValue: any, propertyType: string, declaration: ClassDeclaration): void {
        target[key] = this.createInstance(propertyType);
        this.map(dataValue, target[key], declaration);
    }


    private static isArrayType(property: PropertyDeclaration): boolean {
        return property.getType().isArray();
    }


    private static setArrayType(target: any, key: string, dataValue: any, propertyType: string, apparentType: string): void {
        if (!Array.isArray(dataValue)) {
            return;
        }
        const typeName: string = propertyType.slice(0, -2);
        const importArrayDeclaration: ClassOrEnumDeclaration = getImportDeclaration(apparentType, typeName);
        target[key] = [] as any[];
        for (const element of dataValue) {
            const instance = this.createInstance(typeName);
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const mapped = this.map(element, instance, importArrayDeclaration);
                target[key].push(mapped);
            }
            if (importArrayDeclaration instanceof EnumDeclaration && hasPrimitiveType(element)) {
                target[key].push(element);
            }
        }
    }


    private static isTupleType(property: PropertyDeclaration): boolean {
        return property.getType().isTuple();
    }



    private static setTupleType(target: any, key: string, dataValue: any, propertyType: string, apparentType: string, tupleTypeNode: TupleTypeNode): void {
        console.log(chalk.redBright('SET TYPE TUPLLLLLL'), propertyType, dataValue, apparentType);
        console.log(chalk.red('TYPE TUPLLLLLL'), tupleTypeNode?.getElements().length, dataValue?.length);
        const tupleElements: (TypeNode | NamedTupleMember)[] = tupleTypeNode?.getElements();
        const tupleType: string[] = this.toArray(propertyType);
        const apparentTupleType: string[] = this.toArray(apparentType);
        if (!Array.isArray(dataValue) || tupleElements.length !== dataValue?.length) {
            return;
        }
        const value: any[] = [];
        for (let i = 0; i < dataValue.length; i++) {
            if (isPrimitiveType(apparentTupleType[i])) {
                if (typeof dataValue[i] === apparentTupleType[i]) {
                    console.log(chalk.cyanBright('PRIMITIVE TIPLE ELTTTTTT'), apparentTupleType[i], dataValue[i]);
                    value.push(dataValue[i]);
                } else {
                    return;
                }
            } else {
                const instance = this.createInstance(tupleType[i]);
                const importArrayDeclaration: ClassOrEnumDeclaration = getImportDeclaration(apparentTupleType[i], tupleType[i]);
                if (importArrayDeclaration instanceof ClassDeclaration) {
                    const mapped = this.map(dataValue[i], instance, importArrayDeclaration);
                    value.push(mapped);
                }
                if (importArrayDeclaration instanceof EnumDeclaration && hasPrimitiveType(dataValue[i])) {
                    value.push(dataValue[i]);
                }

            }
        }
        target[key] = value;
        console.log(chalk.cyanBright('TUPLE ELTTTTTT'), value);
    }


    private static toArray(arrayLike: string): string[] {
        return arrayLike.slice(1, -1).split(', ');
    }



    /**
     * For a given object with U type (the target model), returns the source object mapped with the U model
     * If source === null, it returns null
     * CAUTION: param "target" can't be undefined
     */
    // private static_diveMap<U>(target: U, source: any): any {
    //     if (source === undefined) {
    //         return target;
    //     } else if (source === null) {
    //         return source;
    //     } else {
    //         if (isPrimitive(target)) {
    //             if (isPrimitive(source)) {
    //                 if (InstanceService.areStringOrNumber(target, source)) {
    //                     return InstanceService.castStringAndNumbers(target, source);
    //                 } else {
    //                     return (typeof source === 'boolean' && typeof target === 'boolean') ? source : target;
    //                 }
    //             } else {
    //                 return target;
    //             }
    //         } else {
    //             return InstanceService.mapNotPrimitive(target, source);
    //         }
    //     }
    // }


    /**
     * Check if two objects are both string or number.
     * In this case, returns true.
     */
    private static areStringOrNumber(target: any, source: any): boolean {
        return ((typeof target === 'string' || typeof target === 'number') && (typeof source === 'number' || typeof source === 'string'));
    }


    /**
     * If source and target are both string or number, we cast source into the target's type and returns it.
     * This methodName adds a tolerance for http requests which returns numbers instead of strings and inversely
     * Caution : params target and source should not be falsy values
     */
    private static castStringAndNumbers(target: any, source: any): any {
        if ((typeof target !== 'string' && typeof target !== 'number') || source === undefined) {
            console.warn('Genese _castStringAndNumbers : source or target undefined');
            return undefined;
        } else if (source === null) {
            return null;
        } else if (typeof target === 'string' && (typeof source === 'number' || typeof source === 'string')) {
            return  source.toString();
        } else if (typeof target === 'number' && typeof source === 'number') {
            return source;
        } else if (typeof target === 'number' && typeof source === 'string') {
            return isNaN(Number(source)) ? target : +source;
        } else {
            console.warn('Genese _castStringAndNumbers : impossible to cast this elements');
            return undefined;
        }
    }


    /**
     * For non-primitive objects, returns source object mapped with the type of the target (U)
     * If source === null, it returns null
     * CAUTION: param "target" can't be undefined
     */
    private static mapNotPrimitive<U>(target: U, source: any): any {
        if (source === undefined) {
            return target;
        } else if (source === null) {
            return null;
        } else {
            const cloneTarget = Object.assign({}, target);
            for (const key of Object.keys(target)) {
                if (key === 'gnIndexableType') {
                    // cloneTarget = this._mapIndexableType(target as unknown as IndexableType, source);
                } else {
                    if (target[key] !== undefined) {
                        if (source[key] === null) {
                            cloneTarget[key] = null;
                        } else if (source[key] === undefined) {
                            // cloneTarget[key] = this._purge(target[key]);
                        } else {
                            if (Array.isArray(target[key])) {
                                // cloneTarget[key] = Array.isArray(source[key])
                                //     ? this._mapArray(target[key], source[key])
                                //     : cloneTarget[key];
                            } else {
                                // if (this._areStringOrNumber(target[key], source[key])) {
                                //     cloneTarget[key] = this._castStringAndNumbers(target[key], source[key]);
                                // } else {
                                //     cloneTarget[key] = this._diveMap(target[key], source[key]);
                                // }
                            }
                        }
                    } else {
                        return source;
                    }
                }
            }
            return cloneTarget;
        }
    }
}
