import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType, PrimitiveTypes } from '../types/primitives.type';

export class MapPrimitiveService {


    static create(data: any[], typeName: PrimitiveType): PrimitiveElement
    static create(data: any, typeName: PrimitiveTypes): ArrayOfPrimitiveElements
    static create(data: any, typeName: PrimitiveType | PrimitiveTypes): PrimitiveElement | ArrayOfPrimitiveElements
    static create(data: any, typeName: PrimitiveType | PrimitiveTypes): PrimitiveElement | ArrayOfPrimitiveElements | undefined {
        if (Array.isArray(data)) {
            return this.createArrayElements(data, typeName as PrimitiveTypes);
        } else {
            return this.createElement(data, typeName as PrimitiveType);
        }
    }


    private static createArrayElements(data: any[], arrayTypeName: PrimitiveTypes): ArrayOfPrimitiveElements {
        const typeName: PrimitiveType = arrayTypeName.slice(0, -2) as PrimitiveType;
        const instancesArray = [];
        for (const element of data) {
            const primitiveElement: PrimitiveElement = this.createElement(element, typeName);
            if (primitiveElement) {
                instancesArray.push(primitiveElement);
            }
        }
        return instancesArray.length > 0 ? instancesArray : undefined;
    }


    private static createElement(data: any, typeName: PrimitiveType): PrimitiveElement {
        return typeof data === typeName ? data : undefined;
    }

}
