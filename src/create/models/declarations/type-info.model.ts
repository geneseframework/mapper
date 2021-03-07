import { DeclarationInfo } from './declaration-info.model';
import { GenericParameter } from '../../types/target/generic-parameter.type';

export class TypeInfo extends DeclarationInfo {

    type: string = undefined;

    constructor(name: string, filePath: string, typeParameters: GenericParameter[] = []) {
        super(name, filePath, 'TypeAlias', typeParameters);
    }

}