/**
 * Calls a mapper function asking target and key values and returns the element mapped by this function
 * @param mapper
 * @param args
 */
import * as chalk from 'chalk';

// export function newMappedElement<T>(mapper: (target: any, key: any, dataObject: object, ...args: any[]) => void, ...args: any): T
// export function newMappedElement<T>(mapper: (target: any, key: any, ...args: any[]) => void, ...args: any): T
export function newMappedElement<T>(mapper: (target: any, key: any, ...args: any[]) => void, ...args: any): T {
    const root = { rootKey: undefined };
    console.log(chalk.yellowBright('NE MAPPPPPPED ELT'), ...args);
    mapper(root, 'rootKey', ...args);
    return root.rootKey;
}
