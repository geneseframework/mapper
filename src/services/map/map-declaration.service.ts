import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { MapTypeService } from './map-type.service';
import { getNumberOfConstructorArguments } from '../../utils/ast-class.util';
import { MapEnumService } from './map-enum.service';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { getDeclarationKind } from '../../utils/ast-declaration.util';
import { TypeDeclarationKind } from '../../enums/type-declaration.kind';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { Key } from '../../types/key.type';
import { throwWarning } from '../../utils/errors.util';
import * as chalk from 'chalk';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { CreateOptions } from '../../interfaces/create-options.interface';

export class MapDeclarationService<T> {


    static async map(target: any, key: Key, dataValue: any, propertyType: string, typeDeclaration: TypeDeclaration, options: CreateOptions): Promise<void> {
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                await this.mapClassType(target, key, dataValue, propertyType, typeDeclaration as ClassDeclaration, options);
                break;
            case TypeDeclarationKind.ENUM_DECLARATION:
                await MapEnumService.map(target, key, dataValue, typeDeclaration as EnumDeclaration);
                break;
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                await MapInstanceOrInterfaceService.map(target[key], dataValue, typeDeclaration as InterfaceDeclaration, options);
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
        await MapInstanceOrInterfaceService.map(target[key], dataValue, classDeclaration, options);
    }

}
