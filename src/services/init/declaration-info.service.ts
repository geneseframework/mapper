import { ClassInfo } from '../../models/declarations/class-info.model';
import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { flat } from '../../utils/native/arrays.util';
import { GLOBAL } from '../../const/global.const';
import { getAllProperties, hasPrivateConstructor, numberOfConstructorArgs } from '../../utils/ast/ast-class.util';
import { InstanceGeneratorService } from '../instance-generator.service';
import { getProperties } from '../../utils/ast/ast-declaration.util';
import { sourceFilePath } from '../../utils/ast/ast-sourcefile.util';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { Property } from '../../types/target/property.type';
import { EnumInfo } from '../../models/declarations/enum-info.model';
import { TypeInfo } from '../../models/declarations/type-info.model';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';
import { getIndexableType } from '../../utils/native/indexable-type.util';
import { InterfaceInfo } from '../../models/declarations/interface-info.model';

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
            const classInfo = new ClassInfo(classDeclaration.getName(), sourceFilePath(classDeclaration), numberOfConstructorArgs(classDeclaration), getProperties(classDeclaration));
            classInfo.hasPrivateConstructor = hasPrivateConstructor(classDeclaration);
            classInfo.isAbstract = classDeclaration.isAbstract();
            classInfo.indexableType = getIndexableType(classDeclaration);
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
            const interfaceInfo = new InterfaceInfo(interfaceDeclaration.getName(), sourceFilePath(interfaceDeclaration), this.getProperties(interfaceDeclaration));
            interfaceInfo.indexableType = getIndexableType(interfaceDeclaration);
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
        const declarationOrSignatures: PropertyDeclarationOrSignature[] = getAllProperties(declaration);
        const properties: Property[] = [];
        for (const declarationOrSignature of declarationOrSignatures) {
            const property: Property = {
                name: declarationOrSignature.getName(),
                initializer: declarationOrSignature.getInitializer(),
                type: declarationOrSignature.getStructure().type as string};
            properties.push(property);
        }
        return properties;
    }

}
