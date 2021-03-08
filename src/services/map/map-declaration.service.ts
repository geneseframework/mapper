import { MapEnumService } from './map-enum.service';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { MapClassService } from './map-class.service';
import { MapTypeService } from './map-type.service';
import { MapInterfaceService } from './map-interface.service';
import { isArrayType, typeOfArray } from '../../types/target/string/array-type.type';
import { DeclarationInfo } from '../../models/declarations/declaration-info.model';
import { GLOBAL } from '../../const/global.const';
import { TypeDeclarationKind } from '../../types/type-declaration-kind.type';

export class MapDeclarationService<T> {


    /**
     * Returns mapped data when target is a DeclarationOrDate node.
     * @param target
     * @param data
     * @param options
     * @private
     */
    static async create(target: string, data: any, options: CreateOptions): Promise<any> {
        const typeName: string = isArrayType(target) ? typeOfArray(target) : target;
        const typeDeclarationKind: TypeDeclarationKind = this.getTypeDeclarationKind(typeName);
        switch (typeDeclarationKind) {
            case 'Class':
                return await MapClassService.create(target, data, options);
            case 'Enum':
                return MapEnumService.create(target, data);
            case 'Interface':
                return MapInterfaceService.create(target, data, options);
            case 'TypeAlias':
                return await MapTypeService.create(target, data, options);
            default:
                throwWarning(`type declaration "${target}" not found.`);
                return undefined;
        }
    }


    // static async create(target: string, data: any, options: CreateOptions): Promise<any> {
    //     const typeName: string = isArrayType(target) ? typeOfArray(target) : target;
    //     const typeDeclaration: DeclarationOrDate = getTypeDeclaration(typeName);
    //     switch (getDeclarationKind(typeDeclaration)) {
    //         case TypeDeclarationKindEnum.CLASS_DECLARATION:
    //             return await MapClassService.create(target, data, options);
    //         case TypeDeclarationKindEnum.ENUM_DECLARATION:
    //             return MapEnumService.create(target, data);
    //         case TypeDeclarationKindEnum.INTERFACE_DECLARATION:
    //             return MapInterfaceService.create(target, data, options);
    //         case TypeDeclarationKindEnum.TYPE_ALIAS_DECLARATION:
    //             return await MapTypeService.create(target, data, options);
    //         default:
    //             throwWarning(`type declaration "${target}" not found.`);
    //             return undefined;
    //     }
    // }


    private static getTypeDeclarationKind(target: string): TypeDeclarationKind {
        const declarationInfos: DeclarationInfo[] = GLOBAL.declarationInfos.filter(d => d.name === target);
        if (declarationInfos.length > 1) {
            throwWarning(`different elements "${target}" are declared in your project. Please use different names.`);
        }
        return declarationInfos[0]?.kind;
    }

}
