import * as chalk from 'chalk';

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
        console.log(chalk.magentaBright('IS VALID ADTE??????'), data, this.isValidDateConstructor(data));
        if (this.isValidDateConstructor(data)) {
            return new Date(data);
        } else {
            return undefined;
        }
    }


    private static isValidDateConstructor(d: any): boolean {
        return d && typeof d === 'string' || typeof d === 'number' || (typeof d.year === 'string' && typeof d.month === 'number') || this.isValidDate(d);
    }


    private static isValidDate(d): boolean {
        if (Object.prototype.toString.call(d) === "[object Date]") {
            return !isNaN(d.getTime());
        } else {
            return false;
        }
    }
}
