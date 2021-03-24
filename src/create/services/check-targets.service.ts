import { throwWarning } from '../utils/errors.util';
import { isPrimitiveType } from '../types/primitives.type';
import { isNullOrUndefined } from '../utils/native/any.util';
import { isString } from '../utils/native/strings.util';
import { isQuoted } from '../../shared/types/quoted.type';
import { isBracketedOrParenthesized } from '../types/target/string/bracketed-or-penthesized.type';
import { hasSeparators } from '../types/target/string/has-separators.type';
import { isArrayType, typeOfArray } from '../types/target/string/array-type.type';
import { TargetService } from './target.service';
import { isStringAsTrivialType } from '../types/null-or-literal.type';
import { hasGeneric, typeOfGeneric } from '../types/target/string/generics.type';
import { getElements, trimSeparators } from '../utils/target.util';
import { GLOBAL } from '../const/global.const';
import { hasDeclaration } from '../utils/global.util';
import { isCurveBracketed } from '../types/target/string/curve-bracketed.type';
import { removeBorders } from '../../shared/utils/strings.util';
import * as chalk from 'chalk';

export class CheckTargetsService {


    /**
     * If target was not already checked, checks if this target is readable by @genese/mapper
     * @param target    // The target to check
     */
    static start(target: string): void {
        if (GLOBAL.wasChecked(target)) {
            return;
        }
        if (!CheckTargetsService.hasCorrectFormat(target)) {
            throwWarning(`impossible to read type "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response.`)
        }
        GLOBAL.checkedTargets.push(target);
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
        if (isBracketedOrParenthesized(target)) {
            return this.isCorrectContainer(target);
        } else if (isArrayType(target)) {
            return this.hasCorrectElements(typeOfArray(target));
        } else if (hasGeneric(target)) {
            return this.hasCorrectElements(typeOfGeneric(target));
        } else if(hasSeparators(trimSeparators(target))) {
            return this.haveCorrectElements(getElements(target));
        } else if (hasDeclaration(target)) {
            return true;
        } else if (this.isDeclaredOutOfProject(target)) { // TODO
            return true;
        }
        return false;
    }


    private static isCorrectContainer(text: string): boolean {
        return isBracketedOrParenthesized(text) &&  this.hasCorrectElements(removeBorders(text))
    }


    // TODO
    private static isDeclaredOutOfProject(text: string): boolean {
        return false;
    }


    private static haveCorrectElements(texts: string[]): boolean {
        for (const text of texts) {
            if (!this.hasCorrectElements(trimSeparators(text))) {
                return false;
            }
        }
        return true;
    }

}
