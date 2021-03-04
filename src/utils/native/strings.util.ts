
export function isString(value: any): value is string {
    return typeof value === 'string';
}


export function removeBorders(text: string): string {
    return text.slice(1, -1);
}


export const tab = '    ';

export function tabs(numberOfTabs: number): string {
    let spaces = '';
    for (let i = 0; i < numberOfTabs; i++) {
        spaces = `${spaces}${tab}`;
    }
    return spaces;
}
