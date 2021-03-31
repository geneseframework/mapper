/**
 * Couples of identical booleans
 */
export type SameBooleans = [true, true] | [false, false];

/**
 * Checks if two booleans are identical
 * @param firstAndLast
 */
export function areBothTrueOrFalse(firstAndLast: [first: boolean, last: boolean]): firstAndLast is SameBooleans {
    return (firstAndLast[0] && firstAndLast[1]) || (!firstAndLast[0] && !firstAndLast[1]);
}
