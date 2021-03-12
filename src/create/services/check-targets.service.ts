import { throwTarget } from '../utils/errors.util';
import { isPrimitiveType } from '../types/primitives.type';
import { isNullOrUndefined } from '../utils/native/any.util';
import { isString } from '../utils/native/strings.util';
import { isQuoted } from '../types/target/string/quoted.type';
import { isBracketedOrParenthesized } from '../types/target/string/bracketed-or-penthesized.type';
import { hasSeparators } from '../types/target/string/has-separators.type';
import { isArrayType, typeOfArray } from '../types/target/string/array-type.type';
import { TargetService } from './targets/target.service';
import { isStringAsTrivialType } from '../types/null-or-literal.type';
import { removeBorders } from '../types/target/string/containerized.type';
import { hasGeneric, typeOfGeneric } from '../types/target/string/generics.type';
import { getElements, trimTarget } from '../utils/target.util';
import { GLOBAL } from '../const/global.const';
import { hasDeclaration } from '../utils/global.util';
import { isCurveBracketed } from '../types/target/string/curve-bracketed.type';
import * as chalk from 'chalk';

export class CheckTargetsService {


    static async start(target: string): Promise<void> {
        if (GLOBAL.wasChecked(target)) {
            return;
        }
        if (!await CheckTargetsService.hasCorrectFormat(target)) {
            throwTarget(target);
        }
        GLOBAL.checkedTargets.push(target);
    }


    /**
     * CAUTION: some cases are not covered and may cause errors :
     *  - functions which are not constructors
     * Don't use targets which are on one of these cases.
     * @param target
     */
    static async hasCorrectFormat(target: string): Promise<boolean> {
        // console.log(chalk.blueBright('START HAS CORRR FORMAT'), target);
        if (isNullOrUndefined(target)) {
            return true;
        }
        if (!isString(target)) {
            target = TargetService.toString(target);
        }
        const normalizedTarget: string = TargetService.normalize(target);
        const zzz = await CheckTargetsService.hasCorrectElements(normalizedTarget);
        // console.log(chalk.greenBright('END HAS CORRR FORMAT'), zzz);
        return zzz;
    }


    private static async hasCorrectElements(text: string): Promise<boolean> {
        if (isPrimitiveType(text)
            || isQuoted(text)
            || isStringAsTrivialType(text)) {
            return true;
        }
        if (isBracketedOrParenthesized(text)) {
            return await this.isCorrectContainer(text);
        } else if (isArrayType(text)) {
            return await this.hasCorrectElements(typeOfArray(text));
        } else if (hasGeneric(text)) {
            return await this.hasCorrectElements(typeOfGeneric(text));
        } else if(hasSeparators(trimTarget(text))) {
            return await this.haveCorrectElements(getElements(text));
        } else if (isCurveBracketed(text)) {
            return isPrimitiveType(text); // TODO
        } else if (hasDeclaration(text)) {
            // console.log(chalk.cyanBright('SHOULD BE HEREEEEE'), text);
            return true;
        } else if (await this.isDeclaredOutOfProject(text)) { // TODO
            return true;
        }
        // console.log(chalk.cyanBright('NOT HAS CORRR ELTS !!!!!'), text);
        return false;
    }


    // private static async hasCorrectElements(text: string): Promise<boolean> {
    //     const zzz = isPrimitiveType(text)
    //         || isQuoted(text)
    //         || isStringAsTrivialType(text)
    //         || await this.isCorrectContainer(text)
    //         || await this.isCorrectArrayType(text)
    //         || await this.isCorrectGeneric(text)
    //         || await this.isCorrectComplexType(text)
    //         || this.isCorrectObject(text) // TODO
    //         || await this.isDeclaration(text)
    //         || await this.isDeclaredOutOfProject(text);
    //     console.log(chalk.cyanBright('HAS CORRR ELTS ?????'), text, zzz);
    //     return zzz;
    // }


    private static async isCorrectArrayType(text: string): Promise<boolean> {
        return isArrayType(text) && await this.hasCorrectElements(typeOfArray(text));
    }


    private static async isCorrectGeneric(text: string): Promise<boolean> {
        // GLOBAL.logDuration(`BEFORE GENERICCCC ${text}`)
        const zzz = hasGeneric(text) && await this.hasCorrectElements(typeOfGeneric(text));
        // const zzz = hasGeneric(text) && await this.hasCorrectElements(typeOfGeneric(text)) && await this.hasCorrectElements(tagOfGeneric(text));
        // GLOBAL.logDuration(`AFTER GENERICCCC ${text} ${zzz}`, 'cyanBright')
        return zzz;
    }


    private static async isCorrectContainer(text: string): Promise<boolean> {
        return isBracketedOrParenthesized(text) && await this.hasCorrectElements(removeBorders(text))
    }


    private static async isCorrectComplexType(text: string): Promise<boolean> {
        const zzz = getElements(text);
        // console.log(chalk.yellowBright('CPX CORRECTTTTT ELTS'), text, zzz);
        return hasSeparators(text) && await this.haveCorrectElements(zzz);
    }


    // TODO
    private static isCorrectObject(text: string): boolean {
        // console.log(chalk.green(' CORRRRRR OBJJJJJ ????'), text);
        return isPrimitiveType(text)
    }


    private static async isDeclaration(text: string): Promise<boolean> {
        // console.log(chalk.magentaBright('HAS DECLLLLL ????'), text, hasDeclaration(text));
        return hasDeclaration(text);
    }


    // TODO: fix
    private static async isDeclaredOutOfProject(text: string): Promise<boolean> {
        // console.log(chalk.green('IS OOP ????'), text);
        return false;
        // return await isDeclaredOutOfProjectAddItToGlobal(text);
    }


    private static async haveCorrectElements(texts: string[]): Promise<boolean> {
        // console.log(chalk.green('BEFORE HAVE CORRRRRR ????'), texts);
        for (const text of texts) {
            // console.log(chalk.redBright('IS CORRRRRRECT ???'), text);
            if (!await this.hasCorrectElements(trimTarget(text))) {
                // console.log(chalk.redBright('IS NOT CORRRRRRECT !!!'), text);
                return false;
            }
        }
        // console.log(chalk.green('HAVE CORRRRRR ELTS !!!!'), texts);
        return true;
    }

}
