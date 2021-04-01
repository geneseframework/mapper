import { ClassDeclaration } from 'ts-morph';
import { hasPrivateConstructor } from '../utils/ast/ast-class.util';
import { INIT } from '../const/init.const';
import { EnumInfo } from '../../shared/models/declarations/enum-info.model';
import { TypeInfo } from '../../shared/models/declarations/type-info.model';
import { Property } from '../../shared/types/target/property.type';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { ClassInfo } from '../../shared/models/declarations/class-info.model';
import { ClassOrInterfaceInfo } from '../../shared/types/class-or-interface-info.type';
import { isClassInfo, isEnumInfo, isInterfaceInfo, isTypeInfo } from '../../shared/utils/declaration-info.util';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';
import { addQuotes } from '../../shared/types/quoted.type';
import { tab, tabs } from '../../shared/utils/strings.util';
import { commonjs } from '../../shared/const/commonjs.const';
import { includes } from '../../shared/utils/arrays.util';
import { throwWarning } from '../../shared/core/utils/functions/errors.util';

export class DeclarationInfoGeneratorService {

    /**
     * Creates the file containing the informations about the different declarations in the user's code
     * @private
     */
    static async createDeclarationInfoFile(): Promise<void> {
        const code: string = this.getCode();
        INIT.declarationInfoSourceFile = INIT.project.createSourceFile(INIT.declarationInfoPath, code, {overwrite: true});
        INIT.declarationInfoSourceFile.saveSync();
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
        return INIT.debug || commonjs ? `const declarationInfos = [\n` : `export var declarationInfos = [\n`;
    }


    private static exportsCode(): string {
        return INIT.debug || commonjs ? `exports.declarationInfos = declarationInfos;\n` : `\n`;
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
        return `${tabs(3)}{\n` +
            `${tabs(4)}initializer: ${addQuotes(property.initializer)},\n` +
            `${tabs(4)}isRequired: ${property.isRequired},\n` +
            `${tabs(4)}name: ${addQuotes(property.name)},\n` +
            `${tabs(4)}stringifiedType: ${addQuotes(property.type)}\n` +
            `${tabs(3)}}`;
    }


    //TODO : Types with antiquotes
    private static getSpecificTypeCode(typeInfo: TypeInfo): string {
        let code = `${tabs(2)}stringifiedType: ${addQuotes(typeInfo.stringifiedType)},\n`;
        // Add properties if type is interface-like
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
