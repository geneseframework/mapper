import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { GLOBAL } from '../const/global.const';
import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    IndexSignatureDeclaration,
    IndexSignatureDeclarationStructure,
    InterfaceDeclaration,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration
} from 'ts-morph';
import { TypeDeclaration } from '../types/type-declaration.type';
import { throwWarning } from './errors.util';
import { flat } from './arrays.util';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';
import { Key } from '../types/key.type';
import { isPrimitiveTypeNode } from './primitives.util';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';


const getDescendantClasses = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.ClassDeclaration);
const getDescendantEnums = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.EnumDeclaration);
const getDescendantInterfaces = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration);
const getDescendantTypeAliases = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration);


export function getDeclarationKind(typeDeclaration: TypeDeclaration): TypeDeclarationKind {
    if (!typeDeclaration) {
        return undefined;
    } else if (typeDeclaration instanceof ClassDeclaration) {
        return TypeDeclarationKind.CLASS_DECLARATION;
    } else if (typeDeclaration instanceof EnumDeclaration) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    } else if (typeDeclaration instanceof InterfaceDeclaration) {
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    } else if (typeDeclaration instanceof TypeAliasDeclaration) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    }
}


export function getTypeDeclaration(typeName: string): TypeDeclaration {
    const declarationEnum: TypeDeclarationKind = declarationKind(typeName);
    switch (declarationEnum) {
        case TypeDeclarationKind.CLASS_DECLARATION:
            return getDeclaration(typeName, getDescendantClasses);
        case TypeDeclarationKind.ENUM_DECLARATION:
            return getDeclaration(typeName, getDescendantEnums);
        case TypeDeclarationKind.INTERFACE_DECLARATION:
            return getDeclaration(typeName, getDescendantInterfaces);
        case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
            return getDeclaration(typeName, getDescendantTypeAliases);
        default:
            const typeScriptDeclaration: TypeDeclaration = getTypeScriptDeclaration(typeName);
            if (typeScriptDeclaration) {
                return typeScriptDeclaration;
            } else {
                throwWarning(`Warning: impossible to find declaration corresponding to "${typeName}".`);
                return undefined;
            }
    }
}


function declarationKind(typeName: string): TypeDeclarationKind {
    if (isClassDeclaration(typeName)) {
        return TypeDeclarationKind.CLASS_DECLARATION;
    } else if (isEnumDeclaration(typeName)) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    } else if (isInterfaceDeclaration(typeName)) {
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    } else if (isTypeAliasDeclaration(typeName)) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    } else {
        return undefined;
    }
}


function isClassDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, getDescendantClasses);
}


function isEnumDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, getDescendantEnums);
}


function isInterfaceDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, getDescendantInterfaces);
}


function isTypeAliasDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, getDescendantTypeAliases);
}


function hasDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return hasDeclarationInProject(typeName, getTDeclaration) || hasDeclarationOutOfProject(typeName, getTDeclaration) || hasDeclarationInTypeScript(typeName);
}


function hasDeclarationInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return !!GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function hasDeclarationOutOfProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    const declarations: ImportDeclaration[] = getImportDeclarations(typeName);
    if (declarations.length === 0) {
        return false;
    } else if (declarations.length > 1) {
        throwWarning(`Error: ${typeName} is declared in multiple files.`)
    } else {
        const importSourceFile: SourceFile = declarations[0].getModuleSpecifierSourceFile();
        if (getTDeclaration(importSourceFile)?.length > 0) {
            GLOBAL.project.addSourceFileAtPath(importSourceFile.getFilePath());
            return true;
        } else {
            return false;
        }
    }
    return !!GLOBAL.projectWithNodeModules.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function hasDeclarationInTypeScript(typeName: string): boolean {
    const tsSourceFile: SourceFile = getTsSourceFile();
    console.log(chalk.blueBright('HAS TS DECLLLLL'), typeName, tsSourceFile?.getFilePath());
    return undefined;
}


function getTsSourceFile(): SourceFile {
// async function getTsSourceFile(): Promise<SourceFile> {
    const tsLibPath: string = `${GLOBAL.configFilePath}/node_modules/typescript/lib/lib.es5.d.ts`;
    console.log(chalk.yellowBright('TS LIB PATH'), tsLibPath);
    try {
        fs.readSync(tsLibPath);
        console.log(chalk.greenBright('TS LIB'));
    }
    catch(err) {
        throwWarning(`Warning : ES5 library not found. Impossible to do type checking for TS declarations (Date, ...). Did you install node_modules ?`)
        return undefined;
    }
    console.log(chalk.yellowBright('TS LIBBBB'));
    GLOBAL.project.addSourceFileAtPath(tsLibPath);
    console.log(chalk.yellowBright('TS FILEEEEE'));
    const tsSourceFile: SourceFile = GLOBAL.project.getSourceFile(tsLibPath);
    console.log(chalk.blueBright('TS FILEEEEE'), tsSourceFile?.getBaseName());
    return tsSourceFile;
}


function getImportDeclarations(typeName: string): ImportDeclaration[] {
    const declarations: ImportDeclaration[] = flat(GLOBAL.projectWithNodeModules.getSourceFiles().map(s => s.getImportDeclarations()));
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


function getDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): TypeDeclaration {
    let sourceFile: SourceFile = getDeclarationSourceFileInProject(typeName, getTDeclaration);
    return getTDeclaration(sourceFile).find(t => t.getName() === typeName);
}


function getDeclarationSourceFileInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): SourceFile {
    return GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function getTypeScriptDeclaration(typeName: string): TypeDeclaration {
    if (typeName === 'Date') {

    }
    return undefined;
}


export function indexSignatureWithSameType(key: Key, value: any, declaration: ClassOrInterfaceDeclaration): string {
    const indexSignatures: IndexSignatureDeclaration[] = declaration.getDescendantsOfKind(SyntaxKind.IndexSignature);
    if (indexSignatures.length === 0) {
        return undefined;
    } else if (indexSignatures.length === 1) {
        return indexSignatureName(key, value, indexSignatures[0]);
    } else {
        throwWarning(`Warning: ${declaration?.getName()} has multiple index signatures.`);
        return undefined;
    }
}


function indexSignatureName(key: Key, value: any, indexSignature: IndexSignatureDeclaration): string {
    const indexStructure: IndexSignatureDeclarationStructure = indexSignature?.getStructure();
    if (indexStructure.keyType !== typeof key) {
        return undefined;
    }
    const returnType: string = indexStructure.returnType as string;
    if (isPrimitiveTypeNode(returnType) && returnType === typeof value) {
        return returnType;
    }
    if (!isPrimitiveTypeNode(returnType) && value?.constructor.name === returnType) {
        return returnType;
    }
    return undefined;
}
