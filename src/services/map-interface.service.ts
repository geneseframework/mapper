import { InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { isInterfaceValue } from '../utils/ast-interfaces.util';
import * as chalk from 'chalk';

export class MapInterfaceService {


    static createInterfaces<T>(data: any[], interfaceName: string, isArray: boolean): T[]
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T | T[] {
        console.log(chalk.blueBright(''), data, interfaceName, isArray);
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
        if (Array.isArray(data) && isArray) {
            return this.createInterfacesArray(data, interfaceDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createInterface(data, interfaceDeclaration);
        } else {
            return undefined;
        }
    }


    private static createInterfacesArray<T>(data: any[], interfaceDeclaration: InterfaceDeclaration): T[] {
        const interfacesArray: T[] = [];
        for (const element of data) {
            const value: T = this.createInterface(element, interfaceDeclaration);
            interfacesArray.push(value);
        }
        return interfacesArray;
    }


    private static createInterface<T>(data: any, interfaceDeclaration: InterfaceDeclaration): T {
        const root = { rootKey: undefined };
        this.mapInterfaceType(root, 'rootKey', data, interfaceDeclaration);
        return root.rootKey;
    }


    static mapInterfaceType(target: any, key: string, dataValue: any, declaration: InterfaceDeclaration): void {
        if (isInterfaceValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }

}
