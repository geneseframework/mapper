import { ClassDeclaration } from 'ts-morph';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../utils/ast/ast-class.util';
import { INIT } from '../const/init.const';
import { tab, tabs } from '../utils/native/strings.util';
import { InstanceGeneratorInit } from '../models/instance-generator-init.model';

export class InstanceGeneratorService {

    /**
     * Starts the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        await this.createInstanceGeneratorFile();
    }


    static createInstanceGeneratorIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        if (this.shouldCreateInstanceGenerator(classDeclaration, alreadyDone)) {
            INIT.addInstanceGenerator(new InstanceGeneratorInit<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration)));
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
    }


    /**
     * Sets the code of the Instance Generator file, without the generators themselves
     * @private
     */
    private static getInstanceGeneratorCode(): string {
        return `export const generateInstance = async function(instanceGenerator) {\n` +
            `${tab}try {\n` +
            `${tabs(2)}let instance;\n` +
            `${tabs(2)}switch (instanceGenerator.id) {\n` +
            `${this.switchCode()}` +
            `${tabs(2)}return instance;\n` +
            `${tab}} catch(err) {\n` +
            `${tabs(2)}console.log('Impossible to map this instance. Did you exported it ?', err);\n` +
            `${tab}}\n` +
            `}\n`;
    }


    /**
     * Sets the generators for each exported class and saves the file.
     * @private
     */
    private static switchCode(): string {
        let switchCode = ''
        for (const instanceGenerator of INIT.instanceGenerators) {
            switchCode = `${switchCode}${tab}${this.switchClause(instanceGenerator)}`;
        }
        switchCode = `${switchCode}${tab}default:\n` +
            `${tabs(2)}console.log('WARNING: No instance found for instanceGenerator id = ', instanceGenerator?.id);\n` +
            `${tabs(2)}instance = undefined;\n` +
            `}\n`;
        return switchCode;
    }


    /**
     * Returns the code of the switch case corresponding to a given instance generator
     * @param instanceGenerator
     * @private
     */
    private static switchClause(instanceGenerator: InstanceGeneratorInit<any>): string {
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
    private static undefinedArguments(instanceGenerator: InstanceGeneratorInit<any>): string {
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
