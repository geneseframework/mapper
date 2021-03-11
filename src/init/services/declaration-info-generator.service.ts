import { ClassDeclaration } from 'ts-morph';
import { tab, tabs } from '../../create/utils/native/strings.util';
import { hasPrivateConstructor } from '../utils/ast/ast-class.util';
import { ensureDirAndCopy } from '../../create/utils/file-system.util';
import { INIT } from '../const/init.const';
import { DeclarationInfo } from '../../create/models/declarations/declaration-info.model';
import { isClassInfo, isEnumInfo, isInterfaceInfo, isTypeInfo } from '../../create/utils/declaration-info.util';
import { Property } from '../../create/types/target/property.type';
import { ClassInfo } from '../../create/models/declarations/class-info.model';
import { ClassOrInterfaceInfo } from '../../create/types/class-or-interface-info.type';
import { GLOBAL } from '../../create/const/global.const';
import { TypeInfo } from '../../create/models/declarations/type-info.model';
import { addQuotes } from '../../create/types/target/string/quoted.type';
import { InterfaceInfo } from '../../create/models/declarations/interface-info.model';
import { EnumInfo } from '../../create/models/declarations/enum-info.model';

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
        const jsPath = INIT.declarationInfoSourceFile.getFilePath().replace('.ts', '.js');
        await ensureDirAndCopy(INIT.declarationInfoSourceFile.getFilePath(), jsPath);
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
                `${tabs(3)}returnType: ${addQuotes(classOrInterfaceInfo.indexableType?.returnType)},\n` +
                `${tabs(3)}type: ${addQuotes(classOrInterfaceInfo.indexableType?.type)}\n` +
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
        return code;
    }


    private static getSpecificEnumCode(enumInfo: EnumInfo): string {
        let code = `${tabs(2)}initializers: [\n`;
        for (const initializer of enumInfo.initializers) {
            code = `${code}${tabs(3)}${addQuotes(initializer)},\n`;
        }
        code = `${code}${tabs(2)}]\n`;
        return code;
    }

}
