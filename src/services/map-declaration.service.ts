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
import * as chalk from 'chalk';

export class MapDeclarationService<T> {


    static map(target: any, propertyType: string, key: string, dataValue: any, typeDeclaration: TypeDeclaration): void {
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                this.mapClassType(target, key, dataValue, propertyType, typeDeclaration as ClassDeclaration);
                return;
            case TypeDeclarationKind.ENUM_DECLARATION:
                MapEnumService.map(target, key, dataValue, typeDeclaration as EnumDeclaration);
                return;
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                MapInstanceOrInterfaceService.map(dataValue, target[key], typeDeclaration as InterfaceDeclaration);
                return;
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                console.log(chalk.blueBright('MapDeclarationServiceeeeeee '), target, propertyType, key, dataValue);
                MapTypeService.map(target, key, dataValue, typeDeclaration as TypeAliasDeclaration);
                console.log(chalk.blueBright('MapDeclarationServiceeeeeee '), target, propertyType, key, dataValue, target[key]);
                return;
            default:
                return;
        }
    }


    private static mapClassType(target: any, key: string, dataValue: any, propertyType: string, classDeclaration: ClassDeclaration): void {
        const instanceGenerator = new InstanceGenerator<any>(propertyType, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        target[key] = GLOBAL.generateInstance(instanceGenerator);
        MapInstanceOrInterfaceService.map(dataValue, target[key], classDeclaration);
    }

}
