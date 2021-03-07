import { isNullOrUndefined } from '../../utils/native/any.util';
import { CreateOptions } from '../../models/create-options.model';
import { MainService } from '../main.service';
import { isQuoted } from '../../types/target/string/quoted.type';
import { removeBorders } from '../../types/target/string/containerized.type';
import { hasIndexableTypeAndKeyOfSameType } from '../../utils/native/indexable-type.util';
import { ClassOrInterfaceInfo } from '../../types/class-or-interface-info.type';
import { Property } from '../../types/target/property.type';

export class MapInstanceOrInterfaceService {


    static async map(data: any, options: CreateOptions, instance: object, declaration: ClassOrInterfaceInfo): Promise<void> {
        for (const key of Object.keys(data)) {
            // console.log(chalk.magentaBright('MAP DATA'), data, instance, declaration, isProperty(key, declaration));
            if (this.isProperty(key, declaration)) {
                if (isNullOrUndefined(data[key])) {
                    instance[key] = data[key];
                } else {
                    await this.mapDataKey(data[key], options, key, instance, declaration);
                }
            } else if (hasIndexableTypeAndKeyOfSameType(declaration, key)) {
                // console.log(chalk.redBright('INDEXABLEEEEE ?'), key);
                instance[key] = await MainService.mapToString(declaration.indexableType.returnType, data[key], options);
            }
        }
    }


    private static async mapDataKey<T>(data: any, options: CreateOptions, key: string, instance: T, declaration: ClassOrInterfaceInfo): Promise<void> {
        const property: Property = declaration.properties.find(p => p.name === key);
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


    private static isProperty(propertyName: string, declaration: ClassOrInterfaceInfo): boolean {
        return !!declaration.properties.find(p => p.name === propertyName);
    }

}