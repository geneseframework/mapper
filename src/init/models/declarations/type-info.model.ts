import { DeclarationInfoInit } from './declaration-info.model';
import { GenericParameterInit } from '../../types/generic-parameter.type';

export class TypeInfoInit extends DeclarationInfoInit {

    type: string = undefined;

    constructor(name: string, filePath: string, typeParameters: GenericParameterInit[] = []) {
        super(name, filePath, 'TypeAlias', typeParameters);
    }

}
