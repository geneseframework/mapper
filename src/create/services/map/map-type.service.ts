import { Config } from '../../../shared/models/config.model';
import { MainService } from '../main.service';
import { TypeInfo } from '../../models/declarations/type-info.model';
import { GLOBAL } from '../../const/global.const';

export class MapTypeService {


    static async create<T>(target: string, data: any, options: Config): Promise<any> {
        const typeInfo: TypeInfo = GLOBAL.getTypeInfo(target);
        return await MainService.mapToString(typeInfo.type, data, options);
    }

}
