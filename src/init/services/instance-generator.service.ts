import { ClassDeclaration } from 'ts-morph';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../utils/ast/ast-class.util';
import { INIT } from '../const/init.const';
import { InstanceGenerator } from '../../shared/models/instance-generator.model';
import { tab, tabs } from '../../shared/utils/strings.util';
import { commonjs } from '../../shared/const/commonjs.const';
import { throwWarning } from '../../shared/core/utils/functions/errors.util';

export class InstanceGeneratorService {

    /**
     * Starts the creation of the Instance Generator file
     */
    static async init(): Promise<void> {
        await this.createInstanceGeneratorFile();
    }


    static createInstanceGeneratorIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): string[] {
        if (this.shouldCreateInstanceGenerator(classDeclaration, alreadyDone)) {
            INIT.addInstanceGenerator(new InstanceGenerator<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration)));
            alreadyDone.push(classDeclaration.getName());
        }
        return alreadyDone;
    }


    static shouldCreateInstanceGenerator(classDeclaration: ClassDeclaration, alreadyDone: string[]): boolean {
        return this.mayBeInstantiated(classDeclaration) && !this.isAlreadyDone(classDeclaration.getName(), alreadyDone);
        // return this.mayBeInstantiated(classDeclaration) && !alreadyDone.includes(classDeclaration.getName());
    }


    /**
     * Returns true if a class may be instantiated (no private constructor and not abstract)
     * @param classDeclaration
     * @private
     */
    private static mayBeInstantiated(classDeclaration: ClassDeclaration): boolean {
        return !hasPrivateConstructor(classDeclaration) && !classDeclaration.isAbstract();
    }


    private static isAlreadyDone(className: string, alreadyDone: string[]): boolean {
        if (alreadyDone.includes(className)) {
            throwWarning(`multiple declarations '${className}'. @genese/mapper will not be able to know which one to choose.`);
            return true;
        }
        return false;
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
        // return this.getRequiresCode() +
        return this.declareConstCode() +
            // this.declareConstCode() +
            `${tab}try {\n` +
            `${tabs(2)}let instance;\n` +
            `${tabs(2)}switch (instanceGenerator.id) {\n` +
            `${this.switchCode()}` +
            `${tabs(2)}return instance;\n` +
            `${tab}} catch(err) {\n` +
            `${tabs(2)}console.log('Impossible to map this instance. Did you exported it ?', err);\n` +
            `${tab}}\n` +
            `}\n` +
            this.exportsCode();
    }


    private static getRequiresCode(): string {
        let requiresCode = ''
        for (const instanceGenerator of INIT.instanceGenerators) {
            requiresCode = `${requiresCode}const ${instanceGenerator.typeName} = require('${instanceGenerator.typeDeclarationPath}').${instanceGenerator.typeName};\n`;
        }
        return `${requiresCode}\n`;
    }


    private static declareConstCode(): string {
        return INIT.debug || commonjs ? `const generateInstance = function(instanceGenerator) {\n` : `export const generateInstance = function(instanceGenerator) {\n`;
    }


    private static exportsCode(): string {
        return INIT.debug || commonjs ? `exports.generateInstance = generateInstance;\n` : `\n`;
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
        switchCode = `${switchCode}${tabs(3)}default:\n` +
            `${tabs(4)}console.log('WARNING: No instance found for instanceGenerator id = ', instanceGenerator?.id);\n` +
            `${tabs(4)}instance = undefined;\n` +
            `${tabs(2)}}\n`;
        return switchCode;
    }


    /**
     * Returns the code of the switch case corresponding to a given instance generator
     * @param instanceGenerator
     * @private
     */
    private static switchClause(instanceGenerator: InstanceGenerator<any>): string {
        return `${tabs(2)}case '${instanceGenerator.id}':\n` +
            `${tabs(4)}const ${instanceGenerator.typeName} = require('${instanceGenerator.typeDeclarationPath}').${instanceGenerator.typeName};\n` +
            `${tabs(4)}instance = new ${instanceGenerator.typeName}${this.undefinedArguments(instanceGenerator)};\n` +
            `${tabs(4)}break;\n`;
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
