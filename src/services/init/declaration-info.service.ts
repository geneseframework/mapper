import { ClassInfo } from '../../models/class-info.model';
import { ClassDeclaration } from 'ts-morph';
import { flat } from '../../utils/native/arrays.util';
import { GLOBAL } from '../../const/global.const';
import { numberOfConstructorArgs } from '../../utils/ast/ast-class.util';
import { InstanceGeneratorService } from '../instance-generator.service';
import { Property } from '../../types/target/property.type';
import { properties } from '../../utils/ast/ast-declaration.util';
import { sourceFilePath } from '../../utils/ast/ast-sourcefile.util';

export class DeclarationInfoService {


    static async init(): Promise<void> {
        await this.setClassInfos();
    }


    private static async setClassInfos(): Promise<void> {
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses()));
        const alreadyDone: string[] = []
        for (const classDeclaration of classDeclarations) {
            InstanceGeneratorService.createInstanceGeneratorIfNotAlreadyDone(classDeclaration, alreadyDone);
            const classInfo: ClassInfo = new ClassInfo(classDeclaration.getName(), sourceFilePath(classDeclaration), numberOfConstructorArgs(classDeclaration), properties(classDeclaration));
            GLOBAL.declarationInfos.push(classInfo);
        }

    }


    // private static getProperties(declaration: ClassOrInterfaceDeclaration): Property[] {
    //
    // }

}
