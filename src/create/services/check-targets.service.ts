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

export class CheckTargetsService {


    /**
     * Checks if target is readable by @genese/mapper
     * @param target
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
     * CAUTION: some cases are not covered and may cause errors :
     *  - functions which are not constructors
     * Don't use targets which are on one of these cases.
     * @param target
     */
    static hasCorrectFormat(target: string): boolean {
        if (isNullOrUndefined(target)) {
            return true;
        }
        if (!isString(target)) {
            target = TargetService.toString(target);
        }
        const normalizedTarget: string = TargetService.normalize(target);
        return CheckTargetsService.hasCorrectElements(normalizedTarget);
    }


    private static hasCorrectElements(text: string): boolean {
        if (isPrimitiveType(text)
            || isQuoted(text)
            || isStringAsTrivialType(text)) {
            return true;
        }
        if (isBracketedOrParenthesized(text)) {
            return this.isCorrectContainer(text);
        } else if (isArrayType(text)) {
            return this.hasCorrectElements(typeOfArray(text));
        } else if (hasGeneric(text)) {
            return this.hasCorrectElements(typeOfGeneric(text));
        } else if(hasSeparators(trimSeparators(text))) {
            return this.haveCorrectElements(getElements(text));
        } else if (isCurveBracketed(text)) {
            return isPrimitiveType(text); // TODO
        } else if (hasDeclaration(text)) {
            return true;
        } else if ( this.isDeclaredOutOfProject(text)) { // TODO
            return true;
        }
        return false;
    }


    private static isCorrectContainer(text: string): boolean {
        return isBracketedOrParenthesized(text) &&  this.hasCorrectElements(removeBorders(text))
    }


    // TODO
    private static isCorrectObject(text: string): boolean {
        return isPrimitiveType(text) // TODO : remove this return
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
