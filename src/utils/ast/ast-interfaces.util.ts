import { InterfaceDeclaration } from 'ts-morph';
import { includes } from '../native/arrays.util';


export function implementsRequiredProperties(data: any, interfaceDeclaration: InterfaceDeclaration): boolean {
    const requiredProperties: any[] = interfaceDeclaration.getProperties().filter(p => !p.hasQuestionToken()).map(p => p.getName());
    return includes(Object.keys(data), requiredProperties);
}
