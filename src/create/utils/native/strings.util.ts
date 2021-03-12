
export function isString(value: any): value is string {
    return typeof value === 'string';
}


export function isNumericString(text: string): boolean {
    return !isNaN(Number(text));
}
