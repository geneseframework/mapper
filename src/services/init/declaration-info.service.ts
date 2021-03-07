import { ClassInfo } from '../../models/class-info.model';
import { ClassDeclaration } from 'ts-morph';
import { flat } from '../../utils/native/arrays.util';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../../utils/ast/ast-class.util';
import { InstanceGeneratorService } from '../instance-generator.service';

export class DeclarationInfoService {


    static async init(): Promise<void> {
        await this.setClassInfos();
        // const classInfo: ClassInfo = new ClassInfo()
    }


    private static async setClassInfos(): Promise<void> {
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses()));
        const alreadyDone: string[] = []
        for (const classDeclaration of classDeclarations) {
            InstanceGeneratorService.createInstanceGeneratorIfNotAlreadyDone(classDeclaration, alreadyDone);
        }

    }

}
