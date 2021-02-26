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
    return partialArr;
}


/**
 * Checks if all the elements of the array2 are in the array2
 * @param bigArray
 * @param smallArray
 */
export function includes(bigArray: any[], smallArray: any[]): boolean {
    if (areNoyArrays(bigArray, smallArray)) {
        return false;
    }
    return !smallArray.some(element => !bigArray.includes(element));
}


export function isEmptyArray(data: any): boolean {
    return Array.isArray(data) && data.length === 0;
}


export function isArray(data: any): boolean {
    return Array.isArray(data);
}


export function areArrays(first: any, last: any): boolean {
    return isArray(first) && isArray(last);
}


export function areNoyArrays(first: any, last: any): boolean {
    return !isArray(first) || !isArray(last);
}
