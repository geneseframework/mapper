import { throwTarget } from '../utils/errors.util';
import { isPrimitiveType } from '../types/primitives.type';
import { isNullOrUndefined } from '../utils/native/any.util';
import { isString } from '../utils/native/strings.util';
import { isQuoted } from '../../shared/types/quoted.type';
import { isBracketedOrParenthesized } from '../types/target/string/bracketed-or-penthesized.type';
import { hasSeparators } from '../types/target/string/has-separators.type';
import { isArrayType, typeOfArray } from '../types/target/string/array-type.type';
import { TargetService } from './target.service';
import { isStringAsTrivialType } from '../types/null-or-literal.type';
import { removeBorders } from '../types/target/string/containerized.type';
import { hasGeneric, typeOfGeneric } from '../types/target/string/generics.type';
import { getElements, trimTarget } from '../utils/target.util';
import { GLOBAL } from '../const/global.const';
import { hasDeclaration } from '../utils/global.util';
import { isCurveBracketed } from '../types/target/string/curve-bracketed.type';

export class CheckTargetsService {


    static async start(target: string): Promise<void> {
        if (GLOBAL.wasChecked(target)) {
            return;
        }
        if (!await CheckTargetsService.hasCorrectFormat(target)) {
            throwTarget(target);
        }
        GLOBAL.checkedTargets.push(target);
    }


    /**
     * CAUTION: some cases are not covered and may cause errors :
     *  - functions which are not constructors
     * Don't use targets which are on one of these cases.
     * @param target
     */
    static async hasCorrectFormat(target: string): Promise<boolean> {
        if (isNullOrUndefined(target)) {
            return true;
        }
        if (!isString(target)) {
            target = TargetService.toString(target);
        }
        const normalizedTarget: string = TargetService.normalize(target);
        return await CheckTargetsService.hasCorrectElements(normalizedTarget);
    }


    private static async hasCorrectElements(text: string): Promise<boolean> {
        if (isPrimitiveType(text)
            || isQuoted(text)
            || isStringAsTrivialType(text)) {
            return true;
        }
        if (isBracketedOrParenthesized(text)) {
            return await this.isCorrectContainer(text);
        } else if (isArrayType(text)) {
            return await this.hasCorrectElements(typeOfArray(text));
        } else if (hasGeneric(text)) {
            return await this.hasCorrectElements(typeOfGeneric(text));
        } else if(hasSeparators(trimTarget(text))) {
            return await this.haveCorrectElements(getElements(text));
        } else if (isCurveBracketed(text)) {
            return isPrimitiveType(text); // TODO
        } else if (hasDeclaration(text)) {
            return true;
        } else if (await this.isDeclaredOutOfProject(text)) { // TODO
            return true;
        }
        return false;
    }


    private static async isCorrectContainer(text: string): Promise<boolean> {
        return isBracketedOrParenthesized(text) && await this.hasCorrectElements(removeBorders(text))
    }


    // TODO
    private static isCorrectObject(text: string): boolean {
        return isPrimitiveType(text) // TODO : remove this return
    }


    // TODO
    private static async isDeclaredOutOfProject(text: string): Promise<boolean> {
        return false;
    }


    private static async haveCorrectElements(texts: string[]): Promise<boolean> {
        for (const text of texts) {
            if (!await this.hasCorrectElements(trimTarget(text))) {
                return false;
            }
        }
        return true;
    }

}
