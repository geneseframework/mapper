import { CreateOptions } from '../../models/create-options.model';
import { CurveBracketed } from '../../types/target/string/curve-bracketed.type';
import { Property } from '../../types/target/property.type';
import { removeBorders } from '../../types/target/string/containerized.type';

// TODO: implement
export class MapObjectService {


    static async create(target: CurveBracketed, data: any, options?: CreateOptions): Promise<object> {
        return this.createNewInstance(target);
    }


    private static createNewInstance(target: CurveBracketed): object {
        const newInstance = {};
        const nextProperty: Property = this.getNextProperty(removeBorders(target)); // TODO
        return newInstance;
    }


    private static getNextProperty(target: string): any {
        const nextPropertyName: string = target.match(/^\w+:/g)?.[0]?.slice(0, -1);
        if (nextPropertyName) {
            const rest: string = target.slice(nextPropertyName.length + 1).trimLeft();
            const firstChar: string = rest[0];
        }
    }


}
