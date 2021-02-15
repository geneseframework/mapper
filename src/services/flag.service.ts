import { ClassDeclaration, SwitchStatement, SyntaxKind } from 'ts-morph';
import * as chalk from 'chalk';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { tab } from '../utils/strings.util';
import { flat } from '../utils/arrays.util';
import { getNumberOfConstructorArguments, hasPrivateConstructor } from '../utils/ast-class.util';

export class FlagService {

    static async init(): Promise<void> {

        GLOBAL.log('Init mapping...', '', !GLOBAL.debug);
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses()));
        for (const classDeclaration of classDeclarations) {
            if (this.mayBeInstantiated(classDeclaration)) {
                GLOBAL.addInstanceGenerator(new InstanceGenerator<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration)));
            }
        }
        await this.generateInstanceGeneratorFile();
        GLOBAL.log('Types mapped', '', !GLOBAL.debug);
    }


    private static mayBeInstantiated(classDeclaration: ClassDeclaration): boolean {
        return !hasPrivateConstructor(classDeclaration) && !classDeclaration.isAbstract();
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
        GLOBAL.generateInstance = await require(GLOBAL.generateInstancesSourceFile.getFilePath()).generateInstance;
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
