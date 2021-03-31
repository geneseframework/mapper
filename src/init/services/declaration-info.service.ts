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
import { removeBorders } from '../../shared/utils/strings.util';
import { Quoted, removeQuotes } from '../../shared/types/quoted.type';
import { flat } from '../../shared/utils/arrays.util';
import { hasTypeLiteral } from '../utils/ast/ast-type-literal.util';
import { HierarchicTypeLiteralService } from './hierarchic-type-literal.service';
import { getPropertiesFromClassOrInterface } from '../utils/declaration-info-get-properties.util';

/**
 * Generates the declaration-infos.js file from the user's project
 */
export class DeclarationInfoService {

    /**
     * Starts the init() process
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
            this.addClassInfo(classDeclaration, alreadyDone);
        }
    }
// TODO: remove already done ?
    /**
     * Adds a classInfo corresponding to a given class declared in the user's project
     * @param classDeclaration  // The declaration of the class
     * @param alreadyDone       // True if this
     */
    static addClassInfo(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        InstanceGeneratorService.createInstanceGeneratorIfNotAlreadyDone(classDeclaration, alreadyDone);
        DeclarationInfoGeneratorService.createDeclarationInfoIfNotAlreadyDone(classDeclaration, alreadyDone);
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
