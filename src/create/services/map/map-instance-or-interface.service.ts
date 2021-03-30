import { MainService } from '../main.service';
import { isQuoted } from '../../../shared/types/quoted.type';
import { hasIndexableTypeAndKeyOfSameType } from '../../utils/native/indexable-type.util';
import { ClassOrInterfaceInfo } from '../../../shared/types/class-or-interface-info.type';
import { Property } from '../../../shared/types/target/property.type';
import { removeBorders } from '../../../shared/utils/strings.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { isNullOrUndefined } from '../../types/null-or-undefined.type';

export class MapInstanceOrInterfaceService {


    /**
     * Returns instance or interface with mapped data
     * @param data          // The data to map
     * @param options       // The create() options
     * @param instance      // New instance if maps a class, empty object if maps an interface
     * @param declaration   // The declaration corresponding to the class or interface
     */
    static map(data: any, options: MapperBehavior, instance: object, declaration: ClassOrInterfaceInfo): void {
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


    /**
     * Checks if a string is the name of the property of a given class or interface
     * @param propertyName          // The stringifiedType to check
     * @param classOrInterfaceInfo  // The class or interface
     * @private
     */
    private static isProperty(propertyName: string, classOrInterfaceInfo: ClassOrInterfaceInfo): boolean {
        return !!classOrInterfaceInfo.properties.find(p => p.name === propertyName);
    }


    /**
     * Returns mapped value for a given key of the target
     * @param dataKey       // The value of data for a given key
     * @param options       // The create() options
     * @param key           // The key of the target
     * @param instance      // Instance object if maps a class, object if maps an interface
     * @param declaration   // The declaration corresponding to the class or interface
     */
    private static mapDataKey(dataKey: any, options: MapperBehavior, key: string, instance: object, declaration: ClassOrInterfaceInfo): void {
        // console.log(chalk.magentaBright('MAP DATA KKKKKK'), dataKey, key, instance, declaration);
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

}
