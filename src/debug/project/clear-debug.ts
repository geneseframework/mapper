import { Project, SourceFile } from 'ts-morph';
import * as chalk from 'chalk';

const project = new Project();
const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( 'src/dist/declaration-infos.ts');
declarationInfosSourceFile.replaceWithText('export let declarationInfos = [];');
declarationInfosSourceFile.saveSync();
