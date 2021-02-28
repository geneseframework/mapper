import { CreateOptions } from '../interfaces/create-options.interface';
import { Target } from '../types/target.type';
import * as chalk from 'chalk';

export class MapTypeCombinationService {

    static async create<T>(target: Target<any>, data: any, options: CreateOptions): Promise<any> {
        console.log(chalk.yellowBright('TYPE COMBBINATION'), target, data);
        return undefined;
    }
}
