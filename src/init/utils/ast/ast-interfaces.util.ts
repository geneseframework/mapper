import { InterfaceDeclaration } from 'ts-morph';
import { includes } from '../../../create/utils/native/arrays.util';
import { InterfaceInfo } from '../../../create/models/declarations/interface-info.model';

// TODO : add isRequired to GLOBAL
export function implementsRequiredProperties(data: any, interfaceInfo: InterfaceInfo): boolean {
    const requiredProperties: any[] = interfaceInfo.properties.filter(p => p.isRequired).map(p => p.name);
    return includes(Object.keys(data), requiredProperties);
}



// export function implementsRequiredProperties(data: any, interfaceDeclaration: Interface): boolean {
//     const requiredProperties: any[] = interfaceDeclaration.getProperties().filter(p => !p.hasQuestionToken()).map(p => p.getName());
//     return includes(Object.keys(data), requiredProperties);
// }


