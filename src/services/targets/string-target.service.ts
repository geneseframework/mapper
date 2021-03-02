import { TargetElement } from '../../types/target/target-element.type';
import { throwWarning } from '../../utils/errors.util';
import { isPrimitiveConstructor, isPrimitiveType } from '../../types/primitives.type';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isString } from '../../utils/native/strings.util';
import { isQuoted } from '../../types/target/string/quoted.type';
import { isNotEmptyContainer } from '../../types/target/string/containerized.type';
import { isUnion, splitUnion } from '../../types/target/string/union.type';
import { isIntersection, splitIntersection } from '../../types/target/string/intersection.type';
import { hasDeclaration } from '../../utils/ast/ast-declaration.util';

export class StringTargetService {


    static isCorrectTarget(target: string): boolean {
        if (isNullOrUndefined(target) || !isString(target)) {
            return false;
        }
        const normalizedTarget: string = StringTargetService.normalize(target);
        return StringTargetService.hasCorrectElements(normalizedTarget);
    }


    static normalize(target: string): string {
        return this.cleanExtremities(target).replace(/^String$/g, 'string')
            .replace(/^Number$/g, 'number')
            .replace(/^Boolean$/g, 'boolean');
    }


    private static haveCorrectElements(texts: string[]): boolean {
        return texts.every(t => this.hasCorrectElements(t));
    }


    private static hasCorrectElements(text: string): boolean {
        const cleanedText: string = this.cleanExtremities(text);
        return isPrimitiveType(cleanedText)
            || isQuoted(cleanedText)
            || this.isCorrectContainer(cleanedText)
            || this.isCorrectArray(cleanedText)
            || this.isCorrectUnion(cleanedText)
            || this.isCorrectIntersection(cleanedText)
            || this.isDeclaration(cleanedText)
    }


    private static isCorrectArray(text: string): boolean {
        return /^\w*\[\]$/g.test(text) && this.hasCorrectElements(text.slice(0, -2));
    }


    private static isCorrectContainer(text: string): boolean {
        return isNotEmptyContainer(text) && this.hasCorrectElements(text.slice(1, -1))
    }


    private static isCorrectUnion(text: string): boolean {
        return isUnion(text) && this.haveCorrectElements(splitUnion(text));
    }


    private static isCorrectIntersection(text: string): boolean {
        return isIntersection(text) && this.haveCorrectElements(splitIntersection(text));
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


    private static isDeclaration(text: string): boolean {
        return hasDeclaration(text);
    }


    private static cleanExtremities(text: string): string {
        return isString(text) ? text.replace(/^(,| )/g, '').replace(/(,| )$/g, '') : '';
    }


    private static getTargetElements(targetElement: any): TargetElement[] | never {
        if (typeof targetElement === 'string') {
            return this.splitStringTarget(targetElement);
        } else if (typeof targetElement === 'function' || isPrimitiveConstructor(targetElement)) {
            return [targetElement];
        }
        throwWarning(`Warning: unknown target element : `, targetElement);
    }


    private static splitStringTarget(target: string): string[] {
        return this.cleanTarget(target).split(' ')
    }


    private static cleanTarget(target: string): string {
        return target.replace(/[()\]\[|&]/g, '').replace(/ +/, ' ');
    }
}
