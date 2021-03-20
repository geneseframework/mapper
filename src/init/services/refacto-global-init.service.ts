import { ImportDeclaration, SourceFile, SyntaxKind, VariableStatement } from 'ts-morph';
import { INIT } from '../const/init.const';
import * as chalk from 'chalk';
import { commonjs } from '../../shared/const/commonjs.const';

export class RefactoGlobalInitService {


    static async init(): Promise<void> {
        const globalInitSourceFile: SourceFile = INIT.project.addSourceFileAtPath(INIT.globalInitPath);
        if (commonjs) { // esnext
            this.setRequireStatements(globalInitSourceFile);
        } else {
            this.setImportDeclarations(globalInitSourceFile);
        }
        globalInitSourceFile.saveSync();
    }


    private static setImportDeclarations(sourceFile: SourceFile): void {
        this.setImportDeclaration('declarationInfos', sourceFile).setModuleSpecifier(INIT.declarationInfoPath);
        this.setImportDeclaration('generateInstance', sourceFile).setModuleSpecifier(INIT.instanceGeneratorPath);
        this.setImportDeclaration('config', sourceFile).setModuleSpecifier(INIT.generatedConfigPath);
    }


    private static setImportDeclaration(importName: string, sourceFile: SourceFile): ImportDeclaration {
        return sourceFile.getImportDeclarations().find(i => i.getNamedImports().map(n => n.getName()).flat().includes(importName));

    }


    private static setRequireStatements(sourceFile: SourceFile): void {
        const requireVarStatements: VariableStatement[] = sourceFile.getVariableStatements().filter(v => !!v.getDescendantsOfKind(SyntaxKind.Identifier).find(d => d.getText() === 'require'));
        for (const requireVarStatement of requireVarStatements) {
            this.setRequireStatement(requireVarStatement, sourceFile);
        }

    }


    private static setRequireStatement(variableStatement: VariableStatement, sourceFile: SourceFile): void {
        let text: string = variableStatement.getText();
        text = text.replace('../../dist', '../../../generated');
        variableStatement.replaceWithText(text);
    }

}
