import { isUnion, Union } from './union.type';
import { Intersection, isIntersection } from './intersection.type';

export type Combination = Union | Intersection;
