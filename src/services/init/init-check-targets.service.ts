// TODO
import { throwError } from '../../utils/errors.util';
import { isPrimitiveConstructor, isPrimitiveConstructorArray } from '../../types/primitives.type';
import { isTConstructor, isTConstructorArray } from '../../types/t-constructor.type';
import * as chalk from 'chalk';
import { isFunctionWhichIsNotExportedClass } from '../../utils/native/functions.util';
import { isNumber } from '../../utils/native/numbers.util';
import { isBoolean } from '../../utils/native/booleans.util';
import { isExportedClassConstructor, isExportedClassConstructorArray } from '../../utils/ast/ast-class.util';

export class InitCheckTargetsService {


    static async start(): Promise<void> {
        const targets: any[] = await this.getTargets();
        this.checkFormats(targets);
    }


    private static async getTargets(): Promise<any[]> {
        return [];
    }


    private static checkFormats(targets: any[]): void {
        for (const target of targets) {
            if (!this.hasCorrectFormat(target)) {
                throwError('Error: target has wrong format : ', target);
            }
        }
    }


    /**
     * CAUTION: some cases are not covered and may cause errors :
     *  - functions which are not constructors
     * Don't use targets which are on one of these cases.
     * @param target
     */
    static hasCorrectFormat(target: any): boolean {
        return InitCheckTargetsService.isACorrectCase(target) && !InitCheckTargetsService.isAWrongCase(target);
    }


    private static isACorrectCase(target: any): boolean {
        console.log(chalk.magentaBright('IS CORRECT ????'), isExportedClassConstructorArray(target));
        return isNumber(target)
        || isBoolean(target)
        || isPrimitiveConstructor(target)
        || isPrimitiveConstructorArray(target)
        || isExportedClassConstructor(target)
        || isExportedClassConstructorArray(target)
    }


    // TODO
    private static isAWrongCase(target: any): boolean {
        return false;
        // return isFunctionWhichIsNotExportedClass(target)
    }
}
