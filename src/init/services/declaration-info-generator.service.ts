import { ClassDeclaration } from 'ts-morph';
import { hasPrivateConstructor } from '../utils/ast/ast-class.util';
import { INIT } from '../const/init.const';
import { tab, tabs } from '../utils/native/strings.util';
import { addQuotesInit } from '../types/quoted-init.type';
import { EnumInfo } from '../../shared/models/declarations/enum-info.model';
import { TypeInfo } from '../../shared/models/declarations/type-info.model';
import { Property } from '../../shared/types/target/property.type';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { ClassInfo } from '../../shared/models/declarations/class-info.model';
import { ClassOrInterfaceInfo } from '../../shared/types/class-or-interface-info.type';
import { isClassInfo, isEnumInfo, isInterfaceInfo, isTypeInfo } from '../../shared/utils/declaration-info.util';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';

export class DeclarationInfoGeneratorService {

    /**
     * Creates the Instance Generator file
     * @private
     */
    static async createDeclarationInfoFile(): Promise<void> {
        const code: string = this.getCode();
        INIT.declarationInfoSourceFile = INIT.project.createSourceFile(INIT.declarationInfoPath, code, {overwrite: true});
        INIT.declarationInfoSourceFile.saveSync();
    }


    static createDeclarationInfoIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        if (this.shouldCreateDeclarationInfo(classDeclaration, alreadyDone)) {
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
        return this.declareConstCode() +
            `${declarationInfosCode}` +
            `];\n` +
            this.exportsCode();
    }


    private static getDeclarationInfosCode(): string {
        let code = '';
        for (const declarationInfo of INIT.declarationInfos) {
            code = `${code}${this.getDeclarationInfoCode(declarationInfo)}\n`;
        }
        return code;
    }


    private static declareConstCode(): string {
        return INIT.debug ? `const declarationInfos = [\n` : `export var declarationInfos = [\n`;
    }


    private static exportsCode(): string {
        return INIT.debug ? `exports.declarationInfos = declarationInfos;\n` : `\n`;
    }


    private static getDeclarationInfoCode(declarationInfo: DeclarationInfo): string {
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
        } else if (isInterfaceInfo(declarationInfo)) {
            return this.getSpecificInterfaceCode(declarationInfo);
        } else if (isEnumInfo(declarationInfo)) {
            return this.getSpecificEnumCode(declarationInfo);
        } else if (isTypeInfo(declarationInfo)) {
            return this.getSpecificTypeCode(declarationInfo);
        }
        return '';
    }


    private static getSpecificClassCode(classInfo: ClassInfo): string {
        let code = `${tabs(2)}hasPrivateConstructor: ${classInfo.hasPrivateConstructor},\n` +
            `${this.getIndexableTypeCode(classInfo)}` +
            `${tabs(2)}isAbstract: ${classInfo.isAbstract},\n` +
            `${tabs(2)}numberOfConstructorArguments: ${classInfo.numberOfConstructorArguments},\n` +
            `${tabs(2)}properties: [\n` +
            `${this.getSpecificPropertiesCode(classInfo)}` +
            `${tabs(2)}],\n`;
        return code;
    }


    private static getSpecificInterfaceCode(interfaceInfo: InterfaceInfo): string {
        let code = `${this.getIndexableTypeCode(interfaceInfo)}` +
            `${tabs(2)}properties: [\n` +
            `${this.getSpecificPropertiesCode(interfaceInfo)}` +
            `${tabs(2)}],\n`;
        return code;
    }


    private static getIndexableTypeCode(classOrInterfaceInfo: ClassOrInterfaceInfo): string {
        if (!classOrInterfaceInfo.indexableType) {
            return '';
        } else {
            return `${tabs(2)}indexableType: {\n` +
                `${tabs(3)}returnType: ${addQuotesInit(classOrInterfaceInfo.indexableType?.returnType)},\n` +
                `${tabs(3)}type: ${addQuotesInit(classOrInterfaceInfo.indexableType?.type)}\n` +
                `${tabs(2)}},\n`;
        }
    }


    private static getSpecificPropertiesCode(classOrInterfaceInfo: ClassOrInterfaceInfo): string {
        let code = '';
        for (const property of classOrInterfaceInfo.properties) {
            code = `${code}${this.getSpecificPropertyCode(property)},\n`;
        }
        return code;
    }


    private static getSpecificPropertyCode(property: Property): string {
        return `${tabs(2)}{\n` +
            `${tabs(3)}initializer: ${addQuotesInit(property.initializer)},\n` +
            `${tabs(3)}isRequired: ${property.isRequired},\n` +
            `${tabs(3)}name: ${addQuotesInit(property.name)},\n` +
            `${tabs(3)}type: ${addQuotesInit(property.type)}\n` +
            `${tabs(2)}}`;
    }


    //TODO : Types with antiquotes
    private static getSpecificTypeCode(typeInfo: TypeInfo): string {
        let code = `${tabs(2)}type: ${addQuotesInit(typeInfo.type)},\n`;
        return code;
    }


    private static getSpecificEnumCode(enumInfo: EnumInfo): string {
        let code = `${tabs(2)}initializers: [\n`;
        for (const initializer of enumInfo.initializers) {
            code = `${code}${tabs(3)}${addQuotesInit(initializer)},\n`;
        }
        code = `${code}${tabs(2)}]\n`;
        return code;
    }

}
