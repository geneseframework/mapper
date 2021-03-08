import { CreateOptions } from '../../models/create-options.model';
import { Generic, typeOfGeneric } from '../../types/target/string/generics.type';
import { MainService } from '../main.service';

export class MapGenericService {

    static async create(target: Generic, data: any, options: CreateOptions): Promise<any> {
        return await MainService.mapToString(typeOfGeneric(target), data, options);
    }


}
