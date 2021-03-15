import { ImportDeclaration, SourceFile } from 'ts-morph';
import { INIT } from '../const/init.const';
import * as chalk from 'chalk';

export class RefactoGlobalInitService {

    static async init(): Promise<void> {
        const globalInitSourceFile: SourceFile = INIT.project.getSourceFile(INIT.globalInitPath);
        console.log(chalk.magentaBright('GLOB PATHHHHHH'), globalInitSourceFile.getBaseName());
        console.log(chalk.magentaBright('GLOB INIT.declarationInfoPath'), INIT.declarationInfoPath);
        console.log(chalk.magentaBright('GLOB INIT.instanceGeneratorPath'), INIT.instanceGeneratorPath);
        this.getImportDeclaration('declarationInfos', globalInitSourceFile).setModuleSpecifier(INIT.declarationInfoPath);
        this.getImportDeclaration('generateInstance', globalInitSourceFile).setModuleSpecifier(INIT.instanceGeneratorPath);
        // globalInitSourceFile.saveSync();
    }


    private static getImportDeclaration(importName: string, sourceFile: SourceFile): ImportDeclaration {
        return sourceFile.getImportDeclarations().find(i => i.getNamedImports().map(n => n.getName()).includes(importName));
    }

}
