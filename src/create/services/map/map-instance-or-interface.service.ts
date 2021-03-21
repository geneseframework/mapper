import { isNullOrUndefined } from '../../utils/native/any.util';
import { MainService } from '../main.service';
import { isQuoted } from '../../../shared/types/quoted.type';
import { hasIndexableTypeAndKeyOfSameType } from '../../utils/native/indexable-type.util';
import { ClassOrInterfaceInfo } from '../../../shared/types/class-or-interface-info.type';
import { Property } from '../../../shared/types/target/property.type';
import { removeBorders } from '../../../shared/utils/strings.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapInstanceOrInterfaceService {


    static map(data: any, options: MapperBehavior, instance: object, declaration: ClassOrInterfaceInfo): void {
        for (const key of Object.keys(data)) {
            if (this.isProperty(key, declaration)) {
                if (isNullOrUndefined(data[key])) {
                    instance[key] = data[key];
                } else {
                    this.mapDataKey(data[key], options, key, instance, declaration);
                }
            } else if (hasIndexableTypeAndKeyOfSameType(declaration, key)) {
                instance[key] = MainService.mapToString(declaration.indexableType.returnType, data[key], options);
            }
        }
    }


    private static mapDataKey<T>(data: any, options: MapperBehavior, key: string, instance: T, declaration: ClassOrInterfaceInfo): void {
        const property: Property = declaration.properties.find(p => p.name === key);
        const targetKeyType: string = property.type;
        // console.log(chalk.magentaBright('MAP DATA KKKK'), data, key, instance);
        if (targetKeyType === 'undefined' || targetKeyType === undefined) {
            instance[key] = data;
        } else if (isQuoted(targetKeyType)) {
            instance[key] = removeBorders(targetKeyType);
        } else {
            instance[key] = MainService.mapToString(targetKeyType, data, options);
        }
    }


    private static isProperty(propertyName: string, classOrInterfaceInfo: ClassOrInterfaceInfo): boolean {
        return !!classOrInterfaceInfo.properties.find(p => p.name === propertyName);
    }

}
