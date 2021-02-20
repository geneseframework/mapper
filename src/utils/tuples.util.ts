import { MapTarget } from '../types/map-target.type';
import { isArray } from './arrays.util';


export function isTuple(mapTarget: MapTarget<any>) {
    return isArray(mapTarget);
}
