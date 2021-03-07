import { MapEnumService } from './map-enum.service';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { getDeclarationKind, getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { TypeDeclarationKind } from '../../enums/type-declaration.kind';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { MapClassService } from './map-class.service';
import { MapTypeService } from './map-type.service';
import { MapInterfaceService } from './map-interface.service';
import { isArrayType, typeOfArray } from '../../types/target/string/array-type.type';

export class MapDeclarationService<T> {


    /**
     * Returns mapped data when target is a Declaration node.
     * @param target
     * @param data
     * @param options
     * @private
     */
    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        const typeName: string = isArrayType(target) ? typeOfArray(target) : target;
        const typeDeclaration: TypeDeclaration = getTypeDeclaration(typeName);
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                return await MapClassService.create<T>(target, data, options);
            case TypeDeclarationKind.ENUM_DECLARATION:
                return MapEnumService.create(target, data);
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                return MapInterfaceService.create<T>(target, data, options);
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                return await MapTypeService.create<T>(target, data, options);
            default:
                throwWarning(`Warning : type declaration "${target}" not found.`);
                return undefined;
        }
    }

}
