import { isValidDateConstructor } from '../../utils/native/dates.util';

export class MapDateService {


    /**
     * Returns new Date(data) if data is a valid date constructor
     * @param data
     */
    static create(data: any): Date {
        return isValidDateConstructor(data) ? new Date(data) : undefined;
    }
}
