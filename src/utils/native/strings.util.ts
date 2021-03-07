
export function isString(value: any): value is string {
    return typeof value === 'string';
}


export function isNumericString(text: string): boolean {
    return !isNaN(Number(text));
}


export const tab = '    ';

export function tabs(numberOfTabs: number): string {
    let spaces = '';
    for (let i = 0; i < numberOfTabs; i++) {
        spaces = `${spaces}${tab}`;
    }
    return spaces;
}
