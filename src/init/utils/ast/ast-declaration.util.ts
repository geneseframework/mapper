import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    Node,
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
import { HasStructureType } from '../../types/class-or-interface-or-type-declaration.type';
import { hasTypeLiteral } from './ast-type-literal.util';
import { HierarchicTypeLiteralService } from '../../services/hierarchic-type-literal.service';

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

// interface GetStructure {
//     getStructure: () => string | WriterFunction
// }

export function declarationType(declaration: HasStructureType): string {
    return declaration.getStructure().type as string;
}


export function getPropertiesFromClassOrInterface(declaration: ClassOrInterfaceDeclaration): Property[] {
    const properties: Property[] = [];
    for (const propDecOrSign of declaration.getProperties()) {
        properties.push(getPropertyFromPropDecOrSign(declaration.getName(), propDecOrSign))
    }
    return properties;
}

// TODO : replace brackets by interface namesvbgcf
export function getPropertyFromPropDecOrSign(parentName: string, propDecOrSign: PropertyDeclarationOrSignature): Property {
    if (parentName === 'ObjectLiteralStringArraySpec') {
        console.log(chalk.cyanBright('GETPROPPPP'), propDecOrSign.getStructure());
    }
    if (hasTypeLiteral(propDecOrSign)) {
        // console.log(chalk.cyanBright('GETPROPPPP'), propDecOrSign.getStructure());
        console.log(chalk.yellowBright('PROPERTYYYYYY'), propDecOrSign.getName(), propDecOrSign.getKindName(), propDecOrSign.getName());

        const stringifiedType = HierarchicTypeLiteralService.create(propDecOrSign).stringifiedType;
        const typeLiteralAncestors: TypeLiteralNode[] = getTypeLiteralAncestors(propDecOrSign);
        const interfaceInfos: InterfaceInfo[] = [];
        for (let i = 0; i < typeLiteralAncestors.length; i++) {
            if (isTrivialTypeLiteral(typeLiteralAncestors[i])) {
                const infoName: string = `${getInterfaceInfoName(parentName, propDecOrSign.getName())}_${i}`;
                const newII: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(infoName, typeLiteralAncestors[i]);
                newII.stringifiedType = propDecOrSign.getStructure().type as string;
                interfaceInfos.push(newII);
            } else {

            }
        }
        console.log(chalk.magentaBright('GETPROPPPP'), typeLiteralAncestors.map(t => t.getProperties().map(p => p.getStructure())).flat());
        if (parentName === 'ObjectLiteralStringArraySpec') {
            console.log(chalk.greenBright('ISTLPPPPP'), interfaceInfos);
            const initialType: string = propDecOrSign.getStructure().type as string;
            console.log(chalk.greenBright('INITIALLLLL TP'), initialType);
            // const finalType: string = replaceCurveBracketedBlocsByInterfaceNames(initialType, interfaceInfos);
            // console.log(chalk.cyanBright('FINALLLL TP'), finalType);
        }
        if (isTypeLiteralProperty(propDecOrSign)) {
            // console.log(chalk.yellowBright('PROPERTYYYYYY'), declaration.getName(), propDecOrSign.getKindName(), propDecOrSign.getName());
            const newInterfaceInfo: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(getInterfaceInfoName(parentName, propDecOrSign.getName()), propDecOrSign.getTypeNode() as TypeLiteralNode);
            const newProperty: Property = {name: propDecOrSign.getName(), type: newInterfaceInfo.name};
            return newProperty;
        }
    } else {
        const propertyStructure = propDecOrSign.getStructure();
        const prop = {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
        return prop;
    }
}

// // TODO : replace brackets by interface namesvbgcf
// export function getPropertyFromPropDecOrSign(parentName: string, propDecOrSign: PropertyDeclarationOrSignature): Property {
//     if (parentName === 'ObjectLiteralStringArraySpec') {
//         console.log(chalk.cyanBright('GETPROPPPP'), propDecOrSign.getStructure());
//     }
//     if (hasTypeLiteral(propDecOrSign)) {
//         // console.log(chalk.cyanBright('GETPROPPPP'), propDecOrSign.getStructure());
//         console.log(chalk.yellowBright('PROPERTYYYYYY'), propDecOrSign.getName(), propDecOrSign.getKindName(), propDecOrSign.getName());
//         const typeLiteralAncestors: TypeLiteralNode[] = getTypeLiteralAncestors(propDecOrSign);
//         const interfaceInfos: InterfaceInfo[] = [];
//         for (let i = 0; i < typeLiteralAncestors.length; i++) {
//             if (isTrivialTypeLiteral(typeLiteralAncestors[i])) {
//                 const infoName: string = `${getInterfaceInfoName(parentName, propDecOrSign.getName())}_${i}`;
//                 const newII: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(infoName, typeLiteralAncestors[i]);
//                 newII.stringifiedType = propDecOrSign.getStructure().type as string;
//                 interfaceInfos.push(newII);
//             } else {
//
//             }
//         }
//         console.log(chalk.magentaBright('GETPROPPPP'), typeLiteralAncestors.map(t => t.getProperties().map(p => p.getStructure())).flat());
//         if (parentName === 'ObjectLiteralStringArraySpec') {
//             console.log(chalk.greenBright('ISTLPPPPP'), interfaceInfos);
//             const initialType: string = propDecOrSign.getStructure().type as string;
//             console.log(chalk.greenBright('INITIALLLLL TP'), initialType);
//             // const finalType: string = replaceCurveBracketedBlocsByInterfaceNames(initialType, interfaceInfos);
//             // console.log(chalk.cyanBright('FINALLLL TP'), finalType);
//         }
//         if (isTypeLiteralProperty(propDecOrSign)) {
//             // console.log(chalk.yellowBright('PROPERTYYYYYY'), declaration.getName(), propDecOrSign.getKindName(), propDecOrSign.getName());
//             const newInterfaceInfo: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(getInterfaceInfoName(parentName, propDecOrSign.getName()), propDecOrSign.getTypeNode() as TypeLiteralNode);
//             const newProperty: Property = {name: propDecOrSign.getName(), type: newInterfaceInfo.name};
//             return newProperty;
//         }
//     } else {
//         const propertyStructure = propDecOrSign.getStructure();
//         const prop = {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
//         return prop;
//     }
// }


function addIIWithTypLit(parentName: string, childName: string, propertyDeclarationOrSignature: PropertyDeclarationOrSignature) {
    const typeLiteralAncestors: TypeLiteralNode[] = getTypeLiteralAncestors(propertyDeclarationOrSignature);
    const interfaceInfos: InterfaceInfo[] = [];
    for (let i = 0; i < typeLiteralAncestors.length; i++) {
        const infoName: string = `${getInterfaceInfoName(parentName, childName)}_${i}`;
        if (isTrivialTypeLiteral(typeLiteralAncestors[i])) {
            const newII: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(infoName, typeLiteralAncestors[i]);
            newII.stringifiedType = propertyDeclarationOrSignature.getStructure().type as string;
            interfaceInfos.push(newII);
        } else {
            // console.log(chalk.blueBright(''), typeLiteralAncestors[i].getty);
            const literalAncestors: TypeLiteralNode[] = getTypeLiteralAncestors(typeLiteralAncestors[i]);
            // addIIWithTypLit(getInterfaceInfoName(parentName, childName), `_${i}`, 'zzz', literalAncestors)
        }
    }
}


// function getTypeWithoutCurvedBrackets(initialType: string, propertyDeclarationOrSignature: PropertyDeclarationOrSignature, parentName: string): string {
//     const trivialTypeLiterals: TypeLiteralNode[] = getTrivialTypeLiterals(propertyDeclarationOrSignature);
//     const interfaceInfos: InterfaceInfo[] = [];
//     for (let i = 0; i < trivialTypeLiterals.length; i++) {
//         const infoName: string = `${getInterfaceInfoName(parentName, propertyDeclarationOrSignature.getName())}_${i}`;
//         const newII: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(infoName, trivialTypeLiterals[i]);
//         newII.stringifiedType = propertyDeclarationOrSignature.getStructure().type as string;
//         interfaceInfos.push(newII);
//     }
//     const curveBracketedBlocs: CurvedBracketed[] = getCurveBracketedBlockInfos(initialType);
//     let finalType: string = initialType;
//     for (const curveBracketedBloc of curveBracketedBlocs) {
//         finalType = finalType.replace(curveBracketedBloc, getInterfaceInfoNameFromCurveBracketed(curveBracketedBloc, interfaceInfos));
//     }
//     return finalType;
// }
//
//
// function replaceCurveBracketedBlocsByInterfaceNames(initialType: string, interfaceInfos: InterfaceInfo[]): string {
//     const curveBracketedBlocs: CurvedBracketed[] = getCurveBracketedBlockInfos(initialType);
//     let finalType: string = initialType;
//     for (const curveBracketedBloc of curveBracketedBlocs) {
//         finalType = finalType.replace(curveBracketedBloc, getInterfaceInfoNameFromCurveBracketed(curveBracketedBloc, interfaceInfos));
//     }
//     return finalType;
// }


function getTrivialTypeLiterals(propertySignature: PropertyDeclarationOrSignature): TypeLiteralNode[] {
    const typeLiteralNodes: TypeLiteralNode[] = [];
    for (const typeLiteralNode of propertySignature.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
        if (isTrivialTypeLiteral(typeLiteralNode)) {
            typeLiteralNodes.push(typeLiteralNode)
        }
    }
    return typeLiteralNodes;
}

// TODO: remove
function isTrivialTypeLiteral(typeLiteralNode: TypeLiteralNode): boolean {
    return !typeLiteralNode.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
}


function getTypeLiteralAncestors(node: Node): TypeLiteralNode[] {
    const typeLiteralNodes: TypeLiteralNode[] = [];
    for (const typeLiteralNode of node.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
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


export function getPropertyFromPropertySignature(parentName: string, propertySignature: PropertyDeclarationOrSignature): Property {
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

