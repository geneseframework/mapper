import { MainService } from '../main.service';
import { MapperConfigBehavior } from '@genese/core';

// TODO
export class MapOutOfProjectService {

    /**
     * Maps targets which are out of project (ie: node_modules)
     * @param target
     * @param data
     * @param options
     */
    static create(target: string, data: any, options: MapperConfigBehavior): any {
        return MainService.mapStringTarget(target, data, options);
    }


}
