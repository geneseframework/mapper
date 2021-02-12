import {
    ImportDeclaration, ImportSpecifier,
    MethodDeclaration,
    Project,
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
        const initDeclaration: MethodDeclaration = GLOBAL.nodeModuleMapper.getClass('Mapper').getMethod('create');
        console.log(chalk.greenBright('INIT DECLARRRRR GLOB PROJJJJ'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
        console.log(chalk.greenBright('INIT DECLARRRRR NODE MOD'), GLOBAL.nodeModuleMapper.getBaseName());
        console.log(chalk.greenBright('INIT DECLARRRRR REFFFFFS'), GLOBAL.nodeModuleMapper.getReferencingNodesInOtherSourceFiles().map(r => r.getSourceFile().getBaseName()));
        // console.log(chalk.greenBright('INIT DECLARRRRR'), initDeclaration.getSourceFile().getre());
        const importDeclarations: ImportDeclaration[] = GLOBAL.nodeModuleMapper.getReferencingNodesInOtherSourceFiles().filter(n => n.getKind() === SyntaxKind.ImportDeclaration) as ImportDeclaration[];
        // console.log(chalk.blueBright('IMPLTSSSS'), implementations);
        for (const importDeclaration of importDeclarations) {
            console.log(chalk.blueBright('CREATE DECLARRRRR'), importDeclaration.getSourceFile().getBaseName());
            this.flagTypes(importDeclaration);
        }
        console.log(chalk.yellowBright('Types mapped'));
    }


    private static flagTypes(importDeclaration: ImportDeclaration): void {
        const importSpecifier: ImportSpecifier = getImportSpecifier(importDeclaration);
        importSpecifier.getStructure();
        console.log(chalk.blueBright('IMPRT SPECCCCC'), importSpecifier.getStructure());
        const zzz = importDeclaration.getSourceFile()
            .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
            .map(p => p.getText())
            // .filter(p => p.getExpression().getText() === importSpecifier.getName() && p.getName() === 'create');
        console.log(chalk.magentaBright('ZZZZZZZ'), zzz);
    }

}
