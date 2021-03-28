

export function removeBorders(text: string): string {
    return text.slice(1, -1);
}


export function capitalize(text) {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}


export function replaceAll(text: string, search: string, replace: string): string {
    return text?.split(search).join(replace);
}


export const tab = '    ';

export function tabs(numberOfTabs: number): string {
    let spaces = '';
    for (let i = 0; i < numberOfTabs; i++) {
        spaces = `${spaces}${tab}`;
    }
    return spaces;
}
