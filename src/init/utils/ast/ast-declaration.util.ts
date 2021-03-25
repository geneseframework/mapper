import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    PropertySignature,
    SyntaxKind,
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
import { InterfaceInfo } from '../../../shared/models/declarations/interface-info.model';
import { capitalize } from '../../../shared/utils/strings.util';
import { isTypeLiteralProperty } from '../../types/type-literal-property.type';
import * as chalk from 'chalk';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';

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


export function getPropertiesFromClassOrInterface(declaration: ClassOrInterfaceDeclaration): Property[] {
    const properties: Property[] = [];
    for (const propertyDeclarationOrSignature of declaration.getProperties()) {
        if (declaration.getName() === 'ObjectLiteralStringArraySpec') {
            console.log(chalk.cyanBright('GETPROPPPP'), propertyDeclarationOrSignature.getStructure());
        }
        if (hasTypeLiteral(propertyDeclarationOrSignature)) {
            console.log(chalk.yellowBright('PROPERTYYYYYY'), declaration.getName(), propertyDeclarationOrSignature.getKindName(), propertyDeclarationOrSignature.getName());
            const typeLiteralAncestors: TypeLiteralNode[] = getTypeLiteralAncestors(propertyDeclarationOrSignature);
            for (let i = 0; i < typeLiteralAncestors.length; i++) {
                const infoName: string = `${getInterfaceInfoName(declaration.getName(), propertyDeclarationOrSignature.getName())}_${i}`;
                createInterfaceInfoFromTypeLiteralNode(infoName, typeLiteralAncestors[i]);
            }
            console.log(chalk.magentaBright('GETPROPPPP'), typeLiteralAncestors.map(t => t.getProperties().map(p => p.getStructure())).flat());
            if (declaration.getName() === 'ObjectLiteralStringArraySpec') {
                console.log(chalk.greenBright('ISTLPPPPP'), propertyDeclarationOrSignature.getStructure());
            }
            if (isTypeLiteralProperty(propertyDeclarationOrSignature)) {
                console.log(chalk.yellowBright('PROPERTYYYYYY'), declaration.getName(), propertyDeclarationOrSignature.getKindName(), propertyDeclarationOrSignature.getName());
                const newInterfaceInfo: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(getInterfaceInfoName(declaration.getName(), propertyDeclarationOrSignature.getName()), propertyDeclarationOrSignature.getTypeNode() as TypeLiteralNode);
                const newProperty: Property = {name: propertyDeclarationOrSignature.getName(), type: newInterfaceInfo.name};
                properties.push(newProperty);
            }
        } else {
            const propertyStructure = propertyDeclarationOrSignature.getStructure();
            const prop = {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
            properties.push(prop);
        }
    }
    return properties;
}


function hasTypeLiteral(propertyDeclarationOrSignature: PropertyDeclarationOrSignature): boolean {
    return !!propertyDeclarationOrSignature.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
}


function getTypeLiteralAncestors(propertySignature: PropertyDeclarationOrSignature): TypeLiteralNode[] {
    const typeLiteralNodes: TypeLiteralNode[] = [];
    for (const typeLiteralNode of propertySignature.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
        if (isTypeLiteralAncestor(typeLiteralNode)) {
            typeLiteralNodes.push(typeLiteralNode)
        }
    }
    return typeLiteralNodes;
}


function isTypeLiteralAncestor(typeLiteralNode: TypeLiteralNode): boolean {
    return !typeLiteralNode.getFirstAncestorByKind(SyntaxKind.TypeLiteral);
}


export function createInterfaceInfoFromTypeAliasDeclaration(typeAliasDeclaration: TypeAliasDeclaration): InterfaceInfo {
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
        const newInterfaceInfo: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(getInterfaceInfoName(parentName, propertySignature.getName()), typeLiteralNode);
        return {name: propertySignature.getName(), type: newInterfaceInfo.name};
    } else {
        const propertyStructure = propertySignature.getStructure();
        return {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
    }
}


export function createInterfaceInfoFromTypeLiteralNode(interfaceInfoName: string, typeLiteralNode: TypeLiteralNode): InterfaceInfo {
    const properties: Property[] = [];
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

