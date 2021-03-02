import { TargetElement } from '../../types/target/target-element.type';
import { throwWarning } from '../../utils/errors.util';
import { isPrimitiveConstructor } from '../../types/primitives.type';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isString } from '../../utils/native/strings.util';

export class StringTargetService {


    static isCorrectTarget(target: string): boolean {
        if (isNullOrUndefined(target) || !isString(target)) {
            return false;
        }
        const normalizedTarget: string = this.normalize(target);
        return StringTargetService.hasCorrectElements(normalizedTarget);
    }


    private static normalize(target: string): string {
        return target.replace(/^String$/g, 'string')
            .replace(/^Number$/g, 'number')
            .replace(/^Boolean$/g, 'boolean');
    }


    static hasCorrectElements(text: string): boolean {
        return true;
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
