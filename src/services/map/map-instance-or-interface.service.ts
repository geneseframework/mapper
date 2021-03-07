import { ClassDeclaration } from 'ts-morph';
import { getAllClassProperties } from '../../utils/ast/ast-class.util';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { getAllInterfaceProperties } from '../../utils/ast/ast-interfaces.util';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { indexSignatureWithSameType, isProperty } from '../../utils/ast/ast-declaration.util';
import { CreateOptions } from '../../models/create-options.model';
import { MainService } from '../main.service';
import { isQuoted } from '../../types/target/string/quoted.type';
import { removeBorders } from '../../types/target/string/containerized.type';
import * as chalk from 'chalk';

export class MapInstanceOrInterfaceService {


    static async map(data: any, options: CreateOptions, instance: object, declaration: ClassOrInterfaceDeclaration): Promise<void> {
        for (const key of Object.keys(data)) {
            if (isProperty(key, declaration as ClassDeclaration)) {
                if (isNullOrUndefined(data[key])) {
                    instance[key] = data[key];
                } else {
                    await this.mapDataKey(data[key], options, key, instance, declaration);
                }
            }
        }
    }


    private static async mapDataKey<T>(dataValue: any, options: CreateOptions, key: string, instance: T, declaration: ClassOrInterfaceDeclaration): Promise<void> {
        const properties: PropertyDeclarationOrSignature[] = declaration instanceof ClassDeclaration ? getAllClassProperties(declaration) : getAllInterfaceProperties(declaration);
        const property: PropertyDeclarationOrSignature = properties.find(p => p.getName() === key);
        // console.log(chalk.magentaBright('MAP DATA KKKK'), property?.getName());
        if (this.keyIsIncompatibleWithDeclarationType(property, key, dataValue, declaration)) {
            // console.log(chalk.magentaBright('MAP DATA KKKK'), property?.getName());
            return;
        }
        const keyTarget: string = this.getKeyTarget(dataValue, key, property, declaration);
        if (keyTarget === 'undefined' || keyTarget === undefined) {
            instance[key] = dataValue;
        } else if (isQuoted(keyTarget)) {
            instance[key] = removeBorders(keyTarget);
        } else {
            instance[key] = await MainService.mapToString(keyTarget, dataValue, options);
        }
    }


    private static getKeyTargetWithIndexSignature(dataValue: any, key: string, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): string {
        return indexSignatureWithSameType(key, dataValue, classOrInterfaceDeclaration);
    }


    private static getKeyTarget(dataValue: any, key: string, property: PropertyDeclarationOrSignature, declaration: ClassOrInterfaceDeclaration): string {
        return property ? property.getStructure().type as string : this.getKeyTargetWithIndexSignature(dataValue, key, declaration);
    }


    private static keyIsIncompatibleWithDeclarationType(property: PropertyDeclarationOrSignature, key: string, dataValue: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): boolean {
        return !property && !indexSignatureWithSameType(key, dataValue, classOrInterfaceDeclaration);
    }

}
