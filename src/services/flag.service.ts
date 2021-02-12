import {
    CallExpression,
    ImportDeclaration,
    ImportSpecifier,
    SourceFileReferencingNodes,
    SwitchStatement,
    SyntaxKind
} from 'ts-morph';
import * as chalk from 'chalk';
import { GLOBAL } from '../const/global.const';
import { getImportSpecifier } from '../utils/ast.util';
import { InstanceGenerator } from '../models/instance-generator.model';
import { tabs } from '../utils/strings.util';

export class FlagService {

    static async init(): Promise<void> {
        console.log(chalk.yellowBright('Init mapping...'));
        // console.log(chalk.greenBright('INIT DECLARRRRR GLOB PROJJJJ'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
        const referencedNodes: SourceFileReferencingNodes[] = GLOBAL.nodeModuleMapper.getReferencingNodesInOtherSourceFiles();
        const referencedImportDeclarations: ImportDeclaration[] = referencedNodes.filter(r => GLOBAL.project.getSourceFiles().includes(r.getSourceFile())) as ImportDeclaration[];
        console.log(chalk.magentaBright('INIT DECLARRRRR REFFFFFS'), referencedImportDeclarations.map(r => r.getSourceFile().getBaseName()));
        for (const importDeclaration of referencedImportDeclarations) {
            console.log(chalk.blueBright('CREATE DECLARRRRR'), importDeclaration.getSourceFile().getBaseName());
            this.createInstanceGenerators(importDeclaration);
        }
        await this.generateInstanceGeneratorFile();
        console.log(chalk.yellowBright('Types mapped'));
    }


    private static createInstanceGenerators(importDeclaration: ImportDeclaration): void {
        const importSpecifier: ImportSpecifier = getImportSpecifier(importDeclaration);
        importSpecifier.getStructure();
        console.log(chalk.blueBright('IMPRT SPECCCCC'), importSpecifier.getStructure());
        const callExpressions: CallExpression[] = importDeclaration.getSourceFile()
            .getDescendantsOfKind(SyntaxKind.CallExpression)
            .filter(c => c.getExpression().getText() === 'Mapper.create');
        for (const callExpression of callExpressions) {
            console.log(chalk.magentaBright('FLAG TYPES propertyAccessExpressionssssss'), callExpression.getExpression().getText());
            const typeName = callExpression.getArguments()[0].getText();
            console.log(chalk.magentaBright('FLAG TYPES typename'), typeName);
            GLOBAL.addInstanceGenerator(new InstanceGenerator<any>(typeName, importDeclaration.getSourceFile().getFilePath()));
        }
        console.log(chalk.blueBright('GLOBALLLL IGS'), GLOBAL.instanceGenerators);
    }


    private static async generateInstanceGeneratorFile(): Promise<void> {
        const switchStatement : SwitchStatement = GLOBAL.generateInstancesSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
        console.log(chalk.greenBright('SWITCH CLAUSESSSSSSS'), switchStatement?.getClauses().map(c => c.getText()));
        switchStatement.removeClauses([0, switchStatement.getClauses().length]);
        let switchCode = `switch (instanceGenerator.id) {\n`;
        for (const instanceGenerator of GLOBAL.instanceGenerators) {
            switchCode = `${switchCode}${tabs(3)}${this.switchClause(switchStatement, instanceGenerator)}`;
        }
        switchCode = `${switchCode}${tabs(3)}default:\n
            console.log(chalk.yellowBright('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);\n
            instance = undefined;\n
            }\n`;
        switchStatement.replaceWithText(switchCode);
        console.log(chalk.redBright('SWITCH CLAUSESSSSSSS'), switchStatement?.getClauses().map(c => c.getText()));
        // await GLOBAL.generateInstancesSourceFile.save();
    }


    private static switchClause(switchStatement : SwitchStatement, instanceGenerator: InstanceGenerator<any>): string {
        return ` case 'Address':
            instance = new Address(undefined, undefined, undefined);
            break;`;
    }

}
