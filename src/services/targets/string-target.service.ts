import { TargetElement } from '../../types/target/target-element.type';
import { throwWarning } from '../../utils/errors.util';
import { isPrimitiveConstructor, isPrimitiveType } from '../../types/primitives.type';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isString } from '../../utils/native/strings.util';
import { isQuoted } from '../../types/target/string/quoted.type';
import { isBracketed } from '../../types/target/string/bracketed.type';
import * as chalk from 'chalk';
import { isContainerized, isNotEmptyContainer } from '../../types/target/string/containerized.type';

export class StringTargetService {


    static isCorrectTarget(target: string): boolean {
        if (isNullOrUndefined(target) || !isString(target)) {
            return false;
        }
        const normalizedTarget: string = StringTargetService.normalize(target);
        return StringTargetService.hasCorrectElements(normalizedTarget);
    }


    private static normalize(target: string): string {
        return this.cleanExtremities(target).replace(/^String$/g, 'string')
            .replace(/^Number$/g, 'number')
            .replace(/^Boolean$/g, 'boolean');
    }


    private static hasCorrectElements(text: string): boolean {
        const cleanedText: string = this.cleanExtremities(text);
        return isPrimitiveType(cleanedText)
            || isQuoted(cleanedText)
            || this.isCorrectContainer(cleanedText)
            || this.isCorrectArray(cleanedText)
    }


    private static isCorrectArray(text: string): boolean {
        return /^\w*\[\]$/g.test(text) && this.hasCorrectElements(text.slice(0, -2));
    }


    private static isCorrectContainer(text: string): boolean {
        return isNotEmptyContainer(text) && this.hasCorrectElements(text.slice(1, -1))
    }


    private static isCorrectObject(text: string): boolean {
        return isPrimitiveType(text)
    }


    private static isCorrectCombination(text: string): boolean {
        return isPrimitiveType(text)
    }


    private static isCorrectExtends(text: string): boolean {
        return isPrimitiveType(text)
    }


    private static isCorrectConditional(text: string): boolean {
        return isPrimitiveType(text)
    }


    private static isExportedClass(text: string): boolean {
        return isPrimitiveType(text)
    }


    private static cleanExtremities(text: string): string {
        console.log(chalk.blueBright('CLEA NNNNNN'), text);
        return isString(text) ? text.replace(/^(,| )/g, '').replace(/(,| )$/g, '') : '';
    }



    // static hasCorrectElements(text: string): boolean {
    //     if (Array.isArray(text)) {
    //         return text.every(e => this.hasCorrectElements(e));
    //     } else {
    //         return this.getTargetElements(text).every(t => this.isCorrect(t));
    //     }
    // }


    private static getTargetElements(targetElement: any): TargetElement[] | never {
        if (typeof targetElement === 'string') {
            return this.splitStringTarget(targetElement);
        } else if (typeof targetElement === 'function' || isPrimitiveConstructor(targetElement)) {
            return [targetElement];
        }
        throwWarning(`Warning: unknown target element : `, targetElement);
    }


    private static isCorrect(targetElement: unknown): boolean {
        return isPrimitiveConstructor(targetElement) || this.hasCorrectElements(targetElement as string);
    }


    private static splitStringTarget(target: string): string[] {
        return this.cleanTarget(target).split(' ')
    }


    private static cleanTarget(target: string): string {
        return target.replace(/[()\]\[|&]/g, '').replace(/ +/, ' ');
    }
}
