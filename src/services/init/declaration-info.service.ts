import { ClassInfo } from '../../models/class-info.model';
import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { flat } from '../../utils/native/arrays.util';
import { GLOBAL } from '../../const/global.const';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../../utils/ast/ast-class.util';
import { InstanceGeneratorService } from '../instance-generator.service';
import { properties } from '../../utils/ast/ast-declaration.util';
import { sourceFilePath } from '../../utils/ast/ast-sourcefile.util';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { Property } from '../../types/target/property.type';
import { EnumInfo } from '../../models/enum-info.model';
import { InterfaceInfo } from '../../models/interface-info.model';
import { Declaration } from '../../types/type-declaration.type';
import { TypeInfo } from '../../models/type-info.model';

export class DeclarationInfoService {


    static async init(): Promise<void> {
        await this.setClassInfos();
        this.setEnumInfos();
        this.setInterfaceInfos();
        this.setTypeInfos();
    }


    private static async setClassInfos(): Promise<void> {
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses()));
        const alreadyDone: string[] = []
        for (const classDeclaration of classDeclarations) {
            InstanceGeneratorService.createInstanceGeneratorIfNotAlreadyDone(classDeclaration, alreadyDone);
            const classInfo = new ClassInfo(classDeclaration.getName(), sourceFilePath(classDeclaration), numberOfConstructorArgs(classDeclaration), properties(classDeclaration));
            classInfo.hasPrivateConstructor = hasPrivateConstructor(classDeclaration);
            classInfo.isAbstract = classDeclaration.isAbstract();
            classInfo.properties = this.getProperties(classDeclaration);
            GLOBAL.declarationInfos.push(classInfo);
        }
    }


    private static setEnumInfos(): void {
        const enumDeclarations: EnumDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getEnums()));
        for (const enumDeclaration of enumDeclarations) {
            const enumInfo = new EnumInfo(enumDeclaration.getName(), sourceFilePath(enumDeclaration));
            GLOBAL.declarationInfos.push(enumInfo);
        }
    }


    private static setInterfaceInfos(): void {
        const interfaceDeclarations: InterfaceDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getInterfaces()));
        for (const interfaceDeclaration of interfaceDeclarations) {
            const interfaceInfo = new InterfaceInfo(interfaceDeclaration.getName(), sourceFilePath(interfaceDeclaration));
            GLOBAL.declarationInfos.push(interfaceInfo);
        }
    }


    private static setTypeInfos(): void {
        const typeDeclarations: TypeAliasDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getTypeAliases()));
        for (const typeDeclaration of typeDeclarations) {
            const typeInfo = new TypeInfo(typeDeclaration.getName(), sourceFilePath(typeDeclaration));
            GLOBAL.declarationInfos.push(typeInfo);
        }
    }


    private static getProperties(declaration: ClassOrInterfaceDeclaration): Property[] {
        return [];
    }

}
