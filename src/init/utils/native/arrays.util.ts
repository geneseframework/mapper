export function flatInit(array: any[]): any[] {
    if(!array || array.length === 0) {
        return [];
    }
    else if(Array.isArray(array[0])) {
        return flatInit(array[0]).concat(flatInit(array.slice(1)));
    }
    else {
        return [array[0]].concat(flatInit(array.slice(1)));
    }
}
