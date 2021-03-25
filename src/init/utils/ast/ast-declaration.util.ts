import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration, PropertyDeclaration, PropertySignature,
    TypeAliasDeclaration,
    TypeLiteralNode
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
import { PropertyOrTypeAliasDeclaration, TypeLiteralDeclaration } from '../../models/type-literal-declaration.model';
import { HasTypeLiteralNode } from '../../types/type-literal-property.type';
import { capitalize } from '../../../shared/utils/strings.util';

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


export function getPropertiesAndAddInterfaceInfoIfHasTypeLiteral(declaration: ClassOrInterfaceDeclaration | TypeLiteralDeclaration): Property[] {
    const properties: Property[] = [];
    for (const property of declaration.getProperties()) {
        if (isTypeLiteralProperty(property)) {
            // console.log(chalk.yellowBright('PROPERTYYYYYY'), property.getKindName(), property.getName());
            const hasTypeLiteralNode = new HasTypeLiteralNode(declaration.getName(), property.getName(), property.getSourceFile().getFilePath(), property.getTypeNode() as TypeLiteralNode);
            const newInterfaceInfo: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(hasTypeLiteralNode);
            const newProperty: Property = {name: property.getName(), type: newInterfaceInfo.name};
            properties.push(newProperty);
        } else {
            const propertyStructure = property.getStructure();
            const prop = {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
            properties.push(prop);
        }
    }
    return properties;
}


export function createInterfaceInfoFromTypeLiteralNode(hasTypeLiteralNode: HasTypeLiteralNode): InterfaceInfo {
    const typeLiteralDeclaration = new TypeLiteralDeclaration(hasTypeLiteralNode.declarationName, hasTypeLiteralNode.typeLiteralNode);
    const interfaceInfo = new InterfaceInfo(hasTypeLiteralNode.interfaceInfoName, hasTypeLiteralNode.path, getPropertiesAndAddInterfaceInfoIfHasTypeLiteral(typeLiteralDeclaration));
    INIT.addDeclarationInfo(interfaceInfo);
    return interfaceInfo;
}


export function createIIII(typeAliasDeclaration: TypeAliasDeclaration): InterfaceInfo {
    // const typeLiteralDeclaration = new TypeLiteralDeclaration(declaration.getName(), typeLiteralNode);
    const properties: Property[] = [];
    const typeLiteralNode: TypeLiteralNode = typeAliasDeclaration.getTypeNode() as TypeLiteralNode;
    for (const propertySignature of typeLiteralNode.getProperties()) {
        const typeAliasPropertyName = `${typeAliasDeclaration.getName()}${propertySignature.getName()}`;
        properties.push(getPropertyFromPropertySignature(typeAliasPropertyName, propertySignature))
    }
    const interfaceInfo = new InterfaceInfo(getInterfaceInfoName(typeAliasDeclaration.getName(), 'Interface'), typeAliasDeclaration.getSourceFile().getFilePath(), properties);
    INIT.addDeclarationInfo(interfaceInfo);
    return interfaceInfo;
}



export function getPropertyFromPropertySignature(parentName: string, propertySignature: PropertySignature): Property {
    if (isTypeLiteralProperty(propertySignature)) {
        const typeLiteralNode: TypeLiteralNode = propertySignature.getTypeNode() as TypeLiteralNode;
        const newInterfaceInfo: InterfaceInfo = createIITypeLiteralNode(getInterfaceInfoName(parentName, propertySignature.getName()), typeLiteralNode);
        return {name: propertySignature.getName(), type: newInterfaceInfo.name};
    } else {
        const propertyStructure = propertySignature.getStructure();
        return {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
    }
}



export function createIITypeLiteralNode(interfaceInfoName: string, typeLiteralNode: TypeLiteralNode): InterfaceInfo {
    // const typeLiteralDeclaration = new TypeLiteralDeclaration(declaration.getName(), typeLiteralNode);
    const properties: Property[] = [];
    // const typeLiteralNode: TypeLiteralNode = typeLiteralNode.getTypeNode() as TypeLiteralNode;
    for (const propertySignature of typeLiteralNode.getProperties()) {
        const interfaceInfoPropertyName = `${interfaceInfoName}${propertySignature.getName()}`;
        properties.push(getPropertyFromPropertySignature(interfaceInfoPropertyName, propertySignature));
    }
    const interfaceInfo = new InterfaceInfo(interfaceInfoName, typeLiteralNode.getSourceFile().getFilePath(), properties);
    INIT.addDeclarationInfo(interfaceInfo);
    return interfaceInfo;
}




function getInterfaceInfoName(declarationName: string, propertyName: string): string {
    return `${declarationName}${capitalize(propertyName)}`;
}

export function genericParameters(declaration: GenericableDeclaration): GenericParameter[] {
    return declaration.getStructure().typeParameters;
}

