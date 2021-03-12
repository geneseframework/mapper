import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration
} from 'ts-morph';
import { Declaration } from '../../create/types/type-declaration.type';
import { throwWarning } from '../../create/utils/errors.util';
import { ClassOrInterfaceDeclaration } from '../../create/types/class-or-interface-declaration.type';
import { TypeDeclarationKind } from '../../create/types/type-declaration-kind.type';
import { PropertyDeclarationOrSignature } from '../../create/types/property-declaration-or-signature.type';
import { DeclarationInfoService } from '../services/declaration-info.service';
import { getDeclarationKind, getImportDeclarations } from './ast-declaration.util';
import { INIT } from '../const/init.const';


// TODO: Add imported classes in new instance generator file
// TODO: remove ts-morph from runtime
export async function isDeclaredOutOfProjectAddItToGlobal(target: string): Promise<boolean> {
    const declarations: ImportDeclaration[] = getImportDeclarations(target);
    if (declarations.length === 0) {
        return false;
    } else if (declarations.length > 1) {
        throwWarning(`${target} is declared in multiple files.`);
        return true;
    } else {
        const importSourceFile: SourceFile = declarations[0].getModuleSpecifierSourceFile();
        const declaration: Declaration = addDeclarationInfoToGlobalDeclarationInfos(target, importSourceFile);
        await addRecursivelyDeclarationInfo(declaration);
        return true;
    }
}


function addDeclarationInfoToGlobalDeclarationInfos(target: string, sourceFile: SourceFile): Declaration {
    let declaration: Declaration = getSourceFileDeclaration(target, sourceFile, 'Class');
    if (declaration) {
        DeclarationInfoService.addClassInfo(declaration as ClassDeclaration, INIT.classNames);
        return declaration;
    }
    declaration = getSourceFileDeclaration(target, sourceFile, 'Interface');
    if (declaration) {
        DeclarationInfoService.addInterfaceInfo(declaration as InterfaceDeclaration);
        return declaration;
    }
    declaration = getSourceFileDeclaration(target, sourceFile, 'Enum');
    if (declaration) {
        DeclarationInfoService.addEnumInfo(declaration as EnumDeclaration);
        return declaration;
    }
    declaration = getSourceFileDeclaration(target, sourceFile, 'TypeAlias');
    if (declaration) {
        DeclarationInfoService.addTypeInfo(declaration as TypeAliasDeclaration);
        return declaration;
    }
}


async function addRecursivelyDeclarationInfo(declaration: Declaration): Promise<void> {
    switch (getDeclarationKind(declaration)) {
        case 'Class':
        case 'Interface':
            await addDeclarationInfoForEachProperty(declaration as ClassOrInterfaceDeclaration);
        case 'Enum':
        // TODO
        case 'TypeAlias':
            await addDeclarationInfoForType(declaration as TypeAliasDeclaration);
    }
}


async function addDeclarationInfoForEachProperty(declaration: ClassOrInterfaceDeclaration): Promise<void> {
    for (const property of declaration.getProperties()) {
        await addDeclarationInfoForProperty(property);
    }
}


async function addDeclarationInfoForProperty(property: PropertyDeclarationOrSignature): Promise<void> {
    const propertyType: string = property.getStructure().type as string;
    if (isTypeReferenceNotAlreadyAdded(property)) {
        INIT.project.addSourceFileAtPath(property.getSourceFile().getFilePath());
        const declaration: Declaration = addDeclarationInfoToGlobalDeclarationInfos(propertyType, property.getSourceFile());
        if (!declaration) {
            // TODO: declarations on other node_module file
        }
    }
}


function isTypeReferenceNotAlreadyAdded(property: PropertyDeclarationOrSignature): boolean {
    const propertyType: string = property.getStructure().type as string;
    return isTypeReference(property) && !INIT.isAlreadyDeclared(propertyType);
}


function isTypeReference(property: PropertyDeclarationOrSignature): boolean {
    return property.getTypeNode().getKind() === SyntaxKind.TypeReference;
}


async function addDeclarationInfoForType(type: TypeAliasDeclaration): Promise<void> {
    // TODO
}


function getSourceFileDeclaration(name: string, sourceFile: SourceFile, kind: TypeDeclarationKind): Declaration {
    const declarationKind = `${kind}Declaration`;
    return sourceFile.getDescendantsOfKind(SyntaxKind[declarationKind]).find(e => (e as Declaration).getName() === name) as Declaration;
}

