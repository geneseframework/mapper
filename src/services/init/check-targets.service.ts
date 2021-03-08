import { throwError, throwTarget, throwWarning } from '../../utils/errors.util';
import { isPrimitiveType } from '../../types/primitives.type';
import { CONFIG } from '../../const/config.const';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isString } from '../../utils/native/strings.util';
import { isQuoted } from '../../types/target/string/quoted.type';
import { isBracketedOrParenthesized } from '../../types/target/string/bracketed-or-penthesized.type';
import { hasDeclaration } from '../../utils/ast/ast-declaration.util';
import { hasSeparators, splitSeparator } from '../../types/target/string/has-separators.type';
import { isArrayType, typeOfArray } from '../../types/target/string/array-type.type';
import { TargetService } from '../targets/target.service';
import { CreateOptions } from '../../models/create-options.model';
import { isStringAsTrivialType } from '../../types/null-or-literal.type';
import { removeBorders } from '../../types/target/string/containerized.type';

export class CheckTargetsService {


    static async start(target: string): Promise<void> {
        if (!await CheckTargetsService.hasCorrectFormat(target)) {
            throwTarget(target);
        }
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


    private static async haveCorrectElements(texts: string[]): Promise<boolean> {
        return texts.every(async t => await this.hasCorrectElements(t));
    }


    private static async hasCorrectElements(text: string): Promise<boolean> {
        return isPrimitiveType(text)
            || isQuoted(text)
            || isStringAsTrivialType(text)
            || await this.isCorrectContainer(text)
            || await this.isCorrectArrayType(text)
            || await this.isCorrectComplexType(text)
            || await this.isDeclaration(text)
            || this.isCorrectObject(text) // TODO
    }


    private static async isCorrectArrayType(text: string): Promise<boolean> {
        return isArrayType(text) && await this.hasCorrectElements(typeOfArray(text));
    }


    private static async isCorrectContainer(text: string): Promise<boolean> {
        return isBracketedOrParenthesized(text) && await this.hasCorrectElements(removeBorders(text))
    }


    private static async isCorrectComplexType(text: string): Promise<boolean> {
        return hasSeparators(text) && await this.haveCorrectElements(splitSeparator(text));
    }


    // TODO
    private static isCorrectExtends(text: string): boolean {
        return isPrimitiveType(text)
    }


    // TODO
    private static isCorrectConditional(text: string): boolean {
        return isPrimitiveType(text)
    }


    // TODO
    private static isCorrectObject(text: string): boolean {
        return isPrimitiveType(text)
    }


    private static async isDeclaration(text: string): Promise<boolean> {
        return hasDeclaration(text);
    }

}
