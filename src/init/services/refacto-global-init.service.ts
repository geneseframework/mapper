import { SourceFile, SyntaxKind, VariableStatement } from 'ts-morph';
import { INIT } from '../const/init.const';

/**
 * Modifies the global-init.service.js file
 */
export class RefactoGlobalInitService {

    /**
     * Modifies the global-init.service.js file by adding 'import' or 'require' statements which will be used to import the generated files into the GlobalInitService at runtime
     * (will use 'require' in NodeJs environments and 'import' in browser environments)
     */
    static async init(): Promise<void> {
        const globalInitSourceFile: SourceFile = INIT.project.addSourceFileAtPath(INIT.globalInitPath);
        this.setRequireStatements(globalInitSourceFile);
        globalInitSourceFile.saveSync();
    }

    /**
     * Sets the requires to the generated files
     * @param sourceFile    // The SourceFile corresponding to the file to import
     * @private
     */
    private static setRequireStatements(sourceFile: SourceFile): void {
        const requireVarStatements: VariableStatement[] = sourceFile.getVariableStatements().filter(v => !!v.getDescendantsOfKind(SyntaxKind.Identifier).find(d => d.getText() === 'require'));
        for (const requireVarStatement of requireVarStatements) {
            this.setRequireStatement(requireVarStatement, sourceFile);
        }

    }

    /**
     * Sets the require to a given generated file in case of a NodeJs environment
     * @param variableStatement // The name of the variable which will be used for the required file
     * @param sourceFile        // The SourceFile corresponding to the file to import
     * @private
     */
    private static setRequireStatement(variableStatement: VariableStatement, sourceFile: SourceFile): void {
        let text: string = variableStatement.getText();
        text = text.replace('../../dist', '../../../generated');
        variableStatement.replaceWithText(text);
    }

}
