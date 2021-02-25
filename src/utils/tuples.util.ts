import { Target } from '../types/target.type';
import { isArray } from './arrays.util';


export function isTuple(target: Target<any>) {
    return isArray(target);
}
