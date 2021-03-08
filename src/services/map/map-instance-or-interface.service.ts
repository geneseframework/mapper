import { isNullOrUndefined } from '../../utils/native/any.util';
import { isProperty } from '../../utils/ast/ast-declaration.util';
import { CreateOptions } from '../../models/create-options.model';
import { MainService } from '../main.service';
import { isQuoted } from '../../types/target/string/quoted.type';
import { removeBorders } from '../../types/target/string/containerized.type';
import { hasIndexableTypeAndKeyOfSameType } from '../../utils/native/indexable-type.util';
import { ClassOrInterfaceInfo } from '../../types/class-or-interface-info.type';
import { Property } from '../../types/target/property.type';
import * as chalk from 'chalk';

export class MapInstanceOrInterfaceService {


    static async map(data: any, options: CreateOptions, instance: object, declaration: ClassOrInterfaceInfo): Promise<void> {
        console.log(chalk.cyanBright('MAP I OR CCCCCC'), data, instance, declaration);
        for (const key of Object.keys(data)) {
            if (isProperty(key, declaration)) {
                if (isNullOrUndefined(data[key])) {
                    instance[key] = data[key];
                } else {
                    await this.mapDataKey(data[key], options, key, instance, declaration);
                }
            } else if (hasIndexableTypeAndKeyOfSameType(declaration, key)) {
                instance[key] = await MainService.mapToString(declaration.indexableType.returnType, data[key], options);
            }
        }
    }
    //
    //
    // static async map(data: any, options: CreateOptions, instance: object, declaration: ClassOrInterfaceDeclaration): Promise<void> {
    //     for (const key of Object.keys(data)) {
    //         if (isPropertyOld(key, declaration as ClassDeclaration)) {
    //             if (isNullOrUndefined(data[key])) {
    //                 instance[key] = data[key];
    //             } else {
    //                 await this.mapDataKey(data[key], options, key, instance, declaration);
    //             }
    //         } else if (hasIndexableTypeAndKeyOfSameTypeOld(declaration, key)) {
    //             instance[key] = await MainService.mapToString(getIndexableType(declaration)?.returnType, data[key], options);
    //         }
    //     }
    // }


    private static async mapDataKey<T>(data: any, options: CreateOptions, key: string, instance: T, declaration: ClassOrInterfaceInfo): Promise<void> {
        const property: Property = declaration.properties.find(p => p.name === key);
        // const targetKeyType: string = this.getTargetKeyType(data, key, property, declaration);
        const targetKeyType: string = property.type;
        // console.log(chalk.magentaBright('MAP DATA KKKKKKKK'), data, key, declaration);
        if (targetKeyType === 'undefined' || targetKeyType === undefined) {
            instance[key] = data;
        } else if (isQuoted(targetKeyType)) {
            instance[key] = removeBorders(targetKeyType);
        } else {
            instance[key] = await MainService.mapToString(targetKeyType, data, options);
        }
    }

    // private static async mapDataKey<T>(data: any, options: CreateOptions, key: string, instance: T, declaration: ClassOrInterfaceDeclaration): Promise<void> {
    //     const getProperties: PropertyDeclarationOrSignature[] = declaration instanceof ClassDeclaration ? getAllClassProperties(declaration) : getAllInterfaceProperties(declaration);
    //     const property: PropertyDeclarationOrSignature = getProperties.find(p => p.getName() === key);
    //     const targetKeyType: string = this.getTargetKeyType(data, key, property, declaration);
    //     if (targetKeyType === 'undefined' || targetKeyType === undefined) {
    //         instance[key] = data;
    //     } else if (isQuoted(targetKeyType)) {
    //         instance[key] = removeBorders(targetKeyType);
    //     } else {
    //         instance[key] = await MainService.mapToString(targetKeyType, data, options);
    //     }
    // }


    // private static getTargetKeyType(dataValue: any, key: string, property: PropertyDeclarationOrSignature, declaration: ClassOrInterfaceDeclaration): string {
    //     return property ? property.getStructure().type as string : indexSignatureWithSameType(key, dataValue, declaration);
    // }

}
