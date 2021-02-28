import { Target } from '../types/target.type';
import { TargetElement } from '../types/target-element.type';
import { isArray } from '../utils/arrays.util';
import { isFunction } from '../utils/any.util';
import { throwWarning } from '../utils/errors.util';
import { isPrimitiveConstructor } from '../utils/primitives.util';

export class TargetElementService {


    static hasCorrectElements(target: any): boolean {
        if (Array.isArray(target)) {
            return target.every(e => this.hasCorrectElements(e));
        } else {
            return this.getTargetElements(target).every(t => this.isCorrect(t));
        }
    }


    private static getTargetElements(targetElement: any): TargetElement[] | never {
        const targetElements: TargetElement[] = [];
        if (typeof targetElement === 'string') {
            return this.splitStringTarget(targetElement);
        } else if (typeof targetElement === 'function' || isPrimitiveConstructor(targetElement)) {
            return [targetElement];
        }
        throwWarning(`Warning: unknown target element : `, targetElement);
        // return targetElements;
    }

    // private static getTargetElementsOfArray(target: any[]): TargetElement<any>[] {


    private static isCorrect(targetElement: unknown): boolean {
        return isPrimitiveConstructor(targetElement) || this.isCorrectStringTarget(targetElement as string);
    }


    private static splitStringTarget(target: string): string[] {
        return [];
    }


    private static isCorrectStringTarget(targetElement: string): boolean {
        return undefined;
    }
}
