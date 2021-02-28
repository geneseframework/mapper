import { TargetElement } from '../types/target-element.type';
import { throwWarning } from '../utils/errors.util';
import { isPrimitiveConstructor, isPrimitiveTypeName } from '../utils/primitives.util';
import * as chalk from 'chalk';
import { isDateTypeName } from '../utils/dates.util';
import { isDeclaration } from '../utils/ast-declaration.util';

export class TargetElementService {


    static hasCorrectElements(target: any): boolean {
        if (Array.isArray(target)) {
            return target.every(e => this.hasCorrectElements(e));
        } else {
            return this.getTargetElements(target).every(t => this.isCorrect(t));
        }
    }


    private static getTargetElements(targetElement: any): TargetElement[] | never {
        if (typeof targetElement === 'string') {
            return this.splitStringTarget(targetElement);
        } else if (typeof targetElement === 'function' || isPrimitiveConstructor(targetElement)) {
            return [targetElement];
        }
        throwWarning(`Warning: unknown target element : `, targetElement);
    }


    private static isCorrect(targetElement: unknown): boolean {
        return isPrimitiveConstructor(targetElement) || this.isCorrectStringTarget(targetElement as string);
    }


    private static splitStringTarget(target: string): string[] {
        return this.cleanTarget(target).split(' ')
    }


    private static isCorrectStringTarget(targetElement: string): boolean {
       return isPrimitiveTypeName(targetElement?.toLowerCase())
        || isDateTypeName(targetElement?.toLowerCase())
        || isDeclaration(targetElement)
    }


    private static cleanTarget(target: string): string {
        return target.replace(/[()\]\[|&]/g, '').replace(/ +/, ' ');
    }
}
