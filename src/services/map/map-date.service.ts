import { isValidDateConstructor } from '../../utils/native/dates.util';

export class MapDateService {


    static create(data: any): Date {
        return isValidDateConstructor(data) ? new Date(data) : undefined;
    }
}
