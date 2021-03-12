import { ClassDeclaration } from 'ts-morph';
import { hasPrivateConstructor } from '../utils/ast/ast-class.util';
import { INIT } from '../const/init.const';
import { tab, tabs } from '../utils/native/strings.util';
import { DeclarationInfoInit } from '../models/declarations/declaration-info.model';
import { isClassInfoInit, isEnumInfoInit, isInterfaceInfoInit, isTypeInfoInit } from '../utils/declaration-info.util';
import { addQuotesInit } from '../types/quoted-init.type';
import { InterfaceInfoInit } from '../models/declarations/interface-info.model';
import { ClassInfoInit } from '../models/declarations/class-info.model';
import { PropertyInit } from '../types/property.type';
import { TypeInfoInit } from '../models/declarations/type-info.model';
import { EnumInfoInit } from '../models/declarations/enum-info.model';
import { ClassOrInterfaceInfoInit } from '../types/class-or-interface-info-init.type';
import * as chalk from 'chalk';

export class DeclarationInfoGeneratorService {

    /**
     * Creates the Instance Generator file
     * @private
     */
    static async createDeclarationInfoFile(): Promise<void> {
        const code: string = this.getCode();
        console.log(chalk.cyanBright('CODE DECLARATION INFOOOO'), code);
        console.log(chalk.magentaBright('INIT.declarationInfoPathhhhhh'), INIT.declarationInfoPath);
        INIT.declarationInfoSourceFile = INIT.project.createSourceFile(INIT.declarationInfoPath, code, {overwrite: true});
        INIT.declarationInfoSourceFile.saveSync();
        INIT.project.addSourceFileAtPath(INIT.declarationInfoPath);
        // const jsPath = INIT.declarationInfoSourceFile.getFilePath().replace('.ts', '.js');
        // await ensureDirAndCopy(INIT.declarationInfoSourceFile.getFilePath(), jsPath);
        // GLOBAL.declarationInfos = await require(INIT.declarationInfoPath).DECLARATION_INFOS;
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
        return `export const declarationInfos = [\n` +
            `${declarationInfosCode}` +
            `];\n`;
    }


    private static getDeclarationInfosCode(): string {
        let code = '';
        for (const declarationInfo of INIT.declarationInfos) {
            code = `${code}${this.getDeclarationInfoCode(declarationInfo)}\n`;
        }
        return code;
    }


    private static getDeclarationInfoCode(declarationInfo: DeclarationInfoInit): string {
        const typeParametersCode: string = this.getTypeParametersCode(declarationInfo);
        let code = `${tab}{\n` +
            `${tabs(2)}filePath: ${addQuotesInit(declarationInfo.filePath)},\n` +
            `${tabs(2)}kind: ${addQuotesInit(declarationInfo.kind)},\n` +
            `${tabs(2)}name: ${addQuotesInit(declarationInfo.name)},\n` +
            `${tabs(2)}typeParameters: [\n` +
            `${tabs(2)}${typeParametersCode}` +
            `],\n` +
            `${this.getSpecificCode(declarationInfo)}` +
            `${tab}},`;
        return code;
    }


    private static getTypeParametersCode(declarationInfo: DeclarationInfoInit): string {
        let code = '';
        for (const typeParameter of declarationInfo.typeParameters) {
            code = `${code}\n`; // TODO
        }
        return code;
    }


    private static getSpecificCode(declarationInfo: DeclarationInfoInit): string {
        if (isClassInfoInit(declarationInfo)) {
            return this.getSpecificClassCode(declarationInfo);
        } else if (isInterfaceInfoInit(declarationInfo)) {
            return this.getSpecificInterfaceCode(declarationInfo);
        } else if (isEnumInfoInit(declarationInfo)) {
            return this.getSpecificEnumCode(declarationInfo);
        } else if (isTypeInfoInit(declarationInfo)) {
            return this.getSpecificTypeCode(declarationInfo);
        }
        return '';
    }


    private static getSpecificClassCode(classInfo: ClassInfoInit): string {
        let code = `${tabs(2)}hasPrivateConstructor: ${classInfo.hasPrivateConstructor},\n` +
            `${this.getIndexableTypeCode(classInfo)}` +
            `${tabs(2)}isAbstract: ${classInfo.isAbstract},\n` +
            `${tabs(2)}numberOfConstructorArguments: ${classInfo.numberOfConstructorArguments},\n` +
            `${tabs(2)}properties: [\n` +
            `${this.getSpecificPropertiesCode(classInfo)}` +
            `${tabs(2)}],\n`;
        return code;
    }


    private static getSpecificInterfaceCode(interfaceInfo: InterfaceInfoInit): string {
        let code = `${this.getIndexableTypeCode(interfaceInfo)}` +
            `${tabs(2)}properties: [\n` +
            `${this.getSpecificPropertiesCode(interfaceInfo)}` +
            `${tabs(2)}],\n`;
        return code;
    }


    private static getIndexableTypeCode(classOrInterfaceInfo: ClassOrInterfaceInfoInit): string {
        if (!classOrInterfaceInfo.indexableType) {
            return '';
        } else {
            return `${tabs(2)}indexableType: {\n` +
                `${tabs(3)}returnType: ${addQuotesInit(classOrInterfaceInfo.indexableType?.returnType)},\n` +
                `${tabs(3)}type: ${addQuotesInit(classOrInterfaceInfo.indexableType?.type)}\n` +
                `${tabs(2)}},\n`;
        }
    }


    private static getSpecificPropertiesCode(classOrInterfaceInfo: ClassOrInterfaceInfoInit): string {
        let code = '';
        for (const property of classOrInterfaceInfo.properties) {
            code = `${code}${this.getSpecificPropertyCode(property)},\n`;
        }
        return code;
    }


    private static getSpecificPropertyCode(property: PropertyInit): string {
        let code = `${tabs(2)}{\n` +
            `${tabs(3)}initializer: ${addQuotesInit(property.initializer)},\n` +
            `${tabs(3)}isRequired: ${property.isRequired},\n` +
            `${tabs(3)}name: ${addQuotesInit(property.name)},\n` +
            `${tabs(3)}type: ${addQuotesInit(property.type)}\n` +
            `${tabs(2)}}`;
        return code;
    }


    //TODO : Types with antiquotes
    private static getSpecificTypeCode(typeInfo: TypeInfoInit): string {
        let code = `${tabs(2)}type: ${addQuotesInit(typeInfo.type)},\n`;
        return code;
    }


    private static getSpecificEnumCode(enumInfo: EnumInfoInit): string {
        let code = `${tabs(2)}initializers: [\n`;
        for (const initializer of enumInfo.initializers) {
            code = `${code}${tabs(3)}${addQuotesInit(initializer)},\n`;
        }
        code = `${code}${tabs(2)}]\n`;
        return code;
    }

}
