import * as chalk from 'chalk';

export function flat(array: any[]): any[] {
    if(!array || array.length === 0) {
        return [];
    }
    else if(Array.isArray(array[0])) {
        return flat(array[0]).concat(flat(array.slice(1)));
    }
    else {
        return [array[0]].concat(flat(array.slice(1)));
    }
}


export function partialClone<T>(array: T[], fromIndex: number, toIndex?: number): T[] {
    // console.log(chalk.magentaBright('PARTIAL ARRRR'), array.length, fromIndex, toIndex);
    if (!array || (fromIndex !== undefined && toIndex !== undefined)) {
        return undefined;
    }
    if (!toIndex || toIndex > array.length) {
        toIndex = array.length;
    }
    const partialArr: T[] = [];
    for (let i = fromIndex; i < toIndex; i++) {
        partialArr.push(array[i]);
    }
    // console.log(chalk.magentaBright('PARTIAL ARRRR'), partialArr.length);
    return partialArr;
}
