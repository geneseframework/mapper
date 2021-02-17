import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { GLOBAL } from '../const/global.const';
import {
    ClassDeclaration,
    EnumDeclaration, ImportDeclaration, ImportDeclarationStructure,
    InterfaceDeclaration,
    SourceFile,
    StringLiteral, SyntaxKind,
    TypeAliasDeclaration
} from 'ts-morph';
import { TypeDeclaration } from '../types/type-declaration.type';
import { throwCustom } from './errors.util';
import * as chalk from 'chalk';
import { flat } from './arrays.util';


export function declarationKind(typeName: string): TypeDeclarationKind {
    if (isClassDeclaration(typeName)) {
        console.log(chalk.redBright('SHOULD NOT BE HEREEEEE'), typeName);
        return TypeDeclarationKind.CLASS_DECLARATION;
    } else if (isEnumDeclaration(typeName)) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    } else if (isInterfaceDeclaration(typeName)) {
        console.log(chalk.redBright('SHOULD BE HEREEEEE !!!!! IDECL'), typeName);
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    } else if (isTypeAliasDeclaration(typeName)) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    } else {
        throwCustom(`Error: declaration not found for ${typeName}`);
        return undefined;
    }
}


function isClassDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.ClassDeclaration));
}


function isEnumDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getEnums());
}


function isInterfaceDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration));
}


function isTypeAliasDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getTypeAliases());
}


function hasDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return hasDeclarationInProject(typeName, getTDeclaration) || hasDeclarationOutOfProject(typeName, getTDeclaration);
    // return !!GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function hasDeclarationInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return !!GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function hasDeclarationOutOfProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    const srcfffff: ImportDeclarationStructure[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getImportDeclarations().map(i => i.getStructure())));
    // console.log(chalk.magentaBright('DECL OUT OF PRJJJJJJJ'), getTDeclaration);
    const declarations: ImportDeclaration[] = getImportDeclarations(typeName);
    if (declarations.length === 0) {
        return false;
    } else if (declarations.length > 1) {
        // TODO : implement
        throwCustom(`Error: ${typeName} is declared in multiple files.`)
    } else {
        // const pathImport: string = declarations[0].getModuleSpecifierSourceFile()?.getFilePath();
        // console.log(chalk.greenBright('PATH IMPORTTTTT'), pathImport);
        // const classes = declarations[0].getModuleSpecifierSourceFile().getClasses().map(c => c.getName());
        // const interfaces = declarations[0].getModuleSpecifierSourceFile().getDescendantsOfKind(SyntaxKind.InterfaceDeclaration).map(c => c.getName());
        // console.log(chalk.greenBright('PATH IMPORTTTTT'), classes);
        // console.log(chalk.greenBright('PATH IMPORTTTTT'), interfaces);
        const importSourceFile: SourceFile = declarations[0].getModuleSpecifierSourceFile();
        console.log(chalk.cyanBright('PATH IMPORTTTTT getTDeclaration(importSourceFile)'), importSourceFile.getBaseName());
        if (getTDeclaration(importSourceFile)?.length > 0) {
            console.log(chalk.blueBright('PROJJJJJ SRC FILES'), GLOBAL.project.getSourceFiles().length);
            GLOBAL.project.addSourceFileAtPath(importSourceFile.getFilePath());
            console.log(chalk.blueBright('PROJJJJJ SRC FILES 2'), GLOBAL.project.getSourceFiles().length);
            console.log(chalk.blueBright('PROJJJJJ SRC FILES'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
            return true;
        } else {
            return false;
        }
    }
    return !!GLOBAL.projectWithNodeModules.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function getImportDeclarations(typeName: string): ImportDeclaration[] {
    const declarations: ImportDeclaration[] = flat(GLOBAL.projectWithNodeModules.getSourceFiles().map(s => s.getImportDeclarations()));
    const declarationsForToTypeName: ImportDeclaration[] = declarations.filter(i => i.getNamedImports().find(n => n.getName() === typeName));
    console.log(chalk.yellowBright('DECL FOR TYPE NAMMMMMM'), declarationsForToTypeName?.map(d => d.getStructure()));
// const moduleSpecifiers: string[]
    // const sourceFiles: SourceFile[] = GLOBAL.project.getSourceFiles().filter(s => !!s.getImportDeclarations().find()
    return declarationsForToTypeName;
}


export function getTypeDeclaration(typeName: string): TypeDeclaration {
    const declarationEnum: TypeDeclarationKind = declarationKind(typeName);
    console.log(chalk.yellowBright('GET DECLLLLL declarationEnum'), declarationEnum);
    switch (declarationEnum) {
        case TypeDeclarationKind.CLASS_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.ClassDeclaration));
        case TypeDeclarationKind.ENUM_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getEnums());
        case TypeDeclarationKind.INTERFACE_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration));
        case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getTypeAliases());
        default:
            throwCustom('Impossible to find TypeAliasDeclaration corresponding to ', typeName);
    }
}


function getDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): TypeDeclaration {
    console.log(chalk.blueBright('GET DECLLLLL'), typeName);
    const srcFile: SourceFile = GLOBAL.project.getSourceFiles().find(s => s.getFilePath() === '/Users/utilisateur/Documents/perso_gilles_fabre/genese/genesemapper/node_modules/chalk/index.d.ts');
    // console.log(chalk.blueBright('GET DECLLLLL NAME SPACES'), srcFile.getNamespaces().map(n => n.getStructure()));
    // console.log(chalk.magentaBright('GET DECLLLLL CLASSES'), srcFile.getNamespaces().map(n => n.getStatements().map(s => s.getKindName())));
    // console.log(chalk.magentaBright('GET DECLLLLL CLASSES'), srcFile.getNamespaces().map(n => n.getStatements().map(s => (s as TypeDeclaration).getStructure())));
    // console.log(chalk.magentaBright('GET DECLLLLL CLASSES'), srcFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration).map(d => d.getStructure()));
    let sourceFile: SourceFile = getDeclarationSourceFileInProject(typeName, getTDeclaration);
    console.log(chalk.greenBright('GET DECLLLLL'), typeName, sourceFile?.getBaseName());
    if (!sourceFile) {

    }
    // const sourceFile: SourceFile = GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
    return getTDeclaration(sourceFile).find(t => t.getName() === typeName);
}


function getDeclarationSourceFileInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): SourceFile {
    return GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function getDeclarationSourceFileOutOfProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): SourceFile {
    return GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


export function getDeclarationKind(typeDeclaration: TypeDeclaration): TypeDeclarationKind {
    if (!typeDeclaration) {
        return undefined;
    }
    if (typeDeclaration instanceof ClassDeclaration) {
        return TypeDeclarationKind.CLASS_DECLARATION;
    }
    if (typeDeclaration instanceof EnumDeclaration) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    }
    if (typeDeclaration instanceof InterfaceDeclaration) {
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    }
    if (typeDeclaration instanceof TypeAliasDeclaration) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    }

}
