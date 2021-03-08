import { InterfaceDeclaration } from 'ts-morph';
import { includes } from '../native/arrays.util';
import { InterfaceInfo } from '../../models/declarations/interface-info.model';

// TODO : add isRequired to GLOBAL
export function implementsRequiredProperties(data: any, interfaceInfo: InterfaceInfo): boolean {
    const requiredProperties: any[] = interfaceInfo.properties.filter(p => p.isRequired).map(p => p.name);
    return includes(Object.keys(data), requiredProperties);
}



// export function implementsRequiredProperties(data: any, interfaceDeclaration: InterfaceDeclaration): boolean {
//     const requiredProperties: any[] = interfaceDeclaration.getProperties().filter(p => !p.hasQuestionToken()).map(p => p.getName());
//     return includes(Object.keys(data), requiredProperties);
// }


