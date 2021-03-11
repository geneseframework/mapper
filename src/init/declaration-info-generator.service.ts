import { ClassDeclaration, SwitchStatement, SyntaxKind } from 'ts-morph';
import { tab, tabs } from '../utils/native/strings.util';
import { hasPrivateConstructor } from '../utils/ast/ast-class.util';
import { ensureDirAndCopy } from '../utils/file-system.util';
import { INIT } from './init.const';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import * as chalk from 'chalk';

export class DeclarationInfoGeneratorService {

    /**
     * Creates the Instance Generator file
     * @private
     */
    static async createDeclarationInfoFile(): Promise<void> {
        console.log(chalk.yellowBright('START FILE CREATION DECL INFOOOOOOO'), INIT.declarationInfos);
        const code: string = this.getCode();
        INIT.declarationInfoSourceFile = INIT.project.createSourceFile(INIT.declarationInfoPath, code, {overwrite: true});
        INIT.declarationInfoSourceFile.saveSync();
        // await this.setGlobalGenerateInstance();
    }


    static createDeclarationInfoIfNotAlreadyDone(classDeclaration: ClassDeclaration, alreadyDone: string[]): void {
        if (this.shouldCreateDeclarationInfo(classDeclaration, alreadyDone)) {
            // INIT.addDeclarationInfo(new DeclarationInfo<any>(classDeclaration.getName(), classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration)));
            alreadyDone.push(classDeclaration.getName());
        }
    }


    static shouldCreateDeclarationInfo(classDeclaration: ClassDeclaration, alreadyDone: string[]): boolean {
        return this.mayBeInstantiated(classDeclaration) && !alreadyDone.includes(classDeclaration.getName());
    }


    /**
     * Returns true if a class may be instantiated (no private constructor and not abstract)
     * @param classDeclaration
     * @private
     */
    private static mayBeInstantiated(classDeclaration: ClassDeclaration): boolean {
        return !hasPrivateConstructor(classDeclaration) && !classDeclaration.isAbstract();
    }


    /**
     * Sets the code of the Instance Generator file, without the generators themselves
     * @private
     */
    private static getCode(): string {
        const declarationInfosCode: string = this.getDeclarationInfosCode();
        return `import { DeclarationInfo } from '../models/declarations/declaration-info.model';\n\n` +
            `export const DECLARATION_INFOS = [\n` +
            `${declarationInfosCode}` +
            `] as DeclarationInfo[];\n`;
    }


    private static getDeclarationInfosCode(): string {
        let code = '';
        for (const declarationInfo of INIT.declarationInfos) {
            code = `${code}${this.getDeclarationInfoCode(declarationInfo)}\n`;
        }
        return code;
    }


    private static getDeclarationInfoCode(declarationInfo: DeclarationInfo): string {
        const typeParametersCode: string = this.getTypeParametersCode(declarationInfo);
        let code = `${tab}{\n` +
            `${tabs(2)}filePath: '${declarationInfo.filePath}',\n` +
            `${tabs(2)}kind: '${declarationInfo.kind}',\n` +
            `${tabs(2)}name: '${declarationInfo.name}',\n` +
            `${tabs(2)}typeParameters: [\n` +
            `${tabs(2)}${typeParametersCode}` +
            `]\n` +
            `${tab}},`;
        return code;
    }


    private static getTypeParametersCode(declarationInfo: DeclarationInfo): string {
        let code = '';
        for (const typeParameter of declarationInfo.typeParameters) {
            code = `${code}\n`; // TODO
        }
        return code;
    }

    /**
     * Sets the generators for each exported class and saves the file.
     * @private
     */
    private static async setGlobalGenerateInstance(): Promise<void> {
        const switchStatement: SwitchStatement = INIT.declarationInfoSourceFile.getFirstDescendantByKind(SyntaxKind.SwitchStatement);
        let switchCode = `switch (declarationInfo.id) {\n`;
        let importsCode = ''
        for (const declarationInfo of INIT.declarationInfos) {
            // switchCode = `${switchCode}${tab}${this.switchClause(declarationInfo)}`;
            // importsCode = `${importsCode}${tab}${this.importsCode(declarationInfo)}`;
        }
        switchCode = `${switchCode}${tab}default:\n` +
            `${tabs(2)}console.log('WARNING: No instance found for declarationInfo id = ', declarationInfo?.id);\n` +
            `${tabs(2)}instance = undefined;\n` +
            `}\n`;
        switchStatement.replaceWithText(switchCode);
        INIT.declarationInfoSourceFile.fixMissingImports();
        INIT.declarationInfoSourceFile.saveSync();
        const mjsPath = INIT.declarationInfoSourceFile.getFilePath().replace('.ts', '.js');
        await ensureDirAndCopy(INIT.declarationInfoSourceFile.getFilePath(), mjsPath);
        INIT.generateInstance = await require(mjsPath).generateInstance;
    }

}
