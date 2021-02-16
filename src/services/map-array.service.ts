import { ClassDeclaration, EnumDeclaration, PropertyDeclaration, PropertySignature } from 'ts-morph';
import { MapInstanceService } from './map-instance.service';
import { GLOBAL } from '../const/global.const';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapEnumService } from './map-enum.service';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';

export class MapArrayService<T> {


    static map(target: any, key: string, dataValue: any, propertyType: string, apparentType: string): void {
        if (!Array.isArray(dataValue)) {
            return;
        }
        const typeName: string = propertyType.slice(0, -2);
        const importArrayDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentType, typeName);
        target[key] = [] as any[];
        for (const element of dataValue) {
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(typeName, getApparentTypeImportDeclarationPath(apparentType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                MapInstanceOrInterfaceService.map(element, instance, importArrayDeclaration);
                target[key].push(instance);
            }
            if (importArrayDeclaration instanceof EnumDeclaration) {
                const root = { rootKey: [] };
                MapEnumService.map(root, 'rootKey', element, importArrayDeclaration);
                target[key].push(root.rootKey);
            }
        }
    }

}
