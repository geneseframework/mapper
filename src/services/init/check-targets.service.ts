import { throwWarningOrError } from '../../utils/errors.util';
import { isPrimitiveType } from '../../types/primitives.type';
import { CONFIG } from '../../const/config.const';
import { ThrowOption } from '../../enums/throw-option.enum';
import * as chalk from 'chalk';
import { Bracketed, isBracketed, removeBrackets } from '../../types/target/string/bracketed.type';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isString, removeBorders } from '../../utils/native/strings.util';
import { isQuoted } from '../../types/target/string/quoted.type';
import { Containerized, isContainerized } from '../../types/target/string/containerized.type';
import { isUnion, splitUnion, Union } from '../../types/target/string/union.type';
import { isIntersection, splitIntersection } from '../../types/target/string/intersection.type';
import { hasDeclaration } from '../../utils/ast/ast-declaration.util';
import { hasSeparators, HasSeparators, splitSeparator } from '../../types/target/string/has-separators.type';
import { ArrayType, isArrayType, typeOfArray } from '../../types/target/string/array-type.type';
import { trimTarget } from '../../utils/target.util';
import { TargetService } from '../targets/target.service';

export class CheckTargetsService {


    static async start(target: string): Promise<void> {
        // console.log(chalk.red('CORRECT ELTTTTS ?'), target);
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
        // console.log(chalk.magentaBright('CORRECT ELTTTTS ?'), target);
        if (isNullOrUndefined(target)) {
            return false;
        }
        const normalizedTarget: string = CheckTargetsService.normalize(target);
        return await CheckTargetsService.hasCorrectElements(normalizedTarget);
    }


    static normalize(target: string): string {
        if (['String', 'Number', 'Boolean'].includes(target)) {
            return target.toLowerCase();
        }
        target = trimTarget(target);
        const regExps: RegExp[] = CheckTargetsService.primitiveRegexps();
        for (const regex of regExps) {
            const matches: string[] = target.match(regex);
            // console.log(chalk.magentaBright('MATCHESSSSSS'), target, matches);
            for (const match of matches ?? []) {
                target = target.replace(match, match.toLowerCase());
            }
            // console.log(chalk.cyanBright('CLEANDDDDD'), target);
        }
        // console.log(chalk.blueBright('CLEANDDDDD'), target);
        return target;
    }


    private static primitiveRegexps(): RegExp[] {
        const stringRegex: RegExp = /([[ (,|&?:])String([,|&?:) \]])/g;
        const numberRegex: RegExp = /([[ (,|&?:])Number([,|&?:) \]])/g;
        const booleanRegex: RegExp = /([[ (,|&?:])Boolean([,|&?:) \]])/g;
        return [stringRegex, numberRegex, booleanRegex];
    }


    private static async haveCorrectElements(texts: string[]): Promise<boolean> {
        return texts.every(async t => await this.hasCorrectElements(t));
    }


    private static async hasCorrectElements(text: string): Promise<boolean> {
        // console.log(chalk.blueBright('QQQQQQ'), text, isQuoted(text));
        return isPrimitiveType(text)
            || isQuoted(text)
            || await this.isCorrectContainer(text)
            || await this.isCorrectArrayType(text)
            || await this.isCorrectComplexType(text)
            // || this.isCorrectUnion(text)
            // || this.isCorrectIntersection(text)
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


    private static async isCorrectUnion(text: string): Promise<boolean> {
        return isUnion(text) && await this.haveCorrectElements(splitUnion(text));
    }


    private static async isCorrectIntersection(text: string): Promise<boolean> {
        return isIntersection(text) && await this.haveCorrectElements(splitIntersection(text));
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


    private static cleanExtremities(text: string): string {
        return isString(text) ? text.replace(/^(,| )/g, '').replace(/(,| )$/g, '') : '';
    }


    // TODO
    private static isCorrectTuple(target: string): target is Bracketed {
        // return isArray(target) && target.every(t => this.hasCorrectFormat(t));
        return undefined;
    }

}
