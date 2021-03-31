import { isNumeric, Numeric } from '../../shared/types/numeric.type';

/**
 * Null, boolean or number values
 */
export type NullOrBooleanOrNumber = null | boolean | number;

/**
 * Texts which are numeric strings, 'null', 'true' or 'false'
 */
export type NumericOrStringifiedNullOrBoolean = Numeric | 'null' | 'true' | 'false' ;

/**
 * Checks if a text is a numeric strings, 'null', 'true' or 'false'
 * @param text      // The text to check
 */
export function isStringAsNumericOrStringifiedNullOrBoolean(text: string): text is NumericOrStringifiedNullOrBoolean {
    return text === 'null' || isNumeric(text) || text === 'true' || text === 'false';
}

/**
 * Returns true if the parameter is equal to null
 * @param value     // The value to check
 */
export function isNull(value: any): value is null {
    return value === null;
}

/**
 * Checks if a text corresponds to a trivial type
 * @param text
 */
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
