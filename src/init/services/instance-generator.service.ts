import { ClassDeclaration } from 'ts-morph';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../utils/ast/ast-class.util';
import { INIT } from '../const/init.const';
import { InstanceGenerator } from '../../shared/models/instance-generator.model';
import { tab, tabs } from '../../shared/core/utils/primitives/strings.util';
import { throwWarning } from '../../shared/core/utils/functions/errors.util';

/**
 * Generates the instance-generator.js file which ill be used by the create() method to instantiate new objects
 */
export class InstanceGeneratorService {

    /**
     * Generates the instance-generator.js file
     */
    static async init(): Promise<void> {
        await this.createInstanceGeneratorFile();
    }

    /**
     * Adds a new element of the switch clauses of the generateInstance() method in the instance-generator.js file
     * @param classDeclaration      // The ClassDeclaration corresponding to the switch clause to add
     * @param alreadyDone           // Checks if user's code has multiple declarations with the same name
     */
    static createInstanceGeneratorIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): string[] {
        if (this.shouldCreateInstanceGenerator(classDeclaration, alreadyDone)) {
            INIT.addInstanceGenerator(new InstanceGenerator<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration)));
            alreadyDone.push(classDeclaration.getName());
        }
        return alreadyDone;
    }

    /**
     * Checks if a class may be instantiated and if this class was not already added to the switch clauses of the generateInstance() method
     * @param classDeclaration      // The ClassDeclaration corresponding to the switch clause to add
     * @param alreadyDone           // Checks if user's code has multiple declarations with the same name
     */
    static shouldCreateInstanceGenerator(classDeclaration: ClassDeclaration, alreadyDone: string[]): boolean {
        return this.mayBeInstantiated(classDeclaration) && !this.isAlreadyDone(classDeclaration.getName(), alreadyDone);
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
     * Checks if user's code has multiple declarations with the same name
     * @param className     // The className to check
     * @param alreadyDone   // The names already added in the switch clauses
     * @private
     */
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
        return this.declareConstCode() +
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

    /**
     * Returns the first line of the instance-generator.js file :
     * - In NodeJs environment: 'const generateInstance = function(instanceGenerator) {' (export keyword is not allowed)
     * - In browser environment: 'export const generateInstance = function(instanceGenerator) {' (export keyword is allowed)
     * @private
     */
    private static declareConstCode(): string {
        return `const generateInstance = function(instanceGenerator) {\n`;
    }

    /**
     * Returns the last line of the instance-generator.js file :
     * - In NodeJs environment: 'exports.generateInstance = generateInstance;' (usage of the exports.xxx syntax)
     * - In browser environment: empty line
     * @private
     */
    private static exportsCode(): string {
        return `exports.generateInstance = generateInstance;\n`;
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
