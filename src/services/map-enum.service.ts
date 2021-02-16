import { EnumDeclaration } from 'ts-morph';
import { isEnumValue } from '../utils/ast.util';

export class MapEnumService {

    static mapEnumType(target: any, key: string, dataValue: any, declaration: EnumDeclaration): void {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }

}
