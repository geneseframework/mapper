import * as fs from 'fs-extra';
import { throwWarning } from './errors.util';

/**
 * Returns the name of the file at a given path
 * @param pathFile      // The path of the file
 */
export function getFilename(pathFile = ''): string {
    const splitPath = pathFile.split('/');
    return splitPath[splitPath.length - 1];
}


export function removeExtension(pathFile: string): string {
    const splitPath: string[] = pathFile.split('.');
    const extension: string = splitPath[splitPath.length - 1];
    return pathFile.slice(0, -extension.length - 1);
}


export function getFolderPath(filePath: string): string {
    return filePath?.slice(0, -getFilename(filePath).length - 1) ?? undefined;
}


export async function ensureDirAndCopy(source: string, target: string): Promise<void> {
    await fs.ensureDir(getFolderPath(target));
    fs.copySync(source, target);
}


export async function requireJsonFile(filePath: string): Promise<object> {
    try {
        return await fs.pathExists(filePath) ? await fs.readJson(filePath) : undefined;
    } catch (err) {
        throwWarning(`Error reading file "${filePath}".`, err);
    }
}
