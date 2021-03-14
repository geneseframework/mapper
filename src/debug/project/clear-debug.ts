import { Project, SourceFile } from 'ts-morph';
import * as chalk from 'chalk';

const project = new Project();
const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( 'src/dist/declaration-infos.js');
console.log(chalk.blueBright('CODEEEEE'), declarationInfosSourceFile.getFullText());
declarationInfosSourceFile.replaceWithText('export let declarationInfos = [];');
declarationInfosSourceFile.saveSync();
