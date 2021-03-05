import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';
import { CurveBracketed } from '../../types/target/string/curve-bracketed.type';
import { NewProperty } from '../../types/target/new-property.type';

export class MapObjectService {


    static async create(target: CurveBracketed, data: any, options?: CreateOptions): Promise<object> {
        console.log(chalk.blueBright('MAP OBJJJJJ'), target, data);
        return undefined;
    }


    private static createNewInstance(target: CurveBracketed): object {
        const newInstance = {};
        const nextProperty: NewProperty = undefined; // TODO
        return newInstance;
    }


    private static getNextProperty(target: string): any {

    }


}
