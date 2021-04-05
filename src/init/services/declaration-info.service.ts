import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../utils/ast/ast-class.util';
import { declarationType, genericParameters } from '../utils/ast/ast-declaration.util';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import { INIT } from '../const/init.const';
import { DeclarationInfoGeneratorService } from './declaration-info-generator.service';
import { InstanceGeneratorService } from './instance-generator.service';
import { getIndexableType } from '../utils/ast/ast-indexes.util';
import { EnumInfo } from '../../shared/models/declarations/enum-info.model';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { ClassInfo } from '../../shared/models/declarations/class-info.model';
import { TypeInfo } from '../../shared/models/declarations/type-info.model';
import { removeQuotes } from '../../shared/types/quoted.type';
import { hasTypeLiteral } from '../utils/ast/ast-type-literal.util';
import { HierarchicTypeLiteralService } from './hierarchic-type-literal.service';
import { getPropertiesFromClassOrInterface } from '../utils/declaration-info-get-properties.util';
import { flat } from '@genese/core';

/**
 * Generates the declaration-infos.js file from the user's project
 */
export class DeclarationInfoService {

    /**
     * Starts the init() process
     * - Generates the declaration-infos.js file which will be used to find info about all the declarations of the user's project (classes, interfaces, enums, types)
     * - Generates the instance-generator.js file which will be used to instantiate new objects when the create() method is about classes
     */
    static async init(): Promise<void> {
        await this.setClassInfos();
        this.setEnumInfos();
        this.setInterfaceInfos();
        this.setTypeInfos();
        await DeclarationInfoGeneratorService.createDeclarationInfoFile();
    }

    /**
     * Adds classInfos to GLOBAL declarationInfos array by parsing the declarations of the classes of the user's project
     * @private
     */
    private static async setClassInfos(): Promise<void> {
        const classDeclarations: ClassDeclaration[] = INIT.project.getSourceFiles().map(s => s.getClasses()).flat();
        const alreadyDone: string[] = []
        for (const classDeclaration of classDeclarations) {
            this.addClassInfoAndUpdateAlreadyDone(classDeclaration, alreadyDone);
        }
    }

    /**
     * Adds a classInfo corresponding to a given class declared in the user's project and checks if some class doesn't have the same name than other declaration in the user's project
     * @param classDeclaration  // The declaration of the class
     * @param alreadyDone       // The classNames already added to the array of declarationInfo
     */
    static addClassInfoAndUpdateAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        InstanceGeneratorService.createInstanceGeneratorIfNotAlreadyDone(classDeclaration, alreadyDone);
        const classInfo = new ClassInfo(classDeclaration.getName(), sourceFilePath(classDeclaration), numberOfConstructorArgs(classDeclaration), getPropertiesFromClassOrInterface(classDeclaration));
        classInfo.hasPrivateConstructor = hasPrivateConstructor(classDeclaration);
        classInfo.isAbstract = classDeclaration.isAbstract();
        classInfo.indexableType = getIndexableType(classDeclaration);
        INIT.addDeclarationInfo(classInfo);
    }

    /**
     * Adds interfaceInfos to GLOBAL declarationInfos array by parsing the declarations of the interfaces of the user's project
     * @private
     */
    private static setInterfaceInfos(): void {
        const interfaceDeclarations: InterfaceDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getInterfaces()));
        for (const interfaceDeclaration of interfaceDeclarations) {
            this.addInterfaceInfo(interfaceDeclaration);
        }
    }

    /**
     * Adds interfaceInfo to GLOBAL declarationInfos array
     * @param interfaceDeclaration  // The declaration corresponding to the interfaceInfo to add
     */
    static addInterfaceInfo(interfaceDeclaration: InterfaceDeclaration): void {
        const interfaceInfo = new InterfaceInfo(interfaceDeclaration.getName(), sourceFilePath(interfaceDeclaration), getPropertiesFromClassOrInterface(interfaceDeclaration));
        interfaceInfo.indexableType = getIndexableType(interfaceDeclaration);
        INIT.addDeclarationInfo(interfaceInfo);
    }

    /**
     * Adds enumInfos to GLOBAL declarationInfos array by parsing the declarations of the enums of the user's project
     * @private
     */
    private static setEnumInfos(): void {
        const enumDeclarations: EnumDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getEnums()));
        for (const enumDeclaration of enumDeclarations) {
            this.addEnumInfo(enumDeclaration);
        }
    }

    /**
     * Adds enumInfo to GLOBAL declarationInfos array
     * @param enumDeclaration  // The declaration corresponding to the enumInfo to add
     */
    static addEnumInfo(enumDeclaration: EnumDeclaration): void {
        const enumInfo = new EnumInfo(enumDeclaration.getName(), sourceFilePath(enumDeclaration));
        enumInfo.initializers = enumDeclaration.getStructure().members.map(m => removeQuotes(m.initializer as string));
        INIT.addDeclarationInfo(enumInfo);
    }

    /**
     * Adds typeInfos to GLOBAL declarationInfos array by parsing the declarations of the types of the user's project
     * @private
     */
    private static setTypeInfos(): void {
        const typeDeclarations: TypeAliasDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getTypeAliases()));
        for (const typeDeclaration of typeDeclarations) {
            this.addTypeInfo(typeDeclaration);
        }
    }

    /**
     * Adds typeInfo to GLOBAL declarationInfos array
     * @param typeAliasDeclaration  // The declaration corresponding to the typeInfo to add
     */
    static addTypeInfo(typeAliasDeclaration: TypeAliasDeclaration): void {
        const typeInfo = new TypeInfo(typeAliasDeclaration.getName(), sourceFilePath(typeAliasDeclaration), genericParameters(typeAliasDeclaration));
        if (hasTypeLiteral(typeAliasDeclaration)) {
            typeInfo.stringifiedType = HierarchicTypeLiteralService.create(typeAliasDeclaration).stringifiedType;
        } else {
            typeInfo.stringifiedType = declarationType(typeAliasDeclaration);
        }
        INIT.addDeclarationInfo(typeInfo);
    }

}
