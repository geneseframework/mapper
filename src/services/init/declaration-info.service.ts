import { ClassInfo } from '../../models/declarations/class-info.model';
import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { flat } from '../../utils/native/arrays.util';
import { GLOBAL } from '../../const/global.const';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../../utils/ast/ast-class.util';
import { InstanceGeneratorService } from '../instance-generator.service';
import { genericParameters, getProperties } from '../../utils/ast/ast-declaration.util';
import { sourceFilePath } from '../../utils/ast/ast-sourcefile.util';
import { EnumInfo } from '../../models/declarations/enum-info.model';
import { TypeInfo } from '../../models/declarations/type-info.model';
import { getIndexableType } from '../../utils/native/indexable-type.util';
import { InterfaceInfo } from '../../models/declarations/interface-info.model';
import * as chalk from 'chalk';
import { removeBorders } from '../../types/target/string/containerized.type';
import { isQuoted, removeQuotes } from '../../types/target/string/quoted.type';

export class DeclarationInfoService {


    static async init(): Promise<void> {
        await this.setClassInfos();
        this.setEnumInfos();
        this.setInterfaceInfos();
        this.setTypeInfos();
    }


    private static async setClassInfos(): Promise<void> {
        const classDeclarations: ClassDeclaration[] = GLOBAL.project.getSourceFiles().map(s => s.getClasses()).flat();
        const alreadyDone: string[] = []
        for (const classDeclaration of classDeclarations) {
            this.addClassInfo(classDeclaration, alreadyDone);
        }
    }


    static addClassInfo(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        InstanceGeneratorService.createInstanceGeneratorIfNotAlreadyDone(classDeclaration, alreadyDone);
        const classInfo = new ClassInfo(classDeclaration.getName(), sourceFilePath(classDeclaration), numberOfConstructorArgs(classDeclaration), getProperties(classDeclaration));
        classInfo.hasPrivateConstructor = hasPrivateConstructor(classDeclaration);
        classInfo.isAbstract = classDeclaration.isAbstract();
        classInfo.indexableType = getIndexableType(classDeclaration);
        GLOBAL.addDeclarationInfo(classInfo);
    }


    private static setInterfaceInfos(): void {
        const interfaceDeclarations: InterfaceDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getInterfaces()));
        for (const interfaceDeclaration of interfaceDeclarations) {
            this.addInterfaceInfo(interfaceDeclaration);
        }
    }


    static addInterfaceInfo(interfaceDeclaration: InterfaceDeclaration): void {
        const interfaceInfo = new InterfaceInfo(interfaceDeclaration.getName(), sourceFilePath(interfaceDeclaration), getProperties(interfaceDeclaration));
        interfaceInfo.indexableType = getIndexableType(interfaceDeclaration);
        GLOBAL.addDeclarationInfo(interfaceInfo);
    }


    private static setEnumInfos(): void {
        const enumDeclarations: EnumDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getEnums()));
        for (const enumDeclaration of enumDeclarations) {
            this.addEnumInfo(enumDeclaration);
        }
    }


    static addEnumInfo(enumDeclaration: EnumDeclaration): void {
        const enumInfo = new EnumInfo(enumDeclaration.getName(), sourceFilePath(enumDeclaration));
        enumInfo.initializers = enumDeclaration.getStructure().members.map(m => removeQuotes(m.initializer as string));
        // console.log(chalk.blueBright('ENU MVALLLLS'), enumInfo.initializers);
        GLOBAL.addDeclarationInfo(enumInfo);
    }


    private static setTypeInfos(): void {
        const typeDeclarations: TypeAliasDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getTypeAliases()));
        for (const typeDeclaration of typeDeclarations) {
            this.addTypeInfo(typeDeclaration);
        }
    }


    static addTypeInfo(typeDeclaration: TypeAliasDeclaration): void {
        const typeInfo = new TypeInfo(typeDeclaration.getName(), sourceFilePath(typeDeclaration), genericParameters(typeDeclaration));
        typeInfo.type = typeDeclaration.getStructure()?.type as string;
        GLOBAL.addDeclarationInfo(typeInfo);
    }


}
