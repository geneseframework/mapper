
/**
 * Check if two objects have the same values for every key
 */
export function isSameObject(obj1: any, obj2: any): boolean {
    if (trivialEquality(obj1, obj2)) {
        return true;
    }
    if (trivialInequality(obj1, obj2)) {
        return false;
    }
    if (areArrays(obj1, obj2)) {
        return arrayEquality(obj1, obj2);
    } else {
        for (const key of Object.keys(obj1)) {
            if (!keyEquality(obj1, obj2, key)) {
                return false;
            }
        }
    }
    return true;
}


function trivialEquality(obj1: any, obj2: any): boolean {
    return (obj1 === obj2) || (typeof obj1 === 'number' && obj1.toString() === obj2.toString());
}


function trivialInequality(obj1: any, obj2: any): boolean {
    return (obj1 === undefined || obj2 === undefined)
        || (Array.isArray(obj1) && !Array.isArray(obj2))
        || (!Array.isArray(obj1) && Array.isArray(obj2))
        || (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length !== obj2.length)
        || obj1 === !obj2
        || areObjectsWithDifferentNumberOfKeys(obj1, obj2);
}


function areObjectsWithDifferentNumberOfKeys(obj1: any, obj2: any): boolean {
    return typeof obj1 === 'object' && typeof obj2 === 'object' && !Array.isArray(obj1) && !Array.isArray(obj2) && Object.keys(obj1).length !== Object.keys(obj2).length;
}


function areArrays(obj1: any, obj2: any): boolean {
    return Array.isArray(obj1) && Array.isArray(obj2);
}


function arrayEquality(obj1: any, obj2: any): boolean {
    let index = 0;
    for (const element of obj1) {
        if (!isSameObject(element, obj2[index])) {
            return false;
        }
        index++;
    }
    return true;
}


function keyEquality(obj1: any, obj2: any, key: any): boolean {
    if (trivialKeyInequality(obj1, obj2, key)) {
        return false;
    }
    if (Array.isArray(obj1[key])) {
        if (!isSameObject(obj1[key], obj2[key])) {
            return false;
        }
    } else {
        if (typeof obj1[key] === 'object') {
            if (!isSameObject(obj1[key], obj2[key])) {
                return false;
            }
        } else {
            if (obj1[key] && obj2[key] && obj1[key].toString() !== obj2[key].toString()) {
                return false;
            }
        }
    }
    return true;
}


function trivialKeyInequality(obj1: any, obj2: any, key: any): boolean {
    return !obj2.hasOwnProperty(key) || (!obj2[key] && !!obj1[key]) || (!!obj2[key] && !obj1[key]);
}
