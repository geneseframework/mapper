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

/**
 * Checks if all the elements of the small array are in the big array
 * @param bigArray
 * @param smallArray
 */
export function includes(bigArray: any[], smallArray: any[]): boolean {
    if (areNotArrays(bigArray, smallArray)) {
        return false;
    }
    return !smallArray.some(element => !bigArray.includes(element));
}


export function isArray(data: any): data is Array<any> {
    return Array.isArray(data);
}


export function areArrays(...args: any[][]): boolean {
    return args.every(a => isArray(a));
}


export function areNotArrays(first: any, last: any): boolean {
    return !isArray(first) || !isArray(last);
}


export function haveSameLength(array1: any[], array2: any[]): boolean {
    return areArrays(array1, array2) && array1.length === array2.length;
}
