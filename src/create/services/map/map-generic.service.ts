import { Generic, typeOfGeneric } from '../../types/target/string/generics.type';
import { MainService } from '../main.service';
import { GLOBAL } from '../../const/global.const';
import { DeclarationInfo } from '../../../shared/models/declarations/declaration-info.model';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapGenericService {

    static create(target: Generic, data: any, options: MapperBehavior): any {
        return MainService.mapStringTarget(typeOfGeneric(target), data, options);
    }

    // TODO
    private static resolveGeneric(target: Generic): string {
        // TODO: check if two targets have same name
        const declarationInfo: DeclarationInfo = GLOBAL.getDeclarationInfo(typeOfGeneric(target));
        return undefined;
    }

}
