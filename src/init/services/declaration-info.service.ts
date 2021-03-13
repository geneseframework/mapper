import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { hasPrivateConstructor, numberOfConstructorArgs } from '../utils/ast/ast-class.util';
import { genericParameters, getProperties } from '../utils/ast/ast-declaration.util';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import { INIT } from '../const/init.const';
import { DeclarationInfoGeneratorService } from './declaration-info-generator.service';
import { InstanceGeneratorService } from './instance-generator.service';
import { getIndexableType } from '../utils/ast/ast-indexes.util';
import { InterfaceInfoInit } from '../models/declarations/interface-info.model';
import { EnumInfoInit } from '../models/declarations/enum-info.model';
import { QuotedInit, removeBordersInit } from '../types/quoted-init.type';
import { TypeInfoInit } from '../models/declarations/type-info.model';
import { ClassInfoInit } from '../models/declarations/class-info.model';
import { flatInit } from '../utils/native/arrays.util';
import * as chalk from 'chalk';

export class DeclarationInfoService {


    static async init(): Promise<void> {
        await this.setClassInfos();
        this.setEnumInfos();
        this.setInterfaceInfos();
        this.setTypeInfos();
        const zzz = await DeclarationInfoGeneratorService.createDeclarationInfoFile();
        // INIT.declarationInfos = require('../../dist/declaration-infos').declarationInfos;
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
        const classInfo = new ClassInfoInit(classDeclaration.getName(), sourceFilePath(classDeclaration), numberOfConstructorArgs(classDeclaration), getProperties(classDeclaration));
        classInfo.hasPrivateConstructor = hasPrivateConstructor(classDeclaration);
        classInfo.isAbstract = classDeclaration.isAbstract();
        classInfo.indexableType = getIndexableType(classDeclaration);
        INIT.addDeclarationInfo(classInfo);
    }


    private static setInterfaceInfos(): void {
        const interfaceDeclarations: InterfaceDeclaration[] = flatInit(INIT.project.getSourceFiles().map(s => s.getInterfaces()));
        for (const interfaceDeclaration of interfaceDeclarations) {
            this.addInterfaceInfo(interfaceDeclaration);
        }
    }


    static addInterfaceInfo(interfaceDeclaration: InterfaceDeclaration): void {
        const interfaceInfo = new InterfaceInfoInit(interfaceDeclaration.getName(), sourceFilePath(interfaceDeclaration), getProperties(interfaceDeclaration));
        interfaceInfo.indexableType = getIndexableType(interfaceDeclaration);
        INIT.addDeclarationInfo(interfaceInfo);
    }


    private static setEnumInfos(): void {
        const enumDeclarations: EnumDeclaration[] = flatInit(INIT.project.getSourceFiles().map(s => s.getEnums()));
        for (const enumDeclaration of enumDeclarations) {
            this.addEnumInfo(enumDeclaration);
        }
    }


    static addEnumInfo(enumDeclaration: EnumDeclaration): void {
        const enumInfo = new EnumInfoInit(enumDeclaration.getName(), sourceFilePath(enumDeclaration));
        enumInfo.initializers = enumDeclaration.getStructure().members.map(m => this.removeQuotes(m.initializer as string));
        // console.log(chalk.blueBright('ENU MVALLLLS'), enumInfo.initializers);
        INIT.addDeclarationInfo(enumInfo);
    }


    private static setTypeInfos(): void {
        const typeDeclarations: TypeAliasDeclaration[] = flatInit(INIT.project.getSourceFiles().map(s => s.getTypeAliases()));
        for (const typeDeclaration of typeDeclarations) {
            this.addTypeInfo(typeDeclaration);
        }
    }


    static addTypeInfo(typeDeclaration: TypeAliasDeclaration): void {
        const typeInfo = new TypeInfoInit(typeDeclaration.getName(), sourceFilePath(typeDeclaration), genericParameters(typeDeclaration));
        typeInfo.type = typeDeclaration.getStructure()?.type as string;
        INIT.addDeclarationInfo(typeInfo);
    }


    static removeQuotes(text: string): string {
        return this.isQuoted(text) ? removeBordersInit(text) : text;
    }


    static isQuoted(text: string): text is QuotedInit {
        return this.isSurroundedBy(text, `'`) || this.isSurroundedBy(text, `"`) || this.isSurroundedBy(text, `\``);
    }


    static isSurroundedBy(text: string, boundary: string): boolean {
        return text && text.slice(0, 1) === boundary && text.slice(text.length - 1) === boundary && !removeBordersInit(text).includes(boundary);
    }


    static removeBorders(text: string): string {
        return text.slice(1, -1);
    }


}
