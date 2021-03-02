import { ArrayOfPrimitiveElements, Primitive, PrimitiveTypeName } from '../../types/primitives.type';
import { CreateOptions } from '../../interfaces/create-options.interface';
import { StringString } from '../../types/tuples/string-string.type';
import { PrimitiveAny } from '../../types/tuples/primitive-any.type';
import { castStringAndNumbers } from '../../utils/native/primitives.util';

export class MapPrimitiveService {


    static create(targetData: StringString, options: CreateOptions): string
    static create(targetData: PrimitiveAny, options: CreateOptions): Primitive
    static create([target, data]: PrimitiveAny, options: CreateOptions): Primitive {
        // if (isTupleStringString(targetData)) {
        //     return data(targetData);
        // }
        // if (!this.targetAndDataAreBothArrayOrNot(data, isArray)) {
        //     return undefined;
        // }
        // if (Array.isArray(data)) {
        //     return this.createArrayElements(data, typeName, options);
        // } else {
        //     return this.createElement(data, typeName, options);
        // }
        return undefined;
    }

// static create(data: any[], typeName: PrimitiveTypeName, isArray: boolean, options: CreateOptions): ArrayOfPrimitiveElements
//     static create(data: any, typeName: PrimitiveTypeName, isArray: boolean, options: CreateOptions): Primitive
//     static create(data: any, typeName: PrimitiveTypeName, isArray: boolean, options: CreateOptions): Primitive | ArrayOfPrimitiveElements | undefined {
//         if (!this.targetAndDataAreBothArrayOrNot(data, isArray)) {
//             return undefined;
//         }
//         if (Array.isArray(data)) {
//             return this.createArrayElements(data, typeName, options);
//         } else {
//             return this.createElement(data, typeName, options);
//         }
//     }
//

    private static createArrayElements(data: any[], typeName: PrimitiveTypeName, options: CreateOptions): ArrayOfPrimitiveElements {
        const primitiveElementsArray = [];
        for (const element of data) {
            const primitiveElement: Primitive = this.createElement(element, typeName, options);
            if (primitiveElement || element === undefined || element === null) {
                primitiveElementsArray.push(primitiveElement);
            }
        }
        return primitiveElementsArray;
    }


    private static createElement(data: any, typeName: PrimitiveTypeName, options: CreateOptions): Primitive {
        if (data === null) {
            return null;
        }
        return this.haveSameType(data, typeName, options) ? castStringAndNumbers(typeName, data) : undefined;
    }


    private static haveSameType(data: any, typeName: PrimitiveTypeName, options: CreateOptions): boolean {
        return typeof data === typeName?.toLowerCase()
            || (typeof data === 'string' && typeName?.toLowerCase() === 'number' && options.differentiateStringsAndNumbers === false)
            || (typeof data === 'number' && typeName?.toLowerCase() === 'string' && options.differentiateStringsAndNumbers === false);
    }


    private static targetAndDataAreBothArrayOrNot(data: any, isArray: boolean): boolean {
        return (Array.isArray(data) && isArray) || (!Array.isArray(data) && !isArray);
    }

}
