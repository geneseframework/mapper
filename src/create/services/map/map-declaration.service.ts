import { MapEnumService } from './map-enum.service';
import { throwWarning } from '../../../shared/core/utils/functions/errors.util';
import { MapClassService } from './map-class.service';
import { MapTypeService } from './map-type.service';
import { MapInterfaceService } from './map-interface.service';
import { GLOBAL } from '../../const/global.const';
import { TypeDeclarationKind } from '../../../shared/types/type-declaration-kind.type';
import { DeclarationInfo } from '../../../shared/models/declarations/declaration-info.model';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { isArrayType, typeOfArray } from '../../types/non-trivial-types/array-type.type';

export class MapDeclarationService {


    /**
     * Returns mapped data when target is a Declaration typeLiteralNode (Class, Interface, Enum, Type).
     * @param target    // The target which corresponds to a class, interface, enum or type
     * @param data      // The data to map
     * @param options   // The create() options
     * @private
     */
    static create(target: string, data: any, options: MapperBehavior): any {
        const typeName: string = isArrayType(target) ? typeOfArray(target) : target;
        const typeDeclarationKind: TypeDeclarationKind = this.getTypeDeclarationKind(typeName);
        switch (typeDeclarationKind) {
            case 'Class':
                return MapClassService.create(target, data, options);
            case 'Enum':
                return MapEnumService.create(target, data);
            case 'Interface':
                return MapInterfaceService.create(target, data, options);
            case 'TypeAlias':
                return MapTypeService.create(target, data, options);
            default:
                throwWarning(`type declaration "${target}" not found.`);
                return undefined;
        }
    }


    /**
     * Returns the kind of declaration corresponding to the target
     * @param target    // The target to search
     * @private
     */
    private static getTypeDeclarationKind(target: string): TypeDeclarationKind {
        const declarationInfos: DeclarationInfo[] = GLOBAL.declarationInfos.filter(d => d.name === target);
        if (declarationInfos.length > 1) {
            throwWarning(`different elements "${target}" are declared in your project.`);
        }
        return declarationInfos[0]?.kind;
    }

}
