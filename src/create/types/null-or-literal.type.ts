import { isNumeric, Numeric } from '../../shared/types/numeric.type';

export function isNull(value: any): value is null {
    return value === null;
}


export type NullOrBooleanOrNumber = null | boolean | number;


export type NumericOrStringifiedNullOrBoolean = Numeric | 'null' | 'true' | 'false' ;


export function isStringAsNumericOrStringifiedNullOrBoolean(text: string): text is NumericOrStringifiedNullOrBoolean {
    return text === 'null' || isNumeric(text) || text === 'true' || text === 'false';
}


export function isStringAsTrivialType(text: string): boolean {
    return text === 'null'
        || text === 'undefined'
        || !isNaN(Number(text))
        || text === 'true'
        || text === 'false'
        || text === 'object'
        || text === 'Date'
        || text === 'unknown'
        || text === 'any';
}
