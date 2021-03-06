

export function isDateType(typeName: string): typeName is 'Date' {
    return typeName === 'Date';
}

export function isDateTypeName(typeName: string): boolean {
    return ['date', 'Date'].includes(typeName);
}

export function isDateOrDatesArrayType(typeName: string): typeName is ('Date' | 'Date[]') {
    return typeName === 'Date' || typeName === 'Date[]';
}


export function isValidDateConstructor(d: any): d is (string | number | Date) {
    return d && typeof d === 'string' || typeof d === 'number' || (typeof d.year === 'string' && typeof d.month === 'number') || this.isValidDate(d);
}


export function isValidDate(d: any): d is Date {
    return Object.prototype.toString.call(d) === "[object Date]" ? !isNaN(d.getTime()) : false;
}
