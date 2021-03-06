import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';
import { CurveBracketed } from '../../types/target/string/curve-bracketed.type';
import { Property } from '../../types/target/new-property.type';
import { removeBorders } from '../../types/target/string/containerized.type';

export class MapObjectService {


    static async create(target: CurveBracketed, data: any, options?: CreateOptions): Promise<object> {
        // console.log(chalk.cyanBright('MAP OBJJJJJ'), target, data);
        return this.createNewInstance(target);
    }


    private static createNewInstance(target: CurveBracketed): object {
        const newInstance = {};
        const nextProperty: Property = this.getNextProperty(removeBorders(target)); // TODO
        return newInstance;
    }


    private static getNextProperty(target: string): any {
        // const property
        const nextPropertyName: string = target.match(/^\w+:/g)?.[0]?.slice(0, -1);
        // console.log(chalk.magentaBright('get nxttttttt'), target, nextPropertyName);
        if (nextPropertyName) {
            const rest: string = target.slice(nextPropertyName.length + 1).trimLeft();
            const firstChar: string = rest[0];
            // console.log(chalk.yellowBright('RESTTTTT'), rest);
        }
    }


}
