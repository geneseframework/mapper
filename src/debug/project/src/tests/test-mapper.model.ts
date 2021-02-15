import { MapParameter } from '../../../../types/map-parameter.type';

export class TestMapperModel {

    title: string;
    mapParameter: MapParameter<any>;
    data: any;
    options?: any;

    constructor(title: string, mapParameter: MapParameter<any>, data: any, options?: any) {
        this.title= title;
        this.mapParameter = mapParameter;
        this.data = data;
        this.options = options;
    }

}
