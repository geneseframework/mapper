import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType } from '../types/primitives.type';

export class MapPrimitiveService {


    static create(data: any[], typeName: PrimitiveType, isArray: boolean): ArrayOfPrimitiveElements
    static create(data: any, typeName: PrimitiveType, isArray: boolean): PrimitiveElement
    static create(data: any, typeName: PrimitiveType, isArray: boolean): PrimitiveElement | ArrayOfPrimitiveElements | undefined {
        if (!this.targetAndDataAreBothArrayOrNot(data, isArray)) {
            return undefined;
        }
        if (Array.isArray(data)) {
            return this.createArrayElements(data, typeName);
        } else {
            return this.createElement(data, typeName);
        }
    }


    private static createArrayElements(data: any[], typeName: PrimitiveType): ArrayOfPrimitiveElements {
        const primitiveElementsArray = [];
        for (const element of data) {
            const primitiveElement: PrimitiveElement = this.createElement(element, typeName);
            if (primitiveElement || element === undefined || element === null) {
                primitiveElementsArray.push(primitiveElement);
            }
        }
        return primitiveElementsArray.length > 0 ? primitiveElementsArray : undefined;
    }


    private static createElement(data: any, typeName: PrimitiveType): PrimitiveElement {
        if (data === null) {
            return null;
        }
        return typeof data === typeName?.toLowerCase() ? data : undefined;
    }


    private static targetAndDataAreBothArrayOrNot(data: any, isArray: boolean): boolean {
        return (Array.isArray(data) && isArray) || (!Array.isArray(data) && !isArray);
    }

}
