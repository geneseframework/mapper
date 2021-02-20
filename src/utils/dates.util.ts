

export function isDateOrDatesArrayType(typeName: string): boolean {
    return typeName === 'Date' || typeName === 'Date[]';
}


export function isValidDateConstructor(d: any): boolean {
    return d && typeof d === 'string' || typeof d === 'number' || (typeof d.year === 'string' && typeof d.month === 'number') || this.isValidDate(d);
}


export function isValidDate(d): boolean {
    return Object.prototype.toString.call(d) === "[object Date]" ? !isNaN(d.getTime()) : false;
}
