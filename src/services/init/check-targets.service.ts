import { throwWarningOrError } from '../../utils/errors.util';
import { isPrimitiveType } from '../../types/primitives.type';
import { CONFIG } from '../../const/config.const';
import { ThrowOption } from '../../enums/throw-option.enum';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isString } from '../../utils/native/strings.util';
import { isQuoted } from '../../types/target/string/quoted.type';
import { isContainerized } from '../../types/target/string/containerized.type';
import { hasDeclaration } from '../../utils/ast/ast-declaration.util';
import { hasSeparators, splitSeparator } from '../../types/target/string/has-separators.type';
import { isArrayType, typeOfArray } from '../../types/target/string/array-type.type';
import { TargetService } from '../targets/target.service';

export class CheckTargetsService {


    static async start(target: string): Promise<void> {
        if (!await CheckTargetsService.hasCorrectFormat(target)) {
            throwWarningOrError('Error: target has wrong format : ', target, CONFIG.create.throw === ThrowOption.ERROR);
        }
    }


    /**
     * CAUTION: some cases are not covered and may cause errors :
     *  - functions which are not constructors
     * Don't use targets which are on one of these cases.
     * @param target
     */
    static async hasCorrectFormat(target: string): Promise<boolean> {
        if (!isString(target)) {
            target = TargetService.toString(target);
        }
        if (isNullOrUndefined(target)) {
            return false;
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
        return isContainerized(text) && await this.hasCorrectElements(text.slice(1, -1))
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
