import { ClassDeclaration, SwitchStatement, SyntaxKind } from 'ts-morph';
import { tab, tabs } from '../utils/native/strings.util';
import { hasPrivateConstructor } from '../utils/ast/ast-class.util';
import { ensureDirAndCopy } from '../utils/file-system.util';
import { INIT } from './init.const';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import * as chalk from 'chalk';
import { isClassInfo } from '../utils/declaration-info.util';
import { IndexableType } from '../types/indexable-type.type';
import { Property } from '../types/target/property.type';
import { ClassInfo } from '../models/declarations/class-info.model';
import { ClassOrInterfaceInfo } from '../types/class-or-interface-info.type';
import { GLOBAL } from '../const/global.const';

export class DeclarationInfoGeneratorService {

    /**
     * Creates the Instance Generator file
     * @private
     */
    static async createDeclarationInfoFile(): Promise<void> {
        // console.log(chalk.yellowBright('START FILE CREATION DECL INFOOOOOOO'), INIT.declarationInfos);
        const code: string = this.getCode();
        console.log(chalk.cyanBright('CODE LGTHHHHH'), code?.length);
        INIT.declarationInfoSourceFile = INIT.project.createSourceFile(INIT.declarationInfoPath, code, {overwrite: true});
        INIT.declarationInfoSourceFile.saveSync();
        INIT.project.addSourceFileAtPath(INIT.declarationInfoPath);
        console.log(chalk.redBright('AWAIT REQUIREEEEEE code'), INIT.project.getSourceFile(INIT.declarationInfoPath).getFullText());
        const zzz = await require(INIT.declarationInfoPath).DECLARATION_INFOS;
        console.log(chalk.redBright('AWAIT REQUIREEEEEE AFTER SAVE SYNCCCCC'), zzz);
        GLOBAL.declarationInfos = zzz;
        // await this.setGlobalGenerateInstance();
    }


    static createDeclarationInfoIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        if (this.shouldCreateDeclarationInfo(classDeclaration, alreadyDone)) {
            // INIT.addDeclarationInfo(new DeclarationInfo<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration)));
            alreadyDone.push(classDeclaration.getName());
        }
    }


    static shouldCreateDeclarationInfo(classDeclaration: ClassDeclaration, alreadyDone: string[]): boolean {
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
     * Sets the code of the Instance Generator file, without the generators themselves
     * @private
     */
    private static getCode(): string {
        const declarationInfosCode: string = this.getDeclarationInfosCode();
        return `import { DeclarationInfo } from '../models/declarations/declaration-info.model';\n\n` +
            `const declarationInfos = [\n` +
            `${declarationInfosCode}` +
            `] as DeclarationInfo[];\n` +
            `exports.DECLARATION_INFOS = declarationInfos;`;
    }


    private static getDeclarationInfosCode(): string {
        let code = '';
        for (const declarationInfo of INIT.declarationInfos) {
            code = `${code}${this.getDeclarationInfoCode(declarationInfo)}\n`;
        }
        return code;
    }


    private static getDeclarationInfoCode(declarationInfo: DeclarationInfo): string {
        const typeParametersCode: string = this.getTypeParametersCode(declarationInfo);
        let code = `${tab}{\n` +
            `${tabs(2)}filePath: \`${declarationInfo.filePath}\`,\n` +
            `${tabs(2)}kind: \`${declarationInfo.kind}\`,\n` +
            `${tabs(2)}name: \`${declarationInfo.name}\`,\n` +
            `${tabs(2)}typeParameters: [\n` +
            `${tabs(2)}${typeParametersCode}` +
            `],\n` +
            `${this.getSpecificCode(declarationInfo)}` +
            `${tab}},`;
        return code;
    }


    private static getTypeParametersCode(declarationInfo: DeclarationInfo): string {
        let code = '';
        for (const typeParameter of declarationInfo.typeParameters) {
            code = `${code}\n`; // TODO
        }
        return code;
    }


    private static getSpecificCode(declarationInfo: DeclarationInfo): string {
        if (isClassInfo(declarationInfo)) {
            return this.getSpecificClassCode(declarationInfo);
        }
        return '';
    }


    private static getSpecificClassCode(classInfo: ClassInfo): string {
        let code = `${tabs(2)}hasPrivateConstructor: ${classInfo.hasPrivateConstructor},\n` +
        `${tabs(2)}indexableType: \`${classInfo.indexableType}\`,\n` +
        `${tabs(2)}isAbstract: ${classInfo.isAbstract},\n` +
        `${tabs(2)}numberOfConstructorArguments: ${classInfo.numberOfConstructorArguments},\n` +
        `${tabs(2)}properties: [\n` +
        `${this.getSpecificPropertiesCode(classInfo)}` +
        `${tabs(2)}],\n`;
        return code;
    }


    private static getSpecificPropertiesCode(classOrInterfaceInfo: ClassOrInterfaceInfo): string {
        let code = '';
        for (const property of classOrInterfaceInfo.properties) {
            code = `${code}${this.getSpecificPropertyCode(property)},\n`;
        }
        return code;
    }


    private static getSpecificPropertyCode(property: Property): string {
        let code = `${tabs(2)}{\n` +
            `${tabs(3)}initializer: \`${property.initializer}\`,\n` +
            `${tabs(3)}isRequired: ${property.isRequired},\n` +
            `${tabs(3)}name: \`${property.name}\`,\n` +
            `${tabs(3)}type: \`${property.type}\`\n` +
            `${tabs(2)}}`;
        return code;
    }


    /**
     * Sets the generators for each exported class and saves the file.
     * @private
     */
    private static async setGlobalGenerateInstance(): Promise<void> {
        const switchStatement: SwitchStatement = INIT.declarationInfoSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
        let switchCode = `switch (declarationInfo.id) {\n`;
        let importsCode = ''
        for (const declarationInfo of INIT.declarationInfos) {
            // switchCode = `${switchCode}${tab}${this.switchClause(declarationInfo)}`;
            // importsCode = `${importsCode}${tab}${this.importsCode(declarationInfo)}`;
        }
        switchCode = `${switchCode}${tab}default:\n` +
            `${tabs(2)}console.log('WARNING: No instance found for declarationInfo id = ', declarationInfo?.id);\n` +
            `${tabs(2)}instance = undefined;\n` +
            `}\n`;
        switchStatement.replaceWithText(switchCode);
        INIT.declarationInfoSourceFile.fixMissingImports();
        INIT.declarationInfoSourceFile.saveSync();
        const mjsPath = INIT.declarationInfoSourceFile.getFilePath().replace('.ts', '.js');
        await ensureDirAndCopy(INIT.declarationInfoSourceFile.getFilePath(), mjsPath);
        INIT.generateInstance = await require(mjsPath).generateInstance;
    }

}
