import {
    ClassDeclaration,
    EnumDeclaration,
    InterfaceDeclaration,
    TypeAliasDeclaration,
    TypeLiteralNode
} from 'ts-morph';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../utils/ast/ast-class.util';
import {
    createInterfaceInfoFromTypeLiteralNode,
    genericParameters,
    getPropertiesAndAddInterfaceInfoIfHasTypeLiteral
} from '../utils/ast/ast-declaration.util';
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
import { Quoted } from '../../shared/types/quoted.type';
import { flat } from '../../shared/utils/arrays.util';
import * as chalk from 'chalk';
import { isCurveBracketed } from '../../create/types/target/string/curve-bracketed.type';
import { HasTypeLiteralNode } from '../types/type-literal-property.type';

export class DeclarationInfoService {


    static async init(): Promise<void> {
        await this.setClassInfos();
        this.setEnumInfos();
        this.setInterfaceInfos();
        this.setTypeInfos();
        await DeclarationInfoGeneratorService.createDeclarationInfoFile();
    }


    private static async setClassInfos(): Promise<void> {
        const classDeclarations: ClassDeclaration[] = INIT.project.getSourceFiles().map(s => s.getClasses()).flat();
        const alreadyDone: string[] = []
        for (const classDeclaration of classDeclarations) {
            this.addClassInfo(classDeclaration, alreadyDone);
        }
    }


    static addClassInfo(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        InstanceGeneratorService.createInstanceGeneratorIfNotAlreadyDone(classDeclaration, alreadyDone);
        DeclarationInfoGeneratorService.createDeclarationInfoIfNotAlreadyDone(classDeclaration, alreadyDone);
        const classInfo = new ClassInfo(classDeclaration.getName(), sourceFilePath(classDeclaration), numberOfConstructorArgs(classDeclaration), getPropertiesAndAddInterfaceInfoIfHasTypeLiteral(classDeclaration));
        classInfo.hasPrivateConstructor = hasPrivateConstructor(classDeclaration);
        classInfo.isAbstract = classDeclaration.isAbstract();
        classInfo.indexableType = getIndexableType(classDeclaration);
        INIT.addDeclarationInfo(classInfo);
    }


    private static setInterfaceInfos(): void {
        const interfaceDeclarations: InterfaceDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getInterfaces()));
        for (const interfaceDeclaration of interfaceDeclarations) {
            this.addInterfaceInfo(interfaceDeclaration);
        }
    }


    static addInterfaceInfo(interfaceDeclaration: InterfaceDeclaration): void {
        const interfaceInfo = new InterfaceInfo(interfaceDeclaration.getName(), sourceFilePath(interfaceDeclaration), getPropertiesAndAddInterfaceInfoIfHasTypeLiteral(interfaceDeclaration));
        interfaceInfo.indexableType = getIndexableType(interfaceDeclaration);
        INIT.addDeclarationInfo(interfaceInfo);
    }


    private static setEnumInfos(): void {
        const enumDeclarations: EnumDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getEnums()));
        for (const enumDeclaration of enumDeclarations) {
            this.addEnumInfo(enumDeclaration);
        }
    }


    static addEnumInfo(enumDeclaration: EnumDeclaration): void {
        const enumInfo = new EnumInfo(enumDeclaration.getName(), sourceFilePath(enumDeclaration));
        enumInfo.initializers = enumDeclaration.getStructure().members.map(m => this.removeQuotes(m.initializer as string));
        INIT.addDeclarationInfo(enumInfo);
    }


    private static setTypeInfos(): void {
        const typeDeclarations: TypeAliasDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getTypeAliases()));
        for (const typeDeclaration of typeDeclarations) {
            this.addTypeInfo(typeDeclaration);
        }
    }


    static addTypeInfo(typeAliasDeclaration: TypeAliasDeclaration): void {
        const typeInfo = new TypeInfo(typeAliasDeclaration.getName(), sourceFilePath(typeAliasDeclaration), genericParameters(typeAliasDeclaration));
        if (isCurveBracketed(typeAliasDeclaration?.getStructure().type as string)) {
        // if (typeDeclaration.getName() === 'TypeObjectSpec') {
            console.log(chalk.blueBright('ADD TP INFOOOOO'), typeAliasDeclaration.getStructure());
            const newInterfaceInfo: InterfaceInfo = this.addInterfaceInfoFromTypeAliasDeclaration(typeAliasDeclaration);
            typeInfo.type = newInterfaceInfo.name;
        } else {
            typeInfo.type = typeAliasDeclaration.getStructure()?.type as string;
        }
        // Create interfaceInfo if needed
        INIT.addDeclarationInfo(typeInfo);
    }


    private static addInterfaceInfoFromTypeAliasDeclaration(typeAliasDeclaration: TypeAliasDeclaration): InterfaceInfo {
        const hasTypeLiteralNode = new HasTypeLiteralNode(typeAliasDeclaration.getName(), 'Interface', typeAliasDeclaration.getSourceFile().getFilePath(), typeAliasDeclaration.getTypeNode() as TypeLiteralNode);
        return createInterfaceInfoFromTypeLiteralNode(hasTypeLiteralNode);
    }


    static removeQuotes(text: string): string {
        return this.isQuoted(text) ? removeBorders(text) : text;
    }


    static isQuoted(text: string): text is Quoted {
        return this.isSurroundedBy(text, `'`) || this.isSurroundedBy(text, `"`) || this.isSurroundedBy(text, `\``);
    }


    static isSurroundedBy(text: string, boundary: string): boolean {
        return text && text.slice(0, 1) === boundary && text.slice(text.length - 1) === boundary && !removeBorders(text).includes(boundary);
    }


}
