import { CreateOptions } from '../../models/create-options.model';
import { Generic, typeOfGeneric } from '../../types/target/string/generics.type';
import { MainService } from '../main.service';
import * as chalk from 'chalk';
import { DeclarationInfo } from '../../models/declarations/declaration-info.model';
import { GLOBAL } from '../../const/global.const';

export class MapGenericService {

    static async create(target: Generic, data: any, options: CreateOptions): Promise<any> {
        // console.log(chalk.yellowBright('HAS GENERICCCCC'), target, this.resolveGeneric(target));
        return await MainService.mapToString(typeOfGeneric(target), data, options);
    }


    private static resolveGeneric(target: Generic): string {
        // TODO: check if two targets have same name
        const declarationInfo: DeclarationInfo = GLOBAL.getDeclarationInfo(typeOfGeneric(target));
        // console.log(chalk.cyanBright('RESOLVE GENERICCCCC'), declarationInfo);
        return undefined;
    }

}