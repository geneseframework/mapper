import { MainService } from '../main.service';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

// TODO
export class MapOutOfProjectService {

    static create(target: string, data: any, options: MapperBehavior): any {
        return MainService.mapToString(target, data, options);
    }


}
