import { ClassDeclaration, EnumDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { MapTypeService } from './map-type.service';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { MapEnumService } from './map-enum.service';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapInstanceService } from './map-instance.service';

export class MapDeclarationService<T> {


    static map(typeDeclaration: TypeDeclaration, target: any, propertyType: string, key: string, dataValue: any): void {
        if (!typeDeclaration) {
            return;
        }
        if (typeDeclaration instanceof ClassDeclaration) {
            this.mapClassType(target, key, dataValue, propertyType, typeDeclaration);
            return;
        }
        if (typeDeclaration instanceof EnumDeclaration) {
            MapEnumService.mapEnumType(target, key, dataValue, typeDeclaration);
            return;
        }
        if (typeDeclaration instanceof TypeAliasDeclaration)
        {
            MapTypeService.mapTypeType(target, key, dataValue, typeDeclaration);
            return;
        }
    }


    private static mapClassType(target: any, key: string, dataValue: any, propertyType: string, classDeclaration: ClassDeclaration): void {
        const instanceGenerator = new InstanceGenerator<any>(propertyType, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        target[key] = GLOBAL.generateInstance(instanceGenerator);
        MapInstanceService.mapData(dataValue, target[key], classDeclaration);
    }

}
