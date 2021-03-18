import { isNullOrUndefined } from '../../utils/native/any.util';
import { MapperConfig } from '../../../shared/models/config.model';
import { MainService } from '../main.service';
import { isQuoted } from '../../../shared/types/quoted.type';
import { hasIndexableTypeAndKeyOfSameType } from '../../utils/native/indexable-type.util';
import { ClassOrInterfaceInfo } from '../../../shared/types/class-or-interface-info.type';
import { Property } from '../../../shared/types/target/property.type';
import { removeBorders } from '../../../shared/utils/strings.util';

export class MapInstanceOrInterfaceService {


    static async map(data: any, options: MapperConfig, instance: object, declaration: ClassOrInterfaceInfo): Promise<void> {
        for (const key of Object.keys(data)) {
            if (this.isProperty(key, declaration)) {
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


    private static async mapDataKey<T>(data: any, options: MapperConfig, key: string, instance: T, declaration: ClassOrInterfaceInfo): Promise<void> {
        const property: Property = declaration.properties.find(p => p.name === key);
        const targetKeyType: string = property.type;
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
