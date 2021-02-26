import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType } from '../types/primitives.type';
import * as chalk from 'chalk';
import { CreateOptions } from '../interfaces/create-options.interface';

export class MapPrimitiveService {


    static create(data: any[], typeName: PrimitiveType, isArray: boolean, options: CreateOptions): ArrayOfPrimitiveElements
    static create(data: any, typeName: PrimitiveType, isArray: boolean, options: CreateOptions): PrimitiveElement
    static create(data: any, typeName: PrimitiveType, isArray: boolean, options: CreateOptions): PrimitiveElement | ArrayOfPrimitiveElements | undefined {
        if (!this.targetAndDataAreBothArrayOrNot(data, isArray)) {
            return undefined;
        }
        if (Array.isArray(data)) {
            return this.createArrayElements(data, typeName, options);
        } else {
            return this.createElement(data, typeName, options);
        }
    }


    private static createArrayElements(data: any[], typeName: PrimitiveType, options: CreateOptions): ArrayOfPrimitiveElements {
        const primitiveElementsArray = [];
        for (const element of data) {
            const primitiveElement: PrimitiveElement = this.createElement(element, typeName, options);
            if (primitiveElement || element === undefined || element === null) {
                primitiveElementsArray.push(primitiveElement);
            }
        }
        return primitiveElementsArray;
    }


    private static createElement(data: any, typeName: PrimitiveType, options: CreateOptions): PrimitiveElement {
        if (data === null) {
            return null;
        }
        return this.haveSameType(data, typeName, options) ? data : undefined;
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
