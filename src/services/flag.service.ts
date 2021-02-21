import { ClassDeclaration, SwitchStatement, SyntaxKind } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { tab } from '../utils/strings.util';
import { flat } from '../utils/arrays.util';
import { getNumberOfConstructorArguments, hasPrivateConstructor } from '../utils/ast-class.util';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import { writeFile } from '../utils/file-system.util';

export class FlagService {

    static async init(): Promise<void> {
        await this.createInstanceGeneratorFile();
        GLOBAL.log('Init mapping...', '', !GLOBAL.debug);
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses()));
        for (const classDeclaration of classDeclarations) {
            if (this.mayBeInstantiated(classDeclaration)) {
                GLOBAL.addInstanceGenerator(new InstanceGenerator<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration)));
            }
        }
        console.log(chalk.redBright('INIT FLAGGGGGGG'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()));
        await this.generateInstanceGeneratorFile();
        console.log(chalk.greenBright('INIT FLAGGGGGGG END'));
        GLOBAL.log('Types mapped', '', !GLOBAL.debug);
    }


    private static mayBeInstantiated(classDeclaration: ClassDeclaration): boolean {
        return !hasPrivateConstructor(classDeclaration) && !classDeclaration.isAbstract();
    }


    private static async createInstanceGeneratorFile(): Promise<void> {
        const nodeModulePath = GLOBAL.debug ? GLOBAL.projectPath : `${GLOBAL.projectPath}/node_modules/@genese/mapper`;
        const nodeModuleMapperPath = `${nodeModulePath}/dist/models/mapper.d.ts`;
        // const nodeModuleMapperPath = `${GLOBAL.projectPath}/node_modules/@genese/mapper/dist/models/mapper.ts`;
        console.log(chalk.greenBright('nodeModulePathhhh'), nodeModulePath);
        console.log(chalk.greenBright('nodeModuleMapperPathhhhh'), nodeModuleMapperPath);
        GLOBAL.project.addSourceFileAtPath(nodeModuleMapperPath);
        GLOBAL.nodeModuleMapper = GLOBAL.project.getSourceFile(nodeModuleMapperPath);
        const generateInstancesPath = `${nodeModulePath}/dist/utils/generate-instance.ts`;
        console.log(chalk.magentaBright(' generateInstancesPathhhhhhh'), generateInstancesPath);
        await writeFile(generateInstancesPath, 'zzz');
        // throw Error ('ENDDDDD')
        // TODO : remove hard code
        // const generateInstancesPath = `${GLOBAL.projectPath}/node_modules/genese/@genese-mapper/create-instance.ts`;
        GLOBAL.project.addSourceFileAtPath(generateInstancesPath);
        GLOBAL.generateInstancesSourceFile = GLOBAL.project.getSourceFile(generateInstancesPath);
        console.log(chalk.cyanBright('GENERATOR PATHHHH'), GLOBAL.generateInstancesSourceFile.getFullText());
    }


    private static async generateInstanceGeneratorFile(): Promise<void> {
        const switchStatement : SwitchStatement = GLOBAL.generateInstancesSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
        switchStatement.removeClauses([0, switchStatement.getClauses().length]);
        let switchCode = `switch (instanceGenerator.id) {\n`;
        for (const instanceGenerator of GLOBAL.instanceGenerators) {
            switchCode = `${switchCode}${tab}${this.switchClause(instanceGenerator)}`;
        }
        switchCode = `${switchCode}${tab}default:
        console.log(chalk.yellow('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
        instance = undefined;
    }`;
        switchStatement.replaceWithText(switchCode);
        GLOBAL.generateInstancesSourceFile.fixMissingImports();
        GLOBAL.generateInstancesSourceFile.saveSync();
        console.log(chalk.greenBright('generateInstanceGeneratorFileeeeee'), GLOBAL.generateInstancesSourceFile.getFilePath());
        GLOBAL.generateInstance = await require(GLOBAL.generateInstancesSourceFile.getFilePath())?.generateInstance;
        console.log(chalk.yellowBright('AAAAAHHHHHH !!!!!!!!!'), GLOBAL.generateInstance);
        GLOBAL.generateInstance = await require(GLOBAL.generateInstancesSourceFile.getFilePath())?.generateInstance;
        console.log(chalk.redBright('AAAAAHHHHHH GLOBAL.generateInstanceeeeeeee'), GLOBAL.generateInstance);
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
