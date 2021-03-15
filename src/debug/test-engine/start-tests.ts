import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { expect } from './test-algo.service';
import { INIT } from '../../init/const/init.const';
import { GLOBAL } from '../../create/const/global.const';
import { Project, SourceFile } from 'ts-morph';
import { DeclarationInfo } from '../../create/models/declarations/declaration-info.model';
import { declarationInfos } from '../../../generated/declaration-infos';
import { generateInstance } from '../../../generated/instance-generator';

GLOBAL.debug = true;

export async function startTests(logPassed: boolean, old: boolean): Promise<void> {
    const start = Date.now();
    console.log(chalk.blueBright('START TESTS'));
    INIT.start = Date.now();
    createDebugProject();
    GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
    GLOBAL.generateInstance = generateInstance;
    GLOBAL.debug = true;
    console.log(chalk.cyanBright('START TESTS GLOBAL DEBUG'), GLOBAL.debug);
    const specFiles: string[] = INIT.project.getSourceFiles().filter(s => isSpecFile(s.getBaseName())).map(s => s.getFilePath());
    await getTests(specFiles);
    await expect(TESTS.testMappers.concat(TESTS.its), logPassed, old);
    if (!logPassed) {
        logFailedTests();
    }
    const duration: number = Date.now() - start;
    console.log(chalk.greenBright('\nTests passed : '), TESTS.testsPassed);
    console.log(chalk.redBright('Tests failed : '), TESTS.testsFailed);
    console.log(chalk.blueBright('Duration : '), duration, 'ms');
    clearCode();
}


/**
 * In debug mode, creates a Project based on the @genese/mapper module itself
 * @private
 */
function createDebugProject(): void {
    INIT.projectPath = process.cwd();
    INIT.project = new Project({
        tsConfigFilePath: INIT.tsConfigPath,
        skipFileDependencyResolution: true
    });
    INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
    const distPath = process.cwd() + '/src/dist';
    INIT.project.addSourceFilesAtPaths(`${distPath}/*{.d.ts,.ts}`);
}


function clearCode(): void {
    const project = new Project();
    clearDeclarationInfos(project);
    clearGenerateInstance(project);
}


function clearDeclarationInfos(project: Project): void {
    const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( process.cwd() + '/generated/declaration-infos.js');
    declarationInfosSourceFile.replaceWithText('export var declarationInfos = [];');
    declarationInfosSourceFile.saveSync();
}


function clearGenerateInstance(project: Project): void {
    const instanceGeneratorSourceFile: SourceFile = project.addSourceFileAtPath( process.cwd() + '/generated/instance-generator.js');
    console.log(chalk.blueBright('CODEEEEE'), instanceGeneratorSourceFile.getFullText()?.length);
    const code = `export const generateInstance = async function(instanceGenerator) {
    try {
        let instance;
        switch (instanceGenerator.id) {
            default:
                console.log('WARNING: No instance found for instanceGenerator id = ', instanceGenerator?.id);
                instance = undefined;
        }
        return instance;
    } catch(err) {
        console.log('Impossible to map this instance. Did you exported it ?', err);
    }
}
`
    instanceGeneratorSourceFile.replaceWithText(code);
    instanceGeneratorSourceFile.saveSync();
}


function isSpecFile(path: string): boolean {
    return path?.slice(-8) === '.spec.ts';
}


async function getTests(specFiles: string[]): Promise<void> {
    for (const specFile of specFiles) {
        const file: any = await require(specFile);
        TESTS.its.push(...file?.its);
        TESTS.testMappers.push(...file?.testMappers);
    }
}


function logFailedTests(): void {
    for (const failed of TESTS.failed) {
        console.log(chalk.redBright('=> '), failed);
    }
}
