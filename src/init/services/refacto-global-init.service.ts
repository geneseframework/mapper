import { ImportDeclaration, SourceFile } from 'ts-morph';
import { INIT } from '../const/init.const';

export class RefactoGlobalInitService {


    static async init(): Promise<void> {
        const globalInitSourceFile: SourceFile = INIT.project.addSourceFileAtPath(INIT.globalInitPath);
        this.getImportDeclaration('declarationInfos', globalInitSourceFile).setModuleSpecifier(INIT.declarationInfoPath);
        this.getImportDeclaration('generateInstance', globalInitSourceFile).setModuleSpecifier(INIT.instanceGeneratorPath);
        this.getImportDeclaration('config', globalInitSourceFile).setModuleSpecifier(INIT.generatedConfigPath);
        globalInitSourceFile.saveSync();
    }


    private static getImportDeclaration(importName: string, sourceFile: SourceFile): ImportDeclaration {
        return sourceFile.getImportDeclarations().find(i => i.getNamedImports().map(n => n.getName()).flat().includes(importName));
    }

}
