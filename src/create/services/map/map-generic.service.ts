import { MapperConfig } from '../../../shared/models/config.model';
import { Generic, typeOfGeneric } from '../../types/target/string/generics.type';
import { MainService } from '../main.service';
import { GLOBAL } from '../../const/global.const';
import { DeclarationInfo } from '../../../shared/models/declarations/declaration-info.model';

export class MapGenericService {

    static create(target: Generic, data: any, options: MapperConfig): any {
        return MainService.mapToString(typeOfGeneric(target), data, options);
    }

    // TODO
    private static resolveGeneric(target: Generic): string {
        // TODO: check if two targets have same name
        const declarationInfo: DeclarationInfo = GLOBAL.getDeclarationInfo(typeOfGeneric(target));
        return undefined;
    }

}
