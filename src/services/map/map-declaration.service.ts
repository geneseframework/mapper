import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { MapTypeServiceOld } from './map-type.service.old';
import { getNumberOfConstructorArguments } from '../../utils/ast/ast-class.util';
import { MapEnumService } from './map-enum.service';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { getDeclarationKind, getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { TypeDeclarationKind } from '../../enums/type-declaration.kind';
import { MapInstanceOrInterfaceServiceOld } from './map-instance-or-interface.service.old';
import { Key } from '../../types/key.type';
import { throwWarning } from '../../utils/errors.util';
import * as chalk from 'chalk';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { CreateOptions } from '../../models/create-options.model';
import { Target } from '../../types/target/target.type';
import { Primitive } from '../../types/primitives.type';
import { TupleOld } from '../../types/target/target-tuple-old.type';
import { TargetInfo } from '../../types/target/target-info.type';
import { TargetServiceOld } from '../targets/target.service.old';
import { MapClassService } from './map-class.service';
import { MapInterfaceService } from './map-interface.service';
import { MapTypeService } from './map-type.service';

export class MapDeclarationService<T> {


    /**
     * Returns mapped data when target is a Declaration node.
     * @param target
     * @param data
     * @param options
     * @private
     */
    static async create<T>(target: string, data: any, options: CreateOptions): Promise<T | T[] | Primitive | Date | TupleOld> {
        const info: TargetInfo = TargetServiceOld.getInfo(target);
        const typeDeclaration: TypeDeclaration = getTypeDeclaration(info.typeName);
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                return await MapClassService.create<T>(target, data, options);
            case TypeDeclarationKind.ENUM_DECLARATION:
                return MapEnumService.create(data, target, info.isArray);
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                return MapInterfaceService.create(data, target, info.isArray, options);
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                return await MapTypeService.create<T>(target, data, options);
                // return MapTypeService.create(data, target, info.isArray, options);
            default:
                throwWarning(`Warning : type declaration "${target}" not found.`);
                return undefined;
        }
    }


    static async map(target: any, key: Key, dataValue: any, propertyType: string, typeDeclaration: TypeDeclaration, options: CreateOptions): Promise<void> {
        // console.log(chalk.blueBright('MAPPPPP KEY'), target, key, dataValue, propertyType, typeDeclaration.getName());
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                await this.mapClassType(target, key, dataValue, propertyType, typeDeclaration as ClassDeclaration, options);
                break;
            case TypeDeclarationKind.ENUM_DECLARATION:
                await MapEnumService.map(target, key, dataValue, typeDeclaration as EnumDeclaration);
                break;
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                await MapInstanceOrInterfaceServiceOld.map(target[key], dataValue, typeDeclaration as InterfaceDeclaration, options);
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
        await MapInstanceOrInterfaceServiceOld.map(target[key], dataValue, classDeclaration, options);
    }

}
