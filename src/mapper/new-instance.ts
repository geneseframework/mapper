import { ClassConstructor } from '../models/t-constructor.model';
import { ClassDeclaration, PropertyDeclaration, PropertyDeclarationStructure, SourceFile } from 'ts-morph';
import * as chalk from 'chalk';
import { hasPrimitiveType, isPrimitiveType, PrimitiveType } from '../utils/primitives.util';
import { Cat } from '../debug/project/src/models/cat.model';
import { GLOBAL } from '../const/global.const';
import { isOutOfProject } from '../utils/ast.util';
import { isInFolder } from '../utils/file-system.util';

export class InstanceService<T> {


    static createInstance(className: string): any {
        switch (className) {
            case 'Cat':
                return new Cat(undefined, undefined, undefined);
            default:
                return undefined;
        }
    }


    static newInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration): T {
        const instance: T = this.createInstance(className);
        return this.map(data, instance, classDeclaration);
    }


    // static newInstance<T>(data: any, tConstructor: ClassConstructor<T>, classDeclaration: ClassDeclaration): T {
    //     const argts = [];
    //     const numberOfConstructorParameters: number = classDeclaration?.getTypeParameters()?.length ?? 0;
    //     for (let i = 0; i < numberOfConstructorParameters; i++) {
    //         argts.push(undefined);
    //     }
    //     const instance: T = new tConstructor(argts);
    //     return this.map(data, instance, classDeclaration);
    // }


    private static map<T>(data: any, instance: T, classDeclaration: ClassDeclaration): T {
        for (const key of Object.keys(data)) {
            this.deepMap(instance, classDeclaration, key, data[key]);
        }
        console.log(chalk.greenBright('INSTANCEEEEEE'), instance);
        return instance;
    }


    private static deepMap<T>(target: any, classDeclaration: ClassDeclaration, key: string, dataValue: any): void {
        const property: PropertyDeclaration = classDeclaration.getProperties().find(p => p.getName() === key);
        if (!property) {
            return;
        }
        const propertyStructure: PropertyDeclarationStructure = property.getStructure();
        const propertyType: string = propertyStructure.type as string;
        const apparentType: string = property.getType().getApparentType().getText().toLowerCase();
        console.log(chalk.blueBright('propertyyyysssss'), propertyStructure);
        if (isPrimitiveType(propertyType) || isPrimitiveType(apparentType)) {
            if (hasPrimitiveType(dataValue)) {
                target[key] = dataValue;
            }
            return;
        }
        console.log(chalk.magentaBright('APPPPT TYPE'), apparentType);
        const apparentTypeImportDeclarationPath: string = this.getApparentTypeImportDeclarationPath(apparentType);
        let importSourceFile: SourceFile = GLOBAL.project.getSourceFile(apparentTypeImportDeclarationPath);
        if (isOutOfProject(importSourceFile)) {
            console.log(chalk.redBright('Is out of project'), key, dataValue, propertyType);
            console.log(chalk.redBright('Is in folder ??? apparentTypeImportDeclarationPath'), apparentTypeImportDeclarationPath);
            console.log(chalk.redBright('Is in folder ???'), isInFolder(apparentTypeImportDeclarationPath, GLOBAL.projectPath));
            importSourceFile = GLOBAL.project.addSourceFileAtPath(apparentTypeImportDeclarationPath);
            importSourceFile = GLOBAL.project.addSourceFileAtPath(apparentTypeImportDeclarationPath);
        }
        console.log(chalk.blueBright('SRCF CODEEEEE'), importSourceFile);
        console.log(chalk.blueBright('SRCF CODEEEEE'), importSourceFile.getFullText());
        const importClassDeclaration: ClassDeclaration = importSourceFile.getClasses().find(c => c.getName() === propertyType);
        if (importClassDeclaration) {
            for (const propertyKey of importClassDeclaration.getProperties().map(p => p.getName())) {
                console.log(chalk.cyanBright('PROP KEYYYYY'), propertyKey);
                // this.deepMap(target[key], importClassDeclaration, propertyKey, dataValue[key]);
            }
        }
    }


    /**
     * Returns the path of the import of a property with its apparent type
     * @param apparentType
     * @private
     */
    private static getApparentTypeImportDeclarationPath(apparentType: string): string {
        const pathWithoutExtension: string = /^import\("(.*)"/.exec(apparentType)?.[1];
        return `${pathWithoutExtension}.ts`;
    }


    private static mapPrimitive(target: any, primitiveType: PrimitiveType, key: string, value: any): void {

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
