import { MainService } from '../main.service';
import { GLOBAL } from '../../const/global.const';
import { TypeInfo } from '../../../shared/models/declarations/type-info.model';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapTypeService {


    static create<T>(target: string, data: any, options: MapperBehavior): any {
        const typeInfo: TypeInfo = GLOBAL.getTypeInfo(target);
        return MainService.mapStringTarget(typeInfo.type, data, options);
    }

}
