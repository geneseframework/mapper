import { isValidDateConstructor } from '../utils/dates.util';

export class MapDateService {


    static createDates(data: any[], isArray: boolean): Date[]
    static createDates(data: any, isArray: boolean): Date
    static createDates(data: any, isArray: boolean): Date | Date[] {
        if (Array.isArray(data) && isArray) {
            return this.createDatesArray(data);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createDate(data);
        } else {
            return undefined;
        }
    }


    private static createDatesArray(data: any[]): Date[] {
        const typesArray: Date[] = [];
        for (const element of data) {
            const instance: Date = this.createDate(element);
            typesArray.push(instance);
        }
        return typesArray;
    }


    static createDate<T>(data: any): Date {
        if (isValidDateConstructor(data)) {
            return new Date(data);
        } else {
            return undefined;
        }
    }
}
