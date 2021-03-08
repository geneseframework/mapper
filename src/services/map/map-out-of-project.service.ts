import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';
import { MainService } from '../main.service';

export class MapOutOfProjectService {

    static async create(target: string, data: any, options: CreateOptions): Promise<any> {
        console.log(chalk.yellowBright('MAP OOPPPPPPPP'), target, data);
        return MainService.mapToString(target, data, options);
    }


}
