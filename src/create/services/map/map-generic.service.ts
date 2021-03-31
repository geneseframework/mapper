import { MainService } from '../main.service';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { Generic, typeOfGeneric } from '../../types/non-trivial-types/generics.type';

/**
 * Service used in case of stringified types corresponding to a generic type
 */
export class MapGenericService {

    /**
     * Return mapped data when target corresponds to a generic type
     * @param target    // The stringified target
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: Generic, data: any, options: MapperBehavior): any {
        return MainService.mapStringTarget(typeOfGeneric(target), data, options);
    }

}
