import { ClassDeclaration, InterfaceDeclaration } from 'ts-morph';
import { getAllClassProperties } from '../../utils/ast/ast-class.util';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { MapInterfaceServiceOld } from './map-interface.service.old';
import { getAllInterfaceProperties } from '../../utils/ast/ast-interfaces.util';
import { MapInstanceServiceOld } from './map-instance.service.old';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { indexSignatureWithSameType } from '../../utils/ast/ast-declaration.util';
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
            const instance: any = classOrInterfaceDeclaration instanceof ClassDeclaration ? await MapInstanceServiceOld.createInstance(element, classOrInterfaceName, classOrInterfaceDeclaration, options) : await MapInterfaceServiceOld.createInterface(data, classOrInterfaceDeclaration, options) ;
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    private static couldBeAnInstanceOrInterface(element: any): boolean {
        return typeof element === 'object' && !Array.isArray(element);
    }


    static async map<T>(target: string, data: any, options: CreateOptions, instance: T, declaration: ClassOrInterfaceDeclaration): Promise<void> {
        // console.log(chalk.cyanBright('MAP INSTTTTT'), target, data, declaration?.getName());
        for (const key of Object.keys(data)) {
            if (this.keyExistsInInstanceAndDataIsNullOrUndefined(instance, data, key)) { // TODO : verify what happens when key not exists in target
                instance[key] = data[key];
            } else {
                await this.mapDataKey(data[key], options, key, instance, declaration);
            }
        }
    }


    private static keyExistsInInstanceAndDataIsNullOrUndefined(instance: any, data: any, key: string): boolean {
        return instance?.hasOwnProperty(key) && isNullOrUndefined(data[key]);
    }


    private static async mapDataKey<T>(dataValue: any, options: CreateOptions, key: string, instance: T, declaration: ClassOrInterfaceDeclaration): Promise<void> {
        // console.log(chalk.yellowBright('GET KEY TARGETTTTT 0000'), dataValue, key, declaration?.getStructure());
        const properties: PropertyDeclarationOrSignature[] = declaration instanceof ClassDeclaration ? getAllClassProperties(declaration) : getAllInterfaceProperties(declaration);
        const property: PropertyDeclarationOrSignature = properties.find(p => p.getName() === key);
        if (this.keyIsIncompatibleWithDeclarationType(property, key, dataValue, declaration)) {
            return;
        }
        const keyTarget: string = this.getKeyTarget(dataValue, key, property, declaration);
        // console.log(chalk.blueBright('GET KEY TARGETTTTT1'), property?.getName(), keyTarget);
        // console.log(chalk.blueBright('GET KEY TARGETTTTT 22222'), property?.getStructure());
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
