import { Project } from 'ts-morph';
import * as fs from 'fs-extra';
console.log('START');

// const project = require('./file-to-update');
// const text = require('./file-to-update');
// const text = require('./file-to-update');


// const text = require('./file-to-update')?.txt;
// console.log('INITIAL LENGTH', text?.length);
// const project = new Project();
// const sourceFile = project.addSourceFileAtPath('./file-to-update.ts');
// console.log('SOURCEFILE LENGTH', sourceFile.getFullText().length);
// sourceFile.deleteImmediatelySync();
// project.removeSourceFile(sourceFile)

const initialText = require('./some-file.ts')?.txt;
console.log('Text : ', initialText);

const path = process.cwd() + '/some-file.ts';
// console.log('PATHHHHH', path)
fs.removeSync(path);
console.log('File should be removed');
// fs.removeSync('./some-file.ts');

const removed = require('./some-file.ts');
console.log('REMOVED')
// const removed = require('./some-file.ts')?.txt;
// console.log('Final text', removed?.length);

// fs.remove('./file-to-update.ts')
//     .then(s => {
//         const newRemoved = require('./file-to-update')?.txt;
//         console.log('NEWWWWW REMOVED LENGTH', newRemoved?.length);
//
//     })


// const otherUpdatedSourceFile = project.createSourceFile('./other-file-to-update.ts', `export const txt = 'some other text';`, {overwrite: true});
// otherUpdatedSourceFile.saveSync();
// const otherUpdatedSourceFileText = require('./other-file-to-update').txt;
// console.log('FINAL LENGTH', otherUpdatedSourceFileText?.length);


// const updatedSourceFile = project.createSourceFile('./file-to-update.ts', `export const txt = 'some other text';`, {overwrite: true});
// console.log('SOURCEFILE LENGTH', updatedSourceFile.getFullText().length);
// updatedSourceFile.saveSync();
// const otherText = require('./file-to-update').txt;
// console.log('FINAL LENGTH', otherText?.length);
