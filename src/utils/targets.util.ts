import { TargetArray } from '../types/target/target-array.type';
import { TargetTuple } from '../types/target/target-tuple.type';
import * as chalk from 'chalk';
import { isArray } from './arrays.util';

export function isTargetArray(target: string): target is TargetArray {
    return /^\[.*\]$/g.test(target);
}


export function isTargetTuple(target: string): target is TargetTuple {
    return /^\[.*, .*\]$/g.test(target);
}


export function tupleLength(targetTuple: TargetTuple): number {
    const nb = targetTuple.match(/, /g).length + 1;
    console.log(chalk.blueBright('NBBBBBB'), nb);
    return targetTuple ? targetTuple.match(/, /g).length + 1 : 0;
}


export function isTupleOfSameLength(targetTuple: TargetTuple, data: any[]): boolean {
    return isArray(data) && data.length === tupleLength(targetTuple);
}


export function findTupleElement(targetTuple: TargetTuple, index: number): string {
    return targetTuple.slice(1, -1).split(', ')[index];
}


