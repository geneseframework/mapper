import {
    ImportDeclaration, ImportSpecifier,
    MethodDeclaration,
    Project, PropertyAccessExpression,
    SourceFile,
    SourceFileReferencingNodes,
    SyntaxKind
} from 'ts-morph';
import * as chalk from 'chalk';
import { GLOBAL } from '../const/global.const';
import { getImportSpecifier } from '../utils/ast.util';

export class FlagService {

    static async init(): Promise<void> {
        console.log(chalk.yellowBright('Init mapping...'));
        console.log(chalk.greenBright('INIT DECLARRRRR GLOB PROJJJJ'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
        const referencedNodes: SourceFileReferencingNodes[] = GLOBAL.nodeModuleMapper.getReferencingNodesInOtherSourceFiles();
        const referencedImportDeclarations: ImportDeclaration[] = referencedNodes.filter(r => GLOBAL.project.getSourceFiles().includes(r.getSourceFile())) as ImportDeclaration[];
        console.log(chalk.magentaBright('INIT DECLARRRRR REFFFFFS'), referencedImportDeclarations.map(r => r.getSourceFile().getBaseName()));
        for (const importDeclaration of referencedImportDeclarations) {
            console.log(chalk.blueBright('CREATE DECLARRRRR'), importDeclaration.getSourceFile().getBaseName());
            this.flagTypes(importDeclaration);
        }
        console.log(chalk.yellowBright('Types mapped'));
    }


    private static flagTypes(importDeclaration: ImportDeclaration): void {
        const importSpecifier: ImportSpecifier = getImportSpecifier(importDeclaration);
        importSpecifier.getStructure();
        console.log(chalk.blueBright('IMPRT SPECCCCC'), importSpecifier.getStructure());
        const propertyAccessExpressions: PropertyAccessExpression[] = importDeclaration.getSourceFile()
            .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
            .filter(p => p.getExpression().getText() === importSpecifier.getName() && p.getName() === 'create');
        console.log(chalk.magentaBright('FLAG TYPES propertyAccessExpressionssssss'), propertyAccessExpressions.map(p => p.getText()));
    }

}
