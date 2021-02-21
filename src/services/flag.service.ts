import { ClassDeclaration, SwitchStatement, SyntaxKind } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { tab, tabs } from '../utils/strings.util';
import { flat } from '../utils/arrays.util';
import { getNumberOfConstructorArguments, hasPrivateConstructor } from '../utils/ast-class.util';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import { writeFile } from '../utils/file-system.util';

export class FlagService {

    static async init(): Promise<void> {
        GLOBAL.log('Init mapping...', '', !GLOBAL.debug);
        await this.createInstanceGeneratorFile();
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses()));
        for (const classDeclaration of classDeclarations) {
            if (this.mayBeInstantiated(classDeclaration)) {
                GLOBAL.addInstanceGenerator(new InstanceGenerator<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration)));
            }
        }
        // console.log(chalk.redBright('INIT FLAGGGGGGG'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
        // await this.getInstanceGeneratorCode();
        console.log(chalk.greenBright('INIT FLAGGGGGGG END'));
        GLOBAL.log('Types mapped', '', !GLOBAL.debug);
    }


    private static mayBeInstantiated(classDeclaration: ClassDeclaration): boolean {
        return !hasPrivateConstructor(classDeclaration) && !classDeclaration.isAbstract();
    }


    private static async createInstanceGeneratorFile(): Promise<void> {
        const nodeModuleMapperPath = `${GLOBAL.nodeModulePath}/dist/models/mapper.d.ts`;
        GLOBAL.project.addSourceFileAtPath(nodeModuleMapperPath);
        GLOBAL.mapperSourceFile = GLOBAL.project.getSourceFile(nodeModuleMapperPath);
        const code: string = this.getInstanceGeneratorCode();
        GLOBAL.project.createSourceFile(GLOBAL.instanceGeneratorPath, code, {overwrite: true});
        GLOBAL.project.addSourceFileAtPath(GLOBAL.instanceGeneratorPath);
        GLOBAL.instanceGeneratorSourceFile = GLOBAL.project.getSourceFile(GLOBAL.instanceGeneratorPath);
        console.log(chalk.blueBright('AFTER SAVESYNCCCCC'), GLOBAL.instanceGeneratorSourceFile.getFilePath());
        await this.setGlobalGenerateInstance();
        console.log(chalk.blueBright('AFTERR SETTTTTT'));
    }


    private static getInstanceGeneratorCode(): string {
        let code = `\nexport function generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {\n` +
            `${tab}let instance: any;\n` +
            `${tab}switch (instanceGenerator.id) {\n`;
            `}\n`;
        console.log(chalk.yellowBright('CODEEEEEEE'), code);
        return code;
    }

    // private static async generateInstanceGeneratorFile(): Promise<void> {
    //     const switchStatement : SwitchStatement = GLOBAL.generateInstancesSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
    //     switchStatement.removeClauses([0, switchStatement.getClauses().length]);
    //     let switchCode = `switch (instanceGenerator.id) {\n`;
    //     for (const instanceGenerator of GLOBAL.instanceGenerators) {
    //         switchCode = `${switchCode}${tab}${this.switchClause(instanceGenerator)}`;
    //     }
    //     switchCode = `${switchCode}${tab}default:
    //     console.log(chalk.yellow('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
    //     instance = undefined;
    // }`;
    //     switchStatement.replaceWithText(switchCode);
    //     GLOBAL.generateInstancesSourceFile.fixMissingImports();
    //     GLOBAL.generateInstancesSourceFile.saveSync();
    //     GLOBAL.generateInstance = await require(GLOBAL.generateInstancesSourceFile.getFilePath()).generateInstance;
    // }



    private static async setGlobalGenerateInstance(): Promise<void> {
        const switchStatement: SwitchStatement = GLOBAL.instanceGeneratorSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
        console.log(chalk.yellowBright('switchStatementtttt'), switchStatement.getText());
        let switchCode = `switch (instanceGenerator.id) {\n`;
        for (const instanceGenerator of GLOBAL.instanceGenerators) {
            switchCode = `${switchCode}${tabs(2)}${this.switchClause(instanceGenerator)}`;
        }
        switchCode = `${switchCode}${tab}default:\n` +
            `console.log(chalk.yellow('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);\n` +
            `instance = undefined;\n` +
            `}\n`;
        switchStatement.replaceWithText(switchCode);
        GLOBAL.instanceGeneratorSourceFile.fixMissingImports();
        GLOBAL.instanceGeneratorSourceFile.saveSync();
        // console.log(chalk.greenBright('generateInstanceGeneratorFileeeeee'), GLOBAL.instanceGeneratorSourceFile.getFilePath());
        // GLOBAL.generateInstance = await require(GLOBAL.instanceGeneratorSourceFile.getFilePath())?.generateInstance;
        console.log(chalk.yellowBright('AAAAAHHHHHH !!!!!!!!!'), GLOBAL.generateInstance);
        GLOBAL.generateInstance = await require(GLOBAL.instanceGeneratorSourceFile.getFilePath())?.generateInstance;
    }


    private static switchClause(instanceGenerator: InstanceGenerator<any>): string {
        return `case '${instanceGenerator.id}':
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
        return `${code})`;
    }

}
