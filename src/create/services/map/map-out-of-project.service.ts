import { MainService } from '../main.service';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

// TODO
export class MapOutOfProjectService {

    /**
     * Maps targets which are out of project (ie: node_modules)
     * @param target
     * @param data
     * @param options
     */
    static create(target: string, data: any, options: MapperBehavior): any {
        return MainService.mapStringTarget(target, data, options);
    }


}
