
import * as fs from 'fs-extra';
import { GLOBAL } from '../const/global.const';

/**
 * Returns the name of the file at a given path
 * @param pathFile      // The path of the file
 */
export function getFilename(pathFile = ''): string {
    const splitPath = pathFile.split('/');
    return splitPath[splitPath.length - 1];
}


export function getFolderPath(filePath: string): string {
    return filePath?.slice(0, -getFilename(filePath).length - 1) ?? undefined;
}


export function getClonedFilePath(originalPath: string): string {
    return originalPath?.replace(GLOBAL.projectPath, GLOBAL.geneseMapperFolder);
}


export async function ensureDir(folderPath: string): Promise<void> {
    await fs.ensureDir(folderPath);
}


export async function ensureDirAndCopy(source: string, target: string): Promise<void> {
    await fs.ensureDir(getFolderPath(target));
    fs.copySync(source, target);
}
