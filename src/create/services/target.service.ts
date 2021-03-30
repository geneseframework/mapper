import { Target } from '../types/target/target.type';
import { Primitive } from '../types/primitives.type';
import { isFunction } from '../utils/native/functions.util';
import { isBoolean } from '../utils/native/booleans.util';
import { isNumber } from '../utils/native/numbers.util';
import { trimSeparators } from '../utils/target.util';
import { isNull } from '../types/null-or-literal.type';
import { isArray } from '../../shared/utils/arrays.util';
import * as chalk from 'chalk';

export class TargetService {

    static stringify<T>(target: Target<T>): string {
        if (isNull(target)) {
            return 'null';
        } else if (isArray(target)) {
            return this.stringifyArray(target);
        } else if (isFunction(target)) {
            return this.normalize(target.name);
        } else if (isBoolean(target) || isNumber(target)) {
            return this.stringifyPrimitive(target);
        } else {
            return this.normalize(target);
        }
    }


    private static stringifyArray(tupleTarget: any[]): string {
        let stringifiedTarget = '[';
        for (const target of tupleTarget) {
            stringifiedTarget = `${stringifiedTarget}${this.stringify(target)}, `;
        }
        return `${stringifiedTarget.slice(0, -2)}]`;
    }


    private static stringifyPrimitive(target: Primitive): string {
        return `'${target}'`;
    }


    static normalize(target: string): string {
        if (['String', 'Number', 'Boolean', 'Object'].includes(target)) {
            return target.toLowerCase();
        }
        target = trimSeparators(target);
        const regExps: RegExp[] = this.primitiveRegexps();
        for (const regex of regExps) {
            const matches: string[] = target.match(regex) ?? [];
            for (const match of matches) {
                target = target.replace(match, match.toLowerCase());
            }
        }
        return target;
    }


    private static primitiveRegexps(): RegExp[] {
        const stringRegex: RegExp = /([[ (,|&?:])String([,|&?:) \]])/g;
        const numberRegex: RegExp = /([[ (,|&?:])Number([,|&?:) \]])/g;
        const booleanRegex: RegExp = /([[ (,|&?:])Boolean([,|&?:) \]])/g;
        return [stringRegex, numberRegex, booleanRegex];
    }
}
