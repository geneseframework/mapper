import { MainService } from '../main.service';
import { isQuoted } from '../../../shared/types/quoted.type';
import { hasIndexableTypeAndKeyOfSameType } from '../../utils/indexable-type.util';
import { ClassOrInterfaceInfo } from '../../../shared/types/class-or-interface-info.type';
import { Property } from '../../../shared/types/target/property.type';
import { isNullOrUndefined } from '../../types/trivial-types/null-or-undefined.type';
import { isObject, MapperConfigBehavior, removeBorders } from '@genese/core';
import * as chalk from 'chalk';


export class MapInstanceOrInterfaceService {


    /**
     * Returns instance or interface with mapped data
     * @param data          // The data to map
     * @param options       // The create() options
     * @param instance      // New instance if maps a class, empty object if maps an interface
     * @param declaration   // The declaration corresponding to the class or interface
     */
    static map(data: any, options: MapperConfigBehavior, instance: object, declaration: ClassOrInterfaceInfo): boolean {
        // for (const property of declaration.properties) {
        if (!this.hasRequiredProperties(data, declaration)) {
            console.log(chalk.blueBright('REUIQREDDDDD'), data);
            console.log(chalk.cyanBright('REUIQREDDDDD'), declaration);
            return false;
        }
        console.log(chalk.cyanBright('REUIQREDDDDD ??????'), declaration);
        for (const key of Object.keys(data)) {
            if (this.isProperty(key, declaration)) {
                if (isNullOrUndefined(data[key])) {
                    instance[key] = data[key];
                } else {
                    this.mapDataKey(data[key], options, key, instance, declaration);
                }
            } else if (hasIndexableTypeAndKeyOfSameType(declaration, key)) {
                instance[key] = MainService.mapStringTarget(declaration.indexableType.returnType, data[key], options);
            }
        }
    }


    private static hasRequiredProperties(data: any, declaration: ClassOrInterfaceInfo): boolean {
        return isObject(data) && declaration.properties.every(p => Object.keys(data).includes(p.name));
    }

    // static map(data: any, options: MapperConfigBehavior, instance: object, declaration: ClassOrInterfaceInfo): void {
    //     for (const key of Object.keys(data)) {
    //         if (this.isProperty(key, declaration)) {
    //             if (isNullOrUndefined(data[key])) {
    //                 instance[key] = data[key];
    //             } else {
    //                 this.mapDataKey(data[key], options, key, instance, declaration);
    //             }
    //         } else if (hasIndexableTypeAndKeyOfSameType(declaration, key)) {
    //             instance[key] = MainService.mapStringTarget(declaration.indexableType.returnType, data[key], options);
    //         }
    //     }
    // }


    /**
     * Returns mapped value for a given key of the target
     * @param dataKey       // The value of data for a given key
     * @param options       // The create() options
     * @param key           // The key of the target
     * @param instance      // Instance object if maps a class, object if maps an interface
     * @param declaration   // The declaration corresponding to the class or interface
     */
    private static mapDataKey(dataKey: any, options: MapperConfigBehavior, key: string, instance: object, declaration: ClassOrInterfaceInfo): void {
        const property: Property = declaration.properties.find(p => p.name === key);
        const targetKeyType: string = property.stringifiedType;
        if (targetKeyType === 'undefined') {
            instance[key] = undefined;
        } else if (isQuoted(targetKeyType)) {
            instance[key] = removeBorders(targetKeyType);
        } else {
            instance[key] = MainService.mapStringTarget(targetKeyType, dataKey, options);
        }
    }


    /**
     * Checks if a string is the name of the property of a given class or interface
     * @param propertyName          // The stringifiedType to check
     * @param classOrInterfaceInfo  // The class or interface
     * @private
     */
    private static isProperty(propertyName: string, classOrInterfaceInfo: ClassOrInterfaceInfo): boolean {
        return !!classOrInterfaceInfo.properties.find(p => p.name === propertyName);
    }

}
