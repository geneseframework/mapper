import { MapperConfig } from '../../../shared/models/config.model';
import { MainService } from '../main.service';
import { GLOBAL } from '../../const/global.const';
import { TypeInfo } from '../../../shared/models/declarations/type-info.model';

export class MapTypeService {


    static async create<T>(target: string, data: any, options: MapperConfig): Promise<any> {
        const typeInfo: TypeInfo = GLOBAL.getTypeInfo(target);
        return await MainService.mapToString(typeInfo.type, data, options);
    }

}
