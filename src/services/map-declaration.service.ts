import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { MapTypeService } from './map-type.service';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { MapEnumService } from './map-enum.service';
import { TypeDeclaration } from '../types/type-declaration.type';
import { getDeclarationKind } from '../utils/ast-declaration.util';
import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { Key } from '../types/key.type';
import { throwWarning } from '../utils/errors.util';
import * as chalk from 'chalk';

export class MapDeclarationService<T> {


    static async map(target: any, key: Key, dataValue: any, propertyType: string, typeDeclaration: TypeDeclaration): Promise<void> {
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                await this.mapClassType(target, key, dataValue, propertyType, typeDeclaration as ClassDeclaration);
                break;
            case TypeDeclarationKind.ENUM_DECLARATION:
                await MapEnumService.map(target, key, dataValue, typeDeclaration as EnumDeclaration);
                break;
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                await MapInstanceOrInterfaceService.map(target[key], dataValue, typeDeclaration as InterfaceDeclaration);
                break;
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                await MapTypeService.map(target, key, dataValue, typeDeclaration as TypeAliasDeclaration);
                break;
            default:
                throwWarning(`Unknown TypeDeclaration kind\nTarget : ${target}\nKey: ${key}\nData : ${dataValue}\nTypeDeclaration : ${typeDeclaration?.getName()}`);
                return;
        }
    }


    private static async mapClassType(target: any, key: Key, dataValue: any, propertyType: string, classDeclaration: ClassDeclaration): Promise<void> {
        const instanceGenerator = new InstanceGenerator<any>(propertyType, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        target[key] = await GLOBAL.generateInstance(instanceGenerator);
        await MapInstanceOrInterfaceService.map(target[key], dataValue, classDeclaration);
    }

}
