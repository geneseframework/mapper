import { isValidDateConstructor } from '../../utils/native/dates.util';
import * as chalk from 'chalk';
import { IncompatibilityService } from '../incompatibility.service';

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
            if (isValidDateConstructor(element)) {
                const instance: Date = this.createDate(element);
                typesArray.push(instance);
            }
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
