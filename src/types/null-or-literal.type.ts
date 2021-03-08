export function isNull(value: any): value is null {
    return value === null;
}


export type NullOrLiteral = Number | Boolean | Object | null | undefined;


export function isStringAsNullOrLiteral(text: string): boolean {
    return text === 'null' || !isNaN(Number(text)) || text === 'true' || text === 'false';
}


export function isStringAsTrivialType(text: string): boolean {
    return text === 'null'
        || text === 'undefined'
        || !isNaN(Number(text))
        || text === 'true'
        || text === 'false'
        || text === 'object'
        || text === 'Date'
        || text === 'any';
}
