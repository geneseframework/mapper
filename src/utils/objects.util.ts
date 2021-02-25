import { Target } from '../types/target.type';
import * as chalk from 'chalk';


export function isObjectOrObjectsArrayTarget(target: Target<any>): boolean {
    return isObjectTarget(target) || isObjectTargetArray(target);
}


export function isObjectTarget(target: Target<any>): boolean {
    if (target === Object) {
        return true;
    } else {
        return typeof target === 'string' && ['object', 'Object'].includes(target);
    }
}


export function isObjectTargetArray(target: Target<any>): boolean {
    return typeof target === 'string' && ['object[]', 'Object[]'].includes(target);
}
