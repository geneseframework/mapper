import { Target } from '../types/target.type';
import { isArray } from './arrays.util';


export function isTuple(mapTarget: Target<any>) {
    return isArray(mapTarget);
}
