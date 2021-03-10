import { TypeAliasDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { CreateOptions } from '../../models/create-options.model';
import { MainService } from '../main.service';
import * as chalk from 'chalk';
import { TypeInfo } from '../../models/declarations/type-info.model';
import { GLOBAL } from '../../const/global.const';

export class MapTypeService {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        const typeDeclaration: TypeAliasDeclaration = getTypeDeclaration(target) as TypeAliasDeclaration;
        // console.log(chalk.blueBright('MAP TYPEEEEE'), typeDeclaration.getStructure());
        const typeInfo: TypeInfo = GLOBAL.getTypeInfo(target);
        return await MainService.mapToString(typeInfo.type, data, options);
    }

}
