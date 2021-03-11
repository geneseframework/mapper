import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    TypeAliasDeclaration
} from 'ts-morph';
import { DeclarationOrDate, GenericableDeclaration } from '../../create/types/type-declaration.type';
import { flat } from '../../create/utils/native/arrays.util';
import { ClassOrInterfaceDeclaration } from '../../create/types/class-or-interface-declaration.type';
import { Property } from '../../create/types/target/property.type';
import { ClassOrInterfaceInfo } from '../../create/types/class-or-interface-info.type';
import { TypeDeclarationKind } from '../../create/types/type-declaration-kind.type';
import { GenericParameter } from '../../create/types/target/generic-parameter.type';
import { INIT } from '../const/init.const';

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
    const declarations: ImportDeclaration[] = flat(INIT.projectWithNodeModules.getSourceFiles().map(s => s.getImportDeclarations()));
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


export function getProperties(declaration: ClassOrInterfaceDeclaration): Property[] {
    // @ts-ignore
    return declaration?.getStructure().properties.map(p => {
        return {name: p.name, type: p.type, initializer: p.initializer, isRequired: !p.hasQuestionToken} as Property;
    });
}


export function genericParameters(declaration: GenericableDeclaration): GenericParameter[] {
    return declaration.getStructure().typeParameters;
}

