import { throwWarning } from '../utils/errors.util';
import { isPrimitiveType } from '../types/primitives.type';
import { isString } from '../utils/native/strings.util';
import { isQuoted } from '../../shared/types/quoted.type';
import { isBracketedOrParenthesized } from '../types/target/string/bracketed-or-penthesized.type';
import { hasSeparators } from '../types/target/string/has-separators.type';
import { isArrayType, typeOfArray } from '../types/target/string/array-type.type';
import { TargetService } from './target.service';
import { isStringAsTrivialType } from '../types/null-or-literal.type';
import { isGeneric, typeOfGeneric } from '../types/target/string/generics.type';
import { getElements, trimSeparators } from '../utils/target.util';
import { GLOBAL } from '../const/global.const';
import { hasDeclaration } from '../utils/global.util';
import { removeBorders } from '../../shared/utils/strings.util';
import { isNullOrUndefined } from '../types/null-or-undefined.type';
import * as chalk from 'chalk';
import { isContainerized } from '../types/target/string/containerized.type';
import { isIndexableKey } from '../types/indexable-key.type';

/**
 * Service checking if a given stringified target has correct format
 */
export class CheckTargetsService {

    /**
     * If target was not already checked, checks if this target is readable by @genese/mapper
     * @param target    // The target to check
     */
    static start(target: string): void {
        if (!CheckTargetsService.hasCorrectFormat(target)) {
            throwWarning(`impossible to read "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response.`)
        }
    }

    /**
     * Checks if target is readable by @genese/mapper
     * @param target    // The target to check
     */
    static hasCorrectFormat(target: string): boolean {
        if (isNullOrUndefined(target)) {
            return true;
        }
        if (!isString(target)) {
            target = TargetService.stringify(target);
        }
        const normalizedTarget: string = TargetService.normalize(target);
        return CheckTargetsService.hasCorrectElements(normalizedTarget);
    }

    /**
     * Checks if target is composed of correct elements.
     *
     * Remark : target is never surrounded by curved brackets : literal objects were transformed in types generated during the init process
     * @param target    // The target to check
     * @private
     */
    private static hasCorrectElements(target: string): boolean {
        if (isPrimitiveType(target)
            || isQuoted(target)
            || isStringAsTrivialType(target)) {
            return true;
        }
        if (isContainerized(target)) {
            return this.hasCorrectElements(removeBorders(target));
        } else if (isArrayType(target)) {
            return this.hasCorrectElements(typeOfArray(target));
        } else if (isGeneric(target)) {
            return this.hasCorrectElements(typeOfGeneric(target));
        } else if (isIndexableKey(target)) {
            return true;
        } else if(hasSeparators(trimSeparators(target))) {
            return this.haveCorrectElements(getElements(target));
        } else if (hasDeclaration(target)) {
            return true;
        } else if (this.isDeclaredOutOfProject(target)) { // TODO
            return true;
        } else {
            return false;
        }
    }

    // TODO
    private static isDeclaredOutOfProject(text: string): boolean {
        return false;
    }

    /**
     * Checks if each element of an array of element is a correct target
     * @param elements  // The different elements of a given stringified target
     * @private
     */
    private static haveCorrectElements(elements: string[]): boolean {
        for (const text of elements) {
            if (!this.hasCorrectElements(trimSeparators(text))) {
                return false;
            }
        }
        return true;
    }

}
