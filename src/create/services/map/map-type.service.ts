import { CreateOptions } from '../../models/create-options.model';
import { MainService } from '../main.service';
import { TypeInfo } from '../../models/declarations/type-info.model';
import { GLOBAL } from '../../const/global.const';

export class MapTypeService {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        // console.log(chalk.blueBright('MAP TYPEEEEE'), typeDeclaration.getStructure());
        const typeInfo: TypeInfo = GLOBAL.getTypeInfo(target);
        return await MainService.mapToString(typeInfo.type, data, options);
    }

}
