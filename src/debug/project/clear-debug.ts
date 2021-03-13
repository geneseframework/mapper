import { Project, SourceFile } from 'ts-morph';
import * as chalk from 'chalk';

const project = new Project();
const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( 'src/dist/declaration-infos.ts');
console.log(chalk.blueBright('CODEEEEE'), declarationInfosSourceFile.getFullText());
declarationInfosSourceFile.replaceWithText('export var declarationInfos = [];');
declarationInfosSourceFile.saveSync();
