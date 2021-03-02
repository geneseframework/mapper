import { TargetElement } from '../../types/target/target-element.type';
import { throwWarning } from '../../utils/errors.util';
import { isDeclaration } from '../../utils/ast/ast-declaration.util';
import { isDateTypeName, isObjectTypeName, isPrimitiveTypeName } from '../../utils/native/types.util';
import { isPrimitiveConstructor } from '../../types/primitives.type';
import { isFunction } from '../../utils/native/functions.util';

export class TargetElementServiceOld {


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


    static isCorrectStringTarget(targetElement: string): boolean {
        // console.log(chalk.blueBright('IS CORRRRR'), targetElement);
        return isFunction(targetElement)
            || isPrimitiveTypeName(targetElement)
            || isDateTypeName(targetElement)
            || isDeclaration(targetElement)
            || isObjectTypeName(targetElement)
    }


    private static cleanTarget(target: string): string {
        return target.replace(/[()\]\[|&]/g, '').replace(/ +/, ' ');
    }
}
