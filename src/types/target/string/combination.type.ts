import { isUnion, Union } from './union.type';
import { Intersection, isIntersection } from './intersection.type';

export type Combination = Union | Intersection;

export function isCombination(text: string): text is Combination {
    return isUnion(text) || isIntersection(text);
}
