import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    TypeAliasDeclaration
} from 'ts-morph';
import { INIT } from '../../const/init.const';
import { TypeDeclarationKindInit } from '../../types/type-declaration-kind-init.type';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { PropertyInit } from '../../types/property.type';
import { GenericParameterInit } from '../../types/generic-parameter.type';
import { DeclarationOrDate, GenericableDeclaration } from '../../types/type-declaration.type';
import { flat } from '../native/arrays.util';

export function getDeclarationKind(typeDeclaration: DeclarationOrDate): TypeDeclarationKindInit {
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


export function getProperties(declaration: ClassOrInterfaceDeclaration): PropertyInit[] {
    // @ts-ignore
    return declaration?.getStructure().properties.map(p => {
        return {name: p.name, type: p.type, initializer: p.initializer, isRequired: !p.hasQuestionToken} as PropertyInit;
    });
}


export function genericParameters(declaration: GenericableDeclaration): GenericParameterInit[] {
    return declaration.getStructure().typeParameters;
}

