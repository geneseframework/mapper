/**
 * Check if two objects have the same initializers for every key
 */

export function isSameObject(obj1: any, obj2: any, differentiateStringsAndNumbers = false): boolean {
    if (trivialEquality(obj1, obj2, differentiateStringsAndNumbers)) {
        return true;
    }
    if (trivialInequality(obj1, obj2, differentiateStringsAndNumbers)) {
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


function trivialEquality(obj1: any, obj2: any, differentiateStringsAndNumbers): boolean {
    return obj1 === obj2
        || areSameNumberOrString(obj1, obj2, differentiateStringsAndNumbers)
        || areInvalidDates(obj1, obj2);
}


function areSameNumberOrString(obj1: any, obj2: any, differentiateStringsAndNumbers): boolean {
    return !differentiateStringsAndNumbers && (typeof obj1 === 'number' || typeof obj2 === 'number') && obj1?.toString() === obj2?.toString();
}


function trivialInequality(obj1: any, obj2: any, differentiateStringsAndNumbers): boolean {
    return (obj1 === undefined || obj2 === undefined)
        || !areBothArrayOrNot(obj1, obj2)
        || (areArrays(obj1, obj2) && obj1.length !== obj2.length)
        || obj1 === !obj2
        || haveDifferentTypes(obj1, obj2, differentiateStringsAndNumbers)
        || areObjectsWithDifferentNumberOfKeys(obj1, obj2);
}


function haveDifferentTypes(obj1: any, obj2: any, differentiateStringsAndNumbers): boolean {
    if ((differentiateStringsAndNumbers && areStringAndNumber(obj1, obj2))
        || typeof obj1 !== typeof obj2
        || areObjectAndArray(obj1, obj2)) {
        return true;
    } else {
        return false;
    }
}


function areBothArrayOrNot(obj1: any, obj2: any): boolean {
    return areArrays(obj1, obj2) || (!Array.isArray(obj1) && !Array.isArray(obj2));
}


function areArrays(obj1: any, obj2: any): boolean {
    return Array.isArray(obj1) && Array.isArray(obj2);
}


function areStringAndNumber(obj1: any, obj2: any): boolean {
    return (typeof obj1 === 'number' && typeof obj2 === 'string') || (typeof obj1 === 'string' && typeof obj2 === 'number');
}


function areObjectAndArray(obj1: any, obj2: any): boolean {
    return (hasTypeOfObjectButIsNotArray(obj1) && Array.isArray(obj2)) || (Array.isArray(obj1) && hasTypeOfObjectButIsNotArray(obj2));
}


function hasTypeOfObjectButIsNotArray(obj: any): boolean {
    return typeof obj === 'object' && !Array.isArray(obj);
}


function areObjectsWithDifferentNumberOfKeys(obj1: any, obj2: any): boolean {
    return typeof obj1 === 'object' && typeof obj2 === 'object' && !Array.isArray(obj1) && !Array.isArray(obj2) && Object.keys(obj1).length !== Object.keys(obj2).length;
}


function areInvalidDates(obj1: any, obj2: any): boolean {
    return obj1?.toString() === 'Invalid Date' && obj2?.toString() === 'Invalid Date';
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
