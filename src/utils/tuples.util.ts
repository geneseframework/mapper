import { MapParameter } from '../types/map-parameter.type';

export function isTuple(mapParameter: MapParameter<any>) {
    return Array.isArray(mapParameter);
}
