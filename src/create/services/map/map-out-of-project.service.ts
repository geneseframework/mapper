import { MapperConfig } from '../../../shared/models/config.model';
import * as chalk from 'chalk';
import { MainService } from '../main.service';

// TODO
export class MapOutOfProjectService {

    static async create(target: string, data: any, options: MapperConfig): Promise<any> {
        console.log(chalk.yellowBright('MAP OOPPPPPPPP'), target, data);
        return MainService.mapToString(target, data, options);
    }


}
