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


export function partialArray<T>(array: T[], fromIndex: number, toIndex?: number): T[] {
    if (!array || (!fromIndex && !toIndex)) {
        return undefined;
    }
    if (!toIndex || toIndex > array.length) {
        toIndex = array.length;
    }
    const partialArray: T[] = [];
    for (let i = fromIndex; i < toIndex; i++) {
        partialArray.push(array[i]);
    }
    return partialArray;
}
