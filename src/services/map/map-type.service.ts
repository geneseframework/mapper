import { TypeAliasDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { CreateOptions } from '../../models/create-options.model';
import { MainService } from '../main.service';

export class MapTypeService {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        const typeDeclaration: TypeAliasDeclaration = getTypeDeclaration(target) as TypeAliasDeclaration;
        return await MainService.mapToString(typeDeclaration.getStructure().type as string, data, options);
    }

}
