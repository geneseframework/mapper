import { ClassDeclaration, SwitchStatement, SyntaxKind } from 'ts-morph';
// import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { tab, tabs } from '../utils/native/strings.util';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../utils/ast/ast-class.util';
import { ensureDirAndCopy } from '../utils/file-system.util';
import { INIT } from './init.const';

export class InstanceGeneratorService {

    /**
     * Starts the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        await this.createInstanceGeneratorFile();
    }


    static createInstanceGeneratorIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        if (this.shouldCreateInstanceGenerator(classDeclaration, alreadyDone)) {
            INIT.addInstanceGenerator(new InstanceGenerator<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration)));
            alreadyDone.push(classDeclaration.getName());
        }
    }


    static shouldCreateInstanceGenerator(classDeclaration: ClassDeclaration, alreadyDone: string[]): boolean {
        return this.mayBeInstantiated(classDeclaration) && !alreadyDone.includes(classDeclaration.getName());
    }


    /**
     * Returns true if a class may be instantiated (no private constructor and not abstract)
     * @param classDeclaration
     * @private
     */
    private static mayBeInstantiated(classDeclaration: ClassDeclaration): boolean {
        return !hasPrivateConstructor(classDeclaration) && !classDeclaration.isAbstract();
    }


    /**
     * Creates the Instance Generator file
     * @private
     */
    private static async createInstanceGeneratorFile(): Promise<void> {
        const code: string = this.getInstanceGeneratorCode();
        INIT.instanceGeneratorSourceFile = INIT.project.createSourceFile(INIT.instanceGeneratorPath, code, {overwrite: true});
        INIT.instanceGeneratorSourceFile.saveSync();
        await this.setGlobalGenerateInstance();
    }


    /**
     * Sets the code of the Instance Generator file, without the generators themselves
     * @private
     */
    private static getInstanceGeneratorCode(): string {
        return `const generateInstance = async function(instanceGenerator) {\n` +
            `${tab}try {\n` +
            `${tabs(2)}let instance;\n` +
            `${tabs(2)}switch (instanceGenerator.id) {\n` +
            `}` +
            `${tabs(2)}return instance;\n` +
            `${tab}} catch(err) {\n` +
            `${tabs(2)}console.log('Impossible to map this instance. Did you exported it ?', err);\n` +
            `${tab}}\n` +
            `}\n` +
            `exports.generateInstance = generateInstance;\n`;
    }


    /**
     * Sets the generators for each exported class and saves the file.
     * @private
     */
    private static async setGlobalGenerateInstance(): Promise<void> {
        const switchStatement: SwitchStatement = INIT.instanceGeneratorSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
        let switchCode = `switch (instanceGenerator.id) {\n`;
        let importsCode = ''
        for (const instanceGenerator of INIT.instanceGenerators) {
            switchCode = `${switchCode}${tab}${this.switchClause(instanceGenerator)}`;
            importsCode = `${importsCode}${tab}${this.importsCode(instanceGenerator)}`;
        }
        switchCode = `${switchCode}${tab}default:\n` +
            `${tabs(2)}console.log('WARNING: No instance found for instanceGenerator id = ', instanceGenerator?.id);\n` +
            `${tabs(2)}instance = undefined;\n` +
            `}\n`;
        switchStatement.replaceWithText(switchCode);
        INIT.instanceGeneratorSourceFile.fixMissingImports();
        INIT.instanceGeneratorSourceFile.saveSync();
        const mjsPath = INIT.instanceGeneratorSourceFile.getFilePath().replace('.ts', '.js');
        await ensureDirAndCopy(INIT.instanceGeneratorSourceFile.getFilePath(), mjsPath);
        INIT.generateInstance = await require(mjsPath).generateInstance;
    }


    /**
     * Returns the code of a line importing on runtime the file corresponding to a given class
     * @param instanceGenerator
     * @private
     */
    private static importsCode(instanceGenerator: InstanceGenerator<any>): string {
        return `const ${instanceGenerator.typeName} = require('${instanceGenerator.typeDeclarationPath}').${instanceGenerator.typeName};\n`;
    }


    /**
     * Returns the code of the switch case corresponding to a given instance generator
     * @param instanceGenerator
     * @private
     */
    private static switchClause(instanceGenerator: InstanceGenerator<any>): string {
        return `case '${instanceGenerator.id}':\n` +
        `${tabs(2)}const ${instanceGenerator.typeName} = await require('${instanceGenerator.typeDeclarationPath}').${instanceGenerator.typeName};\n` +
        `${tabs(2)}instance = new ${instanceGenerator.typeName}${this.undefinedArguments(instanceGenerator)};\n` +
        `${tabs(2)}break;\n`;
    }


    /**
     * Returns the code corresponding to the parameters of the constructor of a given class
     * Each parameter is replaced by "undefined"
     * => Each instance will be created with the default initializers of the corresponding class
     * @param instanceGenerator
     * @private
     */
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
