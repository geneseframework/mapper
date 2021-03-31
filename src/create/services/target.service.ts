import { Primitive } from '../types/trivial-types/primitives.type';
import { isFunction } from '../../shared/core/utils/primitives/functions.util';
import { isBoolean } from '../../shared/core/utils/booleans.util';
import { isNumber } from '../../shared/core/utils/primitives/numbers.util';
import { trimSeparators } from '../utils/target.util';
import { isNull } from '../types/trivial-types/null-or-literal.type';
import { isArray } from '../../shared/utils/arrays.util';
import { Target } from '../types/others/target.type';

/**
 * Service used to stringify the parameter 'target' of the create() method
 */
export class TargetService {

    /**
     * SReturns the stringified value of the parameter 'target' of the create() method
     * @param target    // The target parameter
     */
    static stringify<T>(target: Target<T>): string {
        if (isNull(target)) {
            return 'null';
        } else if (isArray(target)) {
            return this.stringifyTuple(target);
        } else if (isFunction(target)) {
            return this.normalize(target.name);
        } else if (isBoolean(target) || isNumber(target)) {
            return this.stringifyPrimitive(target);
        } else {
            return this.normalize(target);
        }
    }

    /**
     * Returns the stringified target in case of target which is a tuple
     * @param tupleTarget   // The tuple target
     * @private
     */
    private static stringifyTuple(tupleTarget: any[]): string {
        let stringifiedTarget = '[';
        for (const target of tupleTarget) {
            stringifiedTarget = `${stringifiedTarget}${this.stringify(target)}, `;
        }
        return `${stringifiedTarget.slice(0, -2)}]`;
    }

    /**
     * Returns the stringified target in case of primitive target
     * @param target        // The primitive target
     * @private
     */
    private static stringifyPrimitive(target: Primitive): string {
        return `'${target}'`;
    }

    /**
     * Returns the stringified target in case of Primitive Constructor target
     * @param target        // The primitive target
     * @private
     */
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

    /**
     * Returns regexps corresponding to primitive constructors
     * @private
     */
    private static primitiveRegexps(): RegExp[] {
        const stringRegex: RegExp = /([[ (,|&?:])String([,|&?:) \]])/g;
        const numberRegex: RegExp = /([[ (,|&?:])Number([,|&?:) \]])/g;
        const booleanRegex: RegExp = /([[ (,|&?:])Boolean([,|&?:) \]])/g;
        return [stringRegex, numberRegex, booleanRegex];
    }
}
