import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    TypeAliasDeclaration,
    TypeLiteralNode, TypeNode
} from 'ts-morph';
import { INIT } from '../../const/init.const';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { DeclarationOrDate, GenericableDeclaration } from '../../types/type-declaration.type';
import { GenericParameter } from '../../../shared/types/target/generic-parameter.type';
import { Property } from '../../../shared/types/target/property.type';
import { TypeDeclarationKind } from '../../../shared/types/type-declaration-kind.type';
import { flat } from '../../../shared/utils/arrays.util';
import * as chalk from 'chalk';
import { isTypeLiteralProperty } from './ast-type-literal.util';
import { InterfaceInfo } from '../../../shared/models/declarations/interface-info.model';
import { TypeLiteralDeclaration } from '../../models/type-literal-declaration.model';
import { capitalize } from '../../../shared/utils/strings.util';
import { HasTypeLiteralNode } from '../../types/type-literal-property.type';

export function getDeclarationKind(typeDeclaration: DeclarationOrDate): TypeDeclarationKind {
    if (!typeDeclaration) {
        return undefined;
    } else if (typeDeclaration instanceof ClassDeclaration) {
        return 'Class';
    } else if (typeDeclaration instanceof EnumDeclaration) {
        return 'Enum';
    } else if (typeDeclaration instanceof InterfaceDeclaration) {
        return 'Interface';
    } else if (typeDeclaration instanceof TypeAliasDeclaration) {
        return 'TypeAlias';
    }
}


export function getImportDeclarations(typeName: string): ImportDeclaration[] {
    const declarations: ImportDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getImportDeclarations()));
    const declarationsWithSameName: ImportDeclaration[] = declarations.filter(i => i.getNamedImports().find(n => n.getName() === typeName));
    return groupByImportPath(declarationsWithSameName);
}


function groupByImportPath(declarations: ImportDeclaration[]): ImportDeclaration[] {
    const importDeclarations: ImportDeclaration[] = [];
    for (const declaration of declarations) {
        if (!importDeclarations.map(d => d.getModuleSpecifierSourceFile()?.getFilePath()).includes(declaration.getModuleSpecifierSourceFile().getFilePath())) {
            importDeclarations.push(declaration);
        }
    }
    return importDeclarations;
}


export function getProperties(declaration: ClassOrInterfaceDeclaration | TypeLiteralDeclaration): Property[] {
    const properties: Property[] = [];
    // console.log(chalk.cyanBright('GET PROPPPPPPS'), declaration.getName());
    for (const property of declaration.getProperties()) {
        if (isTypeLiteralProperty(property)) {
            console.log(chalk.yellowBright('PROPERTYYYYYY'), property.getKindName(), property.getName());
// const interfaceInfoName: string = getInterfaceInfoName(declaration.getName(), property.getName());
            const hasTypeLiteralNode = new HasTypeLiteralNode(declaration.getName(), property.getName(), property.getSourceFile().getFilePath(), property.getTypeNode() as TypeLiteralNode);
            const newInterfaceInfo: InterfaceInfo = this.createInterfaceInfoWithTypeLiteralNode(hasTypeLiteralNode);
            const newProperty: Property = {name: property.getName(), type: newInterfaceInfo.name};
            // console.log(chalk.cyanBright('PROPERTYYYYYY STRUCT'), property.getStructure());
            // console.log(chalk.cyanBright('PROPERTYYYYYY TYPEEEEE'), property.getTypeNode().getKindName());
            // const typeLiteralDeclaration = new TypeLiteralDeclaration(declaration.getName(), property.getTypeNode() as TypeLiteralNode);
            // const interfaceInfoName: string = createInterfaceInfoFromTypeLiteral(property.getName(), typeLiteralDeclaration);
            // console.log(chalk.cyanBright('PROPERTYYYYYY'), property.getKindName(), property.getName());
            properties.push(newProperty);
            // properties.push({name: property.getName(), type: interfaceInfoName } as Property);
        } else {
            const propertyStructure = property.getStructure();
            const prop = {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
            properties.push(prop);
        }
    }
    return properties;
}


export function createInterfaceInfoWithTypeLiteralNode(hasTypeLiteralNode: HasTypeLiteralNode): InterfaceInfo {
    const typeLiteralDeclaration = new TypeLiteralDeclaration(hasTypeLiteralNode.declarationName, hasTypeLiteralNode.typeLiteralNode);
    // createInterfaceInfoFromTypeLiteral(hasTypeLiteralNode.name, typeLiteralDeclaration);
    const interfaceInfo = new InterfaceInfo(hasTypeLiteralNode.interfaceInfoName, hasTypeLiteralNode.path, getProperties(typeLiteralDeclaration));
    INIT.addDeclarationInfo(interfaceInfo);
    return interfaceInfo;
}


function getInterfaceInfoName(declarationName: string, propertyName: string): string {
    return `${declarationName}${capitalize(propertyName)}`;
}



export function createInterfaceInfoFromTypeLiteral(propertyName: string, typeLiteral: TypeLiteralDeclaration): string {
    const interfaceInfoName = `${typeLiteral.getName()}${capitalize(propertyName)}`;
    const interfaceInfo = new InterfaceInfo(interfaceInfoName, typeLiteral.sourceFilePath, getProperties(typeLiteral));
    INIT.addDeclarationInfo(interfaceInfo);
    return interfaceInfoName;
}


export function genericParameters(declaration: GenericableDeclaration): GenericParameter[] {
    return declaration.getStructure().typeParameters;
}

