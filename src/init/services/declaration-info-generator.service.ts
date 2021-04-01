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

/**
 * Generates the declaration-infos.js file, which will be used by the create() method to find the info about the instance or the object to create
 */
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
     * Sets the code of the instance-generator.js file
     * @private
     */
    private static getCode(): string {
        const declarationInfosCode: string = this.getDeclarationInfosCode();
        return this.declareConstCode() +
            `${declarationInfosCode}` +
            `];\n` +
            this.exportsCode();
    }

    /**
     * Returns the code of all the elements of the array 'declarationInfos'
     * @private
     */
    private static getDeclarationInfosCode(): string {
        let code = '';
        for (const declarationInfo of INIT.declarationInfos) {
            code = `${code}${this.getDeclarationInfoCode(declarationInfo)}\n`;
        }
        return code;
    }

    /**
     * Returns the first line of the declaration-info.js file :
     * - In NodeJs environment: 'const declarationInfos = [' (export keyword is not allowed)
     * - In browser environment: 'export var declarationInfos = [' (export keyword is allowed)
     * @private
     */
    private static declareConstCode(): string {
        return `const declarationInfos = [\n`;
    }

    /**
     * Returns the last line of the declaration-info.js file :
     * - In NodeJs environment: 'exports.declarationInfos = declarationInfos;' (usage of the exports.xxx syntax)
     * - In browser environment: empty line
     * @private
     */
    private static exportsCode(): string {
        return `exports.declarationInfos = declarationInfos;\n`;
    }

    /**
     * Returns the code of one element of the array 'declarationInfos'
     * @private
     */
    private static getDeclarationInfoCode(declarationInfo: DeclarationInfo): string {
        const typeParametersCode: string = this.getTypeParametersCode(declarationInfo);
        return `${tab}{\n` +
            `${tabs(2)}filePath: ${addQuotes(declarationInfo.filePath)},\n` +
            `${tabs(2)}kind: ${addQuotes(declarationInfo.kind)},\n` +
            `${tabs(2)}name: ${addQuotes(declarationInfo.name)},\n` +
            `${tabs(2)}typeParameters: [\n` +
            `${tabs(2)}${typeParametersCode}` +
            `],\n` +
            `${this.getSpecificCode(declarationInfo)}` +
            `${tab}},`;
    }

    /**
     * // TODO
     * Returns the type parameters for generic types
     * @param declarationInfo
     * @private
     */
    private static getTypeParametersCode(declarationInfo: DeclarationInfo): string {
        let code = '';
        for (const typeParameter of declarationInfo.typeParameters) {
            code = `${code}\n`; // TODO: finish to implement
        }
        return code;
    }

    /**
     * Returns the code specific to classes, interfaces, enums or types
     * @param declarationInfo   // The declarationInfo corresponding to the code to write
     * @private
     */
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

    /**
     * Returns the code specific to classes
     * @param classInfo   // The classInfo corresponding to the code to write
     * @private
     */
    private static getSpecificClassCode(classInfo: ClassInfo): string {
        return `${tabs(2)}hasPrivateConstructor: ${classInfo.hasPrivateConstructor},\n` +
            `${this.getIndexableTypeCode(classInfo)}` +
            `${tabs(2)}isAbstract: ${classInfo.isAbstract},\n` +
            `${tabs(2)}numberOfConstructorArguments: ${classInfo.numberOfConstructorArguments},\n` +
            `${tabs(2)}properties: [\n` +
            `${this.getSpecificPropertiesCode(classInfo)}` +
            `${tabs(2)}],\n`;
    }

    /**
     * Returns the code specific to interfaces
     * @param interfaceInfo   // The interfaceInfo corresponding to the code to write
     * @private
     */
    private static getSpecificInterfaceCode(interfaceInfo: InterfaceInfo): string {
        return `${this.getIndexableTypeCode(interfaceInfo)}` +
            `${tabs(2)}properties: [\n` +
            `${this.getSpecificPropertiesCode(interfaceInfo)}` +
            `${tabs(2)}],\n`;
    }

    /**
     * Returns the code specific to indexable types in classes and interfaces
     * @param classOrInterfaceInfo   // The classOrInterfaceInfo corresponding to the code to write
     * @private
     */
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

    /**
     * Returns the code specific to properties in classes and interfaces
     * @param classOrInterfaceInfo   // The classOrInterfaceInfo corresponding to the code to write
     * @private
     */
    private static getSpecificPropertiesCode(classOrInterfaceInfo: ClassOrInterfaceInfo): string {
        let code = '';
        for (const property of classOrInterfaceInfo.properties) {
            code = `${code}${this.getSpecificPropertyCode(property)},\n`;
        }
        return code;
    }

    /**
     * Returns the code specific to a given property in classes and interfaces
     * @param property   // The property info corresponding to the code to write
     * @private
     */
    private static getSpecificPropertyCode(property: Property): string {
        return `${tabs(3)}{\n` +
            `${tabs(4)}initializer: ${addQuotes(property.initializer)},\n` +
            `${tabs(4)}isRequired: ${property.isRequired},\n` +
            `${tabs(4)}name: ${addQuotes(property.name)},\n` +
            `${tabs(4)}stringifiedType: ${addQuotes(property.stringifiedType)}\n` +
            `${tabs(3)}}`;
    }

    //TODO : Types with anti-quotes
    /**
     * Returns the code specific to types
     * @param typeInfo   // The typeInfo corresponding to the code to write
     * @private
     */
    private static getSpecificTypeCode(typeInfo: TypeInfo): string {
        return `${tabs(2)}stringifiedType: ${addQuotes(typeInfo.stringifiedType)},\n`;
    }

    /**
     * Returns the code specific to enums
     * @param enumInfo   // The enumInfo corresponding to the code to write
     * @private
     */
    private static getSpecificEnumCode(enumInfo: EnumInfo): string {
        let code = `${tabs(2)}initializers: [\n`;
        for (const initializer of enumInfo.initializers) {
            code = `${code}${tabs(3)}${addQuotes(initializer)},\n`;
        }
        code = `${code}${tabs(2)}]\n`;
        return code;
    }

}
