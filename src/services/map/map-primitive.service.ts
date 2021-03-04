import { ArrayOfPrimitiveElements, Primitive, PrimitiveType } from '../../types/primitives.type';
import { CreateOptions } from '../../models/create-options.model';
import { PrimitiveAny } from '../../types/target/string/primitive-any.type';
import { castStringAndNumbers } from '../../utils/native/primitives.util';
import * as chalk from 'chalk';

export class MapPrimitiveService {


    static create([target, data]: PrimitiveAny, options: CreateOptions): Primitive {
        // if (isPrimitiveValueWithCorrectType(target, data, options.differentiateStringsAndNumbers)) {
        //     return castStringAndNumbers()
        // } data : undefined;
        // if (isTupleStringString(targetData)) {
        //     return data(targetData);
        // }
        // if (!this.targetAndDataAreBothArrayOrNot(data, isArray)) {
        //     return undefined;
        // }
        // if (Array.isArray(data)) {
        //     return this.createArrayElements(data, typeName, options);
        // } else {
            return this.createElement(data, target, options);
        // }
        // return undefined;
    }


    private static createArrayElements(data: any[], typeName: PrimitiveType, options: CreateOptions): ArrayOfPrimitiveElements {
        const primitiveElementsArray = [];
        for (const element of data) {
            const primitiveElement: Primitive = this.createElement(element, typeName, options);
            if (primitiveElement || element === undefined || element === null) {
                primitiveElementsArray.push(primitiveElement);
            }
        }
        return primitiveElementsArray;
    }


    private static createElement(data: any, typeName: PrimitiveType, options: CreateOptions): Primitive {
        if (data === null) {
            return null;
        }
        console.log(chalk.blueBright('CREATE ELTTTTTTT'), data, typeName, options, this.haveSameType(data, typeName, options));
        return this.haveSameType(data, typeName, options) ? castStringAndNumbers(typeName, data) : undefined;
    }


    private static haveSameType(data: any, typeName: PrimitiveType, options: CreateOptions): boolean {
        return typeof data === typeName?.toLowerCase()
            || (typeof data === 'string' && typeName?.toLowerCase() === 'number' && options.differentiateStringsAndNumbers === false)
            || (typeof data === 'number' && typeName?.toLowerCase() === 'string' && options.differentiateStringsAndNumbers === false);
    }


    private static targetAndDataAreBothArrayOrNot(data: any, isArray: boolean): boolean {
        return (Array.isArray(data) && isArray) || (!Array.isArray(data) && !isArray);
    }

}
