import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import { throwWarning } from './errors.util';

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


export async function ensureDir(folderPath: string): Promise<void> {
    await fs.ensureDir(folderPath);
}


export async function ensureDirAndCopy(source: string, target: string): Promise<void> {
    await fs.ensureDir(getFolderPath(target));
    fs.copySync(source, target);
}


export async function requireFile(filePath: string): Promise<any> {
    try {
        const pathExists: boolean = await fs.pathExists(filePath);
        if (pathExists) {
            console.log(chalk.greenBright('FILEEEEE 000'), filePath, pathExists);
            const file: object = await fs.readJson(filePath);
            console.log(chalk.greenBright('FILEEEEE'), file, pathExists);

        }
        console.log(chalk.blueBright('FILEEEEE'), filePath, pathExists);
    } catch (err) {
        throwWarning(`Error reading file "${filePath}".`, err);
    }
}
