import { MapTarget } from '../types/map-target.type';


export function isObjectOrObjectsArrayTarget(mapTarget: MapTarget<any>): boolean {
    return isObjectTarget(mapTarget) || isObjectTargetArray(mapTarget);
}


export function isObjectTarget(mapTarget: MapTarget<any>): boolean {
    if (mapTarget === {}) {
        return true;
    } else {
        return typeof mapTarget === 'string' && ['object', 'Object'].includes(mapTarget);
    }
}


export function isObjectTargetArray(mapTarget: MapTarget<any>): boolean {
    if (mapTarget === [{}]) {
        return true;
    } else {
        return typeof mapTarget === 'string' && ['object[]', 'Object[]'].includes(mapTarget);
    }
}
