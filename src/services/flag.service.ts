import {
    ImportDeclaration,
    MethodDeclaration,
    Project,
    SourceFile,
    SourceFileReferencingNodes,
    SyntaxKind
} from 'ts-morph';
import * as chalk from 'chalk';
import { GLOBAL } from '../const/global.const';

export class FlagService {

    static async init(): Promise<void> {
        console.log(chalk.yellowBright('Init mapping...'));
        const initDeclaration: MethodDeclaration = GLOBAL.nodeModuleMapper.getClass('Mapper').getMethod('create');
        console.log(chalk.blueBright('CREATE DECLARRRRR'), initDeclaration.getName());
        const sourceFilesReferencingMapper: SourceFileReferencingNodes[] = GLOBAL.nodeModuleMapper.getReferencingNodesInOtherSourceFiles().filter(n => n.getKind() === SyntaxKind.ImportDeclaration);
        // console.log(chalk.blueBright('IMPLTSSSS'), implementations);
        console.log(chalk.yellowBright('Types mapped'));
    }


    private static flagTypes(importDeclaration: ImportDeclaration): void {

    }

}
