import {
    CallExpression, ClassDeclaration,
    ImportDeclaration,
    ImportSpecifier,
    SourceFileReferencingNodes,
    SwitchStatement,
    SyntaxKind
} from 'ts-morph';
import * as chalk from 'chalk';
import { GLOBAL } from '../const/global.const';
import { getImportSpecifier, getNumberOfConstructorArguments, hasPrivateConstructor } from '../utils/ast.util';
import { InstanceGenerator } from '../models/instance-generator.model';
import { tab, tabs } from '../utils/strings.util';
import { flat } from '../utils/arrays.util';

export class FlagService {

    static async init(): Promise<void> {
        console.log(chalk.yellowBright('Init mapping...'));
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses()));
        for (const classDeclaration of classDeclarations) {
            if (!hasPrivateConstructor(classDeclaration)) {
                GLOBAL.addInstanceGenerator(new InstanceGenerator<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration)));
            }
        }
        console.log(chalk.greenBright('INIT DECLARRRRR GLOB PROJJJJ'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
        await this.generateInstanceGeneratorFile();
        console.log(chalk.yellowBright('Types mapped'));
    }


    // static async init(): Promise<void> {
    //     console.log(chalk.yellowBright('Init mapping...'));
    //     // console.log(chalk.greenBright('INIT DECLARRRRR GLOB PROJJJJ'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
    //     const referencedNodes: SourceFileReferencingNodes[] = GLOBAL.nodeModuleMapper.getReferencingNodesInOtherSourceFiles();
    //     const referencedImportDeclarations: ImportDeclaration[] = referencedNodes.filter(r => GLOBAL.project.getSourceFiles().includes(r.getSourceFile())) as ImportDeclaration[];
    //     console.log(chalk.magentaBright('INIT DECLARRRRR REFFFFFS'), referencedImportDeclarations.map(r => r.getSourceFile().getBaseName()));
    //     for (const importDeclaration of referencedImportDeclarations) {
    //         console.log(chalk.blueBright('CREATE DECLARRRRR'), importDeclaration.getSourceFile().getBaseName());
    //         this.createInstanceGenerators(importDeclaration);
    //     }
    //     await this.generateInstanceGeneratorFile();
    //     console.log(chalk.yellowBright('Types mapped'));
    // }


    // private static createInstanceGenerators(importDeclaration: ImportDeclaration): void {
    //     const importSpecifier: ImportSpecifier = getImportSpecifier(importDeclaration);
    //     importSpecifier.getStructure();
    //     console.log(chalk.blueBright('IMPRT SPECCCCC'), importSpecifier.getStructure());
    //     const callExpressions: CallExpression[] = importDeclaration.getSourceFile()
    //         .getDescendantsOfKind(SyntaxKind.CallExpression)
    //         .filter(c => c.getExpression().getText() === 'Mapper.create');
    //     for (const callExpression of callExpressions) {
    //         console.log(chalk.magentaBright('FLAG TYPES propertyAccessExpressionssssss'), callExpression.getExpression().getText());
    //         const typeName = callExpression.getArguments()[0].getText();
    //         console.log(chalk.magentaBright('FLAG TYPES typename'), typeName);
    //         GLOBAL.addInstanceGenerator(new InstanceGenerator<any>(typeName, importDeclaration.getSourceFile().getFilePath()));
    //     }
    //     console.log(chalk.blueBright('GLOBALLLL IGS'), GLOBAL.instanceGenerators);
    // }


    private static async generateInstanceGeneratorFile(): Promise<void> {
        const switchStatement : SwitchStatement = GLOBAL.generateInstancesSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
        // console.log(chalk.greenBright('SWITCH CLAUSESSSSSSS'), switchStatement?.getClauses().map(c => c.getText()));
        switchStatement.removeClauses([0, switchStatement.getClauses().length]);
        let switchCode = `switch (instanceGenerator.id) {\n`;
        for (const instanceGenerator of GLOBAL.instanceGenerators) {
            switchCode = `${switchCode}${tab}${this.switchClause(instanceGenerator)}`;
        }
        switchCode = `${switchCode}${tab}default:
        console.log(chalk.yellowBright('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
        instance = undefined;
    }`;
        switchStatement.replaceWithText(switchCode);
        console.log(chalk.redBright('SWITCH CLAUSESSSSSSS'), switchStatement?.getClauses().map(c => c.getText()));
        GLOBAL.generateInstancesSourceFile.fixMissingImports();
        await GLOBAL.generateInstancesSourceFile.save();
    }


    private static switchClause(instanceGenerator: InstanceGenerator<any>): string {
        return `case '${instanceGenerator.typeName}':
        instance = new ${instanceGenerator.typeName}${this.undefinedArguments(instanceGenerator)};
        break;\n`;
    }


    private static undefinedArguments(instanceGenerator: InstanceGenerator<any>): string {
        let code: string = '(';
        if (instanceGenerator.numberOfConstructorArguments > 0) {
            for (let i = 0; i < instanceGenerator.numberOfConstructorArguments; i++) {
                code = `${code}undefined, `;
            }
            code = code.slice(0, -2);
        }
        code = `${code})`;
        return code;
    }

}
