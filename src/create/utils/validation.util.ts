import { ClassOrInterfaceInfo } from '../../shared/types/class-or-interface-info.type';
import { isObject } from '@genese/core';
import { requiredProperties } from '../../init/utils/property.util';


export function hasRequiredProperties(data: any, declaration: ClassOrInterfaceInfo): boolean {
    return isObject(data) && requiredProperties(declaration.properties).every(p => Object.keys(data).includes(p.name));
}
