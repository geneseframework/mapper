import { ClassDeclaration, SwitchStatement, SyntaxKind } from 'ts-morph';
import { tab, tabs } from '../utils/native/strings.util';
import { hasPrivateConstructor } from '../utils/ast/ast-class.util';
import { ensureDirAndCopy } from '../utils/file-system.util';
import { INIT } from './init.const';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import * as chalk from 'chalk';
import { isClassInfo, isTypeInfo } from '../utils/declaration-info.util';
import { Property } from '../types/target/property.type';
import { ClassInfo } from '../models/declarations/class-info.model';
import { ClassOrInterfaceInfo } from '../types/class-or-interface-info.type';
import { GLOBAL } from '../const/global.const';
import { TypeInfo } from '../models/declarations/type-info.model';
import { addQuotes } from '../types/target/string/quoted.type';

export class DeclarationInfoGeneratorService {

    /**
     * Creates the Instance Generator file
     * @private
     */
    static async createDeclarationInfoFile(): Promise<void> {
        const code: string = this.getCode();
        INIT.declarationInfoSourceFile = INIT.project.createSourceFile(INIT.declarationInfoPath, code, {overwrite: true});
        INIT.declarationInfoSourceFile.saveSync();
        INIT.project.addSourceFileAtPath(INIT.declarationInfoPath);
        GLOBAL.declarationInfos = await require(INIT.declarationInfoPath).DECLARATION_INFOS;
    }


    static createDeclarationInfoIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        if (this.shouldCreateDeclarationInfo(classDeclaration, alreadyDone)) {
            // INIT.addDeclarationInfo(new DeclarationInfo<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration)));
            alreadyDone.push(classDeclaration.getName());
        }
    }


    private static shouldCreateDeclarationInfo(classDeclaration: ClassDeclaration, alreadyDone: string[]): boolean {
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
        return `const declarationInfos = [\n` +
            `${declarationInfosCode}` +
            `];\n` +
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
            `${tabs(2)}filePath: ${addQuotes(declarationInfo.filePath)},\n` +
            `${tabs(2)}kind: ${addQuotes(declarationInfo.kind)},\n` +
            `${tabs(2)}name: ${addQuotes(declarationInfo.name)},\n` +
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
        } else if (isTypeInfo(declarationInfo)) {
            return this.getSpecificTypeCode(declarationInfo);
        }
        return '';
    }


    private static getSpecificClassCode(classInfo: ClassInfo): string {
        let code = `${tabs(2)}hasPrivateConstructor: ${classInfo.hasPrivateConstructor},\n` +
        `${tabs(2)}indexableType: {\n` +
        `${tabs(3)}returnType: ${addQuotes(classInfo.indexableType?.returnType)},\n` +
        `${tabs(3)}type: ${addQuotes(classInfo.indexableType?.type)}\n` +
        `${tabs(2)}},\n` +
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
            `${tabs(3)}initializer: ${addQuotes(property.initializer)},\n` +
            `${tabs(3)}isRequired: ${property.isRequired},\n` +
            `${tabs(3)}name: ${addQuotes(property.name)},\n` +
            `${tabs(3)}type: ${addQuotes(property.type)}\n` +
            `${tabs(2)}}`;
        return code;
    }


    //TODO : Types with antiquotes
    private static getSpecificTypeCode(typeInfo: TypeInfo): string {
        let code = `${tabs(2)}type: ${addQuotes(typeInfo.type)},\n`;
        if (typeInfo.type.includes('TestIt')) {
        // if (typeInfo.type.includes('${')) {
            console.log(chalk.magentaBright('QUOTESSSSSS'), typeInfo);
            console.log(chalk.magentaBright('codeeeee'), code);
            // throw Error('zzzz')
        }
        // let code = `${tabs(2)}type: ${typeInfo.type?.toString()},\n`;
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
