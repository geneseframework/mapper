import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../../utils/ast/ast-class.util';
import { MapEnumService } from './map-enum.service';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { getDeclarationKind, getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { TypeDeclarationKind } from '../../enums/type-declaration.kind';
import { Key } from '../../types/key.type';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { Primitive } from '../../types/primitives.type';
import { TargetInfo } from '../../types/target/target-info.type';
import { TargetServiceOld } from '../targets/target.service.old';
import { MapClassService } from './map-class.service';
import { MapTypeService } from './map-type.service';
import { MapInterfaceService } from './map-interface.service';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';

export class MapDeclarationService<T> {


    /**
     * Returns mapped data when target is a Declaration node.
     * @param target
     * @param data
     * @param options
     * @private
     */
    static async create<T>(target: string, data: any, options: CreateOptions): Promise<T | T[] | Primitive | Date | Date[] | (T | Date)[]> {
        const info: TargetInfo = TargetServiceOld.getInfo(target);
        const typeDeclaration: TypeDeclaration = getTypeDeclaration(info.typeName);
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                return await MapClassService.create<T>(target, data, options);
            case TypeDeclarationKind.ENUM_DECLARATION:
                return MapEnumService.create(data, target, info.isArray);
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                return MapInterfaceService.create<T>(target, data, options);
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                return await MapTypeService.create<T>(target, data, options);
            default:
                throwWarning(`Warning : type declaration "${target}" not found.`);
                return undefined;
        }
    }


    static async map(target: any, key: Key, dataValue: any, propertyType: string, typeDeclaration: TypeDeclaration, options: CreateOptions): Promise<void> {
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                await this.mapClassType(target, key, dataValue, propertyType, typeDeclaration as ClassDeclaration, options);
                break;
            case TypeDeclarationKind.ENUM_DECLARATION:
                await MapEnumService.map(target, key, dataValue, typeDeclaration as EnumDeclaration);
                break;
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                await MapInstanceOrInterfaceService.map(key, dataValue, options, typeDeclaration as InterfaceDeclaration);
                break;
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                await MapTypeService.map(target, key, dataValue, typeDeclaration as TypeAliasDeclaration, options);
                break;
            default:
                throwWarning(`Unknown TypeDeclaration kind\nTarget : ${target}\nKey: ${key}\nData : ${dataValue}\nTypeDeclaration : ${typeDeclaration?.getName()}`);
                return;
        }
    }


    private static async mapClassType(target: any, key: Key, dataValue: any, propertyType: string, classDeclaration: ClassDeclaration, options: CreateOptions): Promise<void> {
        const instanceGenerator = new InstanceGenerator<any>(propertyType, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        target[key] = await GLOBAL.generateInstance(instanceGenerator);
        await MapInstanceOrInterfaceService.map(key, dataValue, options, classDeclaration);
    }

}
