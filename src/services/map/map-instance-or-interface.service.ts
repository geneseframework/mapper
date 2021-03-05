import { ClassDeclaration, InterfaceDeclaration, SyntaxKind, Type } from 'ts-morph';
import { getAllClassProperties } from '../../utils/ast/ast-class.util';
import { getApparentType } from '../../utils/ast/ast-types.util';
import { PropertyKind } from '../../enums/property-kind.enum';
import { MapPropertyService } from './map-property.service';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { MapInterfaceService } from './map-interface.service';
import { getAllInterfaceProperties } from '../../utils/ast/ast-interfaces.util';
import { MapInstanceServiceOld } from './map-instance.service.old';
import * as chalk from 'chalk';
import { isAny, isAnyArray, isAnyOrAnyArray, keyExistsAndIsNullOrUndefined } from '../../utils/native/any.util';
import { isArray } from '../../utils/native/arrays.util';
import { indexSignatureWithSameType } from '../../utils/ast/ast-declaration.util';
import { PropertyInfos } from '../../types/property-infos.type';
import { DateDeclaration } from '../../models/date-declaration.model';
import { IncompatibilityService } from '../incompatibility.service';
import { CreateOptions } from '../../models/create-options.model';
import { MainService } from '../main.service';
import { isQuoted } from '../../types/target/string/quoted.type';
import { removeBorders } from '../../utils/native/strings.util';

export class MapInstanceOrInterfaceService<T> {


    // static async createArray<T>(data: any[], dateDeclaration: DateDeclaration, options: CreateOptions): Promise<Date[]>
    static async createArray<T>(data: any[], interfaceDeclaration: InterfaceDeclaration, options: CreateOptions): Promise<T[]>
    static async createArray<T>(data: any[], classDeclaration: ClassDeclaration, options: CreateOptions, className: string): Promise<T[] | string[] | number[] | boolean[]>
    static async createArray<T>(data: any[], classOrInterfaceDeclaration: ClassOrInterfaceDeclaration, options: CreateOptions, classOrInterfaceName?: string): Promise<T[] | string[] | number[] | boolean[] | Date | Date[]> {
        const instancesArray: T[] | Date[] = [];
        const elementsWhichCouldBeAnInstance: object[] = data.filter(d => this.couldBeAnInstanceOrInterface(d));
        for (const element of elementsWhichCouldBeAnInstance) {
            const instance: any = classOrInterfaceDeclaration instanceof ClassDeclaration ? await MapInstanceServiceOld.createInstance(element, classOrInterfaceName, classOrInterfaceDeclaration, options) : await MapInterfaceService.createInterface(data, classOrInterfaceDeclaration, options) ;
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    private static couldBeAnInstanceOrInterface(element: any): boolean {
        return typeof element === 'object' && !Array.isArray(element);
    }


    static async map<T>(target: string, data: any, options: CreateOptions, instance: T, declaration: ClassOrInterfaceDeclaration): Promise<void> {
        // console.log(chalk.cyanBright('MAP INSTTTTT'), target, data, classOrInterfaceDeclaration?.getName());
        for (const key of Object.keys(data)) {
            if (keyExistsAndIsNullOrUndefined(data, key)) {
                instance[key] = data[key];
            } else {
                await this.mapDataKey(data[key], options, key, instance, declaration);
            }
        }
    }


    private static async mapDataKey<T>(dataValue: any, options: CreateOptions, key: string, instance: T, declaration: ClassOrInterfaceDeclaration): Promise<void> {
        const properties: PropertyDeclarationOrSignature[] = declaration instanceof ClassDeclaration ? getAllClassProperties(declaration) : getAllInterfaceProperties(declaration);
        const property: PropertyDeclarationOrSignature = properties.find(p => p.getName() === key);
        const keyTarget: string = this.getKeyTarget(property);
        // console.log(chalk.blueBright('GET KEY TARGETTTTT'), propertyStructureType, propertyStructureType === `'undefined'`);
        if (isQuoted(keyTarget)) {
            instance[key] = removeBorders(keyTarget);
        } else if (keyTarget === 'undefined') {
            instance[key] = dataValue;
        } else {
            instance[key] = await MainService.mapToString(keyTarget, dataValue, options);
        }
    }


    private static getKeyTarget(property: PropertyDeclarationOrSignature): string {
        return property.getStructure().type as string;
    }

}
