import { throwError, throwWarning } from '../../utils/errors.util';
import { isPrimitiveType } from '../../types/primitives.type';
import { CONFIG } from '../../const/config.const';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isString } from '../../utils/native/strings.util';
import { isQuoted } from '../../types/target/string/quoted.type';
import { isContainerized } from '../../types/target/string/containerized.type';
import { hasDeclaration } from '../../utils/ast/ast-declaration.util';
import { hasSeparators, splitSeparator } from '../../types/target/string/has-separators.type';
import { isArrayType, typeOfArray } from '../../types/target/string/array-type.type';
import { TargetService } from '../targets/target.service';
import { CreateOptions } from '../../models/create-options.model';

export class CheckTargetsService {


    static async start(target: string): Promise<void> {
        if (!await CheckTargetsService.hasCorrectFormat(target)) {
            CheckTargetsService.throwTarget(target);
            // const message = `target "${target}" has wrong format : `;
            // CONFIG.create.throwTarget.error === true ? throwError(message, target) : throwWarning(message, target);
        }
    }


    static throwTarget(target: string, data?: any, options?: CreateOptions): any | never {
        const opt: CreateOptions = options ?? CONFIG.create;
        if (opt.throwTarget.error) {
            throwError(`target "${target}" has wrong format and throwTarget.error is set to true in geneseconfig.json or in the createOption parameter of Mapper.create().`);
        } else if (opt.throwTarget.setToUndefined) {
            throwWarning(`target "${target}" has wrong format. @genese/mapper interpreted it as "any" and data will be set to "undefined" in the mapped response. You can change this behavior in geneseconfig.json or as option in Mapper.create().`);
            return data;
        } else {
            throwWarning(`target "${target}" has wrong format. @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response. You can change this behavior in geneseconfig.json or as option in Mapper.create().`);
            return undefined;
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
