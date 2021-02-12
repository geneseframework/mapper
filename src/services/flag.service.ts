import {
    CallExpression, Identifier,
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
import { InstanceGenerator } from '../models/instance-generator.model';

export class FlagService {

    static async init(): Promise<void> {
        console.log(chalk.yellowBright('Init mapping...'));
        // console.log(chalk.greenBright('INIT DECLARRRRR GLOB PROJJJJ'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
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
        const callExpressions: CallExpression[] = importDeclaration.getSourceFile()
            .getDescendantsOfKind(SyntaxKind.CallExpression)
            .filter(c => c.getExpression().getText() === 'Mapper.create');
        for (const callExpression of callExpressions) {
            console.log(chalk.magentaBright('FLAG TYPES propertyAccessExpressionssssss'), callExpression.getExpression().getText());
            // const mapParameterIdentifiers: Identifier[] = callExpressions.map(c => c.getArguments()[0] as Identifier);
            const typeName = callExpression.getArguments()[0].getText();
            console.log(chalk.magentaBright('FLAG TYPES typename'), typeName);
            GLOBAL.addInstanceGenerator(new InstanceGenerator<any>(typeName, importDeclaration.getSourceFile().getFilePath()));
        }
        console.log(chalk.blueBright('GLOBALLLL IGS'), GLOBAL.instanceGenerators);
    }

}
