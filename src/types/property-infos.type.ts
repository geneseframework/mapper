import { PropertyKind } from '../enums/property-kind.enum';

export class PropertyInfos {

    apparentType: string = undefined;
    propertyType: string = undefined;
    propertyKind: PropertyKind = undefined;

    constructor(apparentType: string, propertyType: string, propertyKind: PropertyKind) {
        this.apparentType = apparentType;
        this.propertyType = propertyType;
        this.propertyKind = propertyKind;
    }
}
