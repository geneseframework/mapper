import { Target } from '../types/target.type';
import * as chalk from 'chalk';


export function isObjectOrObjectsArrayTarget(mapTarget: Target<any>): boolean {
    return isObjectTarget(mapTarget) || isObjectTargetArray(mapTarget);
}


export function isObjectTarget(mapTarget: Target<any>): boolean {
    if (mapTarget === {} || mapTarget === Object) {
        return true;
    } else {
        return typeof mapTarget === 'string' && ['object', 'Object'].includes(mapTarget);
    }
}


export function isObjectTargetArray(mapTarget: Target<any>): boolean {
    if (mapTarget === [{}]) {
        return true;
    } else {
        return typeof mapTarget === 'string' && ['object[]', 'Object[]'].includes(mapTarget);
    }
}
