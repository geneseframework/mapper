import { MainService } from '../main.service';
import { isQuoted } from '../../../shared/types/quoted.type';
import { hasIndexableTypeAndKeyOfSameType } from '../../utils/indexable-type.util';
import { ClassOrInterfaceInfo } from '../../../shared/types/class-or-interface-info.type';
import { Property } from '../../../shared/models/property.model';
import { isNullOrUndefined } from '../../types/trivial-types/null-or-undefined.type';
import { MapperConfigBehavior, removeBorders } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { requiredProperties } from '../../../init/utils/property.util';


export class MapInstanceOrInterfaceService {


    /**
     * Returns instance or interface with mapped data
     * @param data          // The data to map
     * @param options       // The create() options
     * @param instance      // New instance if maps a class, empty object if maps an interface
     * @param declaration   // The declaration corresponding to the class or interface
     */
    static map(data: any, options: MapperConfigBehavior, instance: object, declaration: ClassOrInterfaceInfo): MapResponse {
        const errors: string[] = [];
        this.checkRequiredProperties(data, declaration, errors);
        for (const key of Object.keys(data)) {
            if (this.isProperty(key, declaration)) {
                if (isNullOrUndefined(data[key])) {
                    instance[key] = data[key];
                } else {
                    this.setKeyOrReturnInvalid(data[key], options, key, instance, declaration, errors);
                }
            } else if (hasIndexableTypeAndKeyOfSameType(declaration, key)) {
                const mapResponse: MapResponse = MainService.mapStringTarget(declaration.indexableType.returnType, data[key], options);
                if (!mapResponse.isValid) {
                    errors.push(this.incorrectPropertyMessage(key, data[key]));
                }
                instance[key] = mapResponse.response;
            }
        }
        const isValid: boolean = errors.length === 0;
        const response: any = isValid ? instance : undefined;
        return new MapResponse(response, isValid, errors);
    }


    private static checkRequiredProperties(data: any, declaration: ClassOrInterfaceInfo, errors: string[]): void {
        for (const property of requiredProperties(declaration.properties)) {
            if (!Object.keys(data).includes(property.name)) {
                errors.push(`Required property '${property.name}' is missing.`)
            }
        }
    }


    private static setKeyOrReturnInvalid(dataKey: any, options: MapperConfigBehavior, key: string, instance: object, declaration: ClassOrInterfaceInfo, errors: string[]): void {
        const mapResponse: MapResponse = this.mapDataKeyIfValid(dataKey, options, key, instance, declaration);
        instance[key] = mapResponse?.response;
        if (!mapResponse?.isValid) {
            errors.push(this.incorrectPropertyMessage(key, dataKey));
        }
    }


    private static incorrectPropertyMessage(key: string, dataKey: any): string {
        return `Incorrect property value for key '${key}' : ${JSON.stringify(dataKey)}`;
    }


    /**
     * Returns mapped value for a given key of the target
     * @param dataKey       // The value of data for a given key
     * @param options       // The create() options
     * @param key           // The key of the target
     * @param instance      // Instance object if maps a class, object if maps an interface
     * @param declaration   // The declaration corresponding to the class or interface
     */
    private static mapDataKeyIfValid(dataKey: any, options: MapperConfigBehavior, key: string, instance: object, declaration: ClassOrInterfaceInfo): MapResponse {
        // console.log(chalk.magentaBright('MAP DATA KKKKKKK'), dataKey, key, instance);
        const property: Property = declaration.properties.find(p => p.name === key);
        const targetKeyType: string = property.stringifiedType;
        if (targetKeyType === 'undefined') {
            return new MapResponse(undefined);
        } else if (isQuoted(targetKeyType)) {
            return new MapResponse(removeBorders(targetKeyType));
        } else {
            return MainService.mapStringTarget(targetKeyType, dataKey, options);
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
